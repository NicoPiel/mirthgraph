import { GraphData, getGraphLinkEndpointId } from './types';

export interface NodeRelationship {
    id: string;
    label: string;
    group?: string;
    isNavigable: boolean;
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
                group: node?.group,
                isNavigable: Boolean(node),
            },
        ];
    });
}

export function getNodeRelationships(data: GraphData, nodeId: string) {
    return {
        sources: toRelationships(
            data.links
                .filter(
                    (link) => getGraphLinkEndpointId(link.target) === nodeId,
                )
                .map((link) => getGraphLinkEndpointId(link.source)),
            data,
        ),
        destinations: toRelationships(
            data.links
                .filter(
                    (link) => getGraphLinkEndpointId(link.source) === nodeId,
                )
                .map((link) => getGraphLinkEndpointId(link.target)),
            data,
        ),
    };
}
