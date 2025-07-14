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

    const cards = [] as { title: string; value: any }[];
    if (summary?.products !== undefined) {
        cards.push({ title: "Total Products", value: summary.products });
    }
    if (summary?.customers !== undefined) {
        cards.push({ title: "Total Customers", value: summary.customers });
    }
    if (summary?.orders !== undefined) {
        cards.push({ title: "Total Orders", value: summary.orders });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {cards.length > 0 && (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        {cards.map((c) => (
                            <Card key={c.title}>
                                <CardHeader>
                                    <CardTitle>{c.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-3xl font-semibold">
                                    {c.value}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
