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
import { create, deleteMethod, edit } from '@/routes/agent/properties';
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
        title: 'Properties',
        href: '',
    },
    {
        title: 'Lists',
        href: '',
    },
];

type PropertyCategory = {
    category_name: string;
};

type PropertyType = {
    type_name: string;
};

type Property = {
    id: number;
    title: string;
    price: number | string;
    status?: string | null;
    advertisement_type?: string | null;
    property_category?: PropertyCategory | null;
    property_type?: PropertyType | null;
};

type Props = {
    properties?: Property[] | { data: Property[] };
};

export default function PropertiesIndex({ properties }: Props) {
    const { delete: destroy } = useForm();
    const { props } = usePage();
    const flash = (props as any).flash;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    const propertyList = Array.isArray(properties)
        ? properties
        : (properties?.data ?? []);

    const handleDelete = async (property: Property) => {
        destroy(deleteMethod.url(property), {
            onSuccess: () => toast.success('Property deleted successfully'),
            onError: () => toast.error('Property could not be deleted'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Properties" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Properties List</h2>
                        <Link href={create.url()}>
                            <Button>
                                <PlusIcon /> Add Property
                            </Button>
                        </Link>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ads Type</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Price</TableHead>
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
                                {propertyList.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            No properties found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    propertyList.map((property) => (
                                        <TableRow key={property.id}>
                                            <TableCell className="first-letter:uppercase">
                                                {property.advertisement_type}
                                            </TableCell>
                                            <TableCell>
                                                {property.title}
                                            </TableCell>
                                            <TableCell>
                                                {property.property_category
                                                    ?.category_name ?? '-'}
                                            </TableCell>
                                            <TableCell>
                                                {property.property_type
                                                    ?.type_name ?? '-'}
                                            </TableCell>
                                            <TableCell>
                                                MYR {property.price}
                                            </TableCell>
                                            <TableCell className="first-letter:uppercase">
                                                {property.status ??
                                                    property.advertisement_type ??
                                                    '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={edit.url({
                                                        property: property,
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
                                                            Delete Property
                                                        </DialogHeader>
                                                        <DialogDescription>
                                                            Press confirm to
                                                            delete property
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
                                                                        property,
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
