import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Network, Settings, Activity } from 'lucide-react';

export const Route = createFileRoute('/')({ component: App });

function App() {
    return (
        <div className="container mx-auto py-10 space-y-10">
            <section className="flex flex-col items-center text-center space-y-4 py-10 md:py-20">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                    Welcome to MirthGraph
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                    Visualize and manage your Mirth Connect channels with ease.
                    Gain insights into your integration architecture.
                </p>
                <div className="flex gap-4 pt-4">
                    <Button asChild size="lg">
                        <Link to="/graph">
                            View Graph <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link to="/settings">Configure Instances</Link>
                    </Button>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <Network className="h-10 w-10 mb-2 text-primary" />
                        <CardTitle>Channel Visualization</CardTitle>
                        <CardDescription>
                            Interactive graph view of your Mirth Connect
                            channels and their dependencies.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        See how your channels connect and interact with each
                        other in real-time.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <Settings className="h-10 w-10 mb-2 text-primary" />
                        <CardTitle>Instance Management</CardTitle>
                        <CardDescription>
                            Manage multiple Mirth Connect instances from a
                            single dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        Easily switch between different environments and
                        configurations.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <Activity className="h-10 w-10 mb-2 text-primary" />
                        <CardTitle>Status Monitoring</CardTitle>
                        <CardDescription>
                            Keep track of your channel status and health
                            metrics.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        Quickly identify issues and bottlenecks in your
                        integration workflow.
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
