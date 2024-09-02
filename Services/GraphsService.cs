using StackExchange.Redis;
using System.Xml.Linq;

public class GraphsService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly ILogger<GraphsService> _logger;
    private readonly IDatabase _db;

    public GraphsService(IConnectionMultiplexer redis, ILogger<GraphsService> logger)
    {
        _redis = redis;
        _logger = logger;
        _db = _redis.GetDatabase();
    }

    public async Task<string> GetGraphDataAsync(string serverType)
    {
        string cacheKey = $"GraphData_{serverType}";
        string graphData = await _db.StringGetAsync(cacheKey);

        if (graphData == null)
        {
            _logger.LogInformation("Cache missing, building new graph data.");
            graphData = await BuildGraphDataAsync(serverType);
            await _db.StringSetAsync(cacheKey, graphData, TimeSpan.FromHours(12)); // Cache for 12 hours
        }

        return graphData;
    }

    public async Task<string> ForceRebuildGraphDataAsync(string serverType)
    {
        _logger.LogWarning("Forcing graph data rebuild.");
        string graphData = await BuildGraphDataAsync(serverType);
        await _db.StringSetAsync($"GraphData_{serverType}", graphData, TimeSpan.FromHours(12));
        return graphData;
    }

    private async Task<string> BuildGraphDataAsync(string serverType)
    {
        // Simulate reading and processing XML data
        // Replace with actual XML processing logic
        var xml = "<Graph><Node id='1' /><Node id='2' /></Graph>";
        XDocument xmlDoc = XDocument.Parse(xml);
        // Process the XML as needed
        // For demonstration, we're returning a simple JSON string
        return await Task.FromResult(xmlDoc.ToString());
    }
}
