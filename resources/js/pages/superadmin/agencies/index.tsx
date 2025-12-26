import { Badge } from '@/components/ui/badge';
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
import { create, deleteMethod, edit } from '@/routes/superadmin/agencies';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { PencilIcon, PlusIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agencies',
        href: '/superadmin/agencies',
    },
    {
        title: 'Lists',
        href: '/superadmin/agencies',
    },
];

type agencyModel = {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
};

type Props = {
    agencies: agencyModel[];
};

export default function Dashboard({ agencies }: Props) {
    const { delete: destroy } = useForm();
    const handleDelete = async (agency: agencyModel) => {
        destroy(deleteMethod.url(agency), {
            onSuccess: () => toast.success('Agency deleted successfully'),
            onError: () => toast.error('Agency could not be deleted'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agencies" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Agencies List</h2>
                        <div>
                            <Link href={create().url}>
                                <Button>
                                    <PlusIcon /> Agency
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
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
                                {agencies.map(
                                    (agency: {
                                        id: number;
                                        name: string;
                                        slug: string;
                                        is_active: boolean;
                                    }) => (
                                        <TableRow key={agency.id}>
                                            <TableCell>{agency.name}</TableCell>
                                            <TableCell>{agency.slug}</TableCell>
                                            <TableCell>
                                                {agency.is_active ? (
                                                    <Badge variant="default">
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="destructive">
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={edit.url({
                                                        agency: agency,
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
                                                            Delete Agency
                                                        </DialogHeader>
                                                        <DialogDescription>
                                                            Press confirm to
                                                            delete agency
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
                                                                        agency,
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
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
