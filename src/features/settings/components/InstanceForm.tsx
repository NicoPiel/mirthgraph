import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { MirthInstance } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const instanceSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    url: z.string().url('Invalid URL'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

interface InstanceFormProps {
    instance?: MirthInstance;
    onSubmit: (data: Omit<MirthInstance, 'id'>) => void;
    onCancel: () => void;
}

export function InstanceForm({
    instance,
    onSubmit,
    onCancel,
}: InstanceFormProps) {
    const form = useForm({
        defaultValues: {
            name: instance?.name ?? '',
            url: instance?.url ?? '',
            username: instance?.username ?? '',
            password: instance?.password ?? '',
        },
        // @ts-ignore
        validatorAdapter: zodValidator(),
        validators: {
            onChange: instanceSchema,
        },
        onSubmit: async ({ value }) => {
            onSubmit(value);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="space-y-4"
        >
            <form.Field
                name="name"
                children={(field) => (
                    <div className="space-y-2">
                        <Label htmlFor={field.name}>Name</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors ? (
                            <p className="text-sm font-medium text-destructive">
                                {field.state.meta.errors.join(', ')}
                            </p>
                        ) : null}
                    </div>
                )}
            />

            <form.Field
                name="url"
                children={(field) => (
                    <div className="space-y-2">
                        <Label htmlFor={field.name}>URL</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors ? (
                            <p className="text-sm font-medium text-destructive">
                                {field.state.meta.errors.join(', ')}
                            </p>
                        ) : null}
                    </div>
                )}
            />

            <form.Field
                name="username"
                children={(field) => (
                    <div className="space-y-2">
                        <Label htmlFor={field.name}>Username</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors ? (
                            <p className="text-sm font-medium text-destructive">
                                {field.state.meta.errors.join(', ')}
                            </p>
                        ) : null}
                    </div>
                )}
            />

            <form.Field
                name="password"
                children={(field) => (
                    <div className="space-y-2">
                        <Label htmlFor={field.name}>Password</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            type="password"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors ? (
                            <p className="text-sm font-medium text-destructive">
                                {field.state.meta.errors.join(', ')}
                            </p>
                        ) : null}
                    </div>
                )}
            />

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">{instance ? 'Update' : 'Create'}</Button>
            </div>
        </form>
    );
}
