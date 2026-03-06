import React from 'react';
import { useGraphStore } from '../store/useGraphStore';
import { GraphData } from '../domain/types';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getNodeRelationships } from '../domain/getNodeRelationships';

interface NodeDetailsProps {
    data: GraphData;
}

export const NodeDetails: React.FC<NodeDetailsProps> = ({ data }) => {
    const { selectedNodeId, isSidebarOpen, setSidebarOpen, setSelectedNodeId } =
        useGraphStore();

    const node = selectedNodeId
        ? data.nodes.find((n) => n.id === selectedNodeId)
        : null;

    const handleOpenChange = (open: boolean) => {
        setSidebarOpen(open);
        if (!open) {
            setSelectedNodeId(null);
        }
    };

    const { sources, destinations } = React.useMemo(
        () =>
            node
                ? getNodeRelationships(data, node.id)
                : { sources: [], destinations: [] },
        [data, node],
    );

    if (!node) {
        return null;
    }

    return (
        <Sheet
            open={isSidebarOpen}
            onOpenChange={handleOpenChange}
            modal={false}
        >
            <SheetContent
                side="right"
                className="w-[400px] sm:w-[540px] p-0"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <SheetHeader className="mb-6">
                            <SheetTitle className="text-2xl font-bold break-words">
                                {node.name}
                            </SheetTitle>
                            <SheetDescription>{node.group}</SheetDescription>
                        </SheetHeader>

                        <div className="space-y-6">
                            {node.description && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Description
                                    </h3>
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                        {node.description}
                                    </p>
                                </div>
                            )}

                            {node.tags && node.tags.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {node.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="px-2 py-1"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    Sources
                                </h3>
                                {sources.length > 0 ? (
                                    <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
                                        {sources.map((source) => (
                                            <li
                                                key={source.id}
                                                className="break-words"
                                            >
                                                {source.label}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No sources
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    Destinations
                                </h3>
                                {destinations.length > 0 ? (
                                    <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
                                        {destinations.map((destination) => (
                                            <li
                                                key={destination.id}
                                                className="break-words"
                                            >
                                                {destination.label}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No destinations
                                    </p>
                                )}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    System ID
                                </h3>
                                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">
                                    {node.id}
                                </code>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};
