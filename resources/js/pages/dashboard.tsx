import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Products</CardTitle>
                            </CardHeader>
                            <CardContent className="text-3xl font-semibold">
                                {summary.products}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Customers</CardTitle>
                            </CardHeader>
                            <CardContent className="text-3xl font-semibold">
                                {summary.customers}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Orders</CardTitle>
                            </CardHeader>
                            <CardContent className="text-3xl font-semibold">
                                {summary.orders}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
