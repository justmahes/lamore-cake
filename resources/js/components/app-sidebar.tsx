import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { type NavItem, type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { BarChart, FileText, LayoutGrid, Package, ShoppingCart, Users } from "lucide-react";
import AppLogo from "./app-logo";

function useMainNavItems(): NavItem[] {
    const {
        auth: { user },
    } = usePage<SharedData>().props;

    const items: NavItem[] = [];

    if (user.role === "admin") {
        items.push({ title: "Dashboard", href: "/dashboard", icon: LayoutGrid });
    }

    if (user.role === "user") {
        items.push(
            { title: "Dashboard", href: "/dashboard", icon: LayoutGrid },
            { title: "Products", href: "/products", icon: Package },
            { title: "Cart", href: "/cart", icon: ShoppingCart },
            { title: "Orders", href: "/transactions", icon: FileText },
        );
    }

    if (user.role === "admin") {
        items.push(
            { title: "Products", href: "/admin/products", icon: Package },
            { title: "Customers", href: "/admin/customers", icon: Users },
            { title: "Orders", href: "/admin/orders", icon: FileText },
            { title: "Reports", href: "/admin/reports/sales", icon: BarChart },
        );
    }

    return items;
}

const footerNavItems: NavItem[] = [
    // {
    //     title: "Repository",
    //     href: "https://github.com/laravel/react-starter-kit",
    //     icon: Folder,
    // },
    // {
    //     title: "Documentation",
    //     href: "https://laravel.com/docs/starter-kits#react",
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    const mainNavItems = useMainNavItems();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
