public class MirthConfigService
{
    private readonly CacheService _cacheService;

    public MirthConfigService(CacheService cacheService)
    {
        _cacheService = cacheService;
    }

    public async Task<string> GetMirthConfigAsync(string configName)
    {
        if (await _cacheService.MirthConfigExistsAsync(configName))
        {
            var cachedConfig = await _cacheService.GetCachedMirthConfigAsync(configName);
            return cachedConfig ?? string.Empty; // Ensure non-null return
        }

        // Simulate fetching from Mirth Connect
        var fetchedConfig = FetchFromMirth(configName);
        await _cacheService.CacheMirthConfigAsync(configName, fetchedConfig);

        return fetchedConfig;
    }

    private string FetchFromMirth(string configName)
    {
        // Logic to fetch config from Mirth Connect's API
        return $"{{\"config\": \"{configName}\"}}";
    }
}
