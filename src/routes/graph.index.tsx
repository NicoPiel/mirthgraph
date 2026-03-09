import { createFileRoute } from '@tanstack/react-router';
import { getGraphData } from '@/features/graph/server/getGraphData';
import { GraphCanvas } from '@/features/graph/components/GraphCanvas';
import { NodeDetails } from '@/features/graph/components/NodeDetails';
import { GraphControls } from '@/features/graph/components/GraphControls';
import { ClientOnly } from '@/app/components/ClientOnly';

export const Route = createFileRoute('/graph/')({
    component: GraphComponent,
    loader: async () => {
        return await getGraphData();
    },
});

function GraphComponent() {
    const data = Route.useLoaderData();

    return (
        <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
            <ClientOnly>
                <GraphCanvas data={data} />
            </ClientOnly>
            <GraphControls />
            <NodeDetails data={data} />
        </div>
    );
}
