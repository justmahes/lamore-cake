import { Head, usePage } from "@inertiajs/react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import FlashMessage from "@/components/flash-message";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import {
    Clock3,
    CheckCircle2,
    XCircle,
    CreditCard,
    Truck,
    CircleDollarSign,
    Search,
    Package,
    X,
} from "lucide-react";

const STATUS_FILTERS = [
    { value: "all", label: "Semua", statuses: ["*"] },
    { value: "processing", label: "Proses", statuses: ["pending", "processing", "shipped"] },
    { value: "paid", label: "Pembayaran Berhasil", statuses: ["paid"] },
    { value: "delivered", label: "Selesai", statuses: ["delivered"] },
    { value: "failed", label: "Gagal", statuses: ["failed", "cancelled"] },
];

const STATUS_STYLES: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    processing: "bg-amber-100 text-amber-700",
    shipped: "bg-amber-100 text-amber-700",
    paid: "bg-blue-100 text-blue-600",
    delivered: "bg-emerald-100 text-emerald-600",
    failed: "bg-red-100 text-red-600",
    cancelled: "bg-red-100 text-red-600",
};

const STATUS_ICONS: Record<string, JSX.Element> = {
    pending: <Clock3 className="h-4 w-4" />,
    processing: <Clock3 className="h-4 w-4" />,
    shipped: <Truck className="h-4 w-4" />,
    paid: <CreditCard className="h-4 w-4" />,
    delivered: <CheckCircle2 className="h-4 w-4" />,
    failed: <XCircle className="h-4 w-4" />,
    cancelled: <XCircle className="h-4 w-4" />,
};

const statusLabel = (s?: string) => {
    switch (s) {
        case "pending":
        case "processing":
        case "shipped":
            return "Proses";
        case "paid":
            return "Pembayaran Berhasil";
        case "delivered":
            return "Selesai";
        case "cancelled":
            return "Dibatalkan";
        case "failed":
            return "Pembayaran Gagal";
        default:
            return s || "-";
    }
};

function Countdown({ expireAt }: { expireAt: number }) {
    const [remain, setRemain] = useState<number>(Math.max(0, expireAt - Date.now()));

    useEffect(() => {
        const id = setInterval(() => setRemain(Math.max(0, expireAt - Date.now())), 1000);
        return () => clearInterval(id);
    }, [expireAt]);

    const mm = String(Math.floor(remain / 60000)).padStart(2, "0");
    const ss = String(Math.floor((remain % 60000) / 1000)).padStart(2, "0");
    return <span>{mm}:{ss}</span>;
}

const PAGE_SIZE = 6;

