import { createServerFn } from '@tanstack/react-start';
import { getAuthenticatedClient } from '@/lib/api/clientFactory';
import { transformer } from '../domain/transformer';
import { GraphData } from '../domain/types';
import { components } from '@/lib/index';

type ServerConfiguration = components['schemas']['ServerConfiguration'];

export const getGraphData = createServerFn({ method: 'GET' })
    .handler(async (ctx): Promise<GraphData> => {
        try {
            // Cast ctx to any to bypass type mismatch with ClientContext
            // The structure is compatible at runtime for cookie access
            const client = await getAuthenticatedClient(ctx as any);
            
            const { data, error } = await client.GET('/server/configuration');

            if (error) {
                console.error('Error fetching server configuration:', error);
                throw new Error('Failed to fetch server configuration');
            }

            if (!data) {
                throw new Error('No data received from server configuration');
            }

            const normalizedConfig = normalizeServerConfiguration(data);
            return transformer.buildGraphData(normalizedConfig);
        } catch (error) {
            console.error('Error in getGraphData:', error);
            // Return empty graph data or rethrow depending on desired error handling
            // For now, rethrowing to let the UI handle the error state
            throw error;
        }
    });

function normalizeServerConfiguration(data: any): ServerConfiguration {
    // Handle the case where the response is wrapped in "serverConfiguration"
    const config = data?.serverConfiguration ? data.serverConfiguration : data;

    // Helper to normalize array fields that might be wrapped in an object
    const normalizeArray = (field: any, itemKey: string) => {
        if (!field) return [];
        if (Array.isArray(field)) return field;
        if (field[itemKey]) {
            if (Array.isArray(field[itemKey])) {
                return field[itemKey];
            } else {
                return [field[itemKey]];
            }
        }
        return [];
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

    // Create a shallow copy to avoid mutating the original data if it matters
    const normalized = { ...(config || {}) } as any;

    normalized.channels = normalizeArray(config?.channels, 'channel').map(
        (channel: any) => {
            const normalizedChannel = { ...channel };

            normalizedChannel.sourceConnector = normalizeConnector(
                channel.sourceConnector,
            );

            normalizedChannel.destinationConnectors = normalizeArray(
                channel.destinationConnectors,
                'connector',
            ).filter(Boolean);

            normalizedChannel.destinationConnectors =
                normalizedChannel.destinationConnectors
                    .map((connector: any) => normalizeConnector(connector))
                    .filter(Boolean);

            return normalizedChannel;
        },
    );

    normalized.channelTags = normalizeArray(config?.channelTags, 'channelTag')
        .map((tag: any) => normalizeSingle(tag, 'channelTag'))
        .filter(Boolean)
        .map((tag: any) => ({
            ...tag,
            channelIds: normalizeStringArray(tag.channelIds),
        }));
    normalized.channelGroups = normalizeArray(
        config?.channelGroups,
        'channelGroup',
    );
    normalized.alerts = normalizeArray(config?.alerts, 'alert');
    normalized.users = normalizeArray(config?.users, 'user');
    normalized.codeTemplateLibraries = normalizeArray(
        config?.codeTemplateLibraries,
        'codeTemplateLibrary',
    );

    return normalized as ServerConfiguration;
}
