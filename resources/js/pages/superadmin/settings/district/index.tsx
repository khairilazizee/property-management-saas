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
import { index as stateIndex } from '@/routes/state';
import { index as districtIndex } from '@/routes/superadmin/settings/district';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { PencilIcon, PlusIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type StateModel = {
    id: number;
    name: string;
    state_code: string;
    state_abbr: string;
};

type DistrictModel = {
    id: number;
    name: string;
    district_code: string;
    district_abbr: string;
};

type Props = {
    state: StateModel;
    districts: DistrictModel[];
};

export default function DistrictIndex({ state, districts }: Props) {
    const { delete: destroy } = useForm();

    const districtBaseUrl = districtIndex.url(state);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Settings',
            href: stateIndex().url,
        },
        {
            title: 'State',
            href: stateIndex().url,
        },
        {
            title: state.name,
            href: districtBaseUrl,
        },
        {
            title: 'Districts',
            href: districtBaseUrl,
        },
    ];

    const handleDelete = async (district: DistrictModel) => {
        destroy(`${districtBaseUrl}/${district.id}`, {
            onSuccess: () => toast.success('District deleted successfully'),
            onError: () => toast.error('Failed to delete district'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Districts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <h2 className="font-bold">District List</h2>
                            <p className="text-sm text-muted-foreground">
                                State: {state.name}
                            </p>
                        </div>
                        <Link
                            href={`/superadmin/settings/district/${state.id}/create`}
                        >
                            <Button>
                                <PlusIcon />
                                Add District
                            </Button>
                        </Link>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>District</TableHead>
                                    <TableHead className="w-[140px]">
                                        District Code
                                    </TableHead>
                                    <TableHead className="w-[80px]">
                                        Edit
                                    </TableHead>
                                    <TableHead className="w-[80px]">
                                        Delete
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {districts.length > 0 ? (
                                    districts.map((district) => (
                                        <TableRow key={district.id}>
                                            <TableCell>
                                                {district.name}
                                            </TableCell>

                                            <TableCell>
                                                {district.district_code}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={`/superadmin/settings/district/${state.id}/${district.id}/edit`}
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
                                                                Delete District
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Press confirm to
                                                                delete district
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
                                                                        district,
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
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            No districts found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="pt-4">
                            <Link href={stateIndex().url}>
                                <Button variant="secondary">
                                    Back to States
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
