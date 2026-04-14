import React, { useEffect, useState } from 'react';

const STATUS_MESSAGES = [
    'Fetching channels...',
    'Fetching tags...',
    'Building graph...',
];

const NODES = [
    { cx: 150, cy: 60,  color: '#3b82f6', label: 'Channel',         delay: '0ms'   },
    { cx: 260, cy: 100, color: '#10b981', label: 'TCP Listener',     delay: '200ms' },
    { cx: 240, cy: 175, color: '#8b5cf6', label: 'HTTP Listener',    delay: '400ms' },
    { cx: 150, cy: 200, color: '#f59e0b', label: 'Database Reader',  delay: '600ms' },
    { cx: 55,  cy: 175, color: '#06b6d4', label: 'Channel Writer',   delay: '800ms' },
    { cx: 40,  cy: 100, color: '#14b8a6', label: 'TCP Sender',       delay: '1000ms'},
];

// Edges between node indices
const EDGES = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [0, 2], [0, 4],
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
                viewBox="0 0 300 260"
                width="260"
                height="260"
                aria-hidden="true"
            >
                <defs>
                    {NODES.map((node, i) => (
                        <radialGradient key={i} id={`glow-${i}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={node.color} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={node.color} stopOpacity="0" />
                        </radialGradient>
                    ))}
                    <style>{`
                        @keyframes pulse-node {
                            0%, 100% { r: 10; opacity: 1; }
                            50%       { r: 13; opacity: 0.7; }
                        }
                        @keyframes travel {
                            0%   { stroke-dashoffset: 200; opacity: 0.8; }
                            100% { stroke-dashoffset: 0;   opacity: 0;   }
                        }
                        .node-circle {
                            animation: pulse-node 2s ease-in-out infinite;
                        }
                        .edge-travel {
                            stroke-dasharray: 8 192;
                            animation: travel 2.4s linear infinite;
                        }
                    `}</style>
                </defs>

                {/* Edges */}
                {EDGES.map(([a, b], i) => {
                    const from = NODES[a];
                    const to   = NODES[b];
                    const len  = Math.hypot(to.cx - from.cx, to.cy - from.cy);
                    return (
                        <g key={i}>
                            {/* Static dim line */}
                            <line
                                x1={from.cx} y1={from.cy}
                                x2={to.cx}   y2={to.cy}
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-muted-foreground/20"
                            />
                            {/* Travelling particle */}
                            <line
                                x1={from.cx} y1={from.cy}
                                x2={to.cx}   y2={to.cy}
                                stroke={from.color}
                                strokeWidth="2"
                                strokeLinecap="round"
                                className="edge-travel"
                                style={{
                                    animationDelay: `${(i * 300) % 2400}ms`,
                                    strokeDasharray: `8 ${len}`,
                                }}
                            />
                        </g>
                    );
                })}

                {/* Glow halos */}
                {NODES.map((node, i) => (
                    <circle
                        key={`halo-${i}`}
                        cx={node.cx}
                        cy={node.cy}
                        r={22}
                        fill={`url(#glow-${i})`}
                        style={{ animationDelay: node.delay }}
                        className="node-circle"
                    />
                ))}

                {/* Node circles */}
                {NODES.map((node, i) => (
                    <circle
                        key={`node-${i}`}
                        cx={node.cx}
                        cy={node.cy}
                        r={10}
                        fill={node.color}
                        className="node-circle"
                        style={{ animationDelay: node.delay }}
                    />
                ))}
            </svg>

            <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                mirthgraph
            </p>
            <p className="mt-1 text-sm text-muted-foreground tabular-nums min-w-[160px] text-center transition-all duration-300">
                {STATUS_MESSAGES[statusIndex]}
            </p>
        </div>
    );
};
