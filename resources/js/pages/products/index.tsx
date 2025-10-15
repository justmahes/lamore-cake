/**
 * Halaman ini menampilkan daftar produk untuk pengguna yang sudah login.
 * Pengguna dapat melihat produk, memfilter, mengatur jumlah, dan menambahkannya ke keranjang.
 * Fitur utama:
 * - Menampilkan semua produk dalam format kartu (card).
 * - Filter produk berdasarkan kategori.
 * - Kontrol jumlah (quantity) untuk setiap produk sebelum ditambahkan ke keranjang.
 * - Tombol "Tambah ke Keranjang" untuk setiap produk.
 * - Dialog "Quick View" untuk melihat detail produk tanpa pindah halaman.
 * - Menampilkan status produk seperti Best Seller, Baru, atau Kadaluwarsa.
 */
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import FlashMessage from "@/components/flash-message";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ShoppingCart, CakeSlice, Gift, Package, CupSoda, Cookie, Tag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ... (Definisi breadcrumbs dan fungsi getCategoryIcon)

export default function Products() {
    // SECTION: Mengambil data dari server dan inisialisasi state.
    const { products, categories, selectedCategory, auth } = usePage().props as any;
    const idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" });
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    // SECTION: Fungsi untuk menangani filter berdasarkan kategori.
    const handleCategoryFilter = (category: string) => {
        router.get("/products", { category }, { preserveState: true });
    };

    // SECTION: Fungsi untuk mendapatkan dan mengatur jumlah (quantity) produk.
    const getQuantity = (productId: number) => quantities[productId] || 1;
    const setQuantity = (productId: number, quantity: number) => {
        setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    };

    // State untuk dialog Quick View.
    const [quickOpen, setQuickOpen] = useState(false);
    const [selected, setSelected] = useState<any | null>(null);

    // Fungsi untuk membuka dialog Quick View.
    const quickView = (p: any) => {
        setSelected(p);
        setQuickOpen(true);
    };

    return (
        <>
            <Navbar />
            <Head title="Produk" />
            <FlashMessage />
            <div className="container mx-auto ...">
                <header className="mb-10 ...">
                    {/* ... (Judul halaman) */}
                </header>

                {/* SECTION: Tombol-tombol filter kategori */}
                {categories && categories.length > 0 && (
                    <div className="mb-10 flex flex-wrap items-center gap-2">
                        {/* ... (Render tombol filter) */}
                    </div>
                )}

                {/* SECTION: Menampilkan produk atau pesan jika tidak ada produk */}
                {products.length === 0 ? (
                    <div className="col-span-full ...">
                        {/* Tampilan jika produk kosong */}
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((p: any) => {
                            // ... (Logika untuk badge status, harga, dll.)

                            return (
                                // SECTION: Kartu untuk setiap produk
                                <Card key={p.id} className="group ...">
                                    {/* Tombol untuk membuka Quick View */}
                                    <button type="button" onClick={() => quickView(p)} className="...">
                                        {/* ... (Gambar dan badge status) */}
                                    </button>

                                    <div className="mt-4 flex flex-1 flex-col gap-4">
                                        {/* ... (Nama, kategori, harga, stok) */}

                                        {/* SECTION: Kontrol untuk mengatur jumlah produk */}
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <span className="text-sm font-medium text-slate-600">Jumlah</span>
                                            <div className="flex items-center ...">
                                                <button onClick={() => setQuantity(p.id, Math.max(1, quantity - 1))} >-</button>
                                                <input type="number" value={quantity} onChange={(e) => setQuantity(p.id, ...)} />
                                                <button onClick={() => setQuantity(p.id, Math.min(p.stock, quantity + 1))} >+</button>
                                            </div>
                                        </div>

                                        {/* SECTION: Form untuk menambahkan produk ke keranjang */}
                                        <form className="mt-auto" onSubmit={(e) => { /* ... */ }}>
                                            <Button type="submit" disabled={expired} className="...">
                                                <ShoppingCart className="..." />
                                                {expired ? "Tidak tersedia" : "Tambah ke Keranjang"}
                                            </Button>
                                        </form>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* SECTION: Dialog untuk Quick View */}
            <Dialog open={quickOpen} onOpenChange={setQuickOpen}>
                <DialogContent className="max-w-3xl">
                    {/* ... (Konten detail produk di Quick View) */}
                </DialogContent>
            </Dialog>
            <Footer />
        </>
    );
}