import { describe, it, expect } from 'vitest';
import { transformer } from './transformer';
import { components } from '@/lib/index';

type ServerConfiguration = components['schemas']['ServerConfiguration'];

describe('transformer', () => {
    it('should transform empty configuration correctly', () => {
        const config: ServerConfiguration = {
            channels: [],
            channelTags: [],
        };

        const result = transformer.buildGraphData(config);

        expect(result.nodes).toHaveLength(1); // OTHER node
        expect(result.nodes[0].id).toBe('OTHER');
        expect(result.links).toHaveLength(0);
    });

    it('should transform configuration with channels correctly', () => {
        const config: ServerConfiguration = {
            channels: [
                {
                    id: 'channel-1',
                    name: 'Test Channel',
                    description: 'A test channel',
                    exportData: {
                        metadata: {
                            enabled: true,
                        },
                    },
                    sourceConnector: {
                        transportName: 'TCP Listener',
                        properties: {
                            listenerConnectorProperties: {
                                host: '127.0.0.1',
                                port: '6661',
                            },
                        } as any,
                        enabled: true,
                    },
                    destinationConnectors: [],
                },
            ],
            channelTags: [],
        };

        const result = transformer.buildGraphData(config);

        expect(result.nodes).toHaveLength(3); // OTHER, Channel, TCP Listener

        const channelNode = result.nodes.find((n) => n.id === 'channel-1');
        expect(channelNode).toBeDefined();
        expect(channelNode?.name).toBe('Channel: Test Channel');
        expect(channelNode?.group).toBe('Channel');

        const listenerNode = result.nodes.find(
            (n) => n.id === '127.0.0.1:6661',
        );
        expect(listenerNode).toBeDefined();
        expect(listenerNode?.group).toBe('TCP Listener');

        expect(result.links).toHaveLength(1);
        expect(result.links[0].source).toBe('127.0.0.1:6661');
        expect(result.links[0].target).toBe('channel-1');
    });

    it('should handle channel tags correctly', () => {
        const config: ServerConfiguration = {
            channels: [
                {
                    id: 'channel-1',
                    name: 'Test Channel',
                    exportData: {
                        metadata: {
                            enabled: true,
                        },
                    },
                },
            ],
            channelTags: [
                {
                    name: 'Tag1',
                    channelIds: ['channel-1'],
                },
            ],
        };

        const result = transformer.buildGraphData(config);
        const channelNode = result.nodes.find((n) => n.id === 'channel-1');

        expect(channelNode?.tags).toContain('Tag1');
    });
});
