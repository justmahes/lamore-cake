import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Cart",
        href: "/cart",
    },
];

export default function Cart() {
    const { cartItems, subtotal } = usePage().props as any;
    const { delete: destroy } = useForm({});
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cart" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Cart</h1>
                <table className="w-full mb-4">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.product.name}</td>
                                <td>{item.quantity}</td>
                                <td>Rp {item.product.price}</td>
                                <td>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            destroy(`/cart/remove/${item.id}`);
                                        }}
                                        className="inline"
                                    >
                                        <button type="submit" className="text-red-500">Remove</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="font-bold mb-4">Subtotal: Rp {subtotal}</p>
                <a href="/checkout" className="bg-primary text-white px-4 py-2 rounded mr-2">
                    Checkout
                </a>
                <a
                    href={`https://wa.me/628123456789?text=${encodeURIComponent(
                        cartItems.map((i: any) => `${i.product.name} x${i.quantity}`).join(', ') +
                            ' - Total: ' + subtotal
                    )}`}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Order via WhatsApp
                </a>
            </div>
        </AppLayout>
    );
}
