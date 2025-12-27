import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index } from '@/routes/public/agent/properties';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const superAdminNavItems: NavItem[] = [
    {
        title: 'Agencies',
        href: '/superadmin/agencies',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/superadmin/users',
        icon: LayoutGrid,
    },
];

const superAdminSubItems: NavItem[] = [
    {
        title: 'State',
        href: '/superadmin/settings/state',
        icon: LayoutGrid,
    },
    {
        title: 'Property Category',
        href: '/superadmin/settings/property/category',
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Agency',
        href: '/agency/profile',
        icon: LayoutGrid,
    },
    {
        title: 'Members',
        href: '/agency/members',
        icon: LayoutGrid,
    },
    {
        title: 'Properties',
        href: '/agency/properties',
        icon: LayoutGrid,
    },
    {
        title: 'Leads',
        href: '/agency/leads',
        icon: LayoutGrid,
    },
];

const agentNavItems: NavItem[] = [
    {
        title: 'Properties',
        href: '/agent/properties',
        icon: LayoutGrid,
    },
    {
        title: 'Leads',
        href: '/agent/leads',
        icon: LayoutGrid,
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    const { props } = usePage();
    const role = (props as any).auth?.role;
    const $agent_slug = (props as any).auth?.agent_slug;

    const agentSubItems: NavItem[] = [
        {
            title: 'Public Properties',
            href: index.url({ agent: $agent_slug }),
            icon: LayoutGrid,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain title="Platform" items={mainNavItems} />
                {role === 'superadmin' && (
                    <NavMain
                        title="Superadmin"
                        items={superAdminNavItems}
                        subMenu={superAdminSubItems}
                    />
                )}
                {role === 'admin' && (
                    <NavMain title="Admin" items={adminNavItems} />
                )}
                {role === 'agent' && (
                    <NavMain
                        title="Agent"
                        items={agentNavItems}
                        subMenu={agentSubItems}
                    />
                )}
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
