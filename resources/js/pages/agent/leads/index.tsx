import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
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
import { create, deleteMethod, edit } from '@/routes/agent/leads';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agent',
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
    preferred_location?: string | null;
    property?: LeadProperty | null;
};

type Props = {
    leads?: Lead[] | { data: Lead[] };
};

export default function LeadsIndex({ leads }: Props) {
    const { delete: destroy } = useForm();
    const { props } = usePage();
    const flash = (props as any).flash;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    const leadList = Array.isArray(leads) ? leads : (leads?.data ?? []);

    const handleDelete = async (lead: Lead) => {
        destroy(deleteMethod.url(lead), {
            onSuccess: () => toast.success('Lead deleted successfully'),
            onError: () => toast.error('Lead could not be deleted'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leads" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Leads List</h2>
                        <Link href={create.url()}>
                            <Button>
                                <PlusIcon /> Add Lead
                            </Button>
                        </Link>
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
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[50px]">
                                        Edit
                                    </TableHead>
                                    <TableHead className="w-[50px]">
                                        Delete
                                    </TableHead>
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
                                            <TableCell className="first-letter:uppercase">
                                                {lead.status ?? '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={edit.url({
                                                        lead: lead,
                                                    })}
                                                >
                                                    <PencilIcon />
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                        >
                                                            <Trash2 />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            Delete Lead
                                                        </DialogHeader>
                                                        <DialogDescription>
                                                            Press confirm to
                                                            delete lead
                                                        </DialogDescription>
                                                        <DialogFooter>
                                                            <DialogClose
                                                                asChild
                                                            >
                                                                <Button variant="secondary">
                                                                    Cancel
                                                                </Button>
                                                            </DialogClose>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                className="hover:cursor-pointer"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        lead,
                                                                    )
                                                                }
                                                            >
                                                                Confirm Delete
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
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
