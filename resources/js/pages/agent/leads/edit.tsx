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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { index, update } from '@/routes/agent/leads';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agent',
        href: '',
    },
    {
        title: 'Leads',
        href: '',
    },
    {
        title: 'Edit',
        href: '',
    },
];

type Property = {
    id: number;
    title: string;
};

type Lead = {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    preferred_location?: string | null;
    property_id?: number | null;
    source?: string | null;
    status?: string | null;
    message?: string | null;
};

type Props = {
    lead: Lead;
    properties: Property[];
};

const statusOptions = ['new', 'contacted', 'qualified', 'lost'];
const sourceOptions = ['manual', 'web', 'portal', 'referral', 'walk-in'];

export default function EditLead({ lead, properties }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: lead.name ?? '',
        email: lead.email ?? '',
        phone: lead.phone ?? '',
        preferred_location: lead.preferred_location ?? '',
        property_id: lead.property_id ? `${lead.property_id}` : '',
        source: lead.source ?? 'manual',
        status: lead.status ?? 'new',
        message: lead.message ?? '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(update.url(lead), {
            preserveScroll: true,
            onSuccess: () => toast.success('Lead updated successfully'),
            onError: () => toast.error('Failed to update lead'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Lead" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <h2 className="font-bold">Lead Information</h2>
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
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                />
                                {errors.phone && (
                                    <InputError message={errors.phone} />
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="preferred_location">
                                    Preferred Location
                                </Label>
                                <Input
                                    id="preferred_location"
                                    name="preferred_location"
                                    type="text"
                                    value={data.preferred_location}
                                    onChange={(e) =>
                                        setData(
                                            'preferred_location',
                                            e.target.value,
                                        )
                                    }
                                />
                                {errors.preferred_location && (
                                    <InputError
                                        message={errors.preferred_location}
                                    />
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="property_id">Property</Label>
                                <Select
                                    value={data.property_id}
                                    onValueChange={(value) =>
                                        setData(
                                            'property_id',
                                            value === 'none' ? '' : value,
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select property (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Properties</SelectLabel>
                                            <SelectItem value="none">
                                                No property selected
                                            </SelectItem>
                                            {properties.map((property) => (
                                                <SelectItem
                                                    key={property.id}
                                                    value={`${property.id}`}
                                                >
                                                    {property.title}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.property_id && (
                                    <InputError message={errors.property_id} />
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="source">Source</Label>
                                    <Select
                                        value={data.source}
                                        onValueChange={(value) =>
                                            setData('source', value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select source" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Source</SelectLabel>
                                                {sourceOptions.map((source) => (
                                                    <SelectItem
                                                        key={source}
                                                        value={source}
                                                    >
                                                        {source}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.source && (
                                        <InputError message={errors.source} />
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) =>
                                            setData('status', value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Status</SelectLabel>
                                                {statusOptions.map((status) => (
                                                    <SelectItem
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <InputError message={errors.status} />
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">Notes</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={data.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                />
                                {errors.message && (
                                    <InputError message={errors.message} />
                                )}
                            </div>
                        </CardContent>
                        <Separator />
                        <CardFooter className="flex justify-between gap-2">
                            <Button variant="link" type="button">
                                <Link
                                    href={index.url()}
                                    className="flex items-center gap-1"
                                >
                                    <ArrowLeft />
                                    Back
                                </Link>
                            </Button>
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
