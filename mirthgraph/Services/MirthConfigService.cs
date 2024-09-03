public class MirthConfigService
{
    private readonly CacheService _cacheService;
    private readonly IServiceProvider _serviceProvider;

    public MirthConfigService(CacheService cacheService, IServiceProvider serviceProvider)
    {
        _cacheService = cacheService;
        _serviceProvider = serviceProvider;
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

    public async Task<string> GetMirthConnectionAsync(string configName, int connectionId)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<DbService>();
            var connection = await dbContext.MirthConnections.FindAsync(connectionId);
            if (connection == null)
            {
                throw new Exception("Mirth connection not found");
            }

            // Fetch the config using connection.ServerUrl, connection.Username, connection.Password
            // Logic here to fetch data from the specific Mirth instance

            return "{}"; // Return fetched or cached data
        }
    }

    private string FetchFromMirth(string configName)
    {
        // Logic to fetch config from Mirth Connect's API
        return $"{{\"config\": \"{configName}\"}}";
    }
}
