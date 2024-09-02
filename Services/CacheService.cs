using StackExchange.Redis;

public class CacheService
{
    private readonly IConnectionMultiplexer _redis;

    public CacheService(IConnectionMultiplexer redis)
    {
        _redis = redis;
    }

    public async Task CacheMirthConfigAsync(string key, string configJson)
    {
        var db = _redis.GetDatabase();
        await db.StringSetAsync(key, configJson);
    }

    public async Task<string?> GetCachedMirthConfigAsync(string key)
    {
        var db = _redis.GetDatabase();
        var result = await db.StringGetAsync(key);
        return result.HasValue ? (string?)result : null;
    }

    public async Task<bool> MirthConfigExistsAsync(string key)
    {
        var db = _redis.GetDatabase();
        return await db.KeyExistsAsync(key);
    }

    public async Task<IEnumerable<string>> GetAllKeysAsync()
    {
        var server = _redis.GetServer(_redis.GetEndPoints().First());
        return server.Keys().Select(key => (string)key!).Where(key => key != null)!;
    }
}
