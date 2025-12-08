import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { MirthInstance } from '../types';
import { Button } from '@/components/ui/button';

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
                        <label
                            htmlFor={field.name}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Name
                        </label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                        <label
                            htmlFor={field.name}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            URL
                        </label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                        <label
                            htmlFor={field.name}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Username
                        </label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                        <label
                            htmlFor={field.name}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Password
                        </label>
                        <input
                            id={field.name}
                            name={field.name}
                            type="password"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
