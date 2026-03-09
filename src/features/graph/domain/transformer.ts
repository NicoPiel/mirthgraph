import { components } from '@/lib/index';
import { GraphData, GraphNode } from './types';

type ServerConfiguration = components['schemas']['ServerConfiguration'];
type Channel = components['schemas']['Channel'];
type Connector = components['schemas']['Connector'];
type Step = components['schemas']['Step'];

type TransformerContext = {
    graphData: GraphData;
    nodeById: Map<string, GraphNode>;
    channelById: Map<string, Channel>;
    channelByName: Map<string, Channel>;
};

function toArray<T>(value: unknown): T[] {
    if (!value) {
        return [];
    }

    if (Array.isArray(value)) {
        return value as T[];
    }

    return [value as T];
}

function normalizeStepElements(elements: unknown): Step[] {
    if (!elements) {
        return [];
    }

    if (Array.isArray(elements)) {
        return elements as Step[];
    }

    if (typeof elements !== 'object') {
        return [];
    }

    const wrapped = elements as Record<string, unknown>;

    if ('elements' in wrapped) {
        return normalizeStepElements(wrapped.elements);
    }

    if ('step' in wrapped) {
        return toArray<Step>(wrapped.step);
    }

    if ('rule' in wrapped) {
        return toArray<Step>(wrapped.rule);
    }

    return [wrapped as Step];
}

function normalizeStringArray(value: unknown): string[] {
    if (!value) {
        return [];
    }

    if (Array.isArray(value)) {
        return value.filter((item): item is string => typeof item === 'string');
    }

    if (typeof value === 'string') {
        return [value];
    }

    if (typeof value !== 'object') {
        return [];
    }

    const wrapped = value as Record<string, unknown>;

    if ('string' in wrapped) {
        return normalizeStringArray(wrapped.string);
    }

    if ('channelId' in wrapped) {
        return normalizeStringArray(wrapped.channelId);
    }

    if ('channelIds' in wrapped) {
        return normalizeStringArray(wrapped.channelIds);
    }

    return [];
}

function addNodeIfNotExists(
    context: TransformerContext,
    node: GraphNode,
): GraphNode {
    const existingNode = context.nodeById.get(node.id);

    if (existingNode) {
        return existingNode;
    }

    context.nodeById.set(node.id, node);
    context.graphData.nodes.push(node);
    return node;
}

function addLink(
    context: TransformerContext,
    source: string,
    target: string,
    group: string,
    enabled: number,
) {
    context.graphData.links.push({
        source,
        target,
        group,
        enabled,
    });
}

function buildTransformerContext(channels: Channel[]): TransformerContext {
    const channelById = new Map<string, Channel>();
    const channelByName = new Map<string, Channel>();

    channels.forEach((channel) => {
        if (channel.id) {
            channelById.set(channel.id, channel);
        }

        if (channel.name) {
            channelByName.set(channel.name, channel);
        }
    });

    const graphData: GraphData = {
        nodes: [],
        links: [],
    };

    const nodeById = new Map<string, GraphNode>();
    const context: TransformerContext = {
        graphData,
        nodeById,
        channelById,
        channelByName,
    };

    return context;
}

