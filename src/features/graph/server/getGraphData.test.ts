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
import { getAuthenticatedClient } from '@/lib/api/clientFactory';
import { transformer } from '../domain/transformer';

// Mock dependencies
vi.mock('@/lib/api/clientFactory');
vi.mock('../domain/transformer');

describe('getGraphData', () => {
    const mockClient = {
        GET: vi.fn(),
    };

    beforeEach(() => {
        vi.resetAllMocks();
        (getAuthenticatedClient as any).mockResolvedValue(mockClient);
    });

    it('should return graph data on successful API call', async () => {
        const mockServerConfig = { some: 'config' };
        const mockGraphData = { nodes: [], links: [] };

        mockClient.GET.mockResolvedValue({ data: mockServerConfig, error: null });
        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        const result = await getGraphData({} as any); // Mock context

        expect(getAuthenticatedClient).toHaveBeenCalled();
        expect(mockClient.GET).toHaveBeenCalledWith('/server/configuration');
        expect(transformer.buildGraphData).toHaveBeenCalledWith(
            expect.objectContaining({ some: 'config' }),
        );
        expect(result).toEqual(mockGraphData);
    });

    it('should throw error when API returns error', async () => {
        mockClient.GET.mockResolvedValue({ data: null, error: { message: 'API Error' } });

        await expect(getGraphData({} as any)).rejects.toThrow('Failed to fetch server configuration');
    });

    it('should throw error when no data is received', async () => {
        mockClient.GET.mockResolvedValue({ data: null, error: null });

        await expect(getGraphData({} as any)).rejects.toThrow('No data received from server configuration');
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

        await getGraphData({} as any);

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

        await getGraphData({} as any);

        const normalizedConfig = (transformer.buildGraphData as any).mock.calls[0][0];

        expect(normalizedConfig.channelTags[0].name).toBe('WrappedTag');
        expect(normalizedConfig.channelTags[0].channelIds).toEqual(['channel-1']);
    });
});
