import {
    HeadContent,
    Scripts,
    createRootRouteWithContext,
    Outlet,
    Link,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { InstanceSwitcher } from '@/app/components/InstanceSwitcher';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

import appCss from '../styles.css?url';

import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'MirthGraph',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    component: RootComponent,
});

function RootComponent() {
    return (
        <RootDocument>
            <div className="flex min-h-screen flex-col">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto flex h-14 items-center">
                        <div className="mr-4 hidden md:flex">
                            <Link
                                to="/"
                                className="mr-6 flex items-center space-x-2"
                            >
                                <span className="hidden font-bold sm:inline-block">
                                    MirthGraph
                                </span>
                            </Link>
                            <nav className="flex items-center space-x-6 text-sm font-medium">
                                <Link
                                    to="/graph"
                                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                                    activeProps={{
                                        className: 'text-foreground',
                                    }}
                                >
                                    Graph
                                </Link>
                                <Link
                                    to="/ports"
                                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                                    activeProps={{
                                        className: 'text-foreground',
                                    }}
                                >
                                    Ports
                                </Link>
                                <Link
                                    to="/settings"
                                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                                    activeProps={{
                                        className: 'text-foreground',
                                    }}
                                >
                                    Settings
                                </Link>
                            </nav>
                        </div>
                        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                            <div className="w-full flex-1 md:w-auto md:flex-none">
                                <InstanceSwitcher />
                            </div>
                            <ModeToggle />
                        </div>
                    </div>
                </header>
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </RootDocument>
    );
}

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    {children}
                    <TanStackDevtools
                        config={{
                            position: 'bottom-right',
                        }}
                        plugins={[
                            {
                                name: 'Tanstack Router',
                                render: <TanStackRouterDevtoolsPanel />,
                            },
                            TanStackQueryDevtools,
                        ]}
                    />
                    <Scripts />
                </ThemeProvider>
            </body>
        </html>
    );
}
