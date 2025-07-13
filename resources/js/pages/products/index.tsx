import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Products",
        href: "/products",
    },
];

export default function Products() {
    const { products } = usePage().props as any;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                <div className="grid md:grid-cols-3 gap-4">
                    {products.map((p: any) => (
                        <div key={p.id} className="border rounded p-4">
                            <img src={p.image} alt={p.name} className="h-40 w-full object-cover mb-2" />
                            <h2 className="font-semibold">{p.name}</h2>
                            <p>{p.description}</p>
                            <p className="font-bold">Rp {p.price}</p>
                            <form method="post" action={`/cart/add/${p.id}`} className="mt-2">
                                <button type="submit" className="bg-primary text-white px-3 py-1 rounded">
                                    Add to Cart
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
