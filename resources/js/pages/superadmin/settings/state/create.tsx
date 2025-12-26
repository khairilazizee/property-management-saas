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
import { index, store } from '@/routes/state';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'State',
        href: index().url,
    },
    {
        title: 'Create',
        href: index().url,
    },
];

export default function CreateState() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        state_code: '',
        state_abbr: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(store.url(), {
            onSuccess: () => toast.success('State created successfully'),
            onError: () => toast.error('Failed to create state'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create State" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Create State</h2>
                    </CardHeader>
                    <Separator />
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="state-name">State Name</Label>
                                <Input
                                    id="state-name"
                                    name="name"
                                    type="text"
                                    placeholder="State Name"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData('name', event.target.value)
                                    }
                                />
                                {errors.name && (
                                    <InputError message={errors.name} />
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="state-abbr">State Abbr.</Label>
                                <Input
                                    id="state-abbr"
                                    name="state_abbr"
                                    type="text"
                                    placeholder="State Abbr."
                                    value={data.state_abbr}
                                    onChange={(event) =>
                                        setData(
                                            'state_abbr',
                                            event.target.value,
                                        )
                                    }
                                />
                                {errors.state_abbr && (
                                    <InputError message={errors.state_abbr} />
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="state-code">State Code</Label>
                                <Input
                                    id="state-code"
                                    name="state_code"
                                    type="text"
                                    placeholder="State Code"
                                    value={data.state_code}
                                    onChange={(event) =>
                                        setData(
                                            'state_code',
                                            event.target.value,
                                        )
                                    }
                                />
                                {errors.state_code && (
                                    <InputError message={errors.state_code} />
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2 pt-5">
                            <Link href={index().url}>
                                <Button variant="link" type="button">
                                    <ArrowLeft />
                                    Back
                                </Button>
                            </Link>
                            <Button variant="default" disabled={processing}>
                                Save
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
