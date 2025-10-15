/**
 * Halaman ini menampilkan semua produk yang tersedia untuk pengunjung (guest).
 * Pengguna dapat melihat produk, memfilter berdasarkan kategori, dan melihat detail cepat.
 * Karena pengguna belum login, tombol "Beli" akan mengarahkan ke halaman login/register.
 * Fitur utama:
 * - Menampilkan semua produk dalam format kartu (card).
 * - Filter produk berdasarkan kategori dengan tombol tab.
 * - Menampilkan status produk (misal: Best Seller, Baru, Kadaluwarsa) pada setiap kartu.
 * - Tombol "Lihat" untuk membuka dialog "Quick View" yang menampilkan detail produk.
 * - Tombol "Beli" yang memunculkan dialog untuk login atau register.
 * - Tampilan khusus jika tidak ada produk yang tersedia.
 */
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import FlashMessage from "@/components/flash-message";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Head, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ShoppingCart, CakeSlice, Gift, Package, CupSoda, Cookie, Tag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Fungsi untuk mendapatkan ikon berdasarkan nama kategori.
const getCategoryIcon = (category?: string): LucideIcon => {
    // ... (logika pemilihan ikon)
};

export default function GuestProducts() {
    // SECTION: Mengambil data produk, kategori, dan status otentikasi dari server.
    const { products, auth, categories, selectedCategory } = usePage().props as any;
    const idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" });
    
    // State untuk dialog (login & quick view) dan produk yang dipilih.
    const [open, setOpen] = useState(false);
    const [quickOpen, setQuickOpen] = useState(false);
    const [selected, setSelected] = useState<any | null>(null);

    // SECTION: Fungsi untuk menangani filter kategori.
    const handleCategoryFilter = (category: string) => {
        router.get("/products", { category }, { preserveState: true });
    };

    // SECTION: Fungsi untuk menampilkan dialog login saat tombol "Beli" diklik.
    const requireAuth = (product: any) => {
        setSelected(product);
        setOpen(true);
    };

    // SECTION: Fungsi untuk menampilkan dialog detail cepat (Quick View).
    const quickView = (product: any) => {
        setSelected(product);
        setQuickOpen(true);
    };

    return (
        <>
            <Navbar />
            <Head title="Produk" />
            <FlashMessage />
            <div className="container mx-auto max-w-6xl px-4 pb-24 pt-28">
                <header className="mb-10 ...">
                    {/* ... (Judul halaman) */}
                </header>

                {/* SECTION: Filter kategori dalam bentuk tombol tab */}
                {categories && categories.length > 0 && (
                    <div className="mb-10 flex flex-wrap items-center gap-2">
                        {/* ... (Mapping dan render tombol filter) */}
                    </div>
                )}

                {/* SECTION: Tampilan utama, menampilkan produk atau pesan jika kosong */}
                {products.length === 0 ? (
                    <div className="col-span-full ...">
                        {/* Tampilan jika tidak ada produk */}
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((p: any) => {
                            // ... (Logika untuk status badge dan format harga)

                            return (
                                // SECTION: Kartu untuk setiap produk
                                <Card key={p.id} className="group ...">
                                    <button type="button" onClick={() => quickView(p)} className="...">
                                        <div className="relative ...">
                                            {/* Badge status produk (Best Seller, dll) */}
                                            {statusBadge && (
                                                <span className={cn("absolute ...", statusBadge.className)}>
                                                    {statusBadge.label}
                                                </span>
                                            )}
                                            <img src={p.image} alt={p.name} className="..." />
                                        </div>
                                    </button>

                                    <div className="mt-4 flex flex-1 flex-col gap-4">
                                        {/* ... (Nama, kategori, harga, stok) */}

                                        <div className="mt-auto flex flex-col gap-2">
                                            {/* Tombol untuk membuka Quick View */}
                                            <Button type="button" onClick={() => quickView(p)} variant="outline" className="...">
                                                Lihat
                                            </Button>
                                            {/* Tombol Beli (memicu dialog login) */}
                                            <Button type="button" onClick={() => requireAuth(p)} disabled={expired} className="...">
                                                <ShoppingCart className="..." />
                                                {expired ? "Tidak tersedia" : "Beli"}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* SECTION: Dialog untuk Quick View (melihat detail produk dengan cepat) */}
            <Dialog open={quickOpen} onOpenChange={setQuickOpen}>
                <DialogContent className="max-w-3xl">
                    {/* ... (Konten detail produk di dalam dialog) */}
                </DialogContent>
            </Dialog>

            {/* SECTION: Dialog yang meminta pengguna untuk login/register */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    {/* ... (Konten dialog login/register) */}
                </DialogContent>
            </Dialog>
            <Footer />
        </>
    );
}