import { Head, usePage } from '@inertiajs/react';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';

export default function OrderHistory() {
    const { orders } = usePage().props as any;
    return (
        <>
            <Head title="Orders" />
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Orders</h1>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Invoice</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o: any) => (
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>Rp {o.total_price}</td>
                                <td>{o.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}
