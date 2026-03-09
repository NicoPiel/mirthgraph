import { GraphData } from '../domain/types';

export const GRAPH_DATA_CACHE_TTL_MS = 30_000;

type GraphDataCacheEntry = {
    value: GraphData;
    expiresAt: number;
    fetchedAt: number;
};

type CacheLoaderOptions = {
    cacheKey: string;
    invalidationKey: string;
    loader: () => Promise<GraphData>;
    ttlMs?: number;
};

const graphDataCache = new Map<string, GraphDataCacheEntry>();
const inFlightGraphDataLoads = new Map<string, Promise<GraphData>>();
const invalidationVersions = new Map<string, number>();

function getInvalidationVersion(invalidationKey: string): number {
    return invalidationVersions.get(invalidationKey) ?? 0;
}

function setCacheEntry(cacheKey: string, value: GraphData, ttlMs: number) {
    const fetchedAt = Date.now();

    graphDataCache.set(cacheKey, {
        value,
        fetchedAt,
        expiresAt: fetchedAt + ttlMs,
    });
}

export function clearGraphDataCache() {
    graphDataCache.clear();
    inFlightGraphDataLoads.clear();
    invalidationVersions.clear();
}

export function invalidateGraphDataCache(invalidationKey: string) {
    invalidationVersions.set(
        invalidationKey,
        getInvalidationVersion(invalidationKey) + 1,
    );

    for (const cacheKey of graphDataCache.keys()) {
        if (cacheKey.startsWith(invalidationKey)) {
            graphDataCache.delete(cacheKey);
        }
    }

    for (const cacheKey of inFlightGraphDataLoads.keys()) {
        if (cacheKey.startsWith(invalidationKey)) {
            inFlightGraphDataLoads.delete(cacheKey);
        }
    }
}

export async function getCachedGraphDataOrLoad({
    cacheKey,
    invalidationKey,
    loader,
    ttlMs = GRAPH_DATA_CACHE_TTL_MS,
}: CacheLoaderOptions): Promise<GraphData> {
    const cached = graphDataCache.get(cacheKey);

    if (cached) {
        if (cached.expiresAt > Date.now()) {
            return cached.value;
        }

        graphDataCache.delete(cacheKey);
    }

    const inFlight = inFlightGraphDataLoads.get(cacheKey);
    if (inFlight) {
        return inFlight;
    }

    const invalidationVersion = getInvalidationVersion(invalidationKey);

    const pendingLoad = loader()
        .then((value) => {
            if (getInvalidationVersion(invalidationKey) === invalidationVersion) {
                setCacheEntry(cacheKey, value, ttlMs);
            }

            return value;
        })
        .finally(() => {
            if (inFlightGraphDataLoads.get(cacheKey) === pendingLoad) {
                inFlightGraphDataLoads.delete(cacheKey);
            }
        });

    inFlightGraphDataLoads.set(cacheKey, pendingLoad);
    return pendingLoad;
}
