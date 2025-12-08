import { MirthInstance } from '../types';
import { Trash2, Edit3 } from 'lucide-react';

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
                <div
                    key={instance.id}
                    className="flex items-center justify-between rounded-2xl border bg-card/80 px-4 py-3 shadow-sm ring-1 ring-inset ring-border transition hover:border-primary"
                >
                    <button
                        type="button"
                        className="flex-1 cursor-pointer space-y-0.5 text-left"
                        onClick={() => onEdit(instance)}
                    >
                        <p className="text-base font-semibold text-foreground">
                            {instance.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {instance.url}
                        </p>
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="rounded-full p-2 text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
                            aria-label="Edit instance"
                            onClick={() => onEdit(instance)}
                        >
                            <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            className="rounded-full p-2 text-slate-500 transition hover:text-red-500"
                            aria-label="Delete instance"
                            onClick={() => onDelete(instance.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
