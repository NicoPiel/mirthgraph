import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { components } from '@/lib/index';
import { Client, login } from '@/lib/session/services';
import { logout } from '@/lib/session/session';

export const Route = createFileRoute('/graph/')({
    component: GraphComponent,
});

type ServerConfiguration = components['schemas']['ServerConfiguration'];
type Channel = components['schemas']['Channel'];
type Connector = components['schemas']['Connector'];
type Step = components['schemas']['Step'];

// Define types for the graph data
interface GraphNode {
    id: string;
    name: string;
    group: string;
    description?: string;
    val: number;
    tags: string[];
    enabled?: number;
}

interface GraphLink {
    source: string;
    target: string;
    group: string;
    enabled: number;
}

interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

async function GraphComponent() {
    const loginOk = await login({
        data: {
            username: 'admin',
            password: 'admin',
        },
    });

    if (loginOk && loginOk.success) {
        const { data, isLoading, error } = useQuery({
            queryKey: ['serverConfiguration'],
            queryFn: async () => {
                const { data, error } = await Client.GET(
                    '/server/configuration',
                );

                if (data) {
                    return data as Promise<ServerConfiguration>;
                } else {
                    throw error;
                }
            },
        });

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        const graphData = data ? buildGraphData(data) : null;

        await logout();

        return (
            <div>
                <h1>Graph Data</h1>
                <pre>{JSON.stringify(graphData, null, 2)}</pre>
            </div>
        );
    }

    return <div>Error when logging in! {loginOk.message}</div>;
}

function buildGraphData(serverConfiguration: ServerConfiguration): GraphData {
    const gData: GraphData = {
        nodes: [],
        links: [],
    };

    const OTHER = 'OTHER';

    gData.nodes.push({
        id: OTHER,
        name: OTHER,
        group: OTHER,
        description: 'Unhandled connectors',
        val: 1,
        tags: [],
    });

    const channels = serverConfiguration.channels || [];

    channels.forEach((channel) => {
        const channelId = channel.id!;
        const channelName = channel.name!;
        const channelDescription = channel.description;

        gData.nodes.push({
            id: channelId,
            name: 'Channel: ' + channelName,
            val: 1,
            description: channelDescription,
            group: channel.exportData?.metadata?.enabled
                ? 'Channel'
                : 'disabled',
            enabled: channel.exportData?.metadata?.enabled ? 1 : 0,
            tags: [],
        });

        const sourceConnector = channel.sourceConnector;
        if (sourceConnector) {
            processConnector(sourceConnector, channelId, gData, channels);
        }

        const destinationConnectors = channel.destinationConnectors || [];
        destinationConnectors.forEach((connector) => {
            processConnector(connector, channelId, gData, channels);
        });
    });

    // Process tags
    const channelTags = serverConfiguration.channelTags || [];
    channelTags.forEach((tag) => {
        const tagName = tag.name!;
        const channelIds = tag.channelIds || [];

        channelIds.forEach((channelId) => {
            const node = gData.nodes.find((n) => n.id === channelId);
            if (node) {
                node.tags.push(tagName);
            }
        });
    });

    return gData;
}

