import ImagePreview from "@/components/image-preview";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem, type SharedData } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import mediumZoom from "medium-zoom";
import { useEffect, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Products",
        href: "/products",
    },
];

export default function ProductShow() {
    const { product, auth } = usePage<SharedData>().props as any;
    const [quantity, setQuantity] = useState(1);
    const { data, setData, post, processing } = useForm({
        quantity: 1,
    });

    useEffect(() => {
        mediumZoom(".quill-content img", { background: "rgba(0,0,0,0.8)" });
    }, []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} />
            <div className="container mx-auto space-y-4 p-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="font-bold">Rp {product.price}</p>
                {product.image && <ImagePreview src={product.image} alt={product.name} className="h-80 w-full object-cover" />}
                <div className="quill-content" dangerouslySetInnerHTML={{ __html: product.description }} />
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                {auth.user ? (
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <label htmlFor="quantity" className="font-medium">
                                Quantity:
                            </label>
                            <div className="flex items-center rounded border">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newQty = Math.max(1, quantity - 1);
                                        setQuantity(newQty);
                                        setData("quantity", newQty);
                                    }}
                                    className="border-r px-3 py-1 hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={quantity}
                                    onChange={(e) => {
                                        const newQty = Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1));
                                        setQuantity(newQty);
                                        setData("quantity", newQty);
                                    }}
                                    className="w-16 border-0 px-2 py-1 text-center focus:ring-0"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newQty = Math.min(product.stock, quantity + 1);
                                        setQuantity(newQty);
                                        setData("quantity", newQty);
                                    }}
                                    className="border-l px-3 py-1 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                post(`/cart/add/${product.id}`);
                            }}
                        >
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:opacity-50"
                            >
                                Add {quantity} to Cart
                            </button>
                        </form>
                    </div>
                ) : (
                    <a href="/login" className="inline-block rounded bg-primary px-3 py-1 text-white">
                        Login to order
                    </a>
                )}
            </div>
        </AppLayout>
    );
}
