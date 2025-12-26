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
import { index as stateIndex } from '@/routes/state';
import { index as districtIndex } from '@/routes/superadmin/settings/district';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

type StateModel = {
    id: number;
    name: string;
    state_code: string;
    state_abbr: string;
};

type Props = {
    state: StateModel;
};

export default function CreateDistrict({ state }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'State',
            href: stateIndex().url,
        },
        {
            title: state.name,
            href: districtIndex.url(state),
        },
        {
            title: 'Create',
            href: districtIndex.url(state),
        },
    ];

    const { data, setData, post, errors, processing } = useForm({
        name: '',
        district_code: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(districtIndex.url(state), {
            onSuccess: () => toast.success('District created successfully'),
            onError: () => toast.error('Failed to create district'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create District" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Create District</h2>
                    </CardHeader>
                    <Separator />
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="district-name">
                                    District Name
                                </Label>
                                <Input
                                    id="district-name"
                                    name="name"
                                    type="text"
                                    placeholder="District Name"
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
                                <Label htmlFor="district-code">
                                    District Code
                                </Label>
                                <Input
                                    id="district-code"
                                    name="district_code"
                                    type="text"
                                    placeholder="District Code"
                                    value={data.district_code}
                                    onChange={(event) =>
                                        setData(
                                            'district_code',
                                            event.target.value,
                                        )
                                    }
                                />
                                {errors.district_code && (
                                    <InputError
                                        message={errors.district_code}
                                    />
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2 pt-5">
                            <Link href={districtIndex.url(state)}>
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
