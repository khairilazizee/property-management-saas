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

type Stat = {
    label: string;
    value: number;
    trend: string;
};

type Listing = {
    id: number;
    name: string;
    status: string | null;
    price: number | null;
    priceType: string | null;
    agent: string | null;
};

type PageProps = {
    stats: Stat[];
    listings: Listing[];
};

const formatPrice = (price: number | null, priceType: string | null) => {
    if (price === null) {
        return '—';
    }

    const formatted = new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR',
        maximumFractionDigits: 0,
    }).format(price);

    return priceType ? `${formatted} / ${priceType}` : formatted;
};

export default function Dashboard({ stats, listings }: PageProps) {
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
                                    {stat.value.toLocaleString()}
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
                        <CardTitle>Latest listings</CardTitle>
                        <CardDescription>
                            Recent properties added to the agency.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Property</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Agent</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {listings.length ? (
                                    listings.map((listing) => (
                                        <TableRow key={listing.id}>
                                            <TableCell className="font-medium">
                                                {listing.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        listing.status ===
                                                        'Draft'
                                                            ? 'secondary'
                                                            : listing.status ===
                                                                'Pending'
                                                              ? 'outline'
                                                              : 'default'
                                                    }
                                                >
                                                    {listing.status ?? 'Active'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {formatPrice(
                                                    listing.price,
                                                    listing.priceType,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {listing.agent ?? '—'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            className="text-sm text-muted-foreground"
                                            colSpan={4}
                                        >
                                            No listings yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
