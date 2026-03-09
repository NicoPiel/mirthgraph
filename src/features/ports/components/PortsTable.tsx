import * as React from 'react';
import {
    type Column,
    type ColumnDef,
    type FilterFn,
    type SortingFn,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import type { OccupiedPort } from '../types';

interface PortsTableProps {
    data: OccupiedPort[];
}

const portSortingFn: SortingFn<OccupiedPort> = (rowA, rowB, columnId) => {
    const portA = Number.parseInt(String(rowA.getValue(columnId) ?? ''), 10);
    const portB = Number.parseInt(String(rowB.getValue(columnId) ?? ''), 10);

    if (Number.isNaN(portA) && Number.isNaN(portB)) {
        return String(rowA.getValue(columnId) ?? '').localeCompare(
            String(rowB.getValue(columnId) ?? ''),
        );
    }

    if (Number.isNaN(portA)) {
        return 1;
    }

    if (Number.isNaN(portB)) {
        return -1;
    }

    return portA - portB;
};

const globalPortFilter: FilterFn<OccupiedPort> = (
    row,
    _columnId,
    filterValue,
) => {
    const query = String(filterValue ?? '')
        .trim()
        .toLowerCase();

    if (!query) {
        return true;
    }

    return [row.original.port, row.original.name, row.original.id].some(
        (value) => value.toLowerCase().includes(query),
    );
};

function SortableHeader<TData>({
    column,
    title,
}: {
    column: Column<TData, unknown>;
    title: string;
}) {
    return (
        <Button
            variant="ghost"
            className="-ml-3 h-8 px-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            {title}
            <ArrowUpDown className="h-4 w-4" />
        </Button>
    );
}

function renderValue(value: string) {
    return value || '—';
}

export function PortsTable({ data }: PortsTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: 'port', desc: false },
    ]);
    const [globalFilter, setGlobalFilter] = React.useState('');

    const columns = React.useMemo<ColumnDef<OccupiedPort>[]>(
        () => [
            {
                accessorKey: 'port',
                header: ({ column }) => (
                    <SortableHeader column={column} title="Port" />
                ),
                cell: ({ row }) => (
                    <span className="font-mono tabular-nums">
                        {renderValue(row.original.port)}
                    </span>
                ),
                sortingFn: portSortingFn,
            },
            {
                accessorKey: 'name',
                header: ({ column }) => (
                    <SortableHeader column={column} title="Name" />
                ),
                cell: ({ row }) => renderValue(row.original.name),
            },
            {
                accessorKey: 'id',
                header: ({ column }) => (
                    <SortableHeader column={column} title="ID" />
                ),
                cell: ({ row }) => (
                    <span className="font-mono text-xs sm:text-sm">
                        {renderValue(row.original.id)}
                    </span>
                ),
            },
        ],
        [],
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: globalPortFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const totalCount = data.length;
    const filteredCount = table.getFilteredRowModel().rows.length;

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={globalFilter}
                        onChange={(event) =>
                            setGlobalFilter(event.target.value)
                        }
                        placeholder="Search by port, name, or ID..."
                        className="pl-9 pr-9"
                        aria-label="Search occupied ports"
                    />
                    {globalFilter ? (
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                            onClick={() => setGlobalFilter('')}
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    ) : null}
                </div>
                <p className="text-sm text-muted-foreground">
                    Showing {filteredCount} of {totalCount} occupied ports
                </p>
            </div>

            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/40">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    {globalFilter
                                        ? `No occupied ports match "${globalFilter}".`
                                        : 'No occupied ports found for this instance.'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
