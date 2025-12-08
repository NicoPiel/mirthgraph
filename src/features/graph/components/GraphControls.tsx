import React from 'react';
import { useGraphStore } from '../store/useGraphStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Settings2, Search, X } from 'lucide-react';

export const GraphControls: React.FC = () => {
    const {
        filterCriteria,
        setFilterCriteria,
        graphSettings,
        setGraphSettings,
        resetFilters,
    } = useGraphStore();

    return (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-lg shadow-md border flex items-center gap-2">
                <div className="relative w-64">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search nodes..."
                        className="pl-8 pr-8 h-9"
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
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            title="Graph Settings"
                        >
                            <Settings2 className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="start">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                    Display Settings
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Customize how the graph looks.
                                </p>
                            </div>
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="show-labels">
                                        Show Labels
                                    </Label>
                                    <Switch
                                        id="show-labels"
                                        checked={graphSettings.showLabels}
                                        onCheckedChange={(checked) =>
                                            setGraphSettings({
                                                showLabels: checked,
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="show-directionality">
                                        Show Directionality
                                    </Label>
                                    <Switch
                                        id="show-directionality"
                                        checked={
                                            graphSettings.showDirectionality
                                        }
                                        onCheckedChange={(checked) =>
                                            setGraphSettings({
                                                showDirectionality: checked,
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Node Size</Label>
                                        <span className="text-xs text-muted-foreground">
                                            {graphSettings.nodeSize}px
                                        </span>
                                    </div>
                                    <Slider
                                        min={1}
                                        max={20}
                                        step={1}
                                        value={[graphSettings.nodeSize]}
                                        onValueChange={(value) =>
                                            setGraphSettings({
                                                nodeSize: value[0],
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Link Thickness</Label>
                                        <span className="text-xs text-muted-foreground">
                                            {graphSettings.linkThickness}px
                                        </span>
                                    </div>
                                    <Slider
                                        min={1}
                                        max={10}
                                        step={1}
                                        value={[graphSettings.linkThickness]}
                                        onValueChange={(value) =>
                                            setGraphSettings({
                                                linkThickness: value[0],
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={resetFilters}
                            >
                                Reset All
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};