export default function OrderHistory() {
    const { orders, pending_payments } = usePage().props as any;
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState(STATUS_FILTERS[0]);
    const [pagesShown, setPagesShown] = useState(1);
    const [detailOrder, setDetailOrder] = useState<any | null>(null);

    const list = useMemo(() => {
        return (orders || []).map((o: any) => {
            const items = (o.items || []).map((it: any) => ({
                name: it.product?.name ?? "-",
                qty: it.quantity,
                price: it.price,
                total: (it.price || 0) * (it.quantity || 0),
            }));
            const sum = items.reduce((acc: number, x: any) => acc + (x.total || 0), 0);
            return {
                id: o.id,
                status: o.status,
                date: o.created_at,
                expires_at: (o as any).expires_at,
                total: o.total_price ?? sum,
                items,
                resume_url: (o as any).resume_url,
            };
        });
    }, [orders]);

    const orderIndexMap = useMemo(() => {
        const sorted = [...list].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const map = new Map<number, number>();
        sorted.forEach((o: any, i: number) => map.set(o.id, i + 1));
        return map;
    }, [list]);

    const filtered = useMemo(() => {
        const qLower = search.trim().toLowerCase();
        return list.filter((o: any) => {
            const matchesSearch =
                qLower.length === 0 ||
                String(o.id).includes(qLower) ||
                (o.status && o.status.toLowerCase().includes(qLower)) ||
                o.items.some((it: any) => it.name.toLowerCase().includes(qLower)) ||
                (o.date && new Date(o.date).toLocaleDateString("id-ID").includes(qLower));
            const matchesStatus =
                statusFilter.value === "all" ||
                statusFilter.statuses.includes("*") ||
                statusFilter.statuses.includes(o.status);
            return matchesSearch && matchesStatus;
        });
    }, [list, search, statusFilter]);

    useEffect(() => {
        setPagesShown(1);
        setDetailOrder(null);
    }, [search, statusFilter]);

    const paginated = filtered.slice(0, pagesShown * PAGE_SIZE);

    const idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" });

    const formatDateTime = (value?: string) => {
        if (!value) return "-";
        try {
            const dt = new Date(value);
            if (Number.isNaN(dt.getTime())) return "-";
            return dt.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short", hour12: false });
        } catch {
            return "-";
        }
    };

    const closeDetail = () => setDetailOrder(null);

    const detailStatusBadge = detailOrder ? STATUS_STYLES[detailOrder.status] ?? "bg-slate-100 text-slate-600" : "";
    const detailStatusIcon = detailOrder ? STATUS_ICONS[detailOrder.status] ?? <Clock3 className="h-4 w-4" /> : null;

    return (
        <>
            <Navbar />
            <Head title="Riwayat Pesanan" />
            <FlashMessage />
            <main className="bg-white">
                <div className="container mx-auto max-w-6xl space-y-6 px-4 pb-24 pt-28">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-slate-900">Riwayat Pesanan</h1>
                            <p className="text-sm text-slate-500">Pantau status setiap pesanan dan lanjutkan pembayaran dalam satu halaman.</p>
                        </div>
                        <div className="relative w-full sm:w-80">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                placeholder="Cari nomor pesanan, status, atau tanggal"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {STATUS_FILTERS.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setStatusFilter(option)}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                                    option.value === statusFilter.value
                                        ? "border-emerald-500 bg-emerald-500 text-white shadow"
                                        : "border-emerald-100 bg-white text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50"
                                )}
                            >
                                {option.value === "all" ? <CircleDollarSign className="h-4 w-4" /> : STATUS_ICONS[option.statuses[0]] ?? <Package className="h-4 w-4" />}
                                {option.label}
                            </button>
                        ))}
                    </div>

                    <div className="text-xs text-slate-500">{filtered.length} pesanan ditemukan</div>

                    {Array.isArray(pending_payments) && pending_payments.length > 0 && (
                        <Card className="border border-amber-200 bg-amber-50/80">
                            <CardHeader className="pb-2">
                                <p className="text-sm font-semibold text-amber-700">Pembayaran belum selesai</p>
                            </CardHeader>
                            <CardContent className="space-y-3 pb-4 text-sm text-slate-600">
                                {pending_payments.map((p: any, idx: number) => (
                                    <div key={p.order_id || idx} className="flex flex-col gap-2 rounded-2xl border border-amber-100 bg-white/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="space-y-1">
                                            <p className="font-semibold text-slate-800">Pesanan #{p.order_id}</p>
                                            <p>
                                                Total <span className="font-semibold text-amber-700">{idr.format(Number(p.total_amount || 0))}</span>
                                            </p>
                                        </div>
                                        <a
                                            href={p.redirect_url}
                                            className="inline-flex w-full items-center justify-center rounded-full border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:-translate-y-0.5 hover:bg-amber-100 sm:w-auto"
                                        >
                                            Lanjutkan Pembayaran
                                        </a>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {filtered.length === 0 && (
                        <Card className="border border-emerald-100 bg-white shadow-sm">
                            <CardContent className="py-16 text-center text-sm text-slate-500">
                                Tidak ada pesanan yang cocok dengan filter.
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {paginated.map((o: any) => {
                            const badgeStyle = STATUS_STYLES[o.status] ?? "bg-slate-100 text-slate-600";
                            const Icon = STATUS_ICONS[o.status] ?? <Clock3 className="h-4 w-4" />;
                            const formattedDate = formatDateTime(o.date);
                            const isPending = o.status === "pending";

                            return (
                                <Card
                                    key={o.id}
                                    className="flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <CardHeader className="flex flex-col gap-3 border-b border-emerald-50 pb-6">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="space-y-1">
                                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">Pesanan</p>
                                                <h2 className="text-lg font-bold text-slate-900">#{orderIndexMap.get(o.id) ?? o.id}</h2>
                                                <p className="text-xs text-slate-500">{formattedDate}</p>
                                            </div>
                                            <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", badgeStyle)}>
                                                {Icon}
                                                {statusLabel(o.status)}
                                            </span>
                                        </div>
                                        <p className="text-lg font-bold text-emerald-600">{idr.format(Number(o.total || 0))}</p>
                                    </CardHeader>

                                    <CardContent className="flex flex-1 flex-col gap-4 p-6">
                                        {isPending && o.resume_url && (
                                            <div className="rounded-2xl border border-amber-100 bg-amber-50/60 px-4 py-3 text-xs text-amber-700">
                                                Sisa waktu pembayaran <Countdown expireAt={o.expires_at ? new Date(o.expires_at).getTime() : new Date(o.date).getTime() + 5 * 60 * 1000} /> �
                                                <a href={o.resume_url} className="ml-1 font-semibold underline underline-offset-2">
                                                    Lanjutkan pembayaran
                                                </a>
                                            </div>
                                        )}

                                        <Button
                                            variant="outline"
                                            className="mt-auto inline-flex items-center justify-center rounded-full border-emerald-400 text-emerald-600 transition hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white"
                                            onClick={() => setDetailOrder(o)}
                                        >
                                            Lihat Detail
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {paginated.length < filtered.length && (
                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                className="rounded-full border-emerald-400 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                                onClick={() => setPagesShown((prev) => prev + 1)}
                            >
                                Muat Pesanan Lainnya
                            </Button>
                        </div>
                    )}

                    {filtered.length > PAGE_SIZE && paginated.length >= filtered.length && (
                        <div className="text-center text-xs text-slate-500">Semua pesanan sudah ditampilkan</div>
                    )}
                </div>
            </main>
            <Footer />

            <Dialog
                open={Boolean(detailOrder)}
                onOpenChange={(open) => {
                    if (!open) {
                        closeDetail();
                    }
                }}
            >
                <DialogContent className="max-w-3xl rounded-3xl border border-emerald-100 bg-white p-0 shadow-2xl duration-200 sm:max-w-4xl sm:data-[state=open]:animate-in [&>button]:hidden">
                    {detailOrder && (
                        <>
                            <DialogHeader className="flex flex-row items-start justify-between space-y-0 border-b border-emerald-50 px-6 py-4">
                                <div className="space-y-1">
                                    <DialogTitle className="text-xl font-semibold text-slate-900">
                                        Pesanan #{orderIndexMap.get(detailOrder.id) ?? detailOrder.id}
                                    </DialogTitle>
                                    <p className="text-xs text-slate-500">{formatDateTime(detailOrder.date)}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeDetail}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
                                    aria-label="Tutup detail pesanan"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </DialogHeader>

                            <div className="space-y-6 px-6 pb-6 pt-5">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", detailStatusBadge)}>
                                        {detailStatusIcon}
                                        {statusLabel(detailOrder.status)}
                                    </span>
                                    <p className="text-sm font-semibold text-emerald-600">{idr.format(Number(detailOrder.total || 0))}</p>
                                </div>

                                <div className="overflow-hidden rounded-2xl border border-emerald-100">
                                    <div className="max-h-80 overflow-y-auto">
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader className="bg-emerald-50/60">
                                                    <TableRow>
                                                        <TableHead>Produk</TableHead>
                                                        <TableHead className="text-center">Jumlah</TableHead>
                                                        <TableHead className="text-right">Harga</TableHead>
                                                        <TableHead className="text-right">Subtotal</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {detailOrder.items.map((it: any, idx: number) => (
                                                        <TableRow key={idx}>
                                                            <TableCell className="font-medium text-slate-700">{it.name}</TableCell>
                                                            <TableCell className="text-center text-sm">{it.qty}</TableCell>
                                                            <TableCell className="text-right text-sm text-slate-600">{idr.format(Number(it.price || 0))}</TableCell>
                                                            <TableCell className="text-right text-sm font-semibold text-slate-700">{idr.format(Number(it.total || 0))}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-2xl bg-emerald-50/60 px-4 py-3 text-sm font-semibold text-emerald-700">
                                    <span>Total</span>
                                    <span>{idr.format(Number(detailOrder.total || 0))}</span>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}