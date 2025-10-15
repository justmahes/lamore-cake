/**
 * Halaman ini menampilkan riwayat pesanan untuk pengguna yang telah login.
 * Pengguna dapat melihat semua pesanan mereka, memfilter, dan melihat detailnya.
 * Fitur utama:
 * - Menampilkan daftar pesanan dalam bentuk kartu (card).
 * - Filter pesanan berdasarkan status (Semua, Proses, Berhasil, Selesai, Gagal).
 * - Pencarian pesanan berdasarkan nomor, status, atau tanggal.
 * - Menampilkan notifikasi untuk pembayaran yang belum selesai dengan tautan untuk melanjutkan.
 * - Tombol "Lihat Detail" untuk membuka dialog (modal) yang menampilkan rincian item dalam pesanan.
 * - Pagination dengan model "Muat Pesanan Lainnya" (load more).
 * - Komponen Countdown untuk menampilkan sisa waktu pembayaran pada pesanan yang pending.
 */
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

// ... (Definisi konstanta untuk filter, style, dan ikon status)

// Komponen untuk menampilkan hitung mundur waktu pembayaran.
function Countdown({ expireAt }: { expireAt: number }) {
    // ... (Logika countdown)
}

const PAGE_SIZE = 6;

export default function OrderHistory() {
    // SECTION: Mengambil data pesanan dari server dan inisialisasi state.
    const { orders, pending_payments } = usePage().props as any;
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState(STATUS_FILTERS[0]);
    const [pagesShown, setPagesShown] = useState(1);
    const [detailOrder, setDetailOrder] = useState<any | null>(null);

    // SECTION: Memproses dan memformat data pesanan yang diterima dari server.
    const list = useMemo(() => {
        // ... (Logika pemetaan data pesanan)
    }, [orders]);

    // SECTION: Logika untuk memfilter pesanan berdasarkan pencarian dan status.
    const filtered = useMemo(() => {
        // ... (Logika filter)
    }, [list, search, statusFilter]);

    // Reset state saat filter atau pencarian berubah.
    useEffect(() => {
        setPagesShown(1);
        setDetailOrder(null);
    }, [search, statusFilter]);

    // SECTION: Logika untuk pagination "load more".
    const paginated = filtered.slice(0, pagesShown * PAGE_SIZE);

    // ... (Fungsi helper untuk format mata uang dan tanggal)

    return (
        <>
            <Navbar />
            <Head title="Riwayat Pesanan" />
            <FlashMessage />
            <main className="bg-white">
                <div className="container mx-auto ...">
                    {/* Judul dan input pencarian */}
                    <div className="... ">
                        {/* ... */}
                    </div>

                    {/* SECTION: Tombol-tombol untuk filter status pesanan */}
                    <div className="flex flex-wrap gap-2">
                        {STATUS_FILTERS.map((option) => (
                            <button key={option.value} type="button" onClick={() => setStatusFilter(option)} className="...">
                                {/* ... (Ikon dan label filter) */}
                            </button>
                        ))}
                    </div>

                    {/* SECTION: Notifikasi untuk pembayaran yang tertunda */}
                    {Array.isArray(pending_payments) && pending_payments.length > 0 && (
                        <Card className="border border-amber-200 ...">
                            {/* ... (Konten notifikasi) */}
                        </Card>
                    )}

                    {/* Pesan jika tidak ada pesanan yang ditemukan */}
                    {filtered.length === 0 && ( <Card>...</Card> )}

                    {/* SECTION: Grid untuk menampilkan kartu-kartu pesanan */}
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {paginated.map((o: any) => {
                            // ... (Logika untuk badge status, ikon, dll)
                            return (
                                <Card key={o.id} className="...">
                                    <CardHeader className="...">
                                        {/* ... (Info dasar pesanan: ID, tanggal, status, total) */}
                                    </CardHeader>
                                    <CardContent className="...">
                                        {/* Tampilkan countdown jika pembayaran pending */}
                                        {isPending && o.resume_url && (
                                            <div className="...">
                                                Sisa waktu pembayaran <Countdown expireAt={...} />
                                                <a href={o.resume_url}>Lanjutkan pembayaran</a>
                                            </div>
                                        )}
                                        {/* Tombol untuk melihat detail pesanan */}
                                        <Button variant="outline" onClick={() => setDetailOrder(o)}>
                                            Lihat Detail
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* SECTION: Tombol "Muat Pesanan Lainnya" untuk pagination */}
                    {paginated.length < filtered.length && (
                        <div className="flex justify-center">
                            <Button variant="outline" onClick={() => setPagesShown((prev) => prev + 1)}>
                                Muat Pesanan Lainnya
                            </Button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />

            {/* SECTION: Dialog (modal) untuk menampilkan detail item pesanan */}
            <Dialog open={Boolean(detailOrder)} onOpenChange={(open) => !open && setDetailOrder(null)}>
                <DialogContent className="max-w-3xl ...">
                    {detailOrder && (
                        <>
                            <DialogHeader className="...">
                                {/* ... (Judul dialog) */}
                            </DialogHeader>
                            <div className="space-y-6 px-6 pb-6 pt-5">
                                {/* ... (Status dan total harga di dialog) */}
                                {/* Tabel rincian item pesanan */}
                                <div className="overflow-hidden rounded-2xl border ...">
                                    <Table>{/* ... */}</Table>
                                </div>
                                {/* ... (Total harga di footer dialog) */}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}