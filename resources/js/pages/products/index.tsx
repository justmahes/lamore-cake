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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Produk",
        href: "/products",
    },
];

const getCategoryIcon = (category?: string): LucideIcon => {
    const key = (category || "").toLowerCase();
    if (key.includes("cake") || key.includes("bolu") || key.includes("kue")) return CakeSlice;
    if (key.includes("hamp")) return Gift;
    if (key.includes("minum") || key.includes("drink")) return CupSoda;
    if (key.includes("snack") || key.includes("jajan") || key.includes("kudap")) return Cookie;
    return Tag;
};

export default function Products() {
    const { products, categories, selectedCategory, auth } = usePage().props as any;
    const idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" });
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    const handleCategoryFilter = (category: string) => {
        router.get("/products", { category }, { preserveState: true });
    };

    const getQuantity = (productId: number) => quantities[productId] || 1;

    const setQuantity = (productId: number, quantity: number) => {
        setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    };

    const [quickOpen, setQuickOpen] = useState(false);
    const [selected, setSelected] = useState<any | null>(null);

    const quickView = (p: any) => {
        setSelected(p);
        setQuickOpen(true);
    };

    return (
        <>
            <Navbar />
            <Head title="Produk" />
            <FlashMessage />
            <div className="container mx-auto max-w-6xl px-4 pb-24 pt-28">
                <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Jelajahi Produk Lamore Cake</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                            Pilih cake, hampers, dan jajanan favorit dengan kualitas homemade. Gunakan filter kategori untuk menemukan menu yang sesuai selera.
                        </p>
                    </div>
                </header>

                {/* Category Filter Tabs */}
                {categories && categories.length > 0 && (
                    <div className="mb-10 flex flex-wrap items-center gap-2">
                        {[
                            { value: "all", label: "Semua" },
                            ...categories.map((category: string) => ({ value: category, label: category })),
                        ].map(({ value, label }) => {
                            const Icon = value === "all" ? Package : getCategoryIcon(label);
                            const isActive = selectedCategory === value || (!selectedCategory && value === "all");
                            return (
                                <button
                                    key={value}
                                    onClick={() => handleCategoryFilter(value)}
                                    className={cn(
                                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                                        "focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-200",
                                        isActive
                                            ? "border-emerald-500 bg-emerald-500 text-white shadow"
                                            : "border-emerald-100 bg-white text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50"
                                    )}
                                    type="button"
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="capitalize">{label}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {products.length === 0 ? (
                    <div className="col-span-full rounded-3xl border border-emerald-100 bg-white/70 p-12 text-center shadow-sm">
                        <div className="mx-auto max-w-sm space-y-3">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
                                <Package className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900">
                                {selectedCategory === "all" ? "Tidak ada produk" : `Tidak ada produk di kategori "${selectedCategory}"`}
                            </h3>
                            <p className="text-sm text-slate-600">
                                {selectedCategory === "all"
                                    ? "Belum ada produk yang tersedia saat ini. Silakan kembali lagi nanti."
                                    : "Belum ada produk yang tersedia di kategori ini."}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((p: any) => {
                            const daysLeft = p.expires_at ? Math.ceil((new Date(p.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
                            const nearExpiry = typeof daysLeft === "number" && daysLeft >= 0 && daysLeft <= 3;
                            const expired = typeof daysLeft === "number" && daysLeft < 0;
                            const isBestSeller = Boolean(p?.is_best_seller ?? p?.best_seller ?? p?.bestSeller);
                            const isNew = Boolean(p?.is_new ?? p?.new ?? p?.isNew ?? p?.status === "new");

                            const statusBadge = (() => {
                                if (expired) {
                                    return { label: "Sudah Kadaluarsa", className: "bg-red-400 text-white shadow-md" };
                                }
                                if (isBestSeller) {
                                    return { label: "Best Seller", className: "bg-emerald-500 text-white shadow" };
                                }
                                if (isNew) {
                                    return { label: "Produk Baru", className: "border border-emerald-200 bg-emerald-100 text-emerald-700" };
                                }
                                if (nearExpiry) {
                                    return { label: "Hampir Kadaluarsa", className: "border border-amber-200 bg-amber-100 text-amber-800" };
                                }
                                return null;
                            })();

                            const quantity = getQuantity(p.id);
                            const formattedPrice = idr.format(Number(p.price || 0));
                            const categoryName = p.category?.nama || p.kategori;
                            const CategoryIcon = categoryName ? getCategoryIcon(categoryName) : null;

                            return (
                                <Card
                                    key={p.id}
                                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <button
                                        type="button"
                                        onClick={() => quickView(p)}
                                        className="relative block w-full"
                                        aria-label={`Lihat detail cepat ${p.name}`}
                                    >
                                        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-emerald-50">
                                            {statusBadge && (
                                                <span
                                                    className={cn(
                                                        "absolute right-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                                                        statusBadge.className
                                                    )}
                                                >
                                                    {statusBadge.label}
                                                </span>
                                            )}
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                    </button>

                                    <div className="mt-4 flex flex-1 flex-col gap-4">
                                        <div className="space-y-2">
                                            <div className="space-y-1">
                                                <h2 className="text-base font-semibold leading-tight text-slate-900 line-clamp-2">{p.name}</h2>
                                                {categoryName && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                                        {CategoryIcon && <CategoryIcon className="h-3.5 w-3.5" />}
                                                        <span className="capitalize">{categoryName}</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-lg font-bold text-emerald-600">{formattedPrice}</p>
                                                <p className="text-xs text-slate-500">Stok: {p.stock ?? "-"}</p>
                                                {nearExpiry && !expired && (
                                                    <p className="text-xs font-semibold text-amber-600">Segera habis dalam {daysLeft} hari</p>
                                                )}
                                                {expired && (
                                                    <p className="text-xs font-semibold text-red-500">Produk sudah tidak tersedia</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <span className="text-sm font-medium text-slate-600">Jumlah</span>
                                            <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/40 px-2 py-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity(p.id, Math.max(1, quantity - 1))}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition hover:bg-emerald-100"
                                                    disabled={expired}
                                                    aria-label="Kurangi jumlah"
                                                >
                                                    −
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={p.stock}
                                                    value={quantity}
                                                    onChange={(e) =>
                                                        setQuantity(
                                                            p.id,
                                                            Math.max(1, Math.min(p.stock, parseInt(e.target.value) || 1))
                                                        )
                                                    }
                                                    className="w-12 border-0 bg-transparent text-center text-sm font-semibold text-slate-700 focus:outline-none focus:ring-0"
                                                    disabled={expired}
                                                    aria-label="Jumlah yang ingin dibeli"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity(p.id, Math.min(p.stock, quantity + 1))}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition hover:bg-emerald-100"
                                                    disabled={expired}
                                                    aria-label="Tambah jumlah"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <form
                                            className="mt-auto"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                if (expired) return;
                                                router.post(`/cart/add/${p.id}`, { quantity });
                                            }}
                                        >
                                            <Button
                                                type="submit"
                                                disabled={expired}
                                                title={expired ? "Produk telah kadaluwarsa" : undefined}
                                                className={cn(
                                                    "group inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300",
                                                    "hover:-translate-y-0.5 hover:shadow-lg",
                                                    "disabled:translate-y-0 disabled:cursor-not-allowed disabled:border disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500 disabled:shadow-none",
                                                    !expired && "border-0 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-white hover:from-emerald-400 hover:via-emerald-500 hover:to-emerald-600"
                                                )}
                                            >
                                                <ShoppingCart className={cn("h-4 w-4", expired && "text-slate-400")} />
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
            {/* Quick view dialog */}
            <Dialog open={quickOpen} onOpenChange={setQuickOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{selected?.name ?? "Produk"}</DialogTitle>
                    </DialogHeader>
                    {selected && (
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="overflow-hidden rounded-2xl border border-emerald-100">
                                <img src={selected.image} alt={selected.name} className="w-full object-cover" />
                            </div>
                            <div className="space-y-3">
                                <div className="text-lg font-semibold text-emerald-600">{idr.format(Number(selected.price || 0))}</div>
                                <div className="text-sm text-slate-600">
                                    Stok: <span className="font-medium">{selected.stock ?? "-"}</span>
                                </div>
                                {selected.expires_at && (
                                    new Date(selected.expires_at).getTime() < Date.now() ? (
                                        <div className="text-xs font-semibold text-red-500">Sudah kadaluwarsa - stok akan tersedia kembali segera</div>
                                    ) : (
                                        <div className="text-xs font-semibold text-amber-600">Kadaluwarsa: {new Date(selected.expires_at).toLocaleDateString()}</div>
                                    )
                                )}
                                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selected.description || "" }} />
                                <div className="pt-2">
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
