import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Products",
        href: "/products",
    },
];

export default function Products() {
    const { products, categories, selectedCategory, auth } = usePage().props as any;
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    const handleCategoryFilter = (category: string) => {
        router.get('/products', { category }, { preserveState: true });
    };

    const getQuantity = (productId: number) => quantities[productId] || 1;
    
    const setQuantity = (productId: number, quantity: number) => {
        setQuantities(prev => ({ ...prev, [productId]: quantity }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold">Products</h1>
                
                {/* Category Filter Tabs */}
                {categories && categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 border-b mb-4">
                        <button
                            onClick={() => handleCategoryFilter('all')}
                            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                                selectedCategory === 'all'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            All
                        </button>
                        {categories.map((category: string) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryFilter(category)}
                                className={`px-4 py-2 font-medium border-b-2 transition-colors capitalize ${
                                    selectedCategory === category
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-3">
                    {products.map((p: any) => (
                        <div key={p.id} className="rounded border p-4">
                            <a href={`/products/${p.id}`}>
                                <img src={p.image} alt={p.name} className="mb-2 h-40 w-full object-cover" />
                                <h2 className="font-semibold">{p.name}</h2>
                                {p.category && (
                                    <span className="text-sm text-gray-500 capitalize">
                                        {p.category}
                                    </span>
                                )}
                            </a>
                            <p className="font-bold">Rp {p.price}</p>
                            <p className="text-sm text-gray-600">Stock: {p.stock}</p>
                            {auth?.user ? (
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <label className="text-sm font-medium">Qty:</label>
                                        <div className="flex items-center border rounded">
                                            <button 
                                                type="button"
                                                onClick={() => setQuantity(p.id, Math.max(1, getQuantity(p.id) - 1))}
                                                className="px-2 py-1 text-sm border-r hover:bg-gray-100"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                max={p.stock}
                                                value={getQuantity(p.id)}
                                                onChange={(e) => setQuantity(p.id, Math.max(1, Math.min(p.stock, parseInt(e.target.value) || 1)))}
                                                className="w-12 px-1 py-1 text-sm text-center border-0 focus:ring-0"
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setQuantity(p.id, Math.min(p.stock, getQuantity(p.id) + 1))}
                                                className="px-2 py-1 text-sm border-l hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            router.post(`/cart/add/${p.id}`, {
                                                quantity: getQuantity(p.id)
                                            });
                                        }}
                                    >
                                        <button type="submit" className="w-full rounded bg-primary px-3 py-1 text-white hover:bg-primary/90">
                                            Add {getQuantity(p.id)} to Cart
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="mt-2">
                                    <a href="/login" className="inline-block w-full text-center rounded bg-primary px-3 py-1 text-white">
                                        Login to order
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
