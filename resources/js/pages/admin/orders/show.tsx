import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Orders",
        href: "/admin/orders",
    },
];

export default function AdminOrderShow() {
    const { order } = usePage().props as any;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order ${order.id}`} />
            <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
            <p>User: {order.user.name}</p>
            <p>Total: Rp {order.total_price}</p>
            <p>Status: {order.status}</p>
            {order.payment && (
                <div className="my-4">
                    <p>Payment Proof:</p>
                    <img src={order.payment.proof_file} alt="proof" className="w-48" />
                </div>
            )}
            <form method="post" action={`/admin/orders/${order.id}/verify-payment`}>
                <input type="hidden" name="_method" value="patch" />
                <select name="status" className="border mr-2">
                    <option value="processed">Processed</option>
                    <option value="done">Done</option>
                    <option value="rejected">Rejected</option>
                </select>
                <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
                    Update Status
                </button>
            </form>
            </div>
        </AppLayout>
    );
}
