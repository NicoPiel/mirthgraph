public interface IGraphsService
{
    Task<GraphData> GetGraphDataAsync();
    // Add other methods as needed
}

public class GraphsService : IGraphsService
{
    // Inject any dependencies like database context, Redis, etc.

    public async Task<GraphData> GetGraphDataAsync()
    {
        // Implement logic to fetch graph data from your data source
        // For demonstration, returning mock data

        var nodes = new List<Node> { new Node { Id = "1", Group = "A" }, new Node { Id = "2", Group = "A" }, new Node { Id = "3", Group = "B" }, new Node { Id = "4", Group = "B" } };

        var links = new List<Link> { new Link { Source = "1", Target = "2" }, new Link { Source = "1", Target = "3" }, new Link { Source = "2", Target = "4" }, new Link { Source = "3", Target = "4" } };

        return new GraphData
        {
            Nodes = nodes,
            Links = links
        };
    }
}
