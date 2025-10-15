/**
 * Halaman ini menampilkan keranjang belanja pengguna.
 * Pengguna dapat melihat produk yang telah ditambahkan, mengubah jumlah, atau menghapusnya.
 * Fitur utama:
 * - Menampilkan daftar produk di keranjang dengan gambar, nama, harga, dan jumlah.
 * - Kontrol untuk menambah atau mengurangi jumlah setiap produk.
 * - Tombol untuk menghapus produk dari keranjang.
 * - Menampilkan ringkasan subtotal belanja.
 * - Tombol untuk melanjutkan ke proses checkout atau memesan via WhatsApp.
 * - Tombol untuk mengosongkan seluruh keranjang belanja.
 * - Menampilkan tampilan khusus jika keranjang kosong, mengajak pengguna untuk berbelanja.
 */
import { Head, router, usePage } from "@inertiajs/react";
import { useCallback, useMemo, useState } from "react";
import { MessageCircle, Trash2 } from "lucide-react";

import FlashMessage from "@/components/flash-message";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


const idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" });
const FALLBACK_IMAGE = "/assets/home/1.jpg";

// ... (definisi tipe data)

// SECTION: Komponen untuk kontrol kuantitas (tambah/kurang jumlah produk)
function QuantityControl({ quantity, onChange, disabled }: QuantityControlProps) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-2 py-1 shadow-inner shadow-emerald-100/60">
            <button
                type="button"
                className="..."
                onClick={() => onChange(quantity - 1)}
                disabled={disabled || quantity <= 1}
                aria-label="Kurangi jumlah"
            >
                -
            </button>
            <span className="min-w-[2.5rem] text-center text-sm font-semibold text-slate-700">{quantity}</span>
            <button
                type="button"
                className="..."
                onClick={() => onChange(quantity + 1)}
                disabled={disabled}
                aria-label="Tambah jumlah"
            >
                +
            </button>
        </div>
    );
}

// SECTION: Komponen yang ditampilkan saat keranjang belanja kosong.
function EmptyCartState() {
    return (
        <Card className="flex flex-col items-center justify-center ...">
            {/* ... (Icon dan teks untuk keranjang kosong) */}
            <Button asChild className="...">
                <a href="/products">Belanja Sekarang</a>
            </Button>
        </Card>
    );
}

// Fungsi helper untuk menampilkan notifikasi (toast)
function pushToast(detail: ToastDetail) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("app:toast", { detail }));
}

