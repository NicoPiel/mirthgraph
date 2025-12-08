import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @tanstack/react-start
vi.mock('@tanstack/react-start', () => ({
    createServerFn: vi.fn().mockReturnValue({
        handler: vi.fn((fn) => {
            const wrappedFn = async (...args: any[]) => {
                return fn(...args);
            };
            return wrappedFn;
        }),
    }),
}));

import { getGraphData } from './getGraphData';
import { getAuthenticatedClient } from '@/lib/api/clientFactory';
import { transformer } from '../domain/transformer';

// Mock dependencies
vi.mock('@/lib/api/clientFactory');
vi.mock('../domain/transformer');

describe('getGraphData', () => {
    const mockClient = {
        GET: vi.fn(),
    };

    beforeEach(() => {
        vi.resetAllMocks();
        (getAuthenticatedClient as any).mockResolvedValue(mockClient);
    });

    it('should return graph data on successful API call', async () => {
        const mockServerConfig = { some: 'config' };
        const mockGraphData = { nodes: [], links: [] };

        mockClient.GET.mockResolvedValue({ data: mockServerConfig, error: null });
        (transformer.buildGraphData as any).mockReturnValue(mockGraphData);

        const result = await getGraphData({} as any); // Mock context

        expect(getAuthenticatedClient).toHaveBeenCalled();
        expect(mockClient.GET).toHaveBeenCalledWith('/server/configuration');
        expect(transformer.buildGraphData).toHaveBeenCalledWith(mockServerConfig);
        expect(result).toEqual(mockGraphData);
    });

    it('should throw error when API returns error', async () => {
        mockClient.GET.mockResolvedValue({ data: null, error: { message: 'API Error' } });

        await expect(getGraphData({} as any)).rejects.toThrow('Failed to fetch server configuration');
    });

    it('should throw error when no data is received', async () => {
        mockClient.GET.mockResolvedValue({ data: null, error: null });

        await expect(getGraphData({} as any)).rejects.toThrow('No data received from server configuration');
    });
});