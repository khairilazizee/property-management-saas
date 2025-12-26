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
import { create, deleteMethod, edit } from '@/routes/admin/members';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CheckIcon, PencilIcon, PlusIcon, Trash2, XIcon } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agency',
        href: '',
    },
    {
        title: 'Members',
        href: '',
    },
    {
        title: 'List',
        href: '',
    },
];

type agencyMemberModel = {
    id: number;
    name: string;
    ren_no: string;
    role: string;
    is_active: boolean;
    user: {
        email: string;
    };
};

type Props = {
    agents: agencyMemberModel[];
};

export default function Dashboard({ agents }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = async (agent: agencyMemberModel) => {
        destroy(deleteMethod.url(agent), {
            onSuccess: () => toast.success('Agent deleted successfully'),
            onError: () => toast.error('Agent could not be deleted'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Agents Information</h2>
                        <Link href={create.url()}>
                            <Button variant="default">
                                <PlusIcon /> Add Agent
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
                                    <TableHead>Ren</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Active</TableHead>
                                    <TableHead className="w-[50px]">
                                        Edit
                                    </TableHead>
                                    <TableHead className="w-[50px]">
                                        Delete
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agents.map((agent: agencyMemberModel) => (
                                    <TableRow key={agent.id}>
                                        <TableCell>{agent.name}</TableCell>
                                        <TableCell>
                                            {agent.user.email}
                                        </TableCell>
                                        <TableCell>{agent.ren_no}</TableCell>
                                        <TableCell className="first-letter:uppercase">
                                            {agent.role}
                                        </TableCell>
                                        <TableCell>
                                            {agent.is_active ? (
                                                <CheckIcon />
                                            ) : (
                                                <XIcon />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={edit.url({
                                                    member: agent,
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
                                                        Delete Agent
                                                    </DialogHeader>
                                                    <DialogDescription>
                                                        Press confirm to delete
                                                        agent
                                                    </DialogDescription>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
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
                                                                    agent,
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
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
