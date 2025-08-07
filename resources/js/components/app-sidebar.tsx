import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { type NavItem, type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { FileText, LayoutGrid, Package, ShoppingCart, Users } from "lucide-react";
import AppLogo from "./app-logo";

function useMainNavItems(): NavItem[] {
    const {
        auth: { user },
    } = usePage<SharedData>().props;

    const items: NavItem[] = [];

    if (user.role === "admin") {
        items.push({ title: "Dasbor", href: "/admin/dashboard", icon: LayoutGrid });
    }

    if (user.role === "user") {
        items.push(
            { title: "Dasbor", href: "/dashboard", icon: LayoutGrid },
            { title: "Produk", href: "/products", icon: Package },
            { title: "Keranjang", href: "/cart", icon: ShoppingCart },
        );
    }

    if (user.role === "admin") {
        items.push(
            { title: "Produk", href: "/admin/products", icon: Package },
            { title: "Pelanggan", href: "/admin/customers", icon: Users },
            { title: "Pesanan", href: "/admin/orders", icon: FileText },
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
