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
import { Switch } from '../ui/switch';
import { supabase } from '@/utils/supabase';
import { Badge } from '../ui/badge';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const data = [
	{
		id: 'm5gr84i9',
		exhibition_id: 1,
		slot: '1',
		description: 'This is the first slot',
		status: 'available',
		direct_booking: true,
		booked: false,
		length: 4,
		width: 4,
		createdAt: '2021-01-01',
		updatedAt: '2021-01-01',
	},
];

export default function SlotsTable({ data = [] }) {
	const [sorting, setSorting] = React.useState([]);
	const [columnFilters, setColumnFilters] = React.useState();
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [statusFilter, setStatusFilter] = React.useState('all');

	const router = useRouter();
	const { exhibition_id } = router.query;

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
					<Button variant="ghost" className="px-2 w-max" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Slot
						<CaretSortIcon className="w-4 h-4" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="text-center uppercase">{row.getValue('slot')}</div>,
		},
		{
			accessorKey: 'description',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="px-2 w-max" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Description
						<CaretSortIcon className="w-4 h-4 ml-1" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="truncate w-36">{row.getValue('description')}</div>,
		},
		{
			accessorKey: 'exhibitions',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="px-2 w-max" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibition
						<CaretSortIcon className="w-4 h-4 ml-1" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="truncate">
					#{row.getValue('exhibitions')?.id}. {row.getValue('exhibitions')?.title}
				</div>
			),
		},
		{
			accessorKey: 'open',
			header: '',
			cell: ({ row }) => {
				return (
					<div className="flex gap-2">
						<Link href={`/admin/exhibitions/${exhibition_id}/${row.getValue('slot')}`}>
							<Button variant="outline">Open</Button>
						</Link>
					</div>
				);
			},
			enableHiding: false,
			enableSorting: false,
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				return (
					<div className="flex gap-2">
						<Badge variant={''}>{row.getValue('status') ? 'available' : 'booked'}</Badge>
					</div>
				);
			},
		},
		{
			accessorKey: 'direct_booking',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="px-1 w-max">
						Direct Booking
					</Button>
				);
			},
			cell: ({ row }) => {
				return (
					<div className="flex gap-2">
						<Switch checked={row.getValue('direct_booking')} />
						<span className="text-xs">{row.getValue('direct_booking') ? 'Bookings' : 'Inquiries'}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'booked',
			header: 'Booked',
			cell: ({ row }) => {
				return (
					<div className="flex gap-2">
						<Switch checked={row.getValue('booked')} />
						<span className="text-xs">{row.getValue('booked') ? 'Booked' : 'Available'}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'booked_by',
			header: 'Booked By',
			cell: ({ row }) => {
				return (
					<div className="flex gap-2">
						<span className="text-xs">{row.getValue('booked_by') || '___________'}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'length',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="px-2 w-max" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Length
						<CaretSortIcon className="w-4 h-4 ml-1" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="text-center lowercase">{row.getValue('length')}</div>,
		},
		{
			accessorKey: 'width',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="px-2 w-max" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Width
						<CaretSortIcon className="w-4 h-4 ml-1" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="text-center lowercase">{row.getValue('width')}</div>,
		},
		{
			accessorKey: 'size',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="px-2 w-max" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Size
						<CaretSortIcon className="w-4 h-4 ml-1" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="lowercase">
					{row.getValue('length')}X{row.getValue('width')} &nbsp; ({row.getValue('length') * row.getValue('width')})
				</div>
			),
		},
		{
			accessorKey: 'exhibition_id',
			header: ({ column }) => {
				return (
					<Button variant="ghost" className="px-2 w-max" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Exhibition ID
						<CaretSortIcon className="w-4 h-4 ml-1" />
					</Button>
				);
			},
			cell: ({ row }) => <div className="text-center lowercase">{row.getValue('exhibition_id')}</div>,
		},
		{
			id: 'actions',
			enableHiding: false,
			pinned: 'left',
			cell: ({ row }) => {
				const slot = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="inline-flex w-8 h-8 p-0 rounded-full hover:scale-105">
								<span className="sr-only">Open menu</span>
								<DotsHorizontalIcon className="w-5 h-5" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => navigator.clipboard.writeText(slot.id)}>Slot: {slot.slot}</DropdownMenuItem>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={async () => {
									const confirmed = window.confirm('Are you sure you want to toggle direct booking?');
									if (confirmed) {
										const res = await supabase
											.from('slots')
											.update({ direct_booking: !slot.direct_booking })
											.match({ id: slot.id, exhibition_id: slot.exhibition_id, slot: slot.slot });
										if (res?.error) {
											alert(res.error.message);
										}

										console.log('Toggle Direct Booking', res);
									}
								}}
							>
								Toggle Direct Booking
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={async () => {
									const confirmed = window.confirm('Are you sure you want to toggle booking status?');
									if (confirmed) {
										const res = await supabase
											.from('slots')
											.update({ booked: !slot.booked })
											.match({ id: slot.id, exhibition_id: slot.exhibition_id, slot: slot.slot });
										if (res?.error) {
											alert(res.error.message);
										}

										console.log('Toggle Booking Status', res);
									}
								}}
							>
								Toggle Status
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem
								onClick={async () => {
									const confirmed = window.confirm('Are you sure you want to delete this slot?');
									if (confirmed) {
										const res = await supabase.from('slots').delete().match({ id: slot.id, exhibition_id: slot.exhibition_id, slot: slot.slot });
										if (res?.error) {
											alert(res.error.message);
										}

										console.log('delete slot', res);
									}
								}}
							>
								Delete
							</DropdownMenuItem>
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

	React.useEffect(() => {
		table.setPageSize(50);
	}, [table]);

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
						<Button variant="outline">Status: {statusFilter}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup
							value={statusFilter}
							onChange={event => table.getColumn('status')?.setFilterValue(statusFilter.toLowerCase())}
							onValueChange={e => {
								table.getColumn('status')?.setFilterValue(e);
								setStatusFilter(e);
							}}
						>
							<DropdownMenuRadioItem value="available">available</DropdownMenuRadioItem>
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
							Columns <ChevronDownIcon className="w-4 h-4 ml-1" />
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

				<div className="flex space-x-2">
					<div className="flex items-center gap-2">
						Rows per page
						<Select
							defaultValue={50}
							onValueChange={e => {
								table.setPageSize(e);
							}}
						>
							<SelectTrigger className="w-fit">
								<SelectValue placeholder="10" />
							</SelectTrigger>

							<SelectContent>
								<SelectGroup>
									<SelectLabel>No. of rows</SelectLabel>
									<SelectItem value={10}>10</SelectItem>
									<SelectItem value={25}>25</SelectItem>
									<SelectItem value={50}>50</SelectItem>
									<SelectItem value={100}>100</SelectItem>
									<SelectItem value={150}>150</SelectItem>
									<SelectItem value={200}>200</SelectItem>
									<SelectItem value={300}>300</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

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
