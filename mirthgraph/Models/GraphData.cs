
public class GraphData
{
    public List<Node> Nodes { get; set; }
    public List<Link> Links { get; set; }
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
