import AppLayout from "@/layouts/app-layout";
import ImagePreview from "@/components/image-preview";
import { type BreadcrumbItem, type SharedData } from "@/types";
import { Head, usePage, useForm } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Products",
        href: "/products",
    },
];

export default function ProductShow() {
    const { product, auth } = usePage<SharedData>().props as any;
    const { post } = useForm({});
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} />
            <div className="container mx-auto p-4 space-y-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                {product.image && (
                    <ImagePreview src={product.image} alt={product.name} className="h-80 w-full object-cover" />
                )}
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                <p className="font-bold">Rp {product.price}</p>
                {auth.user ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            post(`/cart/add/${product.id}`);
                        }}
                    >
                        <button type="submit" className="rounded bg-primary px-3 py-1 text-white">
                            Add to Cart
                        </button>
                    </form>
                ) : (
                    <a
                        href="/login"
                        className="inline-block rounded bg-primary px-3 py-1 text-white"
                    >
                        Login to order
                    </a>
                )}
            </div>
        </AppLayout>
    );
}
