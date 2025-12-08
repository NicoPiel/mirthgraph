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
    const config = data.serverConfiguration ? data.serverConfiguration : data;

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

    // Create a shallow copy to avoid mutating the original data if it matters
    const normalized = { ...config };

    normalized.channels = normalizeArray(config.channels, 'channel');

    // Normalize destinationConnectors for each channel
    if (normalized.channels) {
        normalized.channels.forEach((channel: any) => {
            channel.destinationConnectors = normalizeArray(
                channel.destinationConnectors,
                'connector',
            );
        });
    }

    normalized.channelTags = normalizeArray(config.channelTags, 'channelTag');
    normalized.channelGroups = normalizeArray(
        config.channelGroups,
        'channelGroup',
    );
    normalized.alerts = normalizeArray(config.alerts, 'alert');
    normalized.users = normalizeArray(config.users, 'user');
    normalized.codeTemplateLibraries = normalizeArray(
        config.codeTemplateLibraries,
        'codeTemplateLibrary',
    );

    return normalized as ServerConfiguration;
}