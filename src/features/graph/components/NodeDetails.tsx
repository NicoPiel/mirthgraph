import React from 'react';
import { useGraphStore } from '../store/useGraphStore';
import { GraphData } from '../domain/types';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NodeDetailsProps {
    data: GraphData;
}

export const NodeDetails: React.FC<NodeDetailsProps> = ({ data }) => {
    const { selectedNodeId, isSidebarOpen, setSidebarOpen, setSelectedNodeId } =
        useGraphStore();

    if (!isSidebarOpen || !selectedNodeId) {
        return null;
    }

    const node = data.nodes.find((n) => n.id === selectedNodeId);

    if (!node) {
        return null;
    }

    const handleClose = () => {
        setSidebarOpen(false);
        setSelectedNodeId(null);
    };

    return (
        <div className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700 overflow-y-auto z-10">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2
                        className="text-xl font-bold text-gray-900 dark:text-white truncate"
                        title={node.name}
                    >
                        {node.name}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={handleClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Group
                        </h3>
                        <p className="text-gray-900 dark:text-white">
                            {node.group}
                        </p>
                    </div>

                    {node.description && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Description
                            </h3>
                            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                                {node.description}
                            </p>
                        </div>
                    )}

                    {node.tags && node.tags.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {node.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            ID
                        </h3>
                        <p className="text-xs text-gray-500 font-mono break-all">
                            {node.id}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
