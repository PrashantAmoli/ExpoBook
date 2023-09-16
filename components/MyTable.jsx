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
import { Switch } from './ui/switch';

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
	{
		id: 'm5gr84i8',
		amount: 317,
		title: 'Project 2',
		status: 'success',
		email: 'ken99@gmail.com',
		design: 'https://imagekit.io/image8.glb',
		model: 'https://imagekit.io/image8.glb',
		password: '123456',
		images: ['https://imagekit.io/image8.glb', 'https://imagekit.io/image8.glb', 'https://imagekit.io/image8.glb', 'https://imagekit.io/image8.glb'],
	},
	{
		id: 'm5gr84i7',
		amount: 318,
		title: 'Project 3',
		status: 'success',
		email: 'ken99@gmail.com',
		design: 'https://imagekit.io/image8.glb',
		model: 'https://imagekit.io/image8.glb',
		password: '123456',
		images: ['https://imagekit.io/image8.glb', 'https://imagekit.io/image8.glb', 'https://imagekit.io/image8.glb', 'https://imagekit.io/image8.glb'],
	},
];

export default function MyTable({ data }) {
	// const { slots: data, toggleSlot, updateMoviesList } = useMovies();

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
		{
			accessorKey: 'slot',
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Slot
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="uppercase">{row.getValue('slot')}</div>,
		},
		{
			accessorKey: 'size',
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Size
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="lowercase">
					{row.getValue('length') || 10}X{row.getValue('width') || 12}
				</div>
			),
		},
		{
			accessorKey: 'booked',
			header: 'Status',
			cell: ({ row }) => {
				return (
					<div className="flex gap-2">
						<Switch checked={row.getValue('booked')} onCheckedChange={() => toggleSlot({ slot: row.getValue('slot') })} />
						<span className="text-xs">{row.getValue('booked') ? 'Booked' : 'Available'}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'direct_booking',
			header: 'Direct Booking',
			cell: ({ row }) => {
				return (
					<div className="flex gap-2">
						<Switch checked={row.getValue('direct_booking')} onCheckedChange={() => toggleSlot({ slot: row.getValue('slot') })} />
						<span className="text-xs">{row.getValue('direct_booking') ? 'Available' : 'Booked'}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'status',
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Status
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('status')}</div>,
		},
		{
			accessorKey: 'id',
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						ID
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('id')}</div>,
		},
		{
			accessorKey: 'exhibition_id',
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibition ID
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibition_id')}</div>,
		},
		// {
		// 	accessorKey: 'amount',
		// 	header: () => <div className="text-right">Amount</div>,
		// 	cell: ({ row }) => {
		// 		const amount = parseFloat(row.getValue('amount'));

		// 		// Format the amount as a dollar amount
		// 		const formatted = new Intl.NumberFormat('en-US', {
		// 			style: 'currency',
		// 			currency: 'USD',
		// 		}).format(amount);

		// 		return <div className="font-medium text-right">{formatted}</div>;
		// 	},
		// },
		// {
		// 	accessorKey: 'design',
		// 	header: () => <div className="text-right">Design</div>,
		// 	cell: ({ row }) => {
		// 		const design = row.getValue('design');

		// 		return <div className="font-medium text-right truncate">{design}</div>;
		// 	},
		// },
		// {
		// 	accessorKey: 'model',
		// 	header: () => <div className="text-right">Model</div>,
		// 	cell: ({ row }) => {
		// 		const model = row.getValue('model');

		// 		return <div className="font-medium text-right truncate">{model}</div>;
		// 	},
		// },
		// {
		// 	accessorKey: 'images',
		// 	header: () => <div className="text-right">Images</div>,
		// 	cell: ({ row }) => {
		// 		const images = row.getValue('images');

		// 		return <div className="font-medium text-right truncate">{images.length}</div>;
		// 	},
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
							<DropdownMenuItem onClick={() => navigator.clipboard.writeText(slot.id)}>{JSON.stringify(slot)}</DropdownMenuItem>
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
		data,
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
		<div className="w-full">
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
						{table.getRowModel().rows?.length ? (
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
