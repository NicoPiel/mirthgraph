import { GraphData, GraphNode, getGraphLinkEndpointId } from './types';

export interface NodeRelationship {
    id: string;
    label: string;
    group?: string;
    isNavigable: boolean;
}

function toRelationships(
    nodeIds: string[],
    nodesById: Map<string, GraphNode>,
): NodeRelationship[] {
    const seen = new Set<string>();

    return nodeIds.flatMap((id) => {
        if (seen.has(id)) {
            return [];
        }

        seen.add(id);

        const node = nodesById.get(id);

        return [
            {
                id,
                label: node?.name || id,
                group: node?.group,
                isNavigable: Boolean(node),
            },
        ];
    });
}

type RelationshipIndex = {
    nodesById: Map<string, GraphNode>;
    sourceIdsByTargetId: Map<string, string[]>;
    destinationIdsBySourceId: Map<string, string[]>;
};

const relationshipIndexCache = new WeakMap<GraphData, RelationshipIndex>();

function appendRelationship(
    map: Map<string, string[]>,
    key: string,
    value: string,
) {
    const existing = map.get(key);

    if (existing) {
        existing.push(value);
        return;
    }

    map.set(key, [value]);
}

function getRelationshipIndex(data: GraphData): RelationshipIndex {
    const cached = relationshipIndexCache.get(data);

    if (cached) {
        return cached;
    }

    const nodesById = new Map(data.nodes.map((node) => [node.id, node]));
    const sourceIdsByTargetId = new Map<string, string[]>();
    const destinationIdsBySourceId = new Map<string, string[]>();

    data.links.forEach((link) => {
        const sourceId = getGraphLinkEndpointId(link.source);
        const targetId = getGraphLinkEndpointId(link.target);

        appendRelationship(sourceIdsByTargetId, targetId, sourceId);
        appendRelationship(destinationIdsBySourceId, sourceId, targetId);
    });

    const index = {
        nodesById,
        sourceIdsByTargetId,
        destinationIdsBySourceId,
    };

    relationshipIndexCache.set(data, index);
    return index;
}

export function getNodeRelationships(data: GraphData, nodeId: string) {
    const index = getRelationshipIndex(data);

    return {
        sources: toRelationships(
            index.sourceIdsByTargetId.get(nodeId) ?? [],
            index.nodesById,
        ),
        destinations: toRelationships(
            index.destinationIdsBySourceId.get(nodeId) ?? [],
            index.nodesById,
        ),
    };
}
