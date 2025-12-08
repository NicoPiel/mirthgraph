import React from 'react';
import { useGraphStore } from '../store/useGraphStore';
import { Button } from '@/components/ui/button';
import { Settings2, Search, X } from 'lucide-react';

export const GraphControls: React.FC = () => {
    const {
        filterCriteria,
        setFilterCriteria,
        graphSettings,
        setGraphSettings,
        resetFilters,
    } = useGraphStore();

    const [showSettings, setShowSettings] = React.useState(false);

    return (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search nodes..."
                        className="pl-8 pr-4 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={filterCriteria.searchTerm}
                        onChange={(e) =>
                            setFilterCriteria({ searchTerm: e.target.value })
                        }
                    />
                    {filterCriteria.searchTerm && (
                        <button
                            onClick={() =>
                                setFilterCriteria({ searchTerm: '' })
                            }
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>

                <Button
                    variant={showSettings ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setShowSettings(!showSettings)}
                    title="Graph Settings"
                >
                    <Settings2 className="h-4 w-4" />
                </Button>
            </div>

            {showSettings && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-64">
                    <h3 className="font-medium mb-3 text-sm text-gray-900 dark:text-white">
                        Display Settings
                    </h3>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700 dark:text-gray-300">
                                Show Labels
                            </label>
                            <input
                                type="checkbox"
                                checked={graphSettings.showLabels}
                                onChange={(e) =>
                                    setGraphSettings({
                                        showLabels: e.target.checked,
                                    })
                                }
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700 dark:text-gray-300">
                                Show Directionality
                            </label>
                            <input
                                type="checkbox"
                                checked={graphSettings.showDirectionality}
                                onChange={(e) =>
                                    setGraphSettings({
                                        showDirectionality: e.target.checked,
                                    })
                                }
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
                                Node Size
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={graphSettings.nodeSize}
                                onChange={(e) =>
                                    setGraphSettings({
                                        nodeSize: parseInt(e.target.value),
                                    })
                                }
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
                                Link Thickness
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={graphSettings.linkThickness}
                                onChange={(e) =>
                                    setGraphSettings({
                                        linkThickness: parseInt(e.target.value),
                                    })
                                }
                                className="w-full"
                            />
                        </div>

                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={resetFilters}
                            >
                                Reset All
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
