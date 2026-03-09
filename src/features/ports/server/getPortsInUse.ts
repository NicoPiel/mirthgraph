import { createServerFn } from '@tanstack/react-start';

import {
    getAuthenticatedClient,
    getResolvedActiveInstance,
} from '@/lib/api/clientFactory';
import { components } from '@/lib/index';

import type { OccupiedPort } from '../types';

type PortsResponse = components['schemas']['Ports'];

function isPortRow(value: unknown): value is PortsResponse {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return false;
    }

    const record = value as Record<string, unknown>;

    return 'id' in record || 'name' in record || 'port' in record;
}

function extractPortRows(field: unknown): PortsResponse[] {
    if (!field) {
        return [];
    }

    if (Array.isArray(field)) {
        const directRows = field.filter(isPortRow);

        if (directRows.length === field.length) {
            return directRows;
        }

        return field.flatMap((item) => extractPortRows(item));
    }

    if (isPortRow(field)) {
        return [field];
    }

    if (typeof field !== 'object') {
        return [];
    }

    return Object.values(field as Record<string, unknown>).flatMap((value) =>
        extractPortRows(value),
    );
}

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

            return extractPortRows(data).map(normalizePortRow);
        } catch (error) {
            console.error('Error in getPortsInUse:', error);
            throw error;
        }
    },
);
