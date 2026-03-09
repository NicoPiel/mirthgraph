import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('openapi-fetch', () => ({
    default: vi.fn(),
}));

vi.mock('fs/promises', () => ({
    readFile: vi.fn(),
}));

vi.mock('@tanstack/react-start/server', () => ({
    getCookie: vi.fn(),
}));

import createClient from 'openapi-fetch';
import { readFile } from 'fs/promises';
import { getCookie } from '@tanstack/react-start/server';
import {
    clearAuthenticatedClientCache,
    getAuthenticatedClient,
    getResolvedActiveInstance,
    invalidateAuthenticatedClientCache,
    normalizeInstanceUrl,
} from './clientFactory';

describe('clientFactory', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        clearAuthenticatedClientCache();

        (readFile as any).mockResolvedValue(
            JSON.stringify({
                instances: [
                    {
                        id: 'instance-1',
                        name: 'Primary',
                        url: 'https://mirth.local:8443',
                        username: 'admin',
                        password: 'password',
                    },
                ],
            }),
        );
        (getCookie as any).mockReturnValue('instance-1');

        let clientCount = 0;
        (createClient as any).mockImplementation(() => ({
            clientId: ++clientCount,
        }));
    });

    describe('normalizeInstanceUrl', () => {
        it('adds https when scheme is missing', () => {
            expect(normalizeInstanceUrl('mirth.local:8443')).toBe(
                'https://mirth.local:8443/api',
            );
        });

        it('fixes common missing-colon typo', () => {
            expect(normalizeInstanceUrl('https//mirth.local:8443')).toBe(
                'https://mirth.local:8443/api',
            );
        });

        it('keeps valid http urls', () => {
            expect(normalizeInstanceUrl('http://localhost:8080')).toBe(
                'http://localhost:8080/api',
            );
        });

        it('keeps existing /api suffix', () => {
            expect(normalizeInstanceUrl('https://mirth.local:8443/api')).toBe(
                'https://mirth.local:8443/api',
            );
        });

        it('appends /api to existing path', () => {
            expect(normalizeInstanceUrl('https://mirth.local:8443/mirth')).toBe(
                'https://mirth.local:8443/mirth/api',
            );
        });

        it('rejects unsupported schemes', () => {
            expect(() => normalizeInstanceUrl('ftp://mirth.local')).toThrow(
                'Unsupported URL protocol',
            );
        });
    });

    it('reuses cached clients for the same active instance', async () => {
        const first = await getAuthenticatedClient();
        const second = await getAuthenticatedClient();

        expect(first).toBe(second);
        expect(createClient).toHaveBeenCalledTimes(1);
    });

    it('clears cached clients when invalidated', async () => {
        const first = await getAuthenticatedClient();

        invalidateAuthenticatedClientCache('instance-1');

        const second = await getAuthenticatedClient();

        expect(first).not.toBe(second);
        expect(createClient).toHaveBeenCalledTimes(2);
    });

    it('returns cache metadata for the active instance', async () => {
        const resolved = await getResolvedActiveInstance();

        expect(resolved.baseUrl).toBe('https://mirth.local:8443/api');
        expect(resolved.cachePrefix).toBe('instance-1:');
        expect(
            resolved.cacheKey.startsWith(
                'instance-1:https://mirth.local:8443/api:',
            ),
        ).toBe(true);
    });
});
