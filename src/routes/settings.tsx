import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
    getInstances,
    addInstance,
    updateInstance,
    deleteInstance,
} from '@/features/settings/server/instanceActions';
import { InstanceList } from '@/features/settings/components/InstanceList';
import { InstanceForm } from '@/features/settings/components/InstanceForm';
import { MirthInstance } from '@/features/settings/types';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/settings')({
    component: SettingsPage,
    loader: async () => {
        return await getInstances();
    },
});

function SettingsPage() {
    const initialInstances = Route.useLoaderData();
    const queryClient = useQueryClient();
    const [isCreating, setIsCreating] = useState(false);
    const [editingInstance, setEditingInstance] = useState<
        MirthInstance | undefined
    >(undefined);

    const { data: instances } = useQuery({
        queryKey: ['instances'],
        queryFn: () => getInstances(),
        initialData: initialInstances,
    });

    const addMutation = useMutation({
        mutationFn: addInstance,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['instances'] });
            setIsCreating(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateInstance,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['instances'] });
            setEditingInstance(undefined);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteInstance,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['instances'] });
        },
    });

    const handleSubmit = (data: Omit<MirthInstance, 'id'>) => {
        if (editingInstance) {
            updateMutation.mutate({
                data: { ...data, id: editingInstance.id },
            });
        } else {
            addMutation.mutate({ data });
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your Mirth Connect instances.
                    </p>
                </div>
                {!isCreating && !editingInstance && (
                    <Button onClick={() => setIsCreating(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Instance
                    </Button>
                )}
            </div>

            {isCreating || editingInstance ? (
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">
                        {editingInstance ? 'Edit Instance' : 'Add New Instance'}
                    </h2>
                    <InstanceForm
                        instance={editingInstance}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setIsCreating(false);
                            setEditingInstance(undefined);
                        }}
                    />
                </div>
            ) : (
                <InstanceList
                    instances={instances ?? []}
                    onEdit={setEditingInstance}
                    onDelete={(id) => deleteMutation.mutate({ data: { id } })}
                />
            )}
        </div>
    );
}
