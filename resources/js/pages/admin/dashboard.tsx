import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const stats = [
    { label: 'Active listings', value: '124', trend: '+8 this week' },
    { label: 'Active agents', value: '18', trend: '4 currently on duty' },
    { label: 'New leads', value: '36', trend: '+12 since yesterday' },
    { label: 'Showings booked', value: '29', trend: 'Next 7 days' },
];

const listings = [
    {
        name: 'Maple Ridge Townhome',
        status: 'Live',
        price: '$428,000',
        views: '1,240',
    },
    {
        name: 'Lakeside Studio',
        status: 'Pending',
        price: '$210,000',
        views: '760',
    },
    {
        name: 'Willow Park Estate',
        status: 'Live',
        price: '$1.2M',
        views: '2,980',
    },
    {
        name: 'Cypress Loft',
        status: 'Draft',
        price: '$540,000',
        views: '310',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agency Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Agency Overview
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Quick snapshot of listings and pipeline.
                        </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <span className="rounded-md border px-2 py-1">
                            Week 32 snapshot
                        </span>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.label}>
                            <CardHeader>
                                <CardDescription>{stat.label}</CardDescription>
                                <CardTitle className="text-3xl">
                                    {stat.value}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                {stat.trend}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Listing pulse</CardTitle>
                        <CardDescription>
                            Top listings by engagement.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Property</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Views</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {listings.map((listing) => (
                                    <TableRow key={listing.name}>
                                        <TableCell className="font-medium">
                                            {listing.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    listing.status === 'Draft'
                                                        ? 'secondary'
                                                        : listing.status ===
                                                            'Pending'
                                                          ? 'outline'
                                                          : 'default'
                                                }
                                            >
                                                {listing.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{listing.price}</TableCell>
                                        <TableCell>{listing.views}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
