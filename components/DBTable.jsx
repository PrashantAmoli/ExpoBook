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

export default function DBTable({ data }) {
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
			accessorKey: 'booked',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Booking Status
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => {
				return (
					<div className="flex gap-2">
						<Switch checked={row.getValue('available')} onCheckedChange={() => toggleSlot({ slot: row.getValue('slot') })} />
						<span className="text-xs">{row.getValue('available') ? 'Available' : 'Booked'}</span>
					</div>
				);
			},
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
					{row.getValue('length')}X{row.getValue('width')}
				</div>
			),
		},
		{
			accessorKey: 'length',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Length
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('length')}</div>,
		},
		{
			accessorKey: 'width',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Width
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('width')}</div>,
		},
		{
			accessorKey: 'booking_data',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Booking Data
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('booking_data')}</div>,
		},
		{
			accessorKey: 'exhibitor_name',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor Name
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_name')}</div>,
		},
		{
			accessorKey: 'exhibitor_position',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor Position
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_position')}</div>,
		},
		{
			accessorKey: 'exhibitor_company',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor Company
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_company')}</div>,
		},
		{
			accessorKey: 'exhibitor_brand',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor Brand
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_brand')}</div>,
		},
		{
			accessorKey: 'exhibitor_email',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor Email
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_email')}</div>,
		},
		{
			accessorKey: 'exhibitor_contact_number',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor Contact Number
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_contact_number')}</div>,
		},
		{
			accessorKey: 'exhibitor_alternate_contact_number',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor Alternate Contact Number
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_alternate_contact_number')}</div>,
		},
		{
			accessorKey: 'exhibitor_business_category',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor Business Category
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_business_category')}</div>,
		},
		{
			accessorKey: 'exhibitor_product_category',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor Product Category
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_product_category')}</div>,
		},
		{
			accessorKey: 'exhibitor_website',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor Website
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_website')}</div>,
		},
		{
			accessorKey: 'exhibitor_city',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibitor City
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibitor_city')}</div>,
		},
		{
			accessorKey: 'organizer_name',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Organizer Name
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('organizer_name')}</div>,
		},
		{
			accessorKey: 'organizer_email',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Organizer Email
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('organizer_email')}</div>,
		},
		{
			accessorKey: 'organizer_contact_number',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Organizer Contact No.
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('organizer_contact_number')}</div>,
		},
		{
			accessorKey: 'organizer_website',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Organizer Website
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('organizer_website')}</div>,
		},
		{
			accessorKey: 'exhibition_title',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibition Title
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibition_title')}</div>,
		},
		{
			accessorKey: 'exhibition_category',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibition Category
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibition_category')}</div>,
		},
		{
			accessorKey: 'exhibition_city',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="truncate" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibition City
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase">{row.getValue('exhibition_city')}</div>,
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
					<DropdownMenuContent align="end" className="overflow-y-auto max-h-96">
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
										{/* {column.id} */}
										{/* replace _ with ' ' and capitalize first letter of everyword */}
										{column.id.replace(/_/g, ' ').replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}
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
										<>
											<TableHead key={header.id}>
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										</>
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
