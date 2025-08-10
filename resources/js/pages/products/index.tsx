import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Produk",
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
            <Head title="Produk" />
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold">Produk</h1>
                
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
                            Semua
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

                {products.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <div className="max-w-sm mx-auto">
                            <div className="mb-4">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {selectedCategory === 'all' ? 'Tidak ada produk' : `Tidak ada produk di kategori "${selectedCategory}"`}
                            </h3>
                            <p className="text-gray-500">
                                {selectedCategory === 'all' 
                                    ? 'Belum ada produk yang tersedia saat ini.' 
                                    : 'Belum ada produk yang tersedia di kategori ini.'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-3">
                        {products.map((p: any) => (
                        <div key={p.id} className="rounded border p-4">
                            <a href={`/products/${p.id}`}>
                                <img src={p.image} alt={p.name} className="mb-2 h-40 w-full object-cover" />
                                <h2 className="font-semibold">{p.name}</h2>
                                {(p.category?.nama || p.kategori) && (
                                    <span className="text-sm text-gray-500 capitalize">
                                        {p.category?.nama || p.kategori}
                                    </span>
                                )}
                            </a>
                            <p className="font-bold">Rp {p.price}</p>
                            <p className="text-sm text-gray-600">Stok: {p.stock}</p>
                            {auth?.user ? (
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <label className="text-sm font-medium">Jml:</label>
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
                                            Tambah {getQuantity(p.id)} ke Keranjang
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="mt-2">
                                    <a href="/login" className="inline-block w-full text-center rounded bg-primary px-3 py-1 text-white">
                                        Masuk untuk memesan
                                    </a>
                                </div>
                            )}
                        </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
