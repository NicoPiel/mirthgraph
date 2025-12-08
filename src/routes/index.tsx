import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: App });

function App() {
    return (
        <div className="container py-10">
            <h1 className="text-4xl font-bold">Welcome to MirthGraph</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Visualize and manage your Mirth Connect channels.
            </p>
        </div>
    );
}
