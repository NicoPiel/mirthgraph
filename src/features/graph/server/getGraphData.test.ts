import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @tanstack/react-start
vi.mock('@tanstack/react-start', () => ({
    createServerFn: vi.fn().mockReturnValue({
        handler: vi.fn((fn) => {
            const wrappedFn = async (...args: any[]) => {
                return fn(...args);
            };
            return wrappedFn;
        }),
    }),
}));

import { getGraphData } from './getGraphData';
import {
    getAuthenticatedClient,
    getResolvedActiveInstance,
} from '@/lib/api/clientFactory';
import { transformer } from '../domain/transformer';
import {
    clearGraphDataCache,
    invalidateGraphDataCache,
} from './graphDataCache';

// Mock dependencies
vi.mock('@/lib/api/clientFactory');
vi.mock('../domain/transformer');

describe('getGraphData', () => {
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
        clearGraphDataCache();
        (getAuthenticatedClient as any).mockResolvedValue(mockClient);
        (getResolvedActiveInstance as any).mockResolvedValue(mockResolvedInstance);
    });

    it('should return graph data on successful API call', async () => {
        const mockServerConfig = { some: 'config' };
        const mockGraphData = { nodes: [], links: [] };

        mockClient.GET.mockResolvedValue({ data: mockServerConfig, error: null });
        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        const result = await getGraphData();

        expect(getResolvedActiveInstance).toHaveBeenCalled();
        expect(getAuthenticatedClient).toHaveBeenCalled();
        expect(mockClient.GET).toHaveBeenCalledWith('/server/configuration');
        expect(transformer.buildGraphData).toHaveBeenCalledWith(
            expect.objectContaining({ some: 'config' }),
        );
        expect(result).toEqual(mockGraphData);
    });

    it('should throw error when API returns error', async () => {
        mockClient.GET.mockResolvedValue({ data: null, error: { message: 'API Error' } });

        await expect(getGraphData()).rejects.toThrow('Failed to fetch server configuration');
    });

    it('should throw error when no data is received', async () => {
        mockClient.GET.mockResolvedValue({ data: null, error: null });

        await expect(getGraphData()).rejects.toThrow('No data received from server configuration');
    });

    it('should normalize wrapped OSM transformer and filter elements', async () => {
        const mockGraphData = { nodes: [], links: [] };

        mockClient.GET.mockResolvedValue({
            data: {
                serverConfiguration: {
                    channels: {
                        channel: {
                            id: 'channel-1',
                            name: 'Channel 1',
                            sourceConnector: {
                                transportName: 'TCP Listener',
                                transformer: {
                                    elements: {
                                        step: {
                                            type: 'JavaScript Transformer',
                                            script: "router.routeMessageByChannelId('channel-2', msg);",
                                        },
                                    },
                                },
                            },
                            destinationConnectors: {
                                connector: {
                                    transportName: 'Channel Writer',
                                    properties: {
                                        channelId: 'channel-2',
                                    },
                                    filter: {
                                        elements: {
                                            rule: {
                                                type: 'JavaScript Filter',
                                                script: "router.routeMessageByChannelId('channel-2', msg);",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            error: null,
        });

        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        await getGraphData();

        const normalizedConfig = (transformer.buildGraphData as any).mock.calls[0][0];
        const sourceConnector = normalizedConfig.channels[0].sourceConnector;
        const destinationConnector =
            normalizedConfig.channels[0].destinationConnectors[0];

        expect(Array.isArray(normalizedConfig.channels)).toBe(true);
        expect(Array.isArray(normalizedConfig.channels[0].destinationConnectors)).toBe(
            true,
        );
        expect(Array.isArray(sourceConnector.transformer.elements)).toBe(true);
        expect(Array.isArray(destinationConnector.filter.elements)).toBe(true);
    });

    it('should normalize wrapped channelTag channelIds', async () => {
        const mockGraphData = { nodes: [], links: [] };

        mockClient.GET.mockResolvedValue({
            data: {
                serverConfiguration: {
                    channels: {
                        channel: {
                            id: 'channel-1',
                            name: 'Channel 1',
                        },
                    },
                    channelTags: {
                        channelTag: {
                            name: 'WrappedTag',
                            channelIds: {
                                string: 'channel-1',
                            },
                        },
                    },
                },
            },
            error: null,
        });

        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        await getGraphData();

        const normalizedConfig = (transformer.buildGraphData as any).mock.calls[0][0];

        expect(normalizedConfig.channelTags[0].name).toBe('WrappedTag');
        expect(normalizedConfig.channelTags[0].channelIds).toEqual(['channel-1']);
    });

    it('returns cached graph data for repeated requests', async () => {
        const mockServerConfig = { some: 'config' };
        const mockGraphData = { nodes: [], links: [] };

        mockClient.GET.mockResolvedValue({ data: mockServerConfig, error: null });
        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        const first = await getGraphData();
        const second = await getGraphData();

        expect(first).toBe(second);
        expect(mockClient.GET).toHaveBeenCalledTimes(1);
        expect(transformer.buildGraphData).toHaveBeenCalledTimes(1);
    });

    it('shares the same in-flight request across concurrent callers', async () => {
        const mockServerConfig = { some: 'config' };
        const mockGraphData = { nodes: [], links: [] };

        let resolveFetch: ((value: unknown) => void) | undefined;

        mockClient.GET.mockReturnValue(
            new Promise((resolve) => {
                resolveFetch = resolve;
            }),
        );
        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        const first = getGraphData();
        const second = getGraphData();

        resolveFetch?.({ data: mockServerConfig, error: null });

        const [firstResult, secondResult] = await Promise.all([first, second]);

        expect(firstResult).toBe(secondResult);
        expect(mockClient.GET).toHaveBeenCalledTimes(1);
        expect(transformer.buildGraphData).toHaveBeenCalledTimes(1);
    });

    it('refetches after cache invalidation', async () => {
        const mockGraphData = { nodes: [], links: [] };

        mockClient.GET.mockResolvedValue({ data: { some: 'config' }, error: null });
        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        await getGraphData();
        invalidateGraphDataCache(mockResolvedInstance.cachePrefix);
        await getGraphData();

        expect(mockClient.GET).toHaveBeenCalledTimes(2);
        expect(transformer.buildGraphData).toHaveBeenCalledTimes(2);
    });
});
