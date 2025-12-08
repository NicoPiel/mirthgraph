import createClient from 'openapi-fetch';
import { readFile } from 'fs/promises';
import { join } from 'path';

import type { paths as EngineApi } from '@/lib/index';
import type { InstanceConfig, MirthInstance } from '@/features/settings/types';

const instancesFile = join(process.cwd(), 'config', 'instances.json');
console.log('Loading instances from:', instancesFile);

const clientCache = new Map<
    string,
    ReturnType<typeof createClient<EngineApi, 'application/json'>>
>();

async function loadInstanceConfig(): Promise<InstanceConfig> {
    try {
        const file = await readFile(instancesFile, 'utf-8');
        const config = JSON.parse(file) as InstanceConfig;
        console.log('Loaded config:', JSON.stringify(config, null, 2));
        return config;
    } catch (error: unknown) {
        console.error('Error loading config:', error);
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return { instances: [] };
        }

        throw error;
    }
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

type ClientContext = {
    cookies?: {
        get(name: string): string | undefined;
    };
};

export async function getAuthenticatedClient(context: ClientContext) {
    const config = await loadInstanceConfig();
    const activeInstanceId = context.cookies?.get('mirth_instance_id');
    const instance = selectInstance(config, activeInstanceId);

    const cached = clientCache.get(instance.id);
    if (cached) {
        return cached;
    }

    const headers: Record<string, string> = {
        accept: 'application/json',
        'X-Requested-With': 'MirthGraph',
    };

    const authorization = createAuthorizationHeader(instance);
    if (authorization) {
        headers.Authorization = authorization;
    }

    const client = createClient<EngineApi, 'application/json'>({
        baseUrl: instance.url,
        headers,
    });

    clientCache.set(instance.id, client);
    return client;
}
