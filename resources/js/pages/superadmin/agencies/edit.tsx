import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { index, update } from '@/routes/superadmin/agencies';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
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
    admin_member: {
        id: number;
        name: string;
        email: string;
        user: {
            email: string;
        };
    };
};

type Props = {
    agency: agencyModel;
};

export default function Dashboard({ agency }: Props) {
    // const router = useRouter()
    const { data, setData, put, errors } = useForm({
        agency_name: agency.name,
        admin_name: agency.admin_member.name,
        admin_email: agency.admin_member.user.email,
        admin_password: '',
        admin_password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(data);
        put(update.url(agency), {
            forceFormData: true,
            onSuccess: () =>
                toast.success('Agency information updated successfully'),
            onError: () =>
                toast.error('Agency information could not be updated'),
        });
    };
    // console.log(agency);
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
                                    defaultValue={agency.name}
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
                                    value={agency.slug}
                                />
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
                                    defaultValue={agency.admin_member.name}
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
                                    defaultValue={
                                        agency.admin_member.user.email
                                    }
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
                        <CardFooter className="flex justify-between gap-2">
                            <Link href={index()}>
                                <Button variant="link">Back</Button>
                            </Link>
                            <Button variant="default">Save</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
