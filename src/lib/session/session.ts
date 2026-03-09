import { createContext, useContext } from 'react';
import { Client } from './services';
import { components } from '@/lib/index';

interface SessionContextType {
    user: components['schemas']['User'];
}

export interface AppContext extends SessionContextType {}

export const SessionContext = createContext<AppContext | null>(null);

export function useSession(): AppContext {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }

    return context;
}

export async function createSession(): Promise<AppContext> {
    const { data: user } = await Client.GET('/users/current');

    if (!user) {
        throw new Error('Not authenticated');
    }

    return {
        user,
    } as AppContext;
}

export async function logout() {
    await Client.POST('/users/_logout');
    window.location.reload();
}
