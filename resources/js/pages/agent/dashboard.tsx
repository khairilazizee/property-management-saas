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

type FollowUp = {
    id: number;
    property: string;
    client: string;
    time: string | null;
    status: string | null;
};

type PageProps = {
    stats: Stat[];
    followUps: FollowUp[];
};

export default function Dashboard({ stats, followUps }: PageProps) {
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
                        <CardTitle>Upcoming follow-ups</CardTitle>
                        <CardDescription>
                            Your next scheduled touchpoints.
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
                                {followUps.length ? (
                                    followUps.map((followUp) => (
                                        <TableRow key={followUp.id}>
                                            <TableCell className="font-medium">
                                                {followUp.property}
                                            </TableCell>
                                            <TableCell>
                                                {followUp.client}
                                            </TableCell>
                                            <TableCell>
                                                {followUp.time
                                                    ? new Date(
                                                          followUp.time,
                                                      ).toLocaleString(
                                                          'en-MY',
                                                          {
                                                              dateStyle:
                                                                  'medium',
                                                              timeStyle:
                                                                  'short',
                                                          },
                                                      )
                                                    : '—'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        followUp.status ===
                                                        'Pending'
                                                            ? 'secondary'
                                                            : 'default'
                                                    }
                                                >
                                                    {followUp.status ?? 'New'}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            className="text-sm text-muted-foreground"
                                            colSpan={4}
                                        >
                                            No upcoming follow-ups.
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
