import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
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
import { dashboard } from '@/routes';
import { index, update } from '@/routes/agent/properties';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, BathIcon, BedIcon, Car } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type Property = {
    id: number;
    title: string;
    description?: string | null;
    price: number | string;
    status?: string | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    sqft?: number | null;
    parking?: number | null;
    advertisement_type?: string | null;
    property_category_id?: PropertyCategory | null;
    property_type_id?: PropertyType | null;
    property_image?: string[] | null;
};

type PropertyCategory = {
    id: number;
    category_name: string;
};

type PropertyType = {
    id: number;
    type_name: string;
    property_category_id: number;
};

type PropertyImage = {
    id: number;
    image_url: string;
    image_name: string;
};

type Props = {
    property: Property;
    propertycategory: PropertyCategory[];
    propertytype: PropertyType[];
    propertyimages: PropertyImage[];
};

export default function Dashboard({
    property,
    propertycategory,
    propertytype,
    propertyimages,
}: Props) {
    const [category, setCategory] = useState<number | null>(
        Number(property.property_category_id),
    );
    const { data, setData, put, errors } = useForm({
        property_name: property.title,
        property_price: property.price,
        property_description: property.description ?? '',
        property_category: property.property_category_id ?? '',
        property_type: property.property_type_id ?? '',
        advertisement_type: property.advertisement_type ?? '',
        status: property.status ?? '',
        bedrooms: property.bedrooms ?? '',
        bathrooms: property.bathrooms ?? '',
        sqft: property.sqft ?? '',
        parking: property.parking ?? '',
        property_image: [] as File[] | null,
    });

    const filteredPropertyType = propertytype.filter(
        (type: PropertyType) =>
            type.property_category_id === Number(data.property_category),
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(update.url(property), {
            forceFormData: true,
            onSuccess: () => toast.success('Property updated successfully'),
            onError: () => toast.error('Failed to update property'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <h2 className="font-bold">Property Information</h2>
                    </CardHeader>
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="space-y-6"
                    >
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="property_name">
                                    Property Name
                                </Label>
                                <Input
                                    id="property_name"
                                    name="property_name"
                                    type="text"
                                    placeholder="Name"
                                    value={data.property_name}
                                    onChange={(e) =>
                                        setData('property_name', e.target.value)
                                    }
                                />
                                {errors.property_name && (
                                    <InputError
                                        message={errors.property_name}
                                    />
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="property_price">
                                    Property Price
                                </Label>
                                <ButtonGroup className="w-full">
                                    <ButtonGroupText>MYR</ButtonGroupText>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="property_price"
                                            name="property_price"
                                            type="text"
                                            placeholder="Price"
                                            value={data.property_price}
                                            onChange={(e) =>
                                                setData(
                                                    'property_price',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </InputGroup>
                                </ButtonGroup>

                                {errors.property_price && (
                                    <InputError
                                        message={errors.property_price}
                                    />
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="property_description">
                                    Property Name
                                </Label>
                                <Textarea
                                    id="property_description"
                                    name="property_description"
                                    placeholder="Property Description"
                                    rows={6}
                                    value={data.property_description}
                                    onChange={(e) =>
                                        setData(
                                            'property_description',
                                            e.target.value,
                                        )
                                    }
                                />
                                {errors.property_description && (
                                    <InputError
                                        message={errors.property_description}
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid space-y-2">
                                    <Label htmlFor="property_category">
                                        Property Category
                                    </Label>
                                    <Select
                                        value={
                                            data.property_category
                                                ? String(data.property_category)
                                                : ''
                                        }
                                        onValueChange={(value) => {
                                            setData('property_category', value);
                                            setCategory(Number(value));
                                            setData('property_type', '');
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select property category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Property Category
                                                </SelectLabel>
                                            </SelectGroup>
                                            {propertycategory.map(
                                                (
                                                    item: PropertyCategory,
                                                    index: number,
                                                ) => {
                                                    return (
                                                        <SelectItem
                                                            value={`${item.id}`}
                                                            key={index}
                                                        >
                                                            {item.category_name}
                                                        </SelectItem>
                                                    );
                                                },
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors.property_category && (
                                        <InputError
                                            message={errors.property_category}
                                        />
                                    )}
                                </div>
                                <div className="grid space-y-2">
                                    <Label htmlFor="property_type">
                                        Property Type
                                    </Label>
                                    <Select
                                        value={
                                            data.property_type
                                                ? String(data.property_type)
                                                : ''
                                        }
                                        onValueChange={(value) => {
                                            setData('property_type', value);
                                        }}
                                        disabled={!category}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select property type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Property Type
                                                </SelectLabel>
                                            </SelectGroup>
                                            {filteredPropertyType.map(
                                                (
                                                    item: PropertyType,
                                                    index: number,
                                                ) => {
                                                    return (
                                                        <SelectItem
                                                            value={`${item.id}`}
                                                            key={index}
                                                        >
                                                            {item.type_name}
                                                        </SelectItem>
                                                    );
                                                },
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors.property_type && (
                                        <InputError
                                            message={errors.property_type}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="advertisement_type">
                                    Advertisement Type
                                </Label>
                                <Select
                                    value={data.advertisement_type}
                                    onValueChange={(value) =>
                                        setData('advertisement_type', value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select advertisement type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Advertisement Type
                                            </SelectLabel>
                                        </SelectGroup>
                                        <SelectItem value="rent">
                                            Rent
                                        </SelectItem>
                                        <SelectItem value="sale">
                                            Sale
                                        </SelectItem>
                                        <SelectItem value="lease">
                                            Lease
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {errors.advertisement_type && (
                                    <InputError
                                        message={errors.advertisement_type}
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label htmlFor="status">Bedroom</Label>
                                    <ButtonGroup className="w-full">
                                        <InputGroup>
                                            <InputGroupInput
                                                id="bedroom"
                                                name="bedroom"
                                                type="number"
                                                placeholder="Bedroom"
                                                value={data.bedrooms ?? ''}
                                                onChange={(e) =>
                                                    setData(
                                                        'bedrooms',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </InputGroup>
                                        <ButtonGroupText>
                                            <BedIcon />
                                        </ButtonGroupText>
                                    </ButtonGroup>
                                    {errors.bedrooms && (
                                        <InputError message={errors.bedrooms} />
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="status">Bathroom</Label>
                                    <ButtonGroup className="w-full">
                                        <InputGroup>
                                            <InputGroupInput
                                                id="bathroom"
                                                name="bathroom"
                                                type="number"
                                                value={data.bathrooms ?? ''}
                                                placeholder="Bathroom"
                                                onChange={(e) =>
                                                    setData(
                                                        'bathrooms',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </InputGroup>
                                        <ButtonGroupText>
                                            <BathIcon />
                                        </ButtonGroupText>
                                    </ButtonGroup>
                                    {errors.bathrooms && (
                                        <InputError
                                            message={errors.bathrooms}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label htmlFor="status">Sqft</Label>
                                    <ButtonGroup className="w-full">
                                        <InputGroup>
                                            <InputGroupInput
                                                id="sqft"
                                                name="sqft"
                                                type="number"
                                                value={data.sqft ?? ''}
                                                placeholder="sqft"
                                                onChange={(e) =>
                                                    setData(
                                                        'sqft',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </InputGroup>
                                        <ButtonGroupText>Sqft</ButtonGroupText>
                                    </ButtonGroup>
                                    {errors.sqft && (
                                        <InputError message={errors.sqft} />
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="status">Parking</Label>
                                    <ButtonGroup className="w-full">
                                        <InputGroup>
                                            <InputGroupInput
                                                id="parking"
                                                name="parking"
                                                type="number"
                                                value={data.parking ?? ''}
                                                placeholder="Parking"
                                                onChange={(e) =>
                                                    setData(
                                                        'parking',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </InputGroup>
                                        <ButtonGroupText>
                                            <Car />
                                        </ButtonGroupText>
                                    </ButtonGroup>
                                    {errors.parking && (
                                        <InputError message={errors.parking} />
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="property_images">
                                    Property Images
                                </Label>
                                <Input
                                    type="file"
                                    name="property_images"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(
                                            e.target.files ?? [],
                                        );
                                        setData('property_image', files);
                                    }}
                                />
                                <div className="flex flex-row gap-2">
                                    {propertyimages?.map((img) => {
                                        return (
                                            <img
                                                src={`/storage/${img.image_url}`}
                                                alt={img.image_name}
                                                className="h-40 w-40 object-cover"
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Property Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData('status', value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select property status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Property Status
                                            </SelectLabel>
                                        </SelectGroup>
                                        <SelectItem value="available">
                                            Available
                                        </SelectItem>
                                        <SelectItem value="sold">
                                            Sold
                                        </SelectItem>
                                        <SelectItem value="rented">
                                            Rented
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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
                            <Button variant="default">Save</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