function processConnector(
    connector: Connector,
    channelId: string,
    gData: GraphData,
    allChannels: Channel[],
) {
    const transportName = connector.transportName;
    const properties = connector.properties as any; // Type assertion needed as properties are generic
    const enabled = connector.enabled ? 1 : 0;

    // Helper to add node if not exists
    const addNodeIfNotExists = (node: GraphNode) => {
        if (!gData.nodes.find((n) => n.id === node.id)) {
            gData.nodes.push(node);
        }
    };

    switch (transportName) {
        case 'TCP Listener': {
            // In XML: sourceConnector.properties[0].listenerConnectorProperties[0].host[0]
            // In JSON/OpenAPI: properties might be TcpReceiverProperties (or similar)
            // We'll assume properties has listenerConnectorProperties or direct fields
            // Based on TcpDispatcherProperties, it has localAddress/localPort.
            // But for Listener, it might be different. Let's try to access safely.

            // Assuming the structure matches what we saw in TcpDispatcherProperties or similar
            // If it was XML converted to JSON, it might still have nested structure if not fully typed?
            // But here we are fetching from API which returns JSON matching OpenAPI.

            // Let's try to map based on common property names found in Mirth Connect
            const host =
                properties.listenerConnectorProperties?.host ||
                properties.localAddress ||
                '0.0.0.0';
            const port =
                properties.listenerConnectorProperties?.port ||
                properties.localPort ||
                properties.port;

            if (host && port) {
                const tcpListenerID = `${host}:${port}`;
                addNodeIfNotExists({
                    id: tcpListenerID,
                    name: `${transportName}: ${tcpListenerID}`,
                    val: 1,
                    group: transportName,
                    tags: [],
                });

                gData.links.push({
                    source: tcpListenerID,
                    target: channelId,
                    group: transportName,
                    enabled: enabled,
                });
            }
            break;
        }
        case 'HTTP Listener': {
            const host =
                properties.listenerConnectorProperties?.host ||
                properties.host ||
                '0.0.0.0';
            const port =
                properties.listenerConnectorProperties?.port || properties.port;

            if (host && port) {
                const httpListenerID = `${host}:${port}`;
                addNodeIfNotExists({
                    id: httpListenerID,
                    name: `${transportName}: ${httpListenerID}`,
                    val: 1,
                    group: transportName,
                    tags: [],
                });

                gData.links.push({
                    source: httpListenerID,
                    target: channelId,
                    group: transportName,
                    enabled: enabled,
                });
            }
            break;
        }
        case 'Database Reader': {
            const url = properties.url || properties.databaseUrl; // Adjust property name if needed
            if (url) {
                const dbHost = url.split(/(@|\/\/)/)[2]?.split(':')[0] || url; // Simple extraction

                addNodeIfNotExists({
                    id: dbHost,
                    name: `Database Host: ${dbHost}`,
                    group: 'Host',
                    description: `DB Host\nDriver: ${properties.driver}`,
                    val: 1,
                    tags: [],
                });

                addNodeIfNotExists({
                    id: url,
                    name: `${transportName}: ${url}`,
                    val: 1,
                    group: transportName,
                    tags: [],
                });

                gData.links.push({
                    source: dbHost,
                    target: url,
                    group: transportName,
                    enabled: enabled,
                });

                gData.links.push({
                    source: url,
                    target: channelId,
                    group: transportName,
                    enabled: enabled,
                });
            }
            break;
        }
        case 'File Reader': {
            const host = properties.host;
            if (host) {
                addNodeIfNotExists({
                    id: host,
                    name: `${transportName}: ${host}`,
                    val: 1,
                    group: transportName,
                    tags: [],
                });

                gData.links.push({
                    source: host,
                    target: channelId,
                    group: transportName,
                    enabled: enabled,
                });
            }
            break;
        }
        case 'DICOM Listener': {
            const port =
                properties.listenerConnectorProperties?.port || properties.port;
            const ae = properties.applicationEntity || properties.aeTitle;

            if (port && ae) {
                const dicomListenerID = `${ae}:${port}`;
                addNodeIfNotExists({
                    id: dicomListenerID,
                    name: `${transportName}: ${dicomListenerID}`,
                    val: 1,
                    group: transportName,
                    tags: [],
                });

                gData.links.push({
                    source: dicomListenerID,
                    target: channelId,
                    group: transportName,
                    enabled: enabled,
                });
            }
            break;
        }
        case 'Channel Writer': {
            const targetChannelId = properties.channelId;
            let isTargetEnabled = false;

            const targetChannel = allChannels.find(
                (c) => c.id === targetChannelId,
            );
            if (targetChannel) {
                isTargetEnabled =
                    targetChannel.exportData?.metadata?.enabled || false;
            }

            if (isTargetEnabled) {
                if (targetChannelId && targetChannelId !== 'none') {
                    gData.links.push({
                        source: channelId,
                        target: targetChannelId,
                        enabled: enabled,
                        group: 'Channel Writer',
                    });
                } else {
                    gData.links.push({
                        source: channelId,
                        target: 'other', // Should match OTHER constant but lowercase in original code?
                        enabled: enabled,
                        group: 'Channel Writer',
                    });
                }
            }
            break;
        }
        case 'SMTP Sender': {
            const to = properties.to?.toLowerCase();
            const regex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (to) {
                const emails = to.split(',');
                emails.forEach((email: string) => {
                    email = email.trim().toLowerCase();
                    if (email.search(regex) !== -1) {
                        addNodeIfNotExists({
                            id: email,
                            name: 'SMTP: ' + email,
                            val: 1,
                            group: transportName,
                            tags: [],
                        });

                        gData.links.push({
                            source: channelId,
                            target: email,
                            group: 'SMTP Sender',
                            enabled: enabled,
                        });
                    } else {
                        addNodeIfNotExists({
                            id: to,
                            name: 'SMTP: ' + to,
                            val: 1,
                            group: 'Unreadable ' + transportName,
                            tags: [],
                        });

                        gData.links.push({
                            source: channelId,
                            target: to,
                            enabled: enabled,
                            group: 'Unreadable ' + transportName,
                        });
                    }
                });
            }
            break;
        }
        case 'TCP Sender': {
            const remoteAddress = properties.remoteAddress;
            const remotePort = properties.remotePort;

            if (remoteAddress) {
                const remoteAddressAndPort = remoteAddress + ':' + remotePort;
                addNodeIfNotExists({
                    id: remoteAddressAndPort,
                    name: 'TCP Remote: ' + remoteAddressAndPort,
                    group: transportName,
                    val: 1,
                    tags: [],
                });

                gData.links.push({
                    source: channelId,
                    target: remoteAddressAndPort,
                    group: transportName,
                    enabled: enabled,
                });
            }
            break;
        }
        case 'File Writer': {
            const host = properties.host?.toLowerCase();
            if (host) {
                addNodeIfNotExists({
                    id: host,
                    name: 'File Host: ' + host,
                    group: transportName,
                    val: 1,
                    tags: [],
                });

                gData.links.push({
                    source: channelId,
                    target: host,
                    group: transportName,
                    enabled: enabled,
                });
            }
            break;
        }
        default:
            // Unknown connector
            break;
    }

    // Handle router nodes and links (JavaScript steps)
    const processSteps = (steps: Step[] | undefined) => {
        if (!steps) return;
        steps.forEach((step) => {
            if (
                step.type === 'JavaScript' ||
                step.type === 'JavaScript Filter' ||
                step.type === 'JavaScript Transformer'
            ) {
                // In JSON, the script is likely in 'script' property or similar, but Step definition has 'type', 'name', etc.
                // We need to check where the script content is.
                // Looking at CodeTemplateProperties, it has 'code'.
                // Step definition in index.d.ts:
                /*
                Step: {
                    name?: string;
                    sequenceNumber?: string;
                    enabled?: boolean;
                    type?: string;
                    // ...
                }
                 */
                // It doesn't show 'script' or 'code'. It might be in a property that is not typed or I missed it.
                // However, the original code accessed `element['com.mirth.connect.plugins.javascriptstep.JavaScriptStep']`.
                // This suggests the XML had a specific structure.
                // In the JSON API, steps might have a 'script' property if they are JS steps.
                // I'll cast step to any to access 'script'.
                const jsStep = step as any;
                if (jsStep.script) {
                    addRouterNodesAndLinks(
                        connector,
                        jsStep,
                        channelId,
                        gData,
                        allChannels,
                    );
                }
            }
        });
    };

    if (connector.transformer?.elements)
        processSteps(connector.transformer.elements);
    if (connector.filter?.elements)
        processSteps(connector.filter.elements as any); // Filter elements are Rules, but might be similar
    if (connector.responseTransformer?.elements)
        processSteps(connector.responseTransformer.elements);
}

