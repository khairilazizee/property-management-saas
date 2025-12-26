import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { index, store } from '@/routes/admin/members';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, InfoIcon } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agency',
        href: '',
    },
    {
        title: 'Members',
        href: '',
    },
    {
        title: 'Create',
        href: '',
    },
];

export default function CreateMember() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        email: '',
        password: '',
        password_confirmation: '',
        ren_no: '',
        role: 'agent',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store.url(), {
            preserveScroll: true,
            onSuccess: () => toast.success('Agent added successfully'),
            onError: () => toast.error('Failed to add agent'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Agent" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <h2 className="font-bold">Add Agent</h2>
                        </CardHeader>
                        <Separator />
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <InputError message={errors.name} />
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="slug">
                                    <span className="flex items-center gap-2">
                                        Slug{' '}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <InfoIcon className="w-3.5 hover:cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    Will be use for navigation.
                                                    Make sure no space and only
                                                    use alphanumeric characters.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </span>
                                </Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) =>
                                        setData('slug', e.target.value)
                                    }
                                />
                                {errors.slug && (
                                    <InputError message={errors.slug} />
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <InputError message={errors.email} />
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                                {errors.password && (
                                    <InputError message={errors.password} />
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                />
                                {errors.password_confirmation && (
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="ren_no">REN No.</Label>
                                <Input
                                    id="ren_no"
                                    name="ren_no"
                                    type="text"
                                    value={data.ren_no}
                                    onChange={(e) =>
                                        setData('ren_no', e.target.value)
                                    }
                                />
                                {errors.ren_no && (
                                    <InputError message={errors.ren_no} />
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label>Role</Label>
                                <Select
                                    value={data.role}
                                    onValueChange={(value) =>
                                        setData('role', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="agent">
                                            Agent
                                        </SelectItem>
                                        {/* <SelectItem value="staff">
                                            Staff
                                        </SelectItem>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem> */}
                                    </SelectContent>
                                </Select>
                                {errors.role && (
                                    <InputError message={errors.role} />
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
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2">
                            <Link href={index.url()}>
                                <Button
                                    variant="link"
                                    type="button"
                                    className="hover:cursor-pointer"
                                >
                                    <ArrowLeftIcon />
                                    Back
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                Save Agent
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
