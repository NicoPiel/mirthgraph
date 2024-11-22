using StackExchange.Redis;

// Service for managing caching of Mirth Connect configurations using Redis.
public class CacheService
{
    private readonly IConnectionMultiplexer _redis; // Redis connection multiplexer

    // Constructor for the CacheService class.
    public CacheService(IConnectionMultiplexer redis)
    {
        _redis = redis;
    }

    // Flushes the entire Redis database.  Use with caution!
    public void FlushRedisDatabase()
    {
        // Get the first Redis server from the connection multiplexer.
        var server = _redis.GetServer(_redis.GetEndPoints().First());
        // Flush the database on the selected server.
        server.FlushDatabase();
    }

    // Caches a Mirth Connect configuration in Redis.
    public async Task CacheMirthConfigAsync(string key, string configJson)
    {
        // Throw an exception if the key is null or empty.
        if (string.IsNullOrEmpty(key)) throw new RedisCommandException("Key cannot be null or empty.");

        // Get the Redis database instance.
        var db = _redis.GetDatabase();
        // Set the key-value pair in Redis.
        await db.StringSetAsync(key, configJson);
    }

    // Retrieves a cached Mirth Connect configuration from Redis.
    public async Task<string?> GetCachedMirthConfigAsync(string key)
    {
        // Throw an exception if the key is null or empty.
        if (string.IsNullOrEmpty(key)) throw new RedisCommandException("Key cannot be null or empty.");

        // Get the Redis database instance.
        var db = _redis.GetDatabase();
        // Get the value associated with the key from Redis.
        var result = await db.StringGetAsync(key);
        // Return the value if found, otherwise return null.
        return result.HasValue ? (string?)result : null;
    }

    // Checks if a Mirth Connect configuration exists in the Redis cache.
    public async Task<bool> MirthConfigExistsAsync(string key)
    {
        // Throw an exception if the key is null or empty.
        if (string.IsNullOrEmpty(key)) throw new RedisCommandException("Key cannot be null or empty.");

        // Get the Redis database instance.
        var db = _redis.GetDatabase();
        // Check if the key exists in Redis.
        return await db.KeyExistsAsync(key);
    }

    // Retrieves all keys from the Redis database.
    public IEnumerable<string> GetAllKeys()
    {
        // Get the first Redis server from the connection multiplexer.
        var server = _redis.GetServer(_redis.GetEndPoints().First());
        // Get all keys from the server.
        return server.Keys().Select(key => (string)key!).Where(key => key != null)!;
    }
}