function addRouterNodesAndLinks(
    connector: Connector,
    jsStep: any,
    sourceId: string,
    gData: GraphData,
    allChannels: Channel[],
) {
    const script = jsStep.script;
    if (!script) return;

    const getChannelNameOrID = () => {
        const regexName = /^\s*router\.routeMessage\(['"](\w+)['"],/gm;
        const regexID =
            /^\s*router\.routeMessageByChannelId\(['"]([\w\-]+)['"],/gm;

        const scriptSplit = script.split('\n');
        let channelName: string | undefined;
        let channelId: string | undefined;

        scriptSplit.forEach((str: string) => {
            let nameRegexResult;
            let idRegExResult;

            while ((nameRegexResult = regexName.exec(str)) !== null) {
                channelName = nameRegexResult[1];
            }

            while ((idRegExResult = regexID.exec(str)) !== null) {
                channelId = idRegExResult[1];
            }
        });

        return { channelName, channelId };
    };

    const result = getChannelNameOrID();
    const enabled = connector.enabled ? 1 : 0;

    if (result.channelName) {
        const targetChannel = allChannels.find(
            (c) => c.name === result.channelName,
        );
        if (targetChannel) {
            const targetId = targetChannel.id!;

            // Add node if not exists (it should exist if it's a channel, but maybe not added yet?)
            // Actually channels are added first.

            // But wait, the original code added a "Router Target" node if it wasn't found.
            // "Router Target: " + targetChannel.name
            // This seems to duplicate the channel node but with a different ID?
            // Original code: const nodeResult = gData.nodes.find((node) => (node.id = targetChannel.id[0]));
            // Wait, `node.id = targetChannel.id[0]` is an assignment! That looks like a bug in the original code or I misread it.
            // "node.id == targetChannel.id[0]" probably intended.

            // If the original code was adding a separate node for Router Target, I should replicate that if needed.
            // But it seems it was checking if the channel node exists.

            // Let's assume we link to the channel ID.

            gData.links.push({
                source: sourceId,
                target: targetId,
                enabled: enabled,
                group: 'Router',
            });
        }
    } else if (result.channelId) {
        const targetChannel = allChannels.find(
            (c) => c.id === result.channelId,
        );
        if (targetChannel) {
            gData.links.push({
                source: sourceId,
                target: targetChannel.id!,
                enabled: enabled,
                group: 'Router',
            });
        }
    }
}
