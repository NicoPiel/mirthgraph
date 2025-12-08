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

            return transformer.buildGraphData(data as ServerConfiguration);
        } catch (error) {
            console.error('Error in getGraphData:', error);
            // Return empty graph data or rethrow depending on desired error handling
            // For now, rethrowing to let the UI handle the error state
            throw error;
        }
    });