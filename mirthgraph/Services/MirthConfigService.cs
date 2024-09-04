using System.Net.Http.Headers;
using System.Text;

public class MirthConfigService
{
    private readonly CacheService _cacheService;
    private readonly IServiceProvider _serviceProvider;
    private readonly HttpClient _httpClient;
    private readonly ILogger<MirthConfigService> _logger;

    public MirthConfigService(CacheService cacheService, IServiceProvider serviceProvider, HttpClient httpClient, ILogger<MirthConfigService> logger)
    {
        _cacheService = cacheService;
        _serviceProvider = serviceProvider;
        _httpClient = httpClient;
        _logger = logger;
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
        using var scope = _serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<DbService>();
        var connection = await dbContext.MirthConnections.FindAsync(connectionId);
        if (connection == null)
        {
            throw new Exception("Mirth connection not found");
        }

        // Fetch the config using connection.ServerUrl, connection.Username, connection.Password
        var fetchedConfig = await FetchFromMirthAsync(connection, configName);
        return fetchedConfig;
    }

    public List<string> GetAllMirthConfigs()
    {
        return _cacheService.GetAllKeys().ToList();
    }


    public async Task<string> FetchFromMirthAsync(MirthConnection connection, string configName)
    {
        var serverHost = connection.ServerUrl == "localhost" ? "host.docker.internal" : connection.ServerUrl;
        var requestUrl = $"https://{serverHost}:8443/api/channels";
        var request = new HttpRequestMessage(HttpMethod.Get, requestUrl);
        var authToken = Encoding.ASCII.GetBytes($"{connection.Username}:{connection.Password}");
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));
        request.Headers.Add("X-Requested-With", "MirthGraph");
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        try
        {
            var response = await _httpClient.SendAsync(request);
            var statusCode = response.StatusCode;
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();

            _logger.LogInformation($"HTTP Response Code: {statusCode}");

            return responseContent;
        }
        catch (HttpRequestException ex)
        {
            //_logger.LogError(ex, "Failed to fetch config from Mirth Connect");
            throw new Exception("Failed to fetch config from Mirth Connect", ex);
        }
    }

    private string FetchFromMirth(string configName)
    {
        // Logic to fetch config from Mirth Connect's API
        return $"{{\"config\": \"{configName}\"}}";
    }
}