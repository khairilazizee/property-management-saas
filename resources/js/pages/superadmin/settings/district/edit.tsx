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

type DistrictModel = {
    id: number;
    name: string;
    district_code: string;
    district_abbr: string;
};

type Props = {
    state: StateModel;
    district: DistrictModel;
};

export default function EditDistrict({ state, district }: Props) {
    const districtBaseUrl = districtIndex.url(state);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'State',
            href: stateIndex().url,
        },
        {
            title: state.name,
            href: districtBaseUrl,
        },
        {
            title: district.name,
            href: districtBaseUrl,
        },
        {
            title: 'Edit',
            href: districtBaseUrl,
        },
    ];

    const { data, setData, put, errors, processing } = useForm({
        name: district.name,
        district_code: district.district_code,
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(`${districtBaseUrl}/${district.id}`, {
            onSuccess: () => toast.success('District updated successfully'),
            onError: () => toast.error('Failed to update district'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit District" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Edit District</h2>
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
                            <Link href={districtBaseUrl}>
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
