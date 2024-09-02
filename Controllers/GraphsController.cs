using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class GraphsController : ControllerBase
{
    private readonly GraphsService _graphsService;

    public GraphsController(GraphsService graphsService)
    {
        _graphsService = graphsService;
    }

    [HttpGet]
    public async Task<ActionResult<GraphData>> GetGraphData()
    {
        var graphData = await _graphsService.GetGraphDataAsync("prod");
        if (graphData == null)
        {
            return NotFound();
        }
        return Ok(graphData);
    }

    // Optional: Add POST or other methods as needed
}
