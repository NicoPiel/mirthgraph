import { describe, expect, it } from 'vitest';
import { getNodeRelationships } from './getNodeRelationships';
import { GraphData } from './types';

describe('getNodeRelationships', () => {
    it('returns immediate sources and destinations using node names', () => {
        const data: GraphData = {
            nodes: [
                {
                    id: 'source-1',
                    name: 'TCP Listener: 127.0.0.1:6661',
                    group: 'TCP Listener',
                    val: 1,
                    tags: [],
                },
                {
                    id: 'channel-1',
                    name: 'Channel: Orders',
                    group: 'Channel',
                    val: 1,
                    tags: [],
                },
                {
                    id: 'dest-1',
                    name: 'SMTP: alerts@example.com',
                    group: 'SMTP Sender',
                    val: 1,
                    tags: [],
                },
            ],
            links: [
                {
                    source: 'source-1',
                    target: 'channel-1',
                    group: 'TCP Listener',
                    enabled: 1,
                },
                {
                    source: 'channel-1',
                    target: 'dest-1',
                    group: 'SMTP Sender',
                    enabled: 1,
                },
            ],
        };

        const result = getNodeRelationships(data, 'channel-1');

        expect(result.sources).toEqual([
            {
                id: 'source-1',
                label: 'TCP Listener: 127.0.0.1:6661',
                group: 'TCP Listener',
                isNavigable: true,
            },
        ]);
        expect(result.destinations).toEqual([
            {
                id: 'dest-1',
                label: 'SMTP: alerts@example.com',
                group: 'SMTP Sender',
                isNavigable: true,
            },
        ]);
    });

    it('deduplicates repeated links and falls back to ids for missing nodes', () => {
        const data: GraphData = {
            nodes: [
                {
                    id: 'channel-1',
                    name: 'Channel: Orders',
                    group: 'Channel',
                    val: 1,
                    tags: [],
                },
            ],
            links: [
                {
                    source: 'upstream-system',
                    target: 'channel-1',
                    group: 'TCP Listener',
                    enabled: 1,
                },
                {
                    source: 'upstream-system',
                    target: 'channel-1',
                    group: 'Router',
                    enabled: 1,
                },
                {
                    source: 'channel-1',
                    target: 'OTHER',
                    group: 'Channel Writer',
                    enabled: 1,
                },
            ],
        };

        const result = getNodeRelationships(data, 'channel-1');

        expect(result.sources).toEqual([
            {
                id: 'upstream-system',
                label: 'upstream-system',
                group: undefined,
                isNavigable: false,
            },
        ]);
        expect(result.destinations).toEqual([
            {
                id: 'OTHER',
                label: 'OTHER',
                group: undefined,
                isNavigable: false,
            },
        ]);
    });

    it('handles force-graph mutated object endpoints', () => {
        const sourceNode = {
            id: 'source-1',
            name: 'TCP Listener: 127.0.0.1:6661',
            group: 'TCP Listener',
            val: 1,
            tags: [],
        };
        const channelNode = {
            id: 'channel-1',
            name: 'Channel: Orders',
            group: 'Channel',
            val: 1,
            tags: [],
        };
        const destinationNode = {
            id: 'dest-1',
            name: 'SMTP: alerts@example.com',
            group: 'SMTP Sender',
            val: 1,
            tags: [],
        };

        const data: GraphData = {
            nodes: [sourceNode, channelNode, destinationNode],
            links: [
                {
                    source: sourceNode,
                    target: channelNode,
                    group: 'TCP Listener',
                    enabled: 1,
                },
                {
                    source: channelNode,
                    target: destinationNode,
                    group: 'SMTP Sender',
                    enabled: 1,
                },
            ],
        };

        const result = getNodeRelationships(data, 'channel-1');

        expect(result.sources[0]?.label).toBe('TCP Listener: 127.0.0.1:6661');
        expect(result.sources[0]?.isNavigable).toBe(true);
        expect(result.destinations[0]?.label).toBe('SMTP: alerts@example.com');
        expect(result.destinations[0]?.isNavigable).toBe(true);
    });
});
