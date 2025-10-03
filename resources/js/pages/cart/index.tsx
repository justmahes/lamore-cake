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

type ToastDetail = {
    type: "success" | "error" | "warning" | "info";
    text: string;
    duration?: number;
    id?: string;
    replace?: boolean;
};

type CartProduct = {
    id: number;
    name: string;
    price: number;
    image?: string | null;
};

type CartItem = {
    id: number;
    quantity: number;
    product: CartProduct;
};

type PageProps = {
    cartItems: CartItem[];
    subtotal: number;
};

type QuantityControlProps = {
    quantity: number;
    onChange: (qty: number) => void;
    disabled?: boolean;
};

function QuantityControl({ quantity, onChange, disabled }: QuantityControlProps) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-2 py-1 shadow-inner shadow-emerald-100/60">
            <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 text-lg font-semibold leading-none shadow-sm transition-transform duration-150 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => onChange(quantity - 1)}
                disabled={disabled || quantity <= 1}
                aria-label="Kurangi jumlah"
            >
                -
            </button>
            <span className="min-w-[2.5rem] text-center text-sm font-semibold text-slate-700">{quantity}</span>
            <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 text-lg font-semibold leading-none shadow-sm transition-transform duration-150 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => onChange(quantity + 1)}
                disabled={disabled}
                aria-label="Tambah jumlah"
            >
                +
            </button>
        </div>
    );
}

function EmptyCartState() {
    return (
        <Card className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-emerald-100 bg-white p-10 text-center shadow-xl shadow-emerald-100/40">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-emerald-50">
                <svg
                    aria-hidden="true"
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    className="text-emerald-400"
                >
                    <defs>
                        <linearGradient id="cart-empty" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A7F3D0" />
                            <stop offset="100%" stopColor="#34D399" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#cart-empty)"
                        d="M24 18a6 6 0 0 1 5.79 4.33L31.7 30H78a4 4 0 0 1 3.87 4.84l-4.8 21A10 10 0 0 1 67.27 60H39.4l.86 4H72a4 4 0 0 1 0 8H36.27a6 6 0 0 1-5.88-4.84L23.3 18H16a4 4 0 1 1 0-8h8Zm18 58a6 6 0 1 1-6 6 6 6 0 0 1 6-6Zm30 0a6 6 0 1 1-6 6 6 6 0 0 1 6-6Z"
                    />
                </svg>
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-slate-900">Keranjang kamu masih kosong</h2>
                <p className="text-sm text-slate-500">Yuk jelajahi menu Lamore Cake dan temukan kue favoritmu.</p>
            </div>
            <Button
                asChild
                className="rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-2 font-semibold text-white shadow-lg shadow-emerald-500/40 transition-transform duration-150 hover:scale-[1.02] hover:shadow-emerald-500/60"
            >
                <a href="/products">Belanja Sekarang</a>
            </Button>
        </Card>
    );
}

function pushToast(detail: ToastDetail) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("app:toast", { detail }));
}

