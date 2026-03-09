export interface GraphNode {
    id: string;
    name: string;
    group: string;
    description?: string;
    val: number;
    tags: string[];
    enabled?: number;
}

export type GraphLinkEndpoint = string | GraphNode;

export function getGraphLinkEndpointId(endpoint: GraphLinkEndpoint): string {
    return typeof endpoint === 'string' ? endpoint : endpoint.id;
}

export interface GraphLink {
    source: GraphLinkEndpoint;
    target: GraphLinkEndpoint;
    group: string;
    enabled: number;
}

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}
