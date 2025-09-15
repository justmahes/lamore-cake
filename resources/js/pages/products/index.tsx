import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import FlashMessage from "@/components/flash-message";
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

    const [quickOpen, setQuickOpen] = useState(false);
    const [selected, setSelected] = useState<any | null>(null);

    const quickView = (p: any) => { setSelected(p); setQuickOpen(true); };

    return (
        <>
            <Navbar />
            <Head title="Produk" />
            <FlashMessage />
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
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((p: any) => {
                        const daysLeft = p.expires_at ? Math.ceil((new Date(p.expires_at).getTime() - Date.now()) / (1000*60*60*24)) : null;
                        const nearExpiry = typeof daysLeft === 'number' && daysLeft >= 0 && daysLeft <= 3;
                        const expired = typeof daysLeft === 'number' && daysLeft < 0;
                        return (
                        <Card key={p.id} className="overflow-hidden border bg-card p-3 shadow hover:shadow-md">
                            <button onClick={() => quickView(p)} className="block w-full text-left">
                                <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
                                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                                </div>
                                <div className="mt-3 flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="font-semibold leading-tight">{p.name}</h2>
                                        {(p.category?.nama || p.kategori) && (
                                            <span className="text-sm text-gray-500 capitalize">
                                                {p.category?.nama || p.kategori}
                                            </span>
                                        )}
                                        {nearExpiry && (
                                            <div className="mt-1 inline-flex items-center rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Hampir kadaluwarsa</div>
                                        )}
                                        {expired && (
                                            <div className="mt-1 inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">Sudah kadaluwarsa</div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Stok</div>
                                        <div className="text-sm font-medium">{p.stock ?? '-'}</div>
                                    </div>
                                </div>
                                <p className="mt-1 font-bold">Rp {p.price}</p>
                            </button>
                            <div className="mt-3 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm font-medium">Jml:</label>
                                    <div className="flex items-center rounded border">
                                        <button type="button" onClick={() => setQuantity(p.id, Math.max(1, getQuantity(p.id) - 1))} className="border-r px-2 py-1 text-sm hover:bg-gray-100">-</button>
                                        <input type="number" min="1" max={p.stock} value={getQuantity(p.id)} onChange={(e) => setQuantity(p.id, Math.max(1, Math.min(p.stock, parseInt(e.target.value) || 1)))} className="w-12 border-0 px-1 py-1 text-center text-sm focus:ring-0" />
                                        <button type="button" onClick={() => setQuantity(p.id, Math.min(p.stock, getQuantity(p.id) + 1))} className="border-l px-2 py-1 text-sm hover:bg-gray-100">+</button>
                                    </div>
                                </div>
                                <form onSubmit={(e) => { e.preventDefault(); router.post(`/cart/add/${p.id}`, { quantity: getQuantity(p.id) }); }}>
                                    <Button type="submit" className="w-full" disabled={expired} title={expired ? 'Produk telah kadaluwarsa' : undefined}>Tambah {getQuantity(p.id)} ke Keranjang</Button>
                                </form>
                            </div>
                        </Card>
                        );
                        })}
                    </div>
                )}
            </div>
            {/* Quick view dialog */}
            <Dialog open={quickOpen} onOpenChange={setQuickOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{selected?.name ?? 'Produk'}</DialogTitle>
                    </DialogHeader>
                    {selected && (
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="overflow-hidden rounded-md">
                                <img src={selected.image} alt={selected.name} className="w-full object-cover" />
                            </div>
                            <div>
                                <div className="mb-2 text-lg font-semibold">Rp {selected.price}</div>
                                <div className="mb-1 text-sm text-gray-600">Stok: <span className="font-medium">{selected.stock ?? '-'}</span></div>
                                {selected.expires_at && (
                                    new Date(selected.expires_at).getTime() < Date.now() ? (
                                        <div className="mb-1 text-xs text-red-700">Sudah kadaluwarsa — Stok akan tersedia kembali segera</div>
                                    ) : (
                                        <div className="mb-1 text-xs text-amber-700">Kadaluwarsa: {new Date(selected.expires_at).toLocaleDateString()}</div>
                                    )
                                )}
                                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selected.description || '' }} />
                                <div className="mt-4">
                                    <Button onClick={() => setQuickOpen(false)}>Tutup</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            <Footer />
        </>
    );
}