export default function Cart() {
    const { cartItems: initialCartItems = [], subtotal: initialSubtotal = 0 } = usePage<PageProps>().props ?? {};
    const [searchTerm, setSearchTerm] = useState("");

    const cartItems = Array.isArray(initialCartItems) ? initialCartItems : [];
    const subtotal = Number(initialSubtotal) || 0;

    const filteredCartItems = useMemo(() => {
        if (!searchTerm.trim()) return cartItems;
        return cartItems.filter((item) => item.product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [cartItems, searchTerm]);

    const whatsappMessage = useMemo(() => {
        if (!cartItems.length) {
            return encodeURIComponent("Halo Lamore Cake! Keranjang saya kosong, mohon rekomendasinya ya.");
        }

        const lines = cartItems.map((item) => {
            const price = Number(item.product.price || 0);
            return `- ${item.product.name} x${item.quantity} (${idr.format(price)} / pcs)`;
        });

        lines.push(`\nSubtotal: ${idr.format(subtotal)}`);
        lines.push("\nSaya ingin melanjutkan pesanan ini, mohon bantuannya.");

        return encodeURIComponent(lines.join("\n"));
    }, [cartItems, subtotal]);

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
                            <header className="flex flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-sm shadow-slate-100 ring-1 ring-white/40 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-500">Keranjang</p>
                                    <h1 className="mt-1 text-3xl font-bold text-slate-900">Atur pesananmu sebelum checkout</h1>
                                    <p className="mt-2 text-sm text-slate-500">Periksa kembali item yang kamu pilih agar proses checkout makin cepat.</p>
                                </div>
                                {cartItems.length > 0 && (
                                    <div className="w-full max-w-sm">
                                        <label htmlFor="cart-search" className="sr-only">
                                            Cari produk dalam keranjang
                                        </label>
                                        <Input
                                            id="cart-search"
                                            placeholder="Cari produk dalam keranjang..."
                                            value={searchTerm}
                                            onChange={(event) => setSearchTerm(event.target.value)}
                                            className="h-12 rounded-full border-emerald-100 bg-white pr-10 text-sm shadow-inner shadow-emerald-50 focus:border-emerald-300 focus:ring-emerald-200"
                                        />
                                    </div>
                                )}
                            </header>

                            {!filteredCartItems.length ? (
                                <div className="flex h-[60vh] items-center justify-center">
                                    <EmptyCartState />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredCartItems.map((item) => {
                                        const unitPrice = Number(item.product.price || 0);
                                        const lineTotal = unitPrice * item.quantity;

                                        return (
                                            <article
                                                key={item.id}
                                                className="group flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-100/50 sm:flex-row"
                                            >
                                                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-emerald-50 sm:h-28 sm:w-28">
                                                    <img
                                                        src={item.product.image ?? FALLBACK_IMAGE}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                                                    <div className="flex-1 space-y-2">
                                                        <h2 className="text-base font-semibold text-slate-900">{item.product.name}</h2>
                                                        <p className="text-sm text-slate-500">{idr.format(unitPrice)} / pcs</p>
                                                    </div>
                                                    <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:items-end">
                                                        <QuantityControl
                                                            quantity={item.quantity}
                                                            onChange={(next) => handleQuantityChange(item, next)}
                                                        />
                                                        <div className="text-left sm:text-right">
                                                            <span className="text-xs uppercase tracking-wide text-slate-400">Subtotal</span>
                                                            <p className="text-lg font-semibold text-emerald-600">{idr.format(lineTotal)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemove(item)}
                                                    className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-lg transition-transform duration-150 hover:scale-110 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
                                                    aria-label={`Hapus ${item.product.name}`}
                                                >
                                                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                                                </button>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        {cartItems.length > 0 && (
                            <aside className="mt-10 space-y-6 lg:mt-0">
                                <Card className="sticky top-24 rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-100/60">
                                    <CardHeader className="border-b border-emerald-50 pb-4">
                                        <CardTitle className="text-lg font-semibold text-slate-900">Ringkasan Checkout</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-5 pt-6">
                                        <div className="flex items-center justify-between rounded-2xl bg-emerald-50/60 px-4 py-3">
                                            <span className="text-sm font-medium text-slate-600">Subtotal</span>
                                            <span className="text-2xl font-bold text-emerald-600">{idr.format(subtotal)}</span>
                                        </div>

                                        <Button
                                            asChild
                                            className="w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/40 transition-transform duration-150 hover:scale-[1.01] hover:shadow-emerald-500/60"
                                        >
                                            <a href="/checkout">Lanjut ke Checkout</a>
                                        </Button>

                                        <Button
                                            asChild
                                            variant="outline"
                                            className="flex w-full items-center justify-center gap-2 rounded-full border-emerald-200 bg-white py-3 text-base font-semibold text-emerald-600 transition-transform duration-150 hover:scale-[1.01] hover:bg-emerald-50"
                                        >
                                            <a
                                                href={`https://wa.me/628123456789?text=${whatsappMessage}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
                                            </a>
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleClear}
                                            className="w-full rounded-full border border-red-200 py-2 text-sm font-semibold text-red-500 transition-transform duration-150 hover:scale-[1.01] hover:bg-red-50"
                                        >
                                            Bersihkan Keranjang
                                        </Button>
                                    </CardContent>
                                </Card>
                            </aside>
                        )}
                    </div>
                </div>

                {cartItems.length > 0 && (
                    <div className="sticky bottom-0 z-40 border-t border-emerald-100 bg-white/95 px-4 py-4 shadow-[0_-18px_38px_-32px_rgba(16,185,129,0.7)] backdrop-blur lg:hidden">
                        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">Subtotal</span>
                                <span className="text-lg font-bold text-emerald-600">{idr.format(subtotal)}</span>
                            </div>
                            <Button
                                asChild
                                className="w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition-transform duration-150 hover:scale-[1.01] hover:shadow-emerald-500/60"
                            >
                                <a href="/checkout">Lanjut ke Checkout</a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="flex w-full items-center justify-center gap-2 rounded-full border-emerald-200 bg-white py-3 text-sm font-semibold text-emerald-600 transition-transform duration-150 hover:scale-[1.01] hover:bg-emerald-50"
                            >
                                <a
                                    href={`https://wa.me/628123456789?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
                                </a>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClear}
                                className="w-full rounded-full border border-red-200 py-2 text-xs font-semibold text-red-500 transition-transform duration-150 hover:scale-[1.01] hover:bg-red-50"
                            >
                                Bersihkan Keranjang
                            </Button>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
