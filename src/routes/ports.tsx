import { createFileRoute } from '@tanstack/react-router';

import { PortsTable } from '@/features/ports/components/PortsTable';
import { getPortsInUse } from '@/features/ports/server/getPortsInUse';

export const Route = createFileRoute('/ports')({
    component: OccupiedPortsPage,
    loader: async () => {
        return await getPortsInUse();
    },
});

function OccupiedPortsPage() {
    const ports = Route.useLoaderData();

    return (
        <div className="container mx-auto space-y-6 py-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Occupied Ports
                </h1>
                <p className="text-muted-foreground">
                    Review the listener ports reported by the active Mirth
                    instance.
                </p>
            </div>

            <PortsTable data={ports} />
        </div>
    );
}
