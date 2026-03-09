import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import z from 'zod'

import { invalidateGraphDataCache } from '@/features/graph/server/graphDataCache'
import { invalidateAuthenticatedClientCache } from '@/lib/api/clientFactory'
import type { InstanceConfig, MirthInstance } from '../types'

const instancesFile = join(process.cwd(), 'config', 'instances.json')

const BaseInstancePayload = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  username: z.string().min(1),
  password: z.string().min(1),
})

const InstanceUpdatePayload = BaseInstancePayload.extend({
  id: z.string().uuid(),
})

const InstanceIdPayload = z.object({
  id: z.string().uuid(),
})

async function loadConfig(): Promise<InstanceConfig> {
  try {
    const json = await readFile(instancesFile, 'utf-8')
    return JSON.parse(json) as InstanceConfig
  } catch (error: unknown) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { instances: [] }
    }

    throw error
  }
}

async function persistConfig(config: InstanceConfig) {
  await writeFile(instancesFile, JSON.stringify(config, null, 2) + '\n')
}

function invalidateInstanceCaches(instanceId: string) {
  invalidateGraphDataCache(`${instanceId}:`)
  invalidateAuthenticatedClientCache(instanceId)
}

export const getInstances = createServerFn().handler(async () => {
  const config = await loadConfig()
  return config.instances
})

export const addInstance = createServerFn()
  .inputValidator(BaseInstancePayload)
  .handler(async ({ data }) => {
    const config = await loadConfig()

    const newInstance: MirthInstance = {
      id: crypto.randomUUID(),
      ...data,
    }

    config.instances.push(newInstance)
    await persistConfig(config)

    return newInstance
  })

export const updateInstance = createServerFn()
  .inputValidator(InstanceUpdatePayload)
  .handler(async ({ data }) => {
    const config = await loadConfig()
    const index = config.instances.findIndex((instance) => instance.id === data.id)

    if (index === -1) {
      throw new Error('Instance not found')
    }

    const updatedInstance: MirthInstance = {
      id: data.id,
      name: data.name,
      url: data.url,
      username: data.username,
      password: data.password,
    }

    config.instances[index] = updatedInstance
    await persistConfig(config)
    invalidateInstanceCaches(data.id)

    return updatedInstance
  })

export const deleteInstance = createServerFn()
  .inputValidator(InstanceIdPayload)
  .handler(async ({ data }) => {
    const config = await loadConfig()
    const remaining = config.instances.filter((instance) => instance.id !== data.id)

    if (remaining.length === config.instances.length) {
      throw new Error('Instance not found')
    }

    config.instances = remaining
    await persistConfig(config)
    invalidateInstanceCaches(data.id)

    return data.id
  })

export const setActiveInstance = createServerFn({ method: 'POST' })
  .inputValidator(InstanceIdPayload)
  .handler(async ({ data }) => {
    const config = await loadConfig()
    const exists = config.instances.some((instance) => instance.id === data.id)

    if (!exists) {
      throw new Error('Instance not found')
    }

    setCookie('mirth_instance_id', data.id, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
    })

    return { id: data.id }
  })

export const getActiveInstanceId = createServerFn().handler(() => getCookie('mirth_instance_id') ?? null)
