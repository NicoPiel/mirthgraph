import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getInstances,
    setActiveInstance,
    getActiveInstanceId,
} from '@/features/settings/server/instanceActions';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useRouter } from '@tanstack/react-router';

export function InstanceSwitcher() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: instances } = useQuery({
        queryKey: ['instances'],
        queryFn: () => getInstances(),
    });

    const { data: activeInstanceId } = useQuery({
        queryKey: ['activeInstanceId'],
        queryFn: () => getActiveInstanceId(),
    });

    const setActiveMutation = useMutation({
        mutationFn: setActiveInstance,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activeInstanceId'] });
            router.invalidate();
        },
    });

    if (!instances || instances.length === 0) {
        return null;
    }

    return (
        <Select
            value={activeInstanceId ?? instances[0]?.id}
            onValueChange={(value) =>
                setActiveMutation.mutate({ data: { id: value } })
            }
        >
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select instance" />
            </SelectTrigger>
            <SelectContent>
                {instances.map((instance) => (
                    <SelectItem key={instance.id} value={instance.id}>
                        {instance.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
