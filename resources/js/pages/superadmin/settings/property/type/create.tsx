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
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { store, view } from '@/routes/superadmin/settings/property/type';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

type Category = {
    id: number;
    category_name: string;
};

type Props = {
    category: Category;
};

export default function Dashboard({ category }: Props) {
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
            title: 'Create',
            href: '',
        },
    ];

    const { data, setData, post, errors } = useForm({
        type_name: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store.url(category), {
            onSuccess: () =>
                toast.success('Property type created successfully'),
            onError: () => toast.error('Failed to create property type'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Create Property Type</h2>
                    </CardHeader>
                    <Separator />
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Type Name</Label>
                                <Input
                                    id="name"
                                    name="type_name"
                                    type="text"
                                    placeholder="Type Name"
                                    onChange={(e) =>
                                        setData('type_name', e.target.value)
                                    }
                                />
                                {errors.type_name && (
                                    <InputError message={errors.type_name} />
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2 pt-5">
                            <Link href={view.url(category)}>
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
