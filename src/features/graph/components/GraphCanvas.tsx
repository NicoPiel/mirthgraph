import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useGraphStore } from '../store/useGraphStore';
import { ForceGraphMethods } from 'react-force-graph-2d';
import { useTheme } from '@/components/theme-provider';

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = React.lazy(() =>
    import('react-force-graph-2d').then((module) => ({
        default: module.default,
    })),
);
import { GraphData, GraphNode, getGraphLinkEndpointId } from '../domain/types';

interface GraphCanvasProps {
    data: GraphData;
}

// Extend GraphNode to include d3-force properties
interface ForceGraphNode extends GraphNode {
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ data }) => {
    const { selectedNodeId, setSelectedNodeId, setSidebarOpen, graphSettings } =
        useGraphStore();
    const { theme } = useTheme();

    const graphRef = useRef<ForceGraphMethods | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    const focusNode = useCallback(
        (graphNode: ForceGraphNode) => {
            if (
                !graphRef.current ||
                typeof graphNode.x !== 'number' ||
                typeof graphNode.y !== 'number'
            ) {
                return;
            }

            graphRef.current.centerAt(graphNode.x, graphNode.y, 1000);

            if (graphSettings.zoomOnSelect) {
                graphRef.current.zoom(2, 2000);
            }
        },
        [graphSettings.zoomOnSelect],
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const handleNodeClick = (node: any) => {
        const graphNode = node as ForceGraphNode;
        setSelectedNodeId(graphNode.id);
        setSidebarOpen(true);
        focusNode(graphNode);
    };

    const handleBackgroundClick = () => {
        setSelectedNodeId(null);
        setSidebarOpen(false);
    };

    const { filterCriteria } = useGraphStore();

    const filteredData = React.useMemo(() => {
        let nodes = data.nodes;
        let links = data.links;

        if (filterCriteria.searchTerm) {
            const term = filterCriteria.searchTerm.toLowerCase();
            nodes = nodes.filter(
                (n) =>
                    n.name.toLowerCase().includes(term) ||
                    n.description?.toLowerCase().includes(term) ||
                    n.group.toLowerCase().includes(term),
            );
            // Filter links to only include those connecting visible nodes
            const nodeIds = new Set(nodes.map((n) => n.id));
            links = links.filter(
                (l) =>
                    nodeIds.has(getGraphLinkEndpointId(l.source)) &&
                    nodeIds.has(getGraphLinkEndpointId(l.target)),
            );
        }

        if (filterCriteria.groups.length > 0) {
            nodes = nodes.filter((n) =>
                filterCriteria.groups.includes(n.group),
            );
            const nodeIds = new Set(nodes.map((n) => n.id));
            links = links.filter(
                (l) =>
                    nodeIds.has(getGraphLinkEndpointId(l.source)) &&
                    nodeIds.has(getGraphLinkEndpointId(l.target)),
            );
        }

        return { nodes, links };
    }, [data, filterCriteria]);

    useEffect(() => {
        if (!selectedNodeId || !graphRef.current) {
            return;
        }

        const selectedNode = filteredData.nodes.find(
            (node) => node.id === selectedNodeId,
        ) as ForceGraphNode | undefined;

        if (!selectedNode) {
            return;
        }

        focusNode(selectedNode);
    }, [filteredData.nodes, focusNode, selectedNodeId]);

    const isDark =
        theme === 'dark' ||
        (theme === 'system' &&
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <div
            ref={containerRef}
            className="w-full h-full bg-background overflow-hidden"
        >
            <React.Suspense fallback={<div>Loading graph...</div>}>
                <ForceGraph2D
                    ref={graphRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    graphData={filteredData}
                    nodeLabel="name"
                    nodeColor={(node: any) => {
                        // Color by group
                        switch (node.group) {
                            case 'Channel':
                                return '#3b82f6'; // blue-500
                            case 'TCP Listener':
                                return '#10b981'; // emerald-500
                            case 'HTTP Listener':
                                return '#8b5cf6'; // violet-500
                            case 'Database Reader':
                                return '#f59e0b'; // amber-500
                            case 'File Reader':
                                return '#ec4899'; // pink-500
                            case 'Channel Writer':
                                return '#06b6d4'; // cyan-500
                            case 'SMTP Sender':
                                return '#ef4444'; // red-500
                            case 'TCP Sender':
                                return '#14b8a6'; // teal-500
                            case 'File Writer':
                                return '#d946ef'; // fuchsia-500
                            default:
                                return '#9ca3af'; // gray-400
                        }
                    }}
                    nodeRelSize={graphSettings.nodeSize}
                    linkWidth={graphSettings.linkThickness}
                    linkColor={() => (isDark ? '#555' : '#999')}
                    linkDirectionalArrowLength={
                        graphSettings.showDirectionality ? 10 : 0
                    }
                    linkDirectionalParticleSpeed={0.005}
                    onNodeClick={handleNodeClick}
                    onBackgroundClick={handleBackgroundClick}
                    //cooldownTicks={1000}
                    cooldownTime={5000}
                    d3AlphaDecay={0.02}
                    d3VelocityDecay={0.3}
                    backgroundColor={isDark ? '#000000' : '#ffffff'}
                />
            </React.Suspense>
        </div>
    );
};
