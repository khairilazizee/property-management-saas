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
    { label: 'Total agencies', value: '48', trend: '+4 this month' },
    { label: 'Active agents', value: '312', trend: '+18 this week' },
    { label: 'Live listings', value: '1,284', trend: '+9 today' },
];

const recentAgencies = [
    {
        name: 'Northpoint Realty',
        plan: 'Enterprise',
        status: 'Active',
        seats: '42',
        updated: '2d ago',
    },
    {
        name: 'Harborline Group',
        plan: 'Growth',
        status: 'Review',
        seats: '18',
        updated: '5d ago',
    },
    {
        name: 'Cedar & Co.',
        plan: 'Starter',
        status: 'Active',
        seats: '7',
        updated: '1w ago',
    },
    {
        name: 'Summit Lane',
        plan: 'Growth',
        status: 'Risk',
        seats: '23',
        updated: '2w ago',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Superadmin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Superadmin Overview
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Platform health and governance at a glance.
                        </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <span className="rounded-md border px-2 py-1">
                            Updated 5 min ago
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

                <div className="grid gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent agencies</CardTitle>
                            <CardDescription>
                                Latest onboarding and compliance status.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Agency</TableHead>
                                        <TableHead>Plan</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Seats</TableHead>
                                        <TableHead>Updated</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentAgencies.map((agency) => (
                                        <TableRow key={agency.name}>
                                            <TableCell className="font-medium">
                                                {agency.name}
                                            </TableCell>
                                            <TableCell>{agency.plan}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        agency.status ===
                                                        'Risk'
                                                            ? 'destructive'
                                                            : agency.status ===
                                                                'Review'
                                                              ? 'secondary'
                                                              : 'default'
                                                    }
                                                >
                                                    {agency.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{agency.seats}</TableCell>
                                            <TableCell>
                                                {agency.updated}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
