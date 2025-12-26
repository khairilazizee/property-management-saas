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
    { label: 'My listings', value: '14', trend: '+2 this month' },
    { label: 'Active clients', value: '9', trend: '3 new inquiries' },
    { label: 'Showings this week', value: '6', trend: 'Next 7 days' },
];

const showings = [
    {
        property: 'Lakeside Studio',
        client: 'A. Tan',
        time: 'Tue, 10:30 AM',
        status: 'Confirmed',
    },
    {
        property: 'Cypress Loft',
        client: 'M. Reyes',
        time: 'Wed, 3:00 PM',
        status: 'Pending',
    },
    {
        property: 'Maple Ridge Townhome',
        client: 'J. Lim',
        time: 'Fri, 11:00 AM',
        status: 'Confirmed',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agent Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Agent Overview
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Your activity and upcoming showings.
                        </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <span className="rounded-md border px-2 py-1">
                            Today
                        </span>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                        <CardTitle>Upcoming showings</CardTitle>
                        <CardDescription>
                            Your next confirmed appointments.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Property</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {showings.map((showing) => (
                                    <TableRow key={showing.property}>
                                        <TableCell className="font-medium">
                                            {showing.property}
                                        </TableCell>
                                        <TableCell>{showing.client}</TableCell>
                                        <TableCell>{showing.time}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    showing.status ===
                                                    'Pending'
                                                        ? 'secondary'
                                                        : 'default'
                                                }
                                            >
                                                {showing.status}
                                            </Badge>
                                        </TableCell>
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
