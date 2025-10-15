/**
 * Halaman ini menampilkan detail satu produk kepada pengunjung (guest) yang belum login.
 * Pengguna dapat melihat informasi lengkap produk, namun tidak dapat langsung membeli.
 * Fitur utama:
 * - Menampilkan gambar, nama, harga, stok, dan tanggal kadaluwarsa produk.
 * - Menampilkan deskripsi produk yang mendukung format rich text (HTML).
 * - Menggunakan `medium-zoom` untuk memperbesar gambar di dalam deskripsi.
 * - Tombol "Beli" akan memunculkan dialog yang mengarahkan pengguna untuk login atau mendaftar.
 */
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImagePreview from "@/components/image-preview";
import mediumZoom from "medium-zoom";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function GuestProductShow() {
    // SECTION: Mengambil data produk dari server dan inisialisasi state untuk dialog.
    const { product } = usePage().props as any;
    const [open, setOpen] = useState(false);

    // SECTION: Efek untuk mengaktifkan fitur zoom pada gambar di deskripsi produk.
    useEffect(() => {
        mediumZoom(".tiptap-content img", { background: "rgba(0,0,0,0.8)" });
    }, []);

    return (
        <>
            <Head title={product.name} />
            <Navbar />
            <div className="container mx-auto space-y-4 p-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                {/* Menampilkan gambar utama produk */}
                {product.image && (
                    <ImagePreview src={product.image} alt={product.name} className="h-80 w-full object-cover" />
                )}
                <div className="rounded-lg border bg-card p-4">
                    {/* SECTION: Menampilkan detail harga, stok, dan tanggal kadaluwarsa */}
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-lg font-semibold">Rp {product.price}</p>
                        <div className="text-sm text-gray-600">Stok: <span className="font-medium">{product.stock ?? '-'}</span></div>
                    </div>
                    {product.expires_at && (
                        new Date(product.expires_at).getTime() < Date.now() ? (
                            <div className="mb-2 text-sm text-red-600">Sudah kadaluwarsa — penjual akan segera restock produk</div>
                        ) : (
                            <div className="mb-2 text-sm text-amber-600">Kadaluwarsa: {new Date(product.expires_at).toLocaleDateString()}</div>
                        )
                    )}
                    {/* Menampilkan deskripsi produk dari HTML */}
                    <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: product.description }} />
                    
                    {/* SECTION: Tombol beli yang memicu dialog login/register */}
                    <div className="mt-4">
                        <Button className="w-full" onClick={() => setOpen(true)}>Beli</Button>
                    </div>
                </div>
            </div>

            {/* SECTION: Dialog yang muncul saat pengguna belum login mencoba membeli */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Masuk untuk Melanjutkan</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">Anda harus login atau daftar untuk membeli produk ini.</p>
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