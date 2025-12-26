import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/superadmin/users',
    },
    {
        title: 'Lists',
        href: '/superadmin/users',
    },
];

type AgencyModel = {
    id: number;
    name: string;
};

type AgencyMemberModel = {
    id: number;
    role: string;
    agency: AgencyModel;
};

type UserModel = {
    id: number;
    name: string;
    email: string;
    is_superadmin: boolean;
    is_active: boolean;
    agency_member: AgencyMemberModel;
};

type Props = {
    users: UserModel[];
};

export default function Dashboard({ users }: Props) {
    console.log(users);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="border-transparent">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="font-bold">Users List</h2>
                        {/* <div>
                            <Link href={create().url}>
                                <Button variant="default">
                                    <PlusIcon />
                                    User
                                </Button>
                            </Link>
                        </div> */}
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Agency Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="w-[50px]">
                                        Status
                                    </TableHead>
                                    {/* <TableHead className="w-[50px]">
                                        Edit
                                    </TableHead>
                                    <TableHead className="w-[50px] text-center">
                                        Delete
                                    </TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user: UserModel) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="first-letter:uppercase">
                                            {user.agency_member?.agency?.name ??
                                                ''}
                                        </TableCell>
                                        <TableCell className="first-letter:uppercase">
                                            {user.agency_member?.role}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {user.is_active ? (
                                                <Badge variant="default">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge variant="destructive">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </TableCell>
                                        {/* <TableCell className="text-center">
                                            <Link
                                                href={edit.url({
                                                    user: user,
                                                })}
                                            >
                                                Edit
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            Delete
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
