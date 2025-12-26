import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index, update } from '@/routes/superadmin/settings/property/category';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

type PropertyCategoryModel = {
    id: number;
    category_name: string;
};

type Props = {
    category: PropertyCategoryModel;
};

export default function Dashboard({ category }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Settings',
            href: dashboard().url,
        },
        {
            title: 'Property Category',
            href: dashboard().url,
        },
        {
            title: 'Edit',
            href: dashboard().url,
        },
        {
            title: category.category_name,
            href: dashboard().url,
        },
    ];

    const { data, setData, put, errors } = useForm({
        category_name: category.category_name,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(update.url(category.id), {
            onSuccess: () =>
                toast.success('Property category updated successfully'),
            onError: () => toast.error('Failed to update property category'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Edit Property Category</h2>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Category Name</Label>
                                <Input
                                    id="name"
                                    name="category_name"
                                    type="text"
                                    placeholder="Category Name"
                                    defaultValue={data.category_name}
                                    onChange={(e) =>
                                        setData('category_name', e.target.value)
                                    }
                                />
                                {errors.category_name && (
                                    <InputError
                                        message={errors.category_name}
                                    />
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2 pt-5">
                            <Link href={index.url()}>
                                <Button variant="link" type="button">
                                    <ArrowLeft />
                                    Back
                                </Button>
                            </Link>
                            <Button variant="default">Save</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
