window.graphInterop = {
    initializeGraph: function (elementId, graphData) {
        const Graph = ForceGraph()(document.getElementById(elementId))
            .graphData(graphData)
            .nodeId('id')
            .nodeLabel('id')
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

    updateGraph: function (graphData) {
        if (window.currentGraph) {
            window.currentGraph.graphData(graphData);
        }
    },

    registerDotNetHelper: function (dotNetHelper) {
        window.dotNetHelper = dotNetHelper;
    }
};
