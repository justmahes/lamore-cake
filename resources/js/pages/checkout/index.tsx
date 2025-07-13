import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Checkout",
        href: "/checkout",
    },
];

export default function Checkout() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Checkout" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <form method="post" action="/checkout">
                    <div className="mb-2">
                        <label>Shipping Address</label>
                        <input name="address" className="border w-full" />
                    </div>
                    <div className="mb-4">
                        <label>Phone</label>
                        <input name="phone" className="border w-full" />
                    </div>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                        Place Order
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
