/**
 * Halaman ini menampilkan halaman detail untuk satu produk spesifik bagi pengguna yang sudah login.
 * Berbeda dengan versi "guest", halaman ini memungkinkan pengguna untuk langsung menambahkan produk ke keranjang.
 * Fitur utama:
 * - Menampilkan semua detail produk: gambar, nama, harga, deskripsi, stok, dan tanggal kadaluwarsa.
 * - Menggunakan `medium-zoom` untuk memperbesar gambar di dalam deskripsi.
 * - Menyediakan kontrol kuantitas (jumlah) untuk menentukan berapa banyak produk yang akan dibeli.
 * - Form untuk menambahkan produk ke keranjang dengan jumlah yang telah ditentukan.
 * - Jika pengguna belum login (meskipun file ini untuk yang sudah login, ada fallback), akan menampilkan tombol untuk login.
 */
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
    // SECTION: Mengambil data produk dan status otentikasi pengguna dari server.
    const { product, auth } = usePage<SharedData>().props as any;
    const [quantity, setQuantity] = useState(1);
    const { data, setData, post, processing } = useForm({
        quantity: 1,
    });

    // SECTION: Efek untuk mengaktifkan fitur zoom pada gambar di deskripsi.
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
                
                {/* Menampilkan deskripsi produk dari HTML */}
                <div className="quill-content" dangerouslySetInnerHTML={{ __html: product.description }} />
                
                {/* Menampilkan info stok dan kadaluwarsa */}
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                {product.expires_at && (
                    new Date(product.expires_at).getTime() < Date.now() ? (
                        <p className="text-sm text-red-600">Sudah kadaluwarsa — Stok akan tersedia kembali segera</p>
                    ) : (
                        <p className="text-sm text-amber-600">Kadaluwarsa: {new Date(product.expires_at).toLocaleDateString()}</p>
                    )
                )}

                {/* SECTION: Menampilkan kontrol pembelian jika pengguna sudah login */}
                {auth.user ? (
                    <div className="space-y-3">
                        {/* Kontrol untuk menambah/mengurangi jumlah produk */}
                        <div className="flex items-center space-x-3">
                            <label htmlFor="quantity" className="font-medium">Jumlah:</label>
                            <div className="flex items-center rounded border">
                                <button type="button" onClick={() => { /* ... */ }} className="...">-</button>
                                <input id="quantity" type="number" min="1" max={product.stock} value={quantity} onChange={(e) => { /* ... */ }} className="..." />
                                <button type="button" onClick={() => { /* ... */ }} className="...">+</button>
                            </div>
                        </div>
                        {/* Form untuk menambahkan ke keranjang */}
                        <form onSubmit={(e) => { e.preventDefault(); post(`/cart/add/${product.id}`); }}>
                            <button type="submit" disabled={processing} className="...">
                                Add {quantity} to Cart
                            </button>
                        </form>
                    </div>
                ) : (
                    // Fallback jika pengguna belum login
                    <a href="/login" className="inline-block rounded bg-primary px-3 py-1 text-white">
                        Login to order
                    </a>
                )}
            </div>
        </AppLayout>
    );
}