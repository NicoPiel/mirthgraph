import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock @tanstack/react-start
vi.mock('@tanstack/react-start', () => ({
    createServerFn: vi.fn().mockReturnValue({
        inputValidator: vi.fn().mockReturnThis(),
        handler: vi.fn((fn) => {
            const wrappedFn = async (...args: any[]) => {
                return fn(...args);
            };
            return wrappedFn;
        }),
    }),
}));

vi.mock('@tanstack/react-start/server', () => ({
    getCookie: vi.fn(),
    setCookie: vi.fn(),
}));

import {
    addInstance,
    updateInstance,
    deleteInstance,
    getInstances,
    getActiveInstanceId,
    setActiveInstance,
} from './instanceActions';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { getCookie, setCookie } from '@tanstack/react-start/server';

// Mock fs/promises
vi.mock('fs/promises');

describe('instanceActions', () => {
    const mockInstancesFile = join(process.cwd(), 'config', 'instances.json');
    const mockConfig = {
        instances: [
            {
                id: '1',
                name: 'Test Instance',
                url: 'http://localhost:8443',
                username: 'admin',
                password: 'password',
            },
        ],
    };

    beforeEach(() => {
        vi.resetAllMocks();
        // Default mock implementation for readFile
        (readFile as any).mockResolvedValue(JSON.stringify(mockConfig));
        (getCookie as any).mockReturnValue(undefined);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('getInstances', () => {
        it('should return instances from config file', async () => {
            const result = await getInstances();
            expect(readFile).toHaveBeenCalledWith(mockInstancesFile, 'utf-8');
            expect(result).toEqual(mockConfig.instances);
        });

        it('should return empty array if config file does not exist', async () => {
            const error: any = new Error('ENOENT');
            error.code = 'ENOENT';
            (readFile as any).mockRejectedValue(error);

            const result = await getInstances();
            expect(result).toEqual([]);
        });
    });

    describe('addInstance', () => {
        it('should add a new instance and persist config', async () => {
            const newInstanceData = {
                name: 'New Instance',
                url: 'http://new-instance:8443',
                username: 'user',
                password: 'pass',
            };

            const result = await addInstance({ data: newInstanceData });

            expect(result).toMatchObject(newInstanceData);
            expect(result.id).toBeDefined();
            
            const writeCall = vi.mocked(writeFile).mock.calls[0];
            expect(writeCall[0]).toBe(mockInstancesFile);
            const writtenConfig = JSON.parse(writeCall[1] as string);
            expect(writtenConfig.instances).toContainEqual(expect.objectContaining(newInstanceData));
        });
    });

    describe('updateInstance', () => {
        it('should update an existing instance and persist config', async () => {
            const updateData = {
                id: '1',
                name: 'Updated Instance',
                url: 'http://updated-url:8443',
                username: 'admin',
                password: 'newpassword',
            };

            const result = await updateInstance({ data: updateData });

            expect(result).toEqual(updateData);
            
            const writeCall = vi.mocked(writeFile).mock.calls[0];
            expect(writeCall[0]).toBe(mockInstancesFile);
            const writtenConfig = JSON.parse(writeCall[1] as string);
            expect(writtenConfig.instances).toContainEqual(updateData);
        });

        it('should throw error if instance not found', async () => {
            const updateData = {
                id: 'non-existent',
                name: 'Updated Instance',
                url: 'http://updated-url:8443',
                username: 'admin',
                password: 'newpassword',
            };

            await expect(updateInstance({ data: updateData })).rejects.toThrow('Instance not found');
        });
    });

    describe('deleteInstance', () => {
        it('should delete an existing instance and persist config', async () => {
            const deleteData = { id: '1' };

            const result = await deleteInstance({ data: deleteData });

            expect(result).toBe('1');
            
            const writeCall = vi.mocked(writeFile).mock.calls[0];
            expect(writeCall[0]).toBe(mockInstancesFile);
            const writtenConfig = JSON.parse(writeCall[1] as string);
            expect(writtenConfig.instances).not.toContainEqual(expect.objectContaining({ id: '1' }));
        });

        it('should throw error if instance not found', async () => {
            const deleteData = { id: 'non-existent' };

            await expect(deleteInstance({ data: deleteData })).rejects.toThrow('Instance not found');
        });
    });

    describe('setActiveInstance', () => {
        it('should persist the selected instance id as a cookie', async () => {
            const result = await setActiveInstance({ data: { id: '1' } });

            expect(result).toEqual({ id: '1' });
            expect(setCookie).toHaveBeenCalledWith('mirth_instance_id', '1', {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 60 * 60 * 24 * 30,
            });
        });

        it('should throw error if the instance does not exist', async () => {
            await expect(
                setActiveInstance({ data: { id: 'non-existent' } }),
            ).rejects.toThrow('Instance not found');

            expect(setCookie).not.toHaveBeenCalled();
        });
    });

    describe('getActiveInstanceId', () => {
        it('should return the active instance id from cookies', async () => {
            (getCookie as any).mockReturnValue('instance-123');

            const result = await getActiveInstanceId();

            expect(getCookie).toHaveBeenCalledWith('mirth_instance_id');
            expect(result).toBe('instance-123');
        });

        it('should return null when no active instance cookie is set', async () => {
            const result = await getActiveInstanceId();

            expect(result).toBeNull();
        });
    });
});
