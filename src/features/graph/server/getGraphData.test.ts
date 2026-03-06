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

    const mockChannelData = [{ id: 'channel-1', name: 'Channel 1' }];
    const mockChannelTags: unknown[] = [];

    function mockEndpointResponses({
        channels = { data: mockChannelData, error: null },
        channelTags = { data: mockChannelTags, error: null },
    }: {
        channels?: { data: unknown; error: unknown };
        channelTags?: { data: unknown; error: unknown };
    } = {}) {
        mockClient.GET.mockImplementation((path: string) => {
            if (path === '/channels') {
                return Promise.resolve(channels);
            }

            if (path === '/server/channelTags') {
                return Promise.resolve(channelTags);
            }

            throw new Error(`Unexpected path: ${path}`);
        });
    }

    beforeEach(() => {
        vi.resetAllMocks();
        clearGraphDataCache();
        (getAuthenticatedClient as any).mockResolvedValue(mockClient);
        (getResolvedActiveInstance as any).mockResolvedValue(mockResolvedInstance);
        mockEndpointResponses();
    });

    it('should return graph data on successful API call', async () => {
        const mockGraphData = { nodes: [], links: [] };

        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        const result = await getGraphData();

        expect(getResolvedActiveInstance).toHaveBeenCalled();
        expect(getAuthenticatedClient).toHaveBeenCalledWith(mockResolvedInstance);
        expect(mockClient.GET).toHaveBeenCalledWith('/channels');
        expect(mockClient.GET).toHaveBeenCalledWith('/server/channelTags');
        expect(transformer.buildGraphData).toHaveBeenCalledWith(
            expect.objectContaining({
                channels: expect.arrayContaining([
                    expect.objectContaining({
                        id: 'channel-1',
                        name: 'Channel 1',
                    }),
                ]),
                channelTags: mockChannelTags,
            }),
        );
        expect(result).toEqual(mockGraphData);
    });

    it('should throw error when channel fetch returns error', async () => {
        mockEndpointResponses({
            channels: { data: null, error: { message: 'API Error' } },
        });

        await expect(getGraphData()).rejects.toThrow('Failed to fetch channels');
    });

    it('should throw error when no channel data is received', async () => {
        mockEndpointResponses({
            channels: { data: null, error: null },
        });

        await expect(getGraphData()).rejects.toThrow(
            'No data received from channels endpoint',
        );
    });

    it('should throw error when channel tag fetch returns error', async () => {
        mockEndpointResponses({
            channelTags: { data: null, error: { message: 'Tag error' } },
        });

        await expect(getGraphData()).rejects.toThrow(
            'Failed to fetch channel tags',
        );
    });

    it('should normalize wrapped OSM transformer and filter elements', async () => {
        const mockGraphData = { nodes: [], links: [] };

        mockEndpointResponses({
            channels: {
                data: {
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
                error: null,
            },
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

    it('should normalize prod list wrapper channels', async () => {
        const mockGraphData = { nodes: [], links: [] };

        mockEndpointResponses({
            channels: {
                data: {
                    list: {
                        channel: {
                            id: 'channel-1',
                            name: 'Channel 1',
                        },
                    },
                },
                error: null,
            },
        });

        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        await getGraphData();

        const normalizedConfig = (transformer.buildGraphData as any).mock.calls[0][0];

        expect(normalizedConfig.channels).toEqual([
            expect.objectContaining({
                id: 'channel-1',
                name: 'Channel 1',
            }),
        ]);
    });

    it('should normalize wrapped channelTag channelIds', async () => {
        const mockGraphData = { nodes: [], links: [] };

        mockEndpointResponses({
            channels: {
                data: {
                    channel: {
                        id: 'channel-1',
                        name: 'Channel 1',
                    },
                },
                error: null,
            },
            channelTags: {
                data: {
                    channelTag: {
                        name: 'WrappedTag',
                        channelIds: {
                            string: 'channel-1',
                        },
                    },
                },
                error: null,
            },
        });

        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        await getGraphData();

        const normalizedConfig = (transformer.buildGraphData as any).mock.calls[0][0];

        expect(normalizedConfig.channelTags[0].name).toBe('WrappedTag');
        expect(normalizedConfig.channelTags[0].channelIds).toEqual(['channel-1']);
    });

    it('should normalize prod list wrapper channel tags', async () => {
        const mockGraphData = { nodes: [], links: [] };

        mockEndpointResponses({
            channelTags: {
                data: {
                    list: {
                        channelTag: {
                            name: 'WrappedTag',
                            channelIds: {
                                string: 'channel-1',
                            },
                        },
                    },
                },
                error: null,
            },
        });

        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        await getGraphData();

        const normalizedConfig = (transformer.buildGraphData as any).mock.calls[0][0];

        expect(normalizedConfig.channelTags).toEqual([
            expect.objectContaining({
                name: 'WrappedTag',
                channelIds: ['channel-1'],
            }),
        ]);
    });

    it('returns cached graph data for repeated requests', async () => {
        const mockGraphData = { nodes: [], links: [] };

        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        const first = await getGraphData();
        const second = await getGraphData();

        expect(first).toBe(second);
        expect(mockClient.GET).toHaveBeenCalledTimes(2);
        expect(transformer.buildGraphData).toHaveBeenCalledTimes(1);
    });

    it('shares the same in-flight request across concurrent callers', async () => {
        const mockGraphData = { nodes: [], links: [] };

        let resolveFetch: ((value: unknown) => void) | undefined;

        mockClient.GET.mockImplementation((path: string) => {
            if (path === '/channels') {
                return new Promise((resolve) => {
                    resolveFetch = resolve;
                });
            }

            if (path === '/server/channelTags') {
                return Promise.resolve({ data: mockChannelTags, error: null });
            }

            throw new Error(`Unexpected path: ${path}`);
        });
        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        const first = getGraphData();
        const second = getGraphData();

        await vi.waitFor(() => {
            expect(mockClient.GET).toHaveBeenCalledWith('/channels');
        });
        resolveFetch?.({ data: mockChannelData, error: null });

        const [firstResult, secondResult] = await Promise.all([first, second]);

        expect(firstResult).toBe(secondResult);
        expect(mockClient.GET).toHaveBeenCalledTimes(2);
        expect(transformer.buildGraphData).toHaveBeenCalledTimes(1);
    });

    it('refetches after cache invalidation', async () => {
        const mockGraphData = { nodes: [], links: [] };

        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        await getGraphData();
        invalidateGraphDataCache(mockResolvedInstance.cachePrefix);
        await getGraphData();

        expect(mockClient.GET).toHaveBeenCalledTimes(4);
        expect(transformer.buildGraphData).toHaveBeenCalledTimes(2);
    });
});
