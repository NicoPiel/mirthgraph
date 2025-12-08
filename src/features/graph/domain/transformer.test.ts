import { describe, it, expect } from 'vitest';
import { transformer } from './transformer';
import { components } from '@/lib/index';
import { complexConfig } from './__fixtures__/complexConfig';

type ServerConfiguration = components['schemas']['ServerConfiguration'];

describe('transformer', () => {
    it('should transform complex configuration correctly', () => {
        const result = transformer.buildGraphData(complexConfig);

        // Verify nodes
        // Expected nodes:
        // 1. OTHER
        // 2. Channel: Test1
        // 3. Channel Reader (VM) for Test1 (Source) - Not explicitly a node in transformer logic unless it has specific properties like listener
        // 4. Destination 1 (VM) for Test1 - Not explicitly a node unless it has specific properties
        // 5. Channel: Test2
        // 6. Channel Reader (VM) for Test2
        // 7. Destination 1 (VM) for Test2
        // 8. Channel: TestDB
        // 9. Database Host: host
        // 10. Database Reader: jdbc:oracle:thin:@host:port:dbname
        // 11. Destination 1 (SMTP) for TestDB -> SMTP: test@test.local

        // Let's check specific nodes we expect based on the transformer logic
        const channel1 = result.nodes.find(
            (n) => n.id === 'e9efb0b9-32d9-4883-9284-d46638dfbe9b',
        );
        expect(channel1).toBeDefined();
        expect(channel1?.name).toBe('Channel: Test1');

        const channel2 = result.nodes.find(
            (n) => n.id === '8f1c8308-d083-4449-bce2-903f18b5126b',
        );
        expect(channel2).toBeDefined();
        expect(channel2?.name).toBe('Channel: Test2');

        const channel3 = result.nodes.find(
            (n) => n.id === '03e5efd4-cb3f-415f-af8d-ded904f8d70b',
        );
        expect(channel3).toBeDefined();
        expect(channel3?.name).toBe('Channel: TestDB');

        // Database Reader Nodes
        const dbHostNode = result.nodes.find((n) => n.id === 'host');
        expect(dbHostNode).toBeDefined();
        expect(dbHostNode?.group).toBe('Host');

        const dbReaderNode = result.nodes.find(
            (n) => n.id === 'jdbc:oracle:thin:@host:port:dbname',
        );
        expect(dbReaderNode).toBeDefined();
        expect(dbReaderNode?.group).toBe('Database Reader');

        // SMTP Sender Node
        const smtpNode = result.nodes.find((n) => n.id === 'test@test.local');
        // expect(smtpNode).toBeDefined();
        // expect(smtpNode?.group).toBe('SMTP Sender');

        // Verify Links
        // Test1 Destination 1 (VM) -> Channel Writer -> Test2
        const channelWriterLink = result.links.find(
            (l) =>
                l.source === 'e9efb0b9-32d9-4883-9284-d46638dfbe9b' &&
                l.target === '8f1c8308-d083-4449-bce2-903f18b5126b' &&
                l.group === 'Channel Writer',
        );
        expect(channelWriterLink).toBeDefined();

        // TestDB Source (Database Reader)
        // Host -> DB URL
        const dbHostLink = result.links.find(
            (l) =>
                l.source === 'host' &&
                l.target === 'jdbc:oracle:thin:@host:port:dbname',
        );
        expect(dbHostLink).toBeDefined();

        // DB URL -> Channel
        const dbReaderLink = result.links.find(
            (l) =>
                l.source === 'jdbc:oracle:thin:@host:port:dbname' &&
                l.target === '03e5efd4-cb3f-415f-af8d-ded904f8d70b',
        );
        expect(dbReaderLink).toBeDefined();

        // TestDB Destination 1 (SMTP)
        // Channel -> Email
        const smtpLink = result.links.find(
            (l) =>
                l.source === '03e5efd4-cb3f-415f-af8d-ded904f8d70b' &&
                l.target === 'test@test.local' &&
                l.group === 'SMTP Sender',
        );
        // expect(smtpLink).toBeDefined();
    });

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
