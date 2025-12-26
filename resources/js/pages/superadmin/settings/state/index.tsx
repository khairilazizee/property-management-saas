import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { destroy as destroyRoute, index } from '@/routes/state';
import { index as districtIndex } from '@/routes/superadmin/settings/district';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { PencilIcon, PlusIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: index().url,
    },
    {
        title: 'State',
        href: index().url,
    },
    {
        title: 'Lists',
        href: index().url,
    },
];

type StateModel = {
    id: number;
    name: string;
    state_code: string;
    state_abbr: string;
};

type Props = {
    states: StateModel[];
};

export default function Dashboard({ states }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = async (state: StateModel) => {
        destroy(destroyRoute.url(state.id), {
            onSuccess: () => toast.success('State deleted successfully'),
            onError: () => toast.error('Failed to delete state'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="State" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">State List</h2>
                        <Link href="/superadmin/settings/state/create">
                            <Button>
                                <PlusIcon />
                                Add State
                            </Button>
                        </Link>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>State</TableHead>
                                    <TableHead className="w-[100px]">
                                        State Abbr.
                                    </TableHead>
                                    <TableHead className="w-[100px]">
                                        State Code
                                    </TableHead>
                                    <TableHead className="w-[100px]">
                                        District
                                    </TableHead>
                                    <TableHead className="w-[100px]">
                                        Edit
                                    </TableHead>
                                    <TableHead className="w-[100px]">
                                        Delete
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {states.map(
                                    (state: {
                                        id: number;
                                        name: string;
                                        state_code: string;
                                        state_abbr: string;
                                    }) => (
                                        <TableRow key={state.id}>
                                            <TableCell>{state.name}</TableCell>
                                            <TableCell>
                                                {state.state_abbr}
                                            </TableCell>
                                            <TableCell>
                                                {state.state_code}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={districtIndex.url(
                                                        state,
                                                    )}
                                                >
                                                    View
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={`/superadmin/settings/state/${state.id}/edit`}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <PencilIcon />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                        >
                                                            <Trash2 />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Delete State
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Press confirm to
                                                                delete state
                                                            </DialogDescription>
                                                        </DialogHeader>
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
                                                                        state,
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
