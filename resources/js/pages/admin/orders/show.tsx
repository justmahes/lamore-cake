import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Orders",
        href: "/admin/orders",
    },
];

export default function AdminOrderShow() {
    const { order } = usePage().props as any;
    const { data, setData, patch } = useForm({ status: "processed" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/orders/${order.id}/verify-payment`);
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
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <Select name="status" value={data.status} onValueChange={(v) => setData("status", v)}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="processed">Processed</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit">Update Status</Button>
                    </form>
                </CardContent>
            </Card>
            </div>
        </AppLayout>
    );
}
