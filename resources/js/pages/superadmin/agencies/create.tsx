import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { store } from '@/routes/superadmin/agencies';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agencies',
        href: '/superadmin/agencies',
    },
    {
        title: 'Create',
        href: '/superadmin/agencies',
    },
];

type agencyModel = {
    id: number;
    name: string;
    slug: string;
};

type Props = {
    agencies: agencyModel[];
};

export default function Dashboard({ agencies }: Props) {
    // const router = useRouter()
    const { data, setData, post, errors } = useForm({
        agency_name: '',
        agency_slug: '',
        admin_name: '',
        admin_email: '',
        admin_password: '',
        admin_password_confirmation: '',
        is_active: true,
    });

    const slugify = (text: string) => {
        text = text.toLowerCase().trim().replace(/\s+/g, '-');

        return text;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        post(store.url(), {
            onSuccess: () => toast.success('Agency created successfully'),
            onError: () => toast.error('Agency creation failed'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agencies" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <h2 className="font-bold">Agency Information</h2>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Agency Name</Label>
                                <Input
                                    id="name"
                                    name="agency_name"
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) =>
                                        setData('agency_name', e.target.value)
                                    }
                                />
                                {errors.agency_name && (
                                    <InputError message={errors.agency_name} />
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Agency Slug</Label>
                                <Input
                                    id="name"
                                    name="agency_slug"
                                    type="text"
                                    placeholder="Slug"
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
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) =>
                                        setData('is_active', Boolean(checked))
                                    }
                                />
                                <Label
                                    htmlFor="is_active"
                                    className="cursor-pointer"
                                >
                                    Active
                                </Label>
                                {errors.is_active && (
                                    <InputError message={errors.is_active} />
                                )}
                            </div>
                            <CardDescription>
                                Another information be added later
                            </CardDescription>
                        </CardContent>
                        <Separator />
                        <CardHeader className="flex flex-row items-center justify-between">
                            <h2 className="font-bold">Admin Information</h2>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="admin_name"
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) =>
                                        setData('admin_name', e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    id="name"
                                    name="admin_email"
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) =>
                                        setData('admin_email', e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Password</Label>
                                <Input
                                    id="password"
                                    name="admin_password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setData(
                                            'admin_password',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Password Confirmation
                                </Label>
                                <Input
                                    id="password"
                                    name="admin_password_confirmation"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setData(
                                            'admin_password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="default">Save</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
