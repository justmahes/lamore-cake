import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import FlashMessage from "@/components/flash-message";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Head, usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function GuestProducts() {
    const { products, auth, categories, selectedCategory } = usePage().props as any;
    const [open, setOpen] = useState(false); // login/register dialog
    const [quickOpen, setQuickOpen] = useState(false); // quick view dialog
    const [selected, setSelected] = useState<any | null>(null);

    const handleCategoryFilter = (category: string) => {
        router.get('/products', { category }, { preserveState: true });
    };

    const requireAuth = (product: any) => {
        setSelected(product);
        setOpen(true);
    };

    const quickView = (product: any) => {
        setSelected(product);
        setQuickOpen(true);
    };

    return (
        <>
            <Head title="Products" />
            <Navbar />
            <FlashMessage />
            <div className="container mx-auto space-y-4 p-4">
                <h1 className="text-2xl font-bold">Produk</h1>
                
                {/* Category Filter Tabs */}
                {categories && categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 border-b">
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
                    <div className="text-center py-12">
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
                        {products.map((p: any) => (
                            <div key={p.id} className="group overflow-hidden rounded-lg border bg-card p-3 shadow hover:shadow-md">
                                <button onClick={() => quickView(p)} className="block w-full text-left">
                                    <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
                                        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <div className="mt-3 flex items-start justify-between gap-3">
                                        <div>
                                            <h2 className="font-semibold leading-tight">{p.name}</h2>
                                            {(p.category?.nama || p.kategori) && (
                                                <span className="text-sm text-gray-500 capitalize">
                                                    {p.category?.nama || p.kategori}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">Stok</div>
                                            <div className="text-sm font-medium">{p.stock ?? '-'}</div>
                                        </div>
                                    </div>
                                    <p className="mt-1 font-bold">Rp {p.price}</p>
                                </button>
                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    <Button onClick={() => quickView(p)} variant="outline">Lihat</Button>
                                    <Button onClick={() => requireAuth(p)}>Beli</Button>
                                </div>
                            </div>
                        ))}
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
                                <div className="text-sm text-gray-600 mb-1">Stok: <span className="font-medium">{selected.stock ?? '-'}</span></div>
                                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selected.description || '' }} />
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    <Button variant="outline" onClick={() => setQuickOpen(false)}>Tutup</Button>
                                    <Button onClick={() => { setQuickOpen(false); requireAuth(selected); }}>Beli</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            {/* Dialog login/register */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Masuk untuk Melanjutkan</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        Anda harus login atau daftar untuk membeli produk{selected ? ` “${selected.name}”` : ''}.
                    </p>
                    <DialogFooter className="sm:space-x-2">
                        <a href="/login"><Button className="w-full sm:w-auto">Login</Button></a>
                        <a href="/register"><Button variant="outline" className="w-full sm:w-auto">Daftar</Button></a>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Footer />
        </>
    );
}
