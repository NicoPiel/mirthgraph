import { createServerFn } from '@tanstack/react-start';

import {
    getAuthenticatedClient,
    getResolvedActiveInstance,
} from '@/lib/api/clientFactory';
import { components } from '@/lib/index';

import type { OccupiedPort } from '../types';

type PortsResponse = components['schemas']['Ports'];

function normalizePortRow(port: PortsResponse): OccupiedPort {
    return {
        id: port.id ?? '',
        name: port.name ?? '',
        port: port.port ?? '',
    };
}

export const getPortsInUse = createServerFn({ method: 'GET' }).handler(
    async (): Promise<OccupiedPort[]> => {
        try {
            const resolvedInstance = await getResolvedActiveInstance();
            const client = await getAuthenticatedClient(resolvedInstance);
            const { data, error } = await client.GET('/channels/portsInUse');

            if (error) {
                console.error('Error fetching occupied ports:', error);
                throw new Error('Failed to fetch occupied ports');
            }

            return Array.isArray(data) ? data.map(normalizePortRow) : [];
        } catch (error) {
            console.error('Error in getPortsInUse:', error);
            throw error;
        }
    },
);
