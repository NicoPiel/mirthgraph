using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using StackExchange.Redis;
using System.Xml.Linq;

class GraphsService
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
        var cachedData = await _db.StringGetAsync($"graphData:{connectionName}");
        if (!cachedData.IsNullOrEmpty)
        {
            return cachedData;
        }

        var graphData = await BuildGraphDataAsync(connectionName);
        await _db.StringSetAsync($"graphData:{connectionName}", graphData);
        return graphData;
    }

    public async Task<string> BuildGraphDataAsync(string connectionName)
    {
        var xmlConfig = await _mirthConfigService.GetMirthConfigAsync(connectionName);
        var graphData = ParseMirthConfig(xmlConfig);
        var serializerSettings = new JsonSerializerSettings();
        serializerSettings.ContractResolver = new DefaultContractResolver
        {
            NamingStrategy = new CamelCaseNamingStrategy
            {
                ProcessDictionaryKeys = false,
                OverrideSpecifiedNames = true
            }
        };
        var json = JsonConvert.SerializeObject(graphData, Formatting.Indented, serializerSettings);

        // _logger.LogDebug($"Graph data for {connectionName}:\n{json}");

        return json;
    }

    private GraphData ParseMirthConfig(string xmlString)
    {
        var graphData = new GraphData
        {
            Nodes = new List<Node>(),
            Links = new List<Link>()
        };

        const string OTHER = "OTHER";

        graphData.Nodes.Add(new Node
        {
            Id = OTHER,
            Name = OTHER,
            Group = OTHER,
            Description = "Unhandled connectors",
            Val = 1,
            Tags = new List<string>()
        });

        var xml = XDocument.Parse(xmlString);
        var channels = xml.Descendants("channel");

        foreach (var channel in channels)
        {
            var channelId = channel.Element("id")?.Value;
            var channelName = channel.Element("name")?.Value;
            var channelDescription = channel.Element("description")?.Value;

            if (channelId != null)
            {
                graphData.Nodes.Add(new Node
                {
                    Id = channelId,
                    Name = "Channel: " + channelName,
                    Val = 1,
                    Description = channelDescription,
                    Group = channel.Element("exportData")?.Element("metadata")?.Element("enabled")?.Value == "true" ? "Channel" : "disabled",
                    Enabled = channel.Element("exportData")?.Element("metadata")?.Element("enabled")?.Value == "true" ? 1 : 0,
                    Tags = new List<string>()
                });

                var sourceConnectors = channel.Elements("sourceConnector");
                foreach (var sourceConnector in sourceConnectors)
                {
                    var sourceConnectorProperties = sourceConnector.Element("properties");
                    var transportName = sourceConnector.Element("transportName")?.Value;

                    switch (transportName)
                    {
                        case "TCP Listener":
                            TcpListenerNodeAndLink(graphData, channelId, sourceConnectorProperties, sourceConnector);
                            break;

                        case "HTTP Listener":
                            HttpListenerNodeAndLink(graphData, channelId, sourceConnectorProperties, sourceConnector);
                            break;

                        case "Database Reader":
                            DatabaseReaderNodeAndLink(graphData, channelId, sourceConnectorProperties, sourceConnector);
                            break;

                        case "File Reader":
                            FileReaderNodeAndLink(graphData, channelId, sourceConnectorProperties, sourceConnector);
                            break;

                        case "DICOM Listener":
                            DicomListenerNodeAndLink(graphData, channelId, sourceConnectorProperties, sourceConnector);
                            break;

                        default:
                            // Handle other transport types if necessary
                            break;
                    }
                }
            }
        }

        return graphData;
    }

    private void TcpListenerNodeAndLink(GraphData graphData, string channelId, XElement sourceConnectorProperties, XElement sourceConnector)
    {
        var tcpListenerConnectorProperties = sourceConnectorProperties?.Element("listenerConnectorProperties");
        var tcpListenerHost = tcpListenerConnectorProperties?.Element("host")?.Value;
        var tcpListenerPort = tcpListenerConnectorProperties?.Element("port")?.Value;
        var tcpListenerID = $"{tcpListenerHost}:{tcpListenerPort}";

        if (!graphData.Nodes.Any(node => node.Id == tcpListenerID))
        {
            graphData.Nodes.Add(new Node
            {
                Id = tcpListenerID,
                Name = $"TCP Listener: {tcpListenerID}",
                Val = 1,
                Group = "TCP Listener",
                Tags = new List<string>()
            });
        }

        graphData.Links.Add(new Link
        {
            Source = tcpListenerID,
            Target = channelId,
            Group = "TCP Listener",
            Enabled = sourceConnector.Element("enabled")?.Value == "true" ? 1 : 0
        });
    }

    private void HttpListenerNodeAndLink(GraphData graphData, string channelId, XElement sourceConnectorProperties, XElement sourceConnector)
    {
        var httpListenerConnectorProperties = sourceConnectorProperties?.Element("listenerConnectorProperties");
        var httpListenerHost = httpListenerConnectorProperties?.Element("host")?.Value;
        var httpListenerPort = httpListenerConnectorProperties?.Element("port")?.Value;
        var httpListenerID = $"{httpListenerHost}:{httpListenerPort}";

        if (!graphData.Nodes.Any(node => node.Id == httpListenerID))
        {
            graphData.Nodes.Add(new Node
            {
                Id = httpListenerID,
                Name = $"HTTP Listener: {httpListenerID}",
                Val = 1,
                Group = "HTTP Listener",
                Tags = new List<string>()
            });
        }

        graphData.Links.Add(new Link
        {
            Source = httpListenerID,
            Target = channelId,
            Group = "HTTP Listener",
            Enabled = sourceConnector.Element("enabled")?.Value == "true" ? 1 : 0
        });
    }

    private void DatabaseReaderNodeAndLink(GraphData graphData, string channelId, XElement sourceConnectorProperties, XElement sourceConnector)
    {
        var dbReaderID = sourceConnectorProperties?.Element("url")?.Value;
        var dbHost = dbReaderID?.Split(new[] { '@', '/' }, StringSplitOptions.RemoveEmptyEntries).ElementAtOrDefault(1);

        if (!graphData.Nodes.Any(node => node.Id == dbHost))
        {
            graphData.Nodes.Add(new Node
            {
                Id = dbHost,
                Name = $"Database Host: {dbHost}",
                Group = "Host",
                Description = $"DB Host\nDriver: {sourceConnectorProperties?.Element("driver")?.Value}",
                Val = 1,
                Tags = new List<string>()
            });
        }

        if (!graphData.Nodes.Any(node => node.Id == dbReaderID))
        {
            graphData.Nodes.Add(new Node
            {
                Id = dbReaderID,
                Name = $"Database Reader: {dbReaderID}",
                Val = 1,
                Group = "Database Reader",
                Tags = new List<string>()
            });
        }

        graphData.Links.Add(new Link
        {
            Source = dbHost,
            Target = dbReaderID,
            Group = "Database Reader",
            Enabled = sourceConnector.Element("enabled")?.Value == "true" ? 1 : 0
        });

        graphData.Links.Add(new Link
        {
            Source = dbReaderID,
            Target = channelId,
            Group = "Database Reader",
            Enabled = sourceConnector.Element("enabled")?.Value == "true" ? 1 : 0
        });
    }

    private void FileReaderNodeAndLink(GraphData graphData, string channelId, XElement sourceConnectorProperties, XElement sourceConnector)
    {
        var fileReaderPath = sourceConnectorProperties?.Element("host")?.Value;

        if (!graphData.Nodes.Any(node => node.Id == fileReaderPath))
        {
            graphData.Nodes.Add(new Node
            {
                Id = fileReaderPath,
                Name = $"File Reader: {fileReaderPath}",
                Val = 1,
                Group = "File Reader",
                Tags = new List<string>()
            });
        }

        graphData.Links.Add(new Link
        {
            Source = fileReaderPath,
            Target = channelId,
            Group = "File Reader",
            Enabled = sourceConnector.Element("enabled")?.Value == "true" ? 1 : 0
        });
    }

    private void DicomListenerNodeAndLink(GraphData graphData, string channelId, XElement sourceConnectorProperties, XElement sourceConnector)
    {
        var dicomListenerConnectorProperties = sourceConnectorProperties?.Element("listenerConnectorProperties");
        var dicomListenerID = $"{sourceConnectorProperties?.Element("applicationEntity")?.Value}:{dicomListenerConnectorProperties?.Element("port")?.Value}";

        if (!graphData.Nodes.Any(node => node.Id == dicomListenerID))
        {
            graphData.Nodes.Add(new Node
            {
                Id = dicomListenerID,
                Name = $"DICOM Listener: {dicomListenerID}",
                Val = 1,
                Group = "DICOM Listener",
                Tags = new List<string>()
            });
        }

        graphData.Links.Add(new Link
        {
            Source = dicomListenerID,
            Target = channelId,
            Group = "DICOM Listener",
            Enabled = sourceConnector.Element("enabled")?.Value == "true" ? 1 : 0
        });
    }
}

class GraphData
{
    public List<Node> Nodes { get; set; }
    public List<Link> Links { get; set; }
}

class Node
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Group { get; set; }
    public string Description { get; set; }
    public int Val { get; set; }
    public int Enabled { get; set; }
    public List<string> Tags { get; set; }
}

class Link
{
    public string Source { get; set; }
    public string Target { get; set; }
    public string Group { get; set; }
    public int Enabled { get; set; }
}
