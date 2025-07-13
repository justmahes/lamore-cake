import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Orders",
        href: "/admin/orders",
    },
];

export default function AdminOrders() {
    const { orders } = usePage().props as any;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Orders" />
            <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Invoice</th>
                        <th>User</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o: any) => (
                        <tr key={o.id}>
                            <td>
                                <a className="text-primary" href={`/admin/orders/${o.id}`}>{o.id}</a>
                            </td>
                            <td>{o.user.name}</td>
                            <td>{o.total_price}</td>
                            <td>{o.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </AppLayout>
    );
}
