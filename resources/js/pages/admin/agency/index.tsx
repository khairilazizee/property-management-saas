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
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agency',
        href: '',
    },
    {
        title: 'Information',
        href: '',
    },
];

type AgencyModel = {
    id: number;
    name: string;
    slug: string;
};

type Props = {
    agency: AgencyModel;
};

export default function Dashboard({ agency }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        agency_name: agency.name ?? '',
        agency_slug: agency.slug ?? '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put('/agency/profile/update', {
            preserveScroll: true,
            onSuccess: () => toast.success('Agency updated successfully'),
            onError: () => toast.error('Update failed'),
        });
    };

    const slugify = (text: string) =>
        text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agency" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <h2 className="font-bold">Agency Information</h2>
                        </CardHeader>
                        <Separator />
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="agency_name">Agency Name</Label>
                                <Input
                                    id="agency_name"
                                    name="agency_name"
                                    type="text"
                                    value={data.agency_name}
                                    onChange={(e) =>
                                        setData('agency_name', e.target.value)
                                    }
                                />
                                {errors.agency_name && (
                                    <InputError message={errors.agency_name} />
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="agency_slug">Agency Slug</Label>
                                <Input
                                    id="agency_slug"
                                    name="agency_slug"
                                    type="text"
                                    value={data.agency_slug}
                                    onChange={(e) =>
                                        setData(
                                            'agency_slug',
                                            slugify(e.target.value),
                                        )
                                    }
                                />
                                {errors.agency_slug && (
                                    <InputError message={errors.agency_slug} />
                                )}
                            </div>
                        </CardContent>
                        {/* <Separator /> */}
                        <CardFooter className="flex justify-end gap-2">
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
