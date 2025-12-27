import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agency',
        href: '',
    },
    {
        title: 'Leads',
        href: '',
    },
    {
        title: 'Lists',
        href: '',
    },
];

type LeadAgent = {
    name: string;
};

type LeadProperty = {
    title: string;
};

type Lead = {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    status?: string | null;
    source?: string | null;
    agent?: LeadAgent | null;
    property?: LeadProperty | null;
};

type Props = {
    leads?: Lead[] | { data: Lead[] };
};

export default function LeadsIndex({ leads }: Props) {
    const leadList = Array.isArray(leads) ? leads : (leads?.data ?? []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leads" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Leads List</h2>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Property</TableHead>
                                    <TableHead>Agent</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Source</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leadList.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            No leads found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    leadList.map((lead) => (
                                        <TableRow key={lead.id}>
                                            <TableCell>
                                                {lead.name}
                                            </TableCell>
                                            <TableCell>
                                                {lead.email ?? '-'}
                                            </TableCell>
                                            <TableCell>
                                                {lead.phone ?? '-'}
                                            </TableCell>
                                            <TableCell>
                                                {lead.property?.title ?? '-'}
                                            </TableCell>
                                            <TableCell>
                                                {lead.agent?.name ?? '-'}
                                            </TableCell>
                                            <TableCell className="first-letter:uppercase">
                                                {lead.status ?? '-'}
                                            </TableCell>
                                            <TableCell className="first-letter:uppercase">
                                                {lead.source ?? '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