export const transformer = {
    buildGraphData(serverConfiguration: ServerConfiguration): GraphData {
        const channels = serverConfiguration.channels || [];
        const context = buildTransformerContext(channels);

        channels.forEach((channel) => {
            const channelId = channel.id!;
            const channelName = channel.name!;
            const channelDescription = channel.description;

            addNodeIfNotExists(context, {
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
                processConnector(sourceConnector, channelId, context);
            }

            const destinationConnectors = channel.destinationConnectors || [];
            destinationConnectors.forEach((connector) => {
                processConnector(connector, channelId, context);
            });
        });

        const channelTags = toArray<Record<string, unknown>>(
            serverConfiguration.channelTags,
        );

        channelTags.forEach((tag) => {
            const tagName = typeof tag.name === 'string' ? tag.name : '';
            if (!tagName) {
                return;
            }

            const channelIds = normalizeStringArray(tag.channelIds);

            channelIds.forEach((channelId) => {
                const node = context.nodeById.get(channelId);
                if (node) {
                    node.tags.push(tagName);
                }
            });
        });

        return context.graphData;
    },
};

function processConnector(
    connector: Connector,
    channelId: string,
    context: TransformerContext,
) {
    const transportName = connector.transportName;
    const properties = connector.properties as any;
    const enabled = connector.enabled ? 1 : 0;

    switch (transportName) {
        case 'TCP Listener': {
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
                addNodeIfNotExists(context, {
                    id: tcpListenerID,
                    name: `${transportName}: ${tcpListenerID}`,
                    val: 1,
                    group: transportName,
                    tags: [],
                });

                addLink(
                    context,
                    tcpListenerID,
                    channelId,
                    transportName,
                    enabled,
                );
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
                addNodeIfNotExists(context, {
                    id: httpListenerID,
                    name: `${transportName}: ${httpListenerID}`,
                    val: 1,
                    group: transportName,
                    tags: [],
                });

                addLink(
                    context,
                    httpListenerID,
                    channelId,
                    transportName,
                    enabled,
                );
            }
            break;
        }
        case 'Database Reader': {
            const url = properties.url || properties.databaseUrl;
            if (url) {
                const dbHost = url.split(/(@|\/\/)/)[2]?.split(':')[0] || url;

                addNodeIfNotExists(context, {
                    id: dbHost,
                    name: `Database Host: ${dbHost}`,
                    group: 'Host',
                    description: `DB Host\nDriver: ${properties.driver}`,
                    val: 1,
                    tags: [],
                });

                addNodeIfNotExists(context, {
                    id: url,
                    name: `${transportName}: ${url}`,
                    val: 1,
                    group: transportName,
                    tags: [],
                });

                addLink(context, dbHost, url, transportName, enabled);
                addLink(context, url, channelId, transportName, enabled);
            }
            break;
        }
        case 'File Reader': {
            const host = properties.host;
            if (host) {
                addNodeIfNotExists(context, {
                    id: host,
                    name: `${transportName}: ${host}`,
                    val: 1,
                    group: transportName,
                    tags: [],
                });

                addLink(context, host, channelId, transportName, enabled);
            }
            break;
        }
        case 'DICOM Listener': {
            const port =
                properties.listenerConnectorProperties?.port || properties.port;
            const ae = properties.applicationEntity || properties.aeTitle;

            if (port && ae) {
                const dicomListenerID = `${ae}:${port}`;
                addNodeIfNotExists(context, {
                    id: dicomListenerID,
                    name: `${transportName}: ${dicomListenerID}`,
                    val: 1,
                    group: transportName,
                    tags: [],
                });

                addLink(
                    context,
                    dicomListenerID,
                    channelId,
                    transportName,
                    enabled,
                );
            }
            break;
        }
        case 'Channel Writer': {
            const targetChannelId =
                typeof properties.channelId === 'string'
                    ? properties.channelId.trim()
                    : '';

            if (!targetChannelId || targetChannelId === 'none') {
                break;
            }

            addLink(
                context,
                channelId,
                targetChannelId,
                'Channel Writer',
                enabled,
            );
            break;
        }
        case 'SMTP Sender': {
            const to = properties.to?.toLowerCase();
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (to) {
                const emails = to.split(',');
                emails.forEach((email: string) => {
                    email = email.trim().toLowerCase();
                    if (regex.test(email)) {
                        addNodeIfNotExists(context, {
                            id: email,
                            name: 'SMTP: ' + email,
                            val: 1,
                            group: 'SMTP Sender',
                            tags: [],
                        });

                        addLink(
                            context,
                            channelId,
                            email,
                            'SMTP Sender',
                            enabled,
                        );
                    } else {
                        addNodeIfNotExists(context, {
                            id: to,
                            name: 'SMTP: ' + to,
                            val: 1,
                            group: 'Unreadable ' + transportName,
                            tags: [],
                        });

                        addLink(
                            context,
                            channelId,
                            to,
                            'Unreadable ' + transportName,
                            enabled,
                        );
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
                addNodeIfNotExists(context, {
                    id: remoteAddressAndPort,
                    name: 'TCP Remote: ' + remoteAddressAndPort,
                    group: transportName,
                    val: 1,
                    tags: [],
                });

                addLink(
                    context,
                    channelId,
                    remoteAddressAndPort,
                    transportName,
                    enabled,
                );
            }
            break;
        }
        case 'File Writer': {
            const host = properties.host?.toLowerCase();
            if (host) {
                addNodeIfNotExists(context, {
                    id: host,
                    name: 'File Host: ' + host,
                    group: transportName,
                    val: 1,
                    tags: [],
                });

                addLink(context, channelId, host, transportName, enabled);
            }
            break;
        }
        default:
            break;
    }

    const processSteps = (steps: unknown) => {
        normalizeStepElements(steps).forEach((step) => {
            if (
                step.type === 'JavaScript' ||
                step.type === 'JavaScript Filter' ||
                step.type === 'JavaScript Transformer'
            ) {
                const jsStep = step as any;
                if (jsStep.script) {
                    addRouterNodesAndLinks(jsStep, channelId, context);
                }
            }
        });
    };

    processSteps(connector.transformer?.elements);
    processSteps(connector.filter?.elements);
    processSteps(connector.responseTransformer?.elements);
}

function addRouterNodesAndLinks(
    jsStep: any,
    sourceId: string,
    context: TransformerContext,
) {
    const script = jsStep.script;
    if (!script) {
        return;
    }

    const regexName = /^\s*router\.routeMessage\(['"](\w+)['"],/gm;
    const regexID = /^\s*router\.routeMessageByChannelId\(['"]([\w\-]+)['"],/gm;

    let match: RegExpExecArray | null;

    while ((match = regexName.exec(script)) !== null) {
        const targetChannelName = match[1];
        const targetChannel = context.channelByName.get(targetChannelName);

        if (targetChannel?.id) {
            addLink(context, sourceId, targetChannel.id, 'Router', 1);
        }
    }

    while ((match = regexID.exec(script)) !== null) {
        const targetChannelId = match[1];
        const targetChannel = context.channelById.get(targetChannelId);

        if (targetChannel?.id) {
            addLink(context, sourceId, targetChannelId, 'Router', 1);
        }
    }
}
