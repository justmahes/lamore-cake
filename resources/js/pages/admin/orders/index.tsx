import { Head, usePage } from '@inertiajs/react';

export default function AdminOrders() {
    const { orders } = usePage().props as any;
    return (
        <div className="container mx-auto p-4">
            <Head title="Admin Orders" />
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
                            <td>{o.id}</td>
                            <td>{o.user.name}</td>
                            <td>{o.total_price}</td>
                            <td>{o.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
