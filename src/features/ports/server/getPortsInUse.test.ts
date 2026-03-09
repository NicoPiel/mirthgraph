import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-start', () => ({
    createServerFn: vi.fn().mockReturnValue({
        handler: vi.fn((fn) => {
            const wrappedFn = async (...args: unknown[]) => {
                return fn(...args);
            };

            return wrappedFn;
        }),
    }),
}));

import { getPortsInUse } from './getPortsInUse';
import {
    getAuthenticatedClient,
    getResolvedActiveInstance,
} from '@/lib/api/clientFactory';

vi.mock('@/lib/api/clientFactory');

describe('getPortsInUse', () => {
    const mockClient = {
        GET: vi.fn(),
    };
    const mockResolvedInstance = {
        instance: {
            id: 'instance-1',
            name: 'Test Instance',
            url: 'https://mirth.local',
            username: 'admin',
            password: 'password',
        },
        baseUrl: 'https://mirth.local/api',
        cacheKey: 'instance-1:https://mirth.local/api:abc123',
        cachePrefix: 'instance-1:',
    };

    beforeEach(() => {
        vi.resetAllMocks();
        (getResolvedActiveInstance as any).mockResolvedValue(mockResolvedInstance);
        (getAuthenticatedClient as any).mockResolvedValue(mockClient);
    });

    it('returns normalized occupied ports', async () => {
        mockClient.GET.mockResolvedValue({
            data: [
                { id: 'channel-1', name: 'HTTP Listener', port: '8080' },
                { id: undefined, name: 'TCP Listener', port: undefined },
            ],
            error: null,
        });

        const result = await getPortsInUse();

        expect(getResolvedActiveInstance).toHaveBeenCalled();
        expect(getAuthenticatedClient).toHaveBeenCalledWith(mockResolvedInstance);
        expect(mockClient.GET).toHaveBeenCalledWith('/channels/portsInUse');
        expect(result).toEqual([
            { id: 'channel-1', name: 'HTTP Listener', port: '8080' },
            { id: '', name: 'TCP Listener', port: '' },
        ]);
    });

    it('returns an empty list when the API returns no rows', async () => {
        mockClient.GET.mockResolvedValue({
            data: null,
            error: null,
        });

        await expect(getPortsInUse()).resolves.toEqual([]);
    });

    it('throws when the API returns an error', async () => {
        mockClient.GET.mockResolvedValue({
            data: null,
            error: { message: 'Something went wrong' },
        });

        await expect(getPortsInUse()).rejects.toThrow(
            'Failed to fetch occupied ports',
        );
    });

    it('normalizes wrapped Mirth port list responses', async () => {
        mockClient.GET.mockResolvedValue({
            data: {
                list: {
                    'com.mirth.connect.donkey.model.channel.Ports': [
                        {
                            id: 'channel-1',
                            name: 'HTTP Listener',
                            port: '8080',
                        },
                        {
                            id: 'channel-2',
                            name: 'TCP Listener',
                            port: '6661',
                        },
                    ],
                },
            },
            error: null,
        });

        await expect(getPortsInUse()).resolves.toEqual([
            { id: 'channel-1', name: 'HTTP Listener', port: '8080' },
            { id: 'channel-2', name: 'TCP Listener', port: '6661' },
        ]);
    });
});
