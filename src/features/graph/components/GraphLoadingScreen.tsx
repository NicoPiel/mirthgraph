import React, { useEffect, useState } from 'react';

const STATUS_MESSAGES = [
    'Fetching channels...',
    'Fetching tags...',
    'Building graph...',
];

// Node positions (cx, cy as % of viewBox 0 0 200 200)
const NODES = [
    { x: 100, y:  30, color: '#3b82f6', delay: '0ms'    }, // Channel - top
    { x: 162, y:  65, color: '#10b981', delay: '250ms'  }, // TCP Listener
    { x: 162, y: 135, color: '#8b5cf6', delay: '500ms'  }, // HTTP Listener
    { x: 100, y: 170, color: '#f59e0b', delay: '750ms'  }, // Database Reader
    { x:  38, y: 135, color: '#06b6d4', delay: '1000ms' }, // Channel Writer
    { x:  38, y:  65, color: '#14b8a6', delay: '1250ms' }, // TCP Sender
];

const EDGES = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4],
];

export const GraphLoadingScreen: React.FC = () => {
    const [statusIndex, setStatusIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
        }, 1200);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-background">
            <svg
                viewBox="0 0 200 200"
                width="220"
                height="220"
                aria-hidden="true"
                overflow="visible"
            >
                {/* Static edges */}
                {EDGES.map(([a, b], i) => (
                    <line
                        key={i}
                        x1={NODES[a].x}
                        y1={NODES[a].y}
                        x2={NODES[b].x}
                        y2={NODES[b].y}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-muted-foreground/20"
                    />
                ))}

                {/* Pulsing nodes — scale via transform so no <style> tag needed */}
                {NODES.map((node, i) => (
                    <circle
                        key={i}
                        cx={node.x}
                        cy={node.y}
                        r={9}
                        fill={node.color}
                        className="animate-pulse"
                        style={{ animationDelay: node.delay, transformOrigin: `${node.x}px ${node.y}px` }}
                    />
                ))}
            </svg>

            <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                mirthgraph
            </p>
            <p className="mt-1 text-sm text-muted-foreground min-w-[160px] text-center">
                {STATUS_MESSAGES[statusIndex]}
            </p>
        </div>
    );
};
