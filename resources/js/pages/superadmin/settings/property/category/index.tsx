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
import { dashboard } from '@/routes';
import {
    create,
    deleteMethod,
    edit,
} from '@/routes/superadmin/settings/property/category';
import { view } from '@/routes/superadmin/settings/property/type';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PlusIcon, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: dashboard().url,
    },
    {
        title: 'Property Category',
        href: dashboard().url,
    },
];

type Category = {
    id: number;
    category_name: string;
};

type Props = {
    categories: Category[];
};

export default function Dashboard({ categories }: Props) {
    const { props } = usePage();
    const flash = (props as any).flash;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    const { delete: destroy } = useForm();
    const handleDelete = async (category: Category) => {
        destroy(deleteMethod.url(category), {
            onSuccess: () =>
                toast.success('Property category deleted successfully'),
            onError: () => toast.error('Failed to delete property category'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Property Category" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Property Categories
                        </h2>
                        <div>
                            <Link href={create.url()}>
                                <Button variant="default">
                                    <PlusIcon />
                                    New Category
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
                                    <TableHead className="w-[100px]">
                                        Type
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
                                {categories.length > 0 ? (
                                    categories.map((category: Category) => (
                                        <TableRow key={category.id}>
                                            <TableCell>
                                                {category.category_name}
                                            </TableCell>
                                            <TableCell>
                                                <Link href={view.url(category)}>
                                                    View
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={edit.url(category.id)}
                                                >
                                                    Edit
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
                                                            Delete Property
                                                            Category
                                                        </DialogHeader>
                                                        <DialogDescription>
                                                            Press confirm to
                                                            delete property
                                                            category
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
                                                                        category,
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
                                        <TableCell colSpan={2}>
                                            No categories yet.
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
