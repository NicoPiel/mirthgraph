export interface GraphNode {
    id: string;
    name: string;
    group: string;
    description?: string;
    val: number;
    tags: string[];
    enabled?: number;
}

export interface GraphLink {
    source: string;
    target: string;
    group: string;
    enabled: number;
}

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}
