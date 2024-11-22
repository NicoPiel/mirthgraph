using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using StackExchange.Redis;
using System.Xml.Linq;

// Service for retrieving and processing graph data from Mirth Connect configurations.
public class GraphsService
{
    private readonly IConnectionMultiplexer _redis; // Redis connection multiplexer
    private readonly ILogger<GraphsService> _logger; // Logger for logging messages
    private readonly IDatabase _db; // Redis database instance
    private readonly MirthConfigService _mirthConfigService; // Service for retrieving Mirth Connect configurations

    // Constructor for the GraphsService class.
    public GraphsService(IConnectionMultiplexer redis, ILogger<GraphsService> logger, MirthConfigService mirthConfigService)
    {
        _redis = redis;
        _logger = logger;
        _db = _redis.GetDatabase();
        _mirthConfigService = mirthConfigService;
    }

    // Retrieves graph data for a given connection name.  Checks the cache first.
    public async Task<string> GetGraphDataAsync(string connectionName)
    {
        // Check if graph data is already cached.
        var cachedData = await _db.StringGetAsync($"graphData:{connectionName}");
        if (!cachedData.IsNullOrEmpty)
        {
            // Return cached data if available.
            return cachedData;
        }

        // Build graph data if not cached.
        var graphData = await BuildGraphDataAsync(connectionName);
        // Cache the built graph data.
        await _db.StringSetAsync($"graphData:{connectionName}", graphData);
        return graphData;
    }

    // Builds graph data from a Mirth Connect configuration.
    public async Task<string> BuildGraphDataAsync(string connectionName)
    {
        // Retrieve Mirth Connect configuration for the given connection name.
        var xmlConfig = await _mirthConfigService.GetMirthConfigAsync(connectionName);
        // Parse the XML configuration to extract graph data.
        var graphData = ParseMirthConfig(xmlConfig);
        // Configure JSON serializer settings for camel case naming.
        var serializerSettings = new JsonSerializerSettings();
        serializerSettings.ContractResolver = new DefaultContractResolver
        {
            NamingStrategy = new CamelCaseNamingStrategy
            {
                ProcessDictionaryKeys = false,
                OverrideSpecifiedNames = true
            }
        };
        // Serialize the graph data to JSON.
        var json = JsonConvert.SerializeObject(graphData, Formatting.Indented, serializerSettings);

        // _logger.LogDebug($"Graph data for {connectionName}:\n{json}"); // Uncomment for debugging

        return json;
    }

