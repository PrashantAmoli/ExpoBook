import * as React from 'react';
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useMovies from '@/context/context';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const data = [
	{
		id: 'm5gr84i9',
		amount: 316,
		title: 'Project 1',
		status: 'success',
		email: 'ken99@yahoo.com',
		design: 'https://imagekit.io/image8.glb',
		model: 'https://imagekit.io/image8.glb',
		password: '123456',
		images: ['https://imagekit.io/image8.glb', 'https://imagekit.io/image8.glb', 'https://imagekit.io/image8.glb', 'https://imagekit.io/image8.glb'],
	},
];

export default function UsersAdminTable({ users, children, className, ...props }) {
	const { slots: data, toggleSlot, updateMoviesList } = useMovies();

	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState();
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [statusFilter, setStatusFilter] = React.useState('all');

	const columns = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label="Select row" />,
			enableSorting: false,
			enableHiding: false,
		},
		// {
		// 	accessorKey: 'email',
		// 	header: ({ column }) => {
		// 		return (
		// 			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
		// 				Email
		// 				<CaretSortIcon className="w-4 h-4 ml-2" />
		// 			</Button>
		// 		);
		// 	},
		// 	cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
		// },
		// {
		// 	accessorKey: 'role',
		// 	header: 'Role',
		// 	cell: ({ row }) => <div className="lowercase">{row.getValue('role')}</div>,
		// },
		// {
		// 	accessorKey: 'first_name',
		// 	header: 'First Name',
		// 	cell: ({ row }) => <div className="lowercase">{row.getValue('first_name')}</div>,
		// },
		// {
		// 	accessorKey: 'last_name',
		// 	header: 'Last Name',
		// 	cell: ({ row }) => <div className="lowercase">{row.getValue('last_name')}</div>,
		// },
		// {
		// 	accessorKey: 'slot',
		// 	header: ({ column }) => {
		// 		return (
		// 			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
		// 				Size
		// 				<CaretSortIcon className="w-4 h-4 ml-2" />
		// 			</Button>
		// 		);
		// 	},
		// 	cell: ({ row }) => <div className="lowercase">4X4</div>,
		// },
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => {
				const slot = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="w-8 h-8 p-0">
								<span className="sr-only">Open menu</span>
								<DotsHorizontalIcon className="w-4 h-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onClick={() => navigator.clipboard.writeText(slot.id)}>{JSON.stringify({})}</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>View customer</DropdownMenuItem>
							<DropdownMenuItem>View payment details</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const table = useReactTable({
		users,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className={cn('', className)}>
			<p className="my-5 break-words border">
				{users.length}
				{JSON.stringify(data)}
			</p>

			<div className="flex items-center gap-2 py-4">
				{/* <Input
					placeholder="Filter emails..."
					value={table.getColumn('email')?.getFilterValue() ?? ''}
					onChange={event => table.getColumn('email')?.setFilterValue(event.target.value)}
					className="max-w-xs"
				/> */}

				<Input
					placeholder="Search slot..."
					value={table.getColumn('slot')?.getFilterValue() ?? ''}
					onChange={event => table.getColumn('slot')?.setFilterValue(event.target.value)}
					className="max-w-xs"
				/>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">Open</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup
							value={statusFilter}
							onChange={event => table.getColumn('status')?.setFilterValue(statusFilter.toLowerCase())}
							onValueChange={setStatusFilter}
						>
							<DropdownMenuRadioItem value="top">success</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="bottom">failed</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="right">error</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="right">live</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="right">inactive</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDownIcon className="w-4 h-4 ml-2" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter(column => column.getCanHide())
							.map(column => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={value => column.toggleVisibility(!!value)}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="border rounded-md">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table?.getRowModel()?.rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end py-4 space-x-2">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
