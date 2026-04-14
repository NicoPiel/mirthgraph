import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { getGraphData } from '@/features/graph/server/getGraphData';
import { GraphCanvas } from '@/features/graph/components/GraphCanvas';
import { NodeDetails } from '@/features/graph/components/NodeDetails';
import { GraphControls } from '@/features/graph/components/GraphControls';
import { ClientOnly } from '@/app/components/ClientOnly';
import { GraphLoadingScreen } from '@/features/graph/components/GraphLoadingScreen';

export const Route = createFileRoute('/graph/')({
    component: GraphComponent,
    pendingComponent: GraphLoadingScreen,
    pendingMs: 300,
    loader: async () => {
        return await getGraphData();
    },
});

function GraphComponent() {
    const data = Route.useLoaderData();
    const isLoading = useRouterState({ select: (s) => s.isLoading });

    return (
        <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
            {isLoading && (
                <div className="absolute inset-0 z-50">
                    <GraphLoadingScreen />
                </div>
            )}
            <ClientOnly>
                <GraphCanvas data={data} />
            </ClientOnly>
            <GraphControls />
            <NodeDetails data={data} />
        </div>
    );
}
