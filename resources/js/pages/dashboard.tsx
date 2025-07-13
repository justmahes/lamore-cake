import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
];

export default function Dashboard() {
    const { summary } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {summary && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                            Total Products: {summary.products}
                        </div>
                        <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                            Total Customers: {summary.customers}
                        </div>
                        <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                            Total Orders: {summary.orders}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
