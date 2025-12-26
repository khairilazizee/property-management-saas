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
import {
    create,
    deleteMethod,
    edit,
} from '@/routes/superadmin/settings/property/type';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PlusIcon, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type Category = {
    id: number;
    category_name: string;
};

type PropertyType = {
    id: number;
    type_name: string;
    type_slug: string;
};

type Props = {
    category: Category;
    types: PropertyType[];
};

export default function Dashboard({ category, types }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Settings',
            href: '',
        },
        {
            title: 'Property Category',
            href: '',
        },
        {
            title: category.category_name,
            href: '',
        },
        {
            title: 'Property Type',
            href: '',
        },
        {
            title: 'Lists',
            href: '',
        },
    ];
    const { props } = usePage();
    const flash = (props as any).flash;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    const { delete: destroy } = useForm();
    const handleDelete = async ({
        category,
        type,
    }: {
        category: Category;
        type: PropertyType;
    }) => {
        destroy(deleteMethod.url({ category, type }), {
            onSuccess: () =>
                toast.success('Property type deleted successfully'),
            onError: () => toast.error('Failed to delete property type'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Property Type" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Property Type</h2>
                        <div>
                            <Button variant="default" asChild>
                                <Link href={create.url(category)}>
                                    <PlusIcon /> Property Type
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type Name</TableHead>
                                    <TableHead className="w-[100px] text-left">
                                        &nbsp;
                                    </TableHead>
                                    <TableHead className="w-[100px]">
                                        &nbsp;
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {types.map((type) => (
                                    <TableRow key={type.id}>
                                        <TableCell>{type.type_name}</TableCell>

                                        <TableCell className="w-[100px] text-left">
                                            <Button asChild variant="secondary">
                                                <Link
                                                    href={edit.url({
                                                        category,
                                                        type,
                                                    })}
                                                >
                                                    Edit
                                                </Link>
                                            </Button>
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
                                                        Delete Property Category
                                                    </DialogHeader>
                                                    <DialogDescription>
                                                        Press confirm to delete
                                                        property category
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
                                                                handleDelete({
                                                                    category,
                                                                    type,
                                                                })
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