    // Parses Mirth Connect XML configuration and extracts graph data.
    private GraphData ParseMirthConfig(string xmlString)
    {
        // Create a new GraphData object to store the parsed data.
        var graphData = new GraphData
        {
            Nodes = new List<Node>(),
            Links = new List<Link>()
        };

        // Add a default node for unhandled connectors.
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

        // Parse the XML string into an XDocument.
        var xml = XDocument.Parse(xmlString);
        // Select all channel elements from the XML document.
        var channels = xml.Descendants("channel");

        // Iterate over each channel element.
        foreach (var channel in channels)
        {
            // Extract channel information.
            var channelId = channel.Element("id")?.Value;
            var channelName = channel.Element("name")?.Value;
            var channelDescription = channel.Element("description")?.Value;

            // Check if channel ID is available.
            if (channelId != null)
            {
                // Add a node for the channel.
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

                // Process source connectors for the channel.
                var sourceConnectors = channel.Elements("sourceConnector");
                foreach (var sourceConnector in sourceConnectors)
                {
                    var sourceConnectorProperties = sourceConnector.Element("properties");
                    var transportName = sourceConnector.Element("transportName")?.Value;

                    // Handle different transport types.
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

    // Adds a TCP Listener node and link to the graph data.
    private void TcpListenerNodeAndLink(GraphData graphData, string channelId, XElement sourceConnectorProperties, XElement sourceConnector)
    {
        // Extract TCP Listener properties.
        var tcpListenerConnectorProperties = sourceConnectorProperties?.Element("listenerConnectorProperties");
        var tcpListenerHost = tcpListenerConnectorProperties?.Element("host")?.Value;
        var tcpListenerPort = tcpListenerConnectorProperties?.Element("port")?.Value;
        var tcpListenerID = $"{tcpListenerHost}:{tcpListenerPort}";

        // Add TCP Listener node if it doesn't exist.
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

        // Add a link from the TCP Listener to the channel.
        graphData.Links.Add(new Link
        {
            Source = tcpListenerID,
            Target = channelId,
            Group = "TCP Listener",
            Enabled = sourceConnector.Element("enabled")?.Value == "true" ? 1 : 0
        });
    }

    // Adds an HTTP Listener node and link to the graph data.
    private void HttpListenerNodeAndLink(GraphData graphData, string channelId, XElement sourceConnectorProperties, XElement sourceConnector)
    {
        // Extract HTTP Listener properties.
        var httpListenerConnectorProperties = sourceConnectorProperties?.Element("listenerConnectorProperties");
        var httpListenerHost = httpListenerConnectorProperties?.Element("host")?.Value;
        var httpListenerPort = httpListenerConnectorProperties?.Element("port")?.Value;
        var httpListenerID = $"{httpListenerHost}:{httpListenerPort}";

        // Add HTTP Listener node if it doesn't exist.
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

        // Add a link from the HTTP Listener to the channel.
        graphData.Links.Add(new Link
        {
            Source = httpListenerID,
            Target = channelId,
            Group = "HTTP Listener",
            Enabled = sourceConnector.Element("enabled")?.Value == "true" ? 1 : 0
        });
    }

    // Adds a Database Reader node and link to the graph data.
    private void DatabaseReaderNodeAndLink(GraphData graphData, string channelId, XElement sourceConnectorProperties, XElement sourceConnector)
    {
        // Extract Database Reader properties.
        var dbReaderID = sourceConnectorProperties?.Element("url")?.Value;
        var dbHost = dbReaderID?.Split(new[] { '@', '/' }, StringSplitOptions.RemoveEmptyEntries).ElementAtOrDefault(1);

        // Add Database Host node if it doesn't exist.
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

        // Add Database Reader node if it doesn't exist.
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

        // Add links from the Database Host to the Database Reader and from the Database Reader to the channel.
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

    // Adds a File Reader node and link to the graph data.
    private void FileReaderNodeAndLink(GraphData graphData, string channelId, XElement sourceConnectorProperties, XElement sourceConnector)
    {
        // Extract File Reader properties.
        var fileReaderPath = sourceConnectorProperties?.Element("host")?.Value;

        // Add File Reader node if it doesn't exist.
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

        // Add a link from the File Reader to the channel.
        graphData.Links.Add(new Link
        {
            Source = fileReaderPath,
            Target = channelId,
            Group = "File Reader",
            Enabled = sourceConnector.Element("enabled")?.Value == "true" ? 1 : 0
        });
    }

    // Adds a DICOM Listener node and link to the graph data.
    private void DicomListenerNodeAndLink(GraphData graphData, string channelId, XElement sourceConnectorProperties, XElement sourceConnector)
    {
        // Extract DICOM Listener properties.
        var dicomListenerConnectorProperties = sourceConnectorProperties?.Element("listenerConnectorProperties");
        var dicomListenerID = $"{sourceConnectorProperties?.Element("applicationEntity")?.Value}:{dicomListenerConnectorProperties?.Element("port")?.Value}";

        // Add DICOM Listener node if it doesn't exist.
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

        // Add a link from the DICOM Listener to the channel.
        graphData.Links.Add(new Link
        {
            Source = dicomListenerID,
            Target = channelId,
            Group = "DICOM Listener",
            Enabled = sourceConnector.Element("enabled")?.Value == "true" ? 1 : 0
        });
    }
}

// Represents the graph data structure.
public class GraphData
{
    public List<Node> Nodes { get; set; }
    public List<Link> Links { get; set; }
}

// Represents a node in the graph.
public class Node
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Group { get; set; }
    public string Description { get; set; }
    public int Val { get; set; }
    public int Enabled { get; set; }
    public List<string> Tags { get; set; }
}

// Represents a link between nodes in the graph.
public class Link
{
    public string Source { get; set; }
    public string Target { get; set; }
    public string Group { get; set; }
    public int Enabled { get; set; }
}
