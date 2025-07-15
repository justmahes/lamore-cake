import ImagePreview from "@/components/image-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Orders",
        href: "/admin/orders",
    },
];

export default function AdminOrderShow() {
    const { order } = usePage().props as any;
    const { data, setData, post, delete: destroy } = useForm({ status: order.status });

    const updateStatus = () => {
        post(`/admin/orders/${order.id}/status`, {
            method: "post",
            preserveScroll: true,
        });
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
                        <div className="space-y-1">
                            <label className="block text-sm font-medium">Status</label>
                            <select value={data.status} onChange={(e) => setData("status", e.target.value)} className="rounded border px-2 py-1">
                                <option value="pending">pending</option>
                                <option value="shipped">shipped</option>
                            </select>
                        </div>
                        {order.payment && (
                            <div className="space-y-1">
                                <p>Payment Proof:</p>
                                <ImagePreview src={order.payment.proof_file} alt="proof" className="w-48" />
                            </div>
                        )}
                        <div className="flex gap-2">
                            <Button onClick={updateStatus}>Save Status</Button>
                            <Button variant="destructive" onClick={() => destroy(`/admin/orders/${order.id}`)}>
                                Delete Order
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
