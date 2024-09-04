using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StackExchange.Redis;

public class GraphsService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly ILogger<GraphsService> _logger;
    private readonly IDatabase _db;
    private readonly MirthConfigService _mirthConfigService;

    public GraphsService(IConnectionMultiplexer redis, ILogger<GraphsService> logger, MirthConfigService mirthConfigService)
    {
        _redis = redis;
        _logger = logger;
        _db = _redis.GetDatabase();
        _mirthConfigService = mirthConfigService;
    }

    public async Task<string> GetGraphDataAsync(string connectionName)
    {
        var cachedGraph = await _db.StringGetAsync(connectionName);
        if (!cachedGraph.IsNullOrEmpty)
        {
            return cachedGraph;
        }

        return await BuildGraphDataAsync(connectionName);
    }

    public async Task<string> BuildGraphDataAsync(string connectionName)
    {
        var configContent = await _mirthConfigService.GetMirthConfigAsync(connectionName);
        var graphData = ParseMirthConfig(configContent);
        var graphJson = JsonConvert.SerializeObject(graphData);

        await _db.StringSetAsync(connectionName, graphJson);
        return graphJson;
    }

    private GraphData ParseMirthConfig(string jsonString)
    {
        var graphData = new GraphData();
        var json = JObject.Parse(jsonString);

        var channels = json["list"]?["channel"];
        if (channels == null) return graphData;

        foreach (var channel in channels)
        {
            var channelId = channel["id"]?.ToString();
            var channelName = channel["name"]?.ToString();

            if (channelId != null)
            {
                graphData.Nodes.Add(new Node { Id = channelId, Group = "Channel" });

                var sourceConnector = channel["sourceConnector"];
                if (sourceConnector != null)
                {
                    var sourceConnectorId = sourceConnector["metaDataId"]?.ToString();
                    if (sourceConnectorId != null)
                    {
                        graphData.Nodes.Add(new Node { Id = sourceConnectorId, Group = "SourceConnector" });
                        graphData.Links.Add(new Link { Source = channelId, Target = sourceConnectorId });
                    }
                }

                var destinationConnectors = channel["destinationConnectors"];
                if (destinationConnectors != null)
                {
                    foreach (var destinationConnector in destinationConnectors)
                    {
                        var destinationConnectorId = destinationConnector["metaDataId"]?.ToString();
                        if (destinationConnectorId != null)
                        {
                            graphData.Nodes.Add(new Node { Id = destinationConnectorId, Group = "DestinationConnector" });
                            graphData.Links.Add(new Link { Source = channelId, Target = destinationConnectorId });
                        }
                    }
                }
            }
        }

        return graphData;
    }
}

public class GraphData
{
    public List<Node> Nodes { get; set; } = new List<Node>();
    public List<Link> Links { get; set; } = new List<Link>();
}

public class Node
{
    public string Id { get; set; }
    public string Group { get; set; }
    // Add other properties as needed
}

public class Link
{
    public string Source { get; set; }
    public string Target { get; set; }
    // Add other properties as needed
}
