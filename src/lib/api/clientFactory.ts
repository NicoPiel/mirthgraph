import createClient from 'openapi-fetch';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { getCookie } from '@tanstack/react-start/server';

import type { paths as EngineApi } from '@/lib/index';
import type { InstanceConfig, MirthInstance } from '@/features/settings/types';

const instancesFile = join(process.cwd(), 'config', 'instances.json');

type AuthenticatedClient = ReturnType<
    typeof createClient<EngineApi, 'application/json'>
>;

export type ResolvedMirthInstance = {
    instance: MirthInstance;
    baseUrl: string;
    cacheKey: string;
    cachePrefix: string;
};

const clientCache = new Map<string, AuthenticatedClient>();

async function loadInstanceConfig(): Promise<InstanceConfig> {
    try {
        const file = await readFile(instancesFile, 'utf-8');
        return JSON.parse(file) as InstanceConfig;
    } catch (error: unknown) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return { instances: [] };
        }

        throw error;
    }
}

export function normalizeInstanceUrl(rawUrl: string): string {
    const trimmed = rawUrl?.trim();

    if (!trimmed) {
        throw new Error('Instance URL is empty');
    }

    let candidate = trimmed
        .replace(/^https\/\//i, 'https://')
        .replace(/^http\/\//i, 'http://');

    if (candidate.startsWith('//')) {
        candidate = `https:${candidate}`;
    }

    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(candidate)) {
        candidate = `https://${candidate}`;
    }

    let parsed: URL;

    try {
        parsed = new URL(candidate);
    } catch {
        throw new Error(
            `Invalid instance URL "${rawUrl}". Use http:// or https://`,
        );
    }

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        throw new Error(
            `Unsupported URL protocol "${parsed.protocol}" for instance "${rawUrl}". Use http:// or https://`,
        );
    }

    const normalizedPath = parsed.pathname.replace(/\/+$/, '');

    if (/\/api$/i.test(normalizedPath)) {
        parsed.pathname = normalizedPath || '/api';
    } else {
        parsed.pathname = normalizedPath ? `${normalizedPath}/api` : '/api';
    }

    return parsed.toString();
}

function selectInstance(
    config: InstanceConfig,
    activeInstanceId?: string,
): MirthInstance {
    if (activeInstanceId) {
        const match = config.instances.find(
            (instance) => instance.id === activeInstanceId,
        );
        if (match) {
            return match;
        }
    }

    const fallback = config.instances[0];
    if (!fallback) {
        throw new Error('No configured Mirth Connect instances available');
    }

    return fallback;
}

function createAuthorizationHeader(
    instance: MirthInstance,
): string | undefined {
    if (!instance.username || !instance.password) {
        return undefined;
    }

    const credentials = `${instance.username}:${instance.password}`;
    const encoded = Buffer.from(credentials, 'utf-8').toString('base64');
    return `Basic ${encoded}`;
}

function hashCacheSegment(value: string): string {
    let hash = 0;

    for (let index = 0; index < value.length; index += 1) {
        hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
    }

    return hash.toString(16);
}

export function getInstanceCachePrefix(instanceId: string): string {
    return `${instanceId}:`;
}

function getInstanceCacheKey(instance: MirthInstance, baseUrl: string): string {
    const authorization = createAuthorizationHeader(instance) ?? 'anonymous';
    return `${getInstanceCachePrefix(instance.id)}${baseUrl}:${hashCacheSegment(authorization)}`;
}

export function clearAuthenticatedClientCache() {
    clientCache.clear();
}

export function invalidateAuthenticatedClientCache(instanceId: string) {
    const cachePrefix = getInstanceCachePrefix(instanceId);

    for (const cacheKey of clientCache.keys()) {
        if (cacheKey.startsWith(cachePrefix)) {
            clientCache.delete(cacheKey);
        }
    }
}

export async function getResolvedActiveInstance(): Promise<ResolvedMirthInstance> {
    const config = await loadInstanceConfig();
    const activeInstanceId = getCookie('mirth_instance_id');
    const instance = selectInstance(config, activeInstanceId);
    const baseUrl = normalizeInstanceUrl(instance.url);

    return {
        instance,
        baseUrl,
        cacheKey: getInstanceCacheKey(instance, baseUrl),
        cachePrefix: getInstanceCachePrefix(instance.id),
    };
}

function createClientHeaders(instance: MirthInstance): Record<string, string> {
    const headers: Record<string, string> = {
        accept: 'application/json',
        'X-Requested-With': 'MirthGraph',
    };

    const authorization = createAuthorizationHeader(instance);
    if (authorization) {
        headers.Authorization = authorization;
    }

    return headers;
}

export async function getAuthenticatedClient(
    resolvedInstance?: ResolvedMirthInstance,
) {
    const resolved = resolvedInstance ?? (await getResolvedActiveInstance());

    const cached = clientCache.get(resolved.cacheKey);
    if (cached) {
        return cached;
    }

    const client = createClient<EngineApi, 'application/json'>({
        baseUrl: resolved.baseUrl,
        headers: createClientHeaders(resolved.instance),
    });

    clientCache.set(resolved.cacheKey, client);
    return client;
}
