import { GraphData } from './types';

export interface NodeRelationship {
    id: string;
    label: string;
}

function toRelationships(
    nodeIds: string[],
    data: GraphData,
): NodeRelationship[] {
    const seen = new Set<string>();
    const nodesById = new Map(data.nodes.map((node) => [node.id, node]));

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
            },
        ];
    });
}

export function getNodeRelationships(data: GraphData, nodeId: string) {
    return {
        sources: toRelationships(
            data.links
                .filter((link) => link.target === nodeId)
                .map((link) => link.source),
            data,
        ),
        destinations: toRelationships(
            data.links
                .filter((link) => link.source === nodeId)
                .map((link) => link.target),
            data,
        ),
    };
}
