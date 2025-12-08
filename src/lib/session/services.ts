import createClient from 'openapi-fetch';
import type { paths as EngineApi } from '@/lib/index';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';

export const baseUrl = 'https://localhost:8443' + '/api/';

export const Client = createClient<EngineApi, 'application/json'>({
    baseUrl: baseUrl,
    headers: {
		'accept': 'application/json',
		'X-Requested-With': 'MirthGraph'
    }
});

const LoginCredentials = z.object({
    username: z.string(),
    password: z.string(),
});

export const login = createServerFn().inputValidator(LoginCredentials).handler(async ({ data } ) => {
    const { data: ok, error } = await Client.POST('/users/_login', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data,
    });
    return ok || error;
});