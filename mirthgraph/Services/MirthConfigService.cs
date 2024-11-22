using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text;

/// <summary>
/// Service responsible for managing Mirth Connect configurations.
/// </summary>
public class MirthConfigService
{
    private readonly CacheService _cacheService;
    private readonly IServiceProvider _serviceProvider;
    private readonly HttpClient _httpClient;
    private readonly ILogger<MirthConfigService> _logger;

    /// <summary>
    /// Initializes a new instance of the <see cref="MirthConfigService"/> class.
    /// </summary>
    /// <param name="cacheService">The cache service for storing Mirth configurations.</param>
    /// <param name="serviceProvider">The service provider for accessing other services.</param>
    /// <param name="httpClient">The HTTP client for making requests to Mirth Connect.</param>
    /// <param name="logger">The logger for logging messages.</param>
    public MirthConfigService(CacheService cacheService, IServiceProvider serviceProvider, HttpClient httpClient, ILogger<MirthConfigService> logger)
    {
        _cacheService = cacheService;
        _serviceProvider = serviceProvider;
        _httpClient = httpClient;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves the Mirth configuration for the specified config name.
    /// </summary>
    /// <param name="configName">The name of the Mirth configuration to retrieve.</param>
    /// <returns>The Mirth configuration as a string.</returns>
    public async Task<string> GetMirthConfigAsync(string configName)
    {
        // Check if the config is already cached
        if (await _cacheService.MirthConfigExistsAsync(configName))
        {
            // Retrieve the cached config
            var cachedConfig = await _cacheService.GetCachedMirthConfigAsync(configName);
            return cachedConfig ?? string.Empty; // Ensure non-null return
        }

        // If not cached, fetch from Mirth Connect
        // Simulate fetching from Mirth Connect
        var fetchedConfig = FetchFromMirth(configName);
        await _cacheService.CacheMirthConfigAsync(configName, fetchedConfig);

        return fetchedConfig;
    }

    /// <summary>
    /// Retrieves the Mirth configuration for the specified connection and config name.
    /// </summary>
    /// <param name="configName">The name of the Mirth configuration to retrieve.</param>
    /// <param name="connectionId">The ID of the Mirth connection to use.</param>
    /// <returns>The Mirth configuration as a string.</returns>
    public async Task<string> GetMirthConnectionAsync(string configName, int connectionId)
    {
        using var scope = _serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<DbService>();
        // Find the Mirth connection in the database
        var connection = await dbContext.MirthConnections.FindAsync(connectionId);
        if (connection == null)
        {
            throw new Exception("Mirth connection not found");
        }

        // Fetch the config using connection details
        var fetchedConfig = await FetchFromMirthAsync(connection, configName);
        return fetchedConfig;
    }

    /// <summary>
    /// Retrieves a list of all Mirth configuration names.
    /// </summary>
    /// <returns>A list of Mirth configuration names.</returns>
    public List<string> GetAllMirthConfigs()
    {
        return _cacheService.GetAllKeys().ToList();
    }

    /// <summary>
    /// Retrieves a list of all Mirth connections.
    /// </summary>
    /// <returns>A list of Mirth connections.</returns>
    public async Task<List<MirthConnection>> GetAllMirthConnectionsAsync()
    {
        using var scope = _serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<DbService>();
        return await dbContext.MirthConnections.ToListAsync();
    }


    /// <summary>
    /// Fetches the Mirth configuration from the specified Mirth Connect instance.
    /// </summary>
    /// <param name="connection">The Mirth connection details.</param>
    /// <param name="configName">The name of the Mirth configuration to retrieve.</param>
    /// <returns>The Mirth configuration as a string.</returns>
    public async Task<string> FetchFromMirthAsync(MirthConnection connection, string configName)
    {
        // Replace localhost with host.docker.internal if needed
        var serverHost = connection.ServerUrl == "localhost" ? "host.docker.internal" : connection.ServerUrl;
        var requestUrl = $"https://{serverHost}:8443/api/channels";
        var request = new HttpRequestMessage(HttpMethod.Get, requestUrl);
        // Create Basic Authentication header
        var authToken = Encoding.ASCII.GetBytes($"{connection.Username}:{connection.Password}");
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));
        request.Headers.Add("X-Requested-With", "MirthGraph");

        try
        {
            // Send the HTTP request
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

    /// <summary>
    /// Fetches the Mirth configuration from Mirth Connect (placeholder).
    /// </summary>
    /// <param name="configName">The name of the Mirth configuration to retrieve.</param>
    /// <returns>The Mirth configuration as a string.</returns>
    private string FetchFromMirth(string configName)
    {
        // Logic to fetch config from Mirth Connect's API
        return $"{{\"config\": \"{configName}\"}}";
    }
}
