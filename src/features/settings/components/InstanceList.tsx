import { MirthInstance } from '../types';
import { Trash2, Edit3 } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InstanceListProps {
    instances: MirthInstance[];
    onEdit: (instance: MirthInstance) => void;
    onDelete: (instanceId: string) => void;
}

export function InstanceList({
    instances,
    onEdit,
    onDelete,
}: InstanceListProps) {
    if (instances.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                No instances configured yet.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {instances.map((instance) => (
                <Card
                    key={instance.id}
                    className="transition-colors hover:border-primary"
                >
                    <CardContent className="flex items-center justify-between p-6">
                        <div
                            className="flex-1 cursor-pointer space-y-1"
                            onClick={() => onEdit(instance)}
                        >
                            <CardTitle className="text-base">
                                {instance.name}
                            </CardTitle>
                            <CardDescription>{instance.url}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(instance)}
                                aria-label="Edit instance"
                            >
                                <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => onDelete(instance.id)}
                                aria-label="Delete instance"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