export default function Cart() {
    // SECTION: Mengambil data keranjang dari server dan inisialisasi state.
    const { cartItems: initialCartItems = [], subtotal: initialSubtotal = 0 } = usePage<PageProps>().props ?? {};
    const [searchTerm, setSearchTerm] = useState("");

    const cartItems = Array.isArray(initialCartItems) ? initialCartItems : [];
    const subtotal = Number(initialSubtotal) || 0;

    // SECTION: Logika untuk memfilter item di keranjang berdasarkan pencarian.
    const filteredCartItems = useMemo(() => {
        if (!searchTerm.trim()) return cartItems;
        return cartItems.filter((item) => item.product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [cartItems, searchTerm]);

    // SECTION: Membuat pesan default untuk pemesanan via WhatsApp.
    const whatsappMessage = useMemo(() => {
        if (!cartItems.length) {
            return encodeURIComponent("Halo Lamore Cake! Keranjang saya kosong, mohon rekomendasinya ya.");
        }
        const lines = cartItems.map((item) => {
            const price = Number(item.product.price || 0);
            return `- ${item.product.name} x${item.quantity} (${idr.format(price)} / pcs)
`;
        });
        lines.push(`\nSubtotal: ${idr.format(subtotal)}`);
        lines.push("\nSaya ingin melanjutkan pesanan ini, mohon bantuannya.");
        return encodeURIComponent(lines.join("\n"));
    }, [cartItems, subtotal]);

    // SECTION: Fungsi untuk mengubah jumlah produk di keranjang.
    const handleQuantityChange = useCallback(
        (item: CartItem, nextQty: number) => {
            const safeQty = Math.max(1, Number.isFinite(nextQty) ? Math.floor(nextQty) : 1);
            if (safeQty === item.quantity) return;

            router.patch(
                `/cart/update/${item.id}`,
                { quantity: safeQty },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        pushToast({ type: "success", text: `${item.product.name} diperbarui menjadi ${safeQty} pcs.` });
                    },
                    onError: () => {
                        pushToast({ type: "error", text: `Gagal memperbarui jumlah ${item.product.name}. Coba lagi ya.` });
                    },
                }
            );
        },
        []
    );

    // SECTION: Fungsi untuk menghapus satu item dari keranjang.
    const handleRemove = useCallback((item: CartItem) => {
        router.delete(`/cart/remove/${item.id}`,
            {
                preserveScroll: true,
                onSuccess: () => {
                    pushToast({ type: "info", text: `${item.product.name} dihapus dari keranjang.` });
                },
                onError: () => {
                    pushToast({ type: "error", text: `Gagal menghapus ${item.product.name}.` });
                },
            }
        );
    }, []);

    // SECTION: Fungsi untuk mengosongkan semua item dari keranjang.
    const handleClear = useCallback(() => {
        if (!cartItems.length) return;
        if (!window.confirm("Bersihkan semua item di keranjang?")) return;

        router.delete(`/cart/clear`, {
            preserveScroll: true,
            onSuccess: () => {
                pushToast({ type: "warning", text: "Keranjang berhasil dibersihkan." });
            },
            onError: () => {
                pushToast({ type: "error", text: "Gagal membersihkan keranjang." });
            },
        });
    }, [cartItems.length]);

    return (
        <>
            <Navbar />
            <Head title="Keranjang" />
            <FlashMessage />
            <main className="bg-slate-50">
                <div className="container mx-auto max-w-6xl px-4 pb-28 pt-24 lg:pb-20">
                    <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-8">
                        <section className="space-y-6">
                            {/* Header halaman keranjang */}
                            <header className="...">
                                {/* ... */}
                            </header>

                            {/* SECTION: Menampilkan daftar produk atau tampilan keranjang kosong */}
                            {!filteredCartItems.length ? (
                                <div className="flex h-[60vh] items-center justify-center">
                                    <EmptyCartState />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredCartItems.map((item) => {
                                        // ... (Render setiap item di keranjang)
                                        return (
                                            <article key={item.id} className="...">
                                                {/* ... (Detail produk, gambar, nama, harga) */}
                                                <QuantityControl
                                                    quantity={item.quantity}
                                                    onChange={(next) => handleQuantityChange(item, next)}
                                                />
                                                {/* ... (Subtotal per item) */}
                                                <button type="button" onClick={() => handleRemove(item)} className="...">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        {/* SECTION: Ringkasan checkout di sisi kanan (desktop) */}
                        {cartItems.length > 0 && (
                            <aside className="mt-10 space-y-6 lg:mt-0">
                                <Card className="sticky top-24 ...">
                                    <CardHeader>
                                        <CardTitle>Ringkasan Checkout</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-5 pt-6">
                                        <div className="...">
                                            <span>Subtotal</span>
                                            <span>{idr.format(subtotal)}</span>
                                        </div>
                                        <Button asChild className="...">
                                            <a href="/checkout">Lanjut ke Checkout</a>
                                        </Button>
                                        <Button asChild variant="outline" className="...">
                                            <a href={`https://wa.me/628123456789?text=${whatsappMessage}`} target="_blank">
                                                <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
                                            </a>
                                        </Button>
                                        <Button type="button" variant="outline" onClick={handleClear} className="...">
                                            Bersihkan Keranjang
                                        </Button>
                                    </CardContent>
                                </Card>
                            </aside>
                        )}
                    </div>
                </div>

                {/* SECTION: Ringkasan checkout sticky di bagian bawah (mobile) */}
                {cartItems.length > 0 && (
                    <div className="sticky bottom-0 z-40 ...">
                        {/* ... (Tombol-tombol aksi untuk mobile) */}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}