import { createServerFn } from '@tanstack/react-start';
import {
    getAuthenticatedClient,
    getResolvedActiveInstance,
} from '@/lib/api/clientFactory';
import { transformer } from '../domain/transformer';
import { GraphData } from '../domain/types';
import { components } from '@/lib/index';
import { getCachedGraphDataOrLoad } from './graphDataCache';

type ServerConfiguration = components['schemas']['ServerConfiguration'];
type Channel = components['schemas']['Channel'];
type ChannelTag = components['schemas']['ChannelTag'];

export const getGraphData = createServerFn({ method: 'POST' })
    .handler(async (): Promise<GraphData> => {
        try {
            const resolvedInstance = await getResolvedActiveInstance();

            return await getCachedGraphDataOrLoad({
                cacheKey: resolvedInstance.cacheKey,
                invalidationKey: resolvedInstance.cachePrefix,
                loader: async () => {
                    const client = await getAuthenticatedClient(resolvedInstance);

                    const [channelsResponse, channelTagsResponse] =
                        await Promise.all([
                            client.GET('/channels?includeCodeTemplateLibraries=false'),
                            client.GET('/server/channelTags'),
                        ]);

                    const { data: channelsData, error: channelsError } =
                        channelsResponse;
                    const {
                        data: channelTagsData,
                        error: channelTagsError,
                    } = channelTagsResponse;

                    if (channelsError) {
                        console.error('Error fetching channels:', channelsError);
                        throw new Error('Failed to fetch channels');
                    }

                    if (!channelsData) {
                        throw new Error('No data received from channels endpoint');
                    }

                    if (channelTagsError) {
                        console.error(
                            'Error fetching channel tags:',
                            channelTagsError,
                        );
                        throw new Error('Failed to fetch channel tags');
                    }

                    const normalizedConfig = normalizeServerConfiguration(
                        channelsData,
                        channelTagsData,
                    );
                    return transformer.buildGraphData(normalizedConfig);
                },
            });
        } catch (error) {
            console.error('Error in getGraphData:', error);
            // Return empty graph data or rethrow depending on desired error handling
            // For now, rethrowing to let the UI handle the error state
            throw error;
        }
    });

function normalizeServerConfiguration(
    channels: unknown,
    channelTags: unknown,
): ServerConfiguration {
    // Helper to normalize array fields that might be wrapped in an object
    const normalizeArray = (
        field: any,
        itemKey: string,
        containerKeys: string[] = [],
    ): any[] => {
        if (!field) return [];
        if (Array.isArray(field)) return field;
        if (typeof field !== 'object') return [];

        if (field[itemKey]) {
            return normalizeArray(field[itemKey], itemKey, containerKeys);
        }

        for (const key of containerKeys) {
            if (field[key]) {
                const normalized = normalizeArray(
                    field[key],
                    itemKey,
                    containerKeys,
                );

                if (normalized.length > 0) {
                    return normalized;
                }
            }
        }

        const values = Object.values(field);
        if (values.length === 1) {
            const normalized = normalizeArray(values[0], itemKey, containerKeys);

            if (normalized.length > 0) {
                return normalized;
            }
        }

        return [field];
    };

    const normalizeSingle = (field: any, itemKey: string) => {
        if (!field) return undefined;
        if (Array.isArray(field)) return field[0];

        if (field[itemKey]) {
            return Array.isArray(field[itemKey])
                ? field[itemKey][0]
                : field[itemKey];
        }

        return field;
    };

    const normalizeStepElements = (elements: any): any[] => {
        if (!elements) return [];
        if (Array.isArray(elements)) return elements;
        if (typeof elements !== 'object') return [];

        if (elements.step) {
            return normalizeArray(elements.step, 'step');
        }

        if (elements.rule) {
            return normalizeArray(elements.rule, 'rule');
        }

        if (elements.elements) {
            return normalizeStepElements(elements.elements);
        }

        return [elements];
    };

    const normalizeStringArray = (field: any): string[] => {
        if (!field) return [];
        if (Array.isArray(field)) {
            return field.filter((item): item is string => typeof item === 'string');
        }
        if (typeof field === 'string') return [field];
        if (typeof field !== 'object') return [];

        if (field.string) {
            return normalizeStringArray(field.string);
        }

        if (field.channelId) {
            return normalizeStringArray(field.channelId);
        }

        if (field.channelIds) {
            return normalizeStringArray(field.channelIds);
        }

        return [];
    };

    const normalizeConnector = (connector: any) => {
        const rawConnector = normalizeSingle(connector, 'connector');
        if (!rawConnector) return undefined;

        const normalizedConnector = { ...rawConnector };

        if (normalizedConnector.transformer) {
            normalizedConnector.transformer = {
                ...normalizedConnector.transformer,
                elements: normalizeStepElements(
                    normalizedConnector.transformer.elements,
                ),
            };
        }

        if (normalizedConnector.filter) {
            normalizedConnector.filter = {
                ...normalizedConnector.filter,
                elements: normalizeStepElements(normalizedConnector.filter.elements),
            };
        }

        if (normalizedConnector.responseTransformer) {
            normalizedConnector.responseTransformer = {
                ...normalizedConnector.responseTransformer,
                elements: normalizeStepElements(
                    normalizedConnector.responseTransformer.elements,
                ),
            };
        }

        return normalizedConnector;
    };

    const normalizedChannels = normalizeArray(channels, 'channel', [
        'channels',
        'list',
        'items',
    ]).map(
        (channel: any) => {
            const normalizedChannel = { ...channel };

            normalizedChannel.sourceConnector = normalizeConnector(
                channel.sourceConnector,
            );

            normalizedChannel.destinationConnectors = normalizeArray(
                channel.destinationConnectors,
                'connector',
                ['destinationConnectors', 'connectors', 'list'],
            ).filter(Boolean);

            normalizedChannel.destinationConnectors =
                normalizedChannel.destinationConnectors
                    .map((connector: any) => normalizeConnector(connector))
                    .filter(Boolean);

            return normalizedChannel;
        },
    ) as Channel[];

    const normalizedChannelTags = normalizeArray(channelTags, 'channelTag', [
        'channelTags',
        'list',
        'items',
    ])
        .map((tag: any) => normalizeSingle(tag, 'channelTag'))
        .filter(Boolean)
        .map((tag: any) => ({
            ...tag,
            channelIds: normalizeStringArray(tag.channelIds),
        })) as ChannelTag[];

    return {
        channels: normalizedChannels,
        channelTags: normalizedChannelTags,
    } as ServerConfiguration;
}
