import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Products",
        href: "/products",
    },
];

export default function Products() {
    const { products } = usePage().props as any;
    const { post } = useForm({});

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold">Products</h1>
                <div className="grid gap-4 md:grid-cols-3">
                    {products.map((p: any) => (
                        <div key={p.id} className="rounded border p-4">
                            <a href={`/products/${p.id}`}>
                                <img src={p.image} alt={p.name} className="mb-2 h-40 w-full object-cover" />
                                <h2 className="font-semibold">{p.name}</h2>
                            </a>
                            {/* <div dangerouslySetInnerHTML={{ __html: p.description }} /> */}
                            <p className="font-bold">Rp {p.price}</p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post(`/cart/add/${p.id}`);
                                }}
                                className="mt-2"
                            >
                                <button type="submit" className="rounded bg-primary px-3 py-1 text-white">
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
