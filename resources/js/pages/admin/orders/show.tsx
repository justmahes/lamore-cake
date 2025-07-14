import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Orders",
        href: "/admin/orders",
    },
];

export default function AdminOrderShow() {
    const { order } = usePage().props as any;
    const { patch } = useForm({});

    const toggleStatus = () => {
        patch(`/admin/orders/${order.id}/toggle-status`, { method: "patch" });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order ${order.id}`} />
            <div className="container mx-auto space-y-6 p-4">
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p>User: {order.user.name}</p>
                    <p>Total: Rp {order.total_price}</p>
                    <p>Status: {order.status}</p>
                    {order.payment && (
                        <div className="space-y-1">
                            <p>Payment Proof:</p>
                            <img src={order.payment.proof_file} alt="proof" className="w-48" />
                        </div>
                    )}
                    <Button onClick={toggleStatus}>Toggle Status</Button>
                </CardContent>
            </Card>
            </div>
        </AppLayout>
    );
}
