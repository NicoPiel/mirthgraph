window.graphInterop = {
    initializeGraph: function (elementId, graphData) {
        // console.log("Initializing graph with data:", graphData); // Debugging statement
        if (!graphData || !graphData.nodes || !graphData.links) {
            graphData = JSON.parse(graphData);
            if (!graphData) console.error("graphData empty", graphData);
            if (!graphData.nodes) console.error("graphData.nodes empty", graphData.nodes);
            if (!graphData.links) console.error("graphData.links empty", graphData.links);
            // console.error("Invalid graphData structure:\n", graphData);
            return;
        }

        const Graph = ForceGraph()(document.getElementById(elementId))
            .graphData(graphData)
            .nodeId('id')
            .nodeLabel('name')
            .nodeAutoColorBy('group')
            .linkDirectionalArrowLength(6)
            .linkDirectionalArrowRelPos(1)
            .onNodeClick(node => {
                if (window.dotNetHelper) {
                    window.dotNetHelper.invokeMethodAsync('OnNodeClick', node.id);
                }
            });

        window.currentGraph = Graph;
    },

    registerDotNetHelper: function (dotNetHelper) {
        window.dotNetHelper = dotNetHelper;
    }
};
