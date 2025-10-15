/**
 * Halaman ini berfungsi sebagai dashboard untuk pengguna yang sudah login.
 * Terdapat dua versi dashboard: satu untuk pengguna biasa dan satu untuk admin,
 * yang ditampilkan berdasarkan data yang diterima dari server.
 *
 * Fitur untuk Pengguna Biasa:
 * - Menampilkan ringkasan (total pesanan, pesanan selesai, dll.).
 * - Grafik tren jumlah pesanan dari waktu ke waktu.
 * - Grafik produk favorit yang paling sering dipesan.
 * - Tabel riwayat semua pesanan dengan fitur pencarian dan pagination.
 *
 * Fitur untuk Admin (versi sederhana):
 * - Hanya menampilkan kartu ringkasan data umum (total produk, pelanggan, pesanan).
 */
import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// SECTION: Mendaftarkan komponen-komponen dari Chart.js yang akan digunakan
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dasbor",
        href: "/dashboard",
    },
];

export default function Dashboard() {
    // SECTION: Mengambil data dari server dan inisialisasi state.
    const { summary, orderData, favoriteProducts, orderHistory } = usePage().props as any;
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // SECTION: Mempersiapkan data untuk kartu ringkasan (summary cards).
    // Logika ini membedakan data untuk admin dan pengguna biasa.
    const adminCards = [] as { title: string; value: any }[];
    if (summary?.products !== undefined) { /* ... */ }
    const userCards = [] as { title: string; value: any }[];
    if (summary?.total_orders !== undefined) { /* ... */ }

    const isUserDashboard = userCards.length > 0;
    const cards = isUserDashboard ? userCards : adminCards;

    // SECTION: Logika untuk memfilter dan membagi halaman (pagination) untuk riwayat pesanan pengguna.
    const filteredHistory = useMemo(() => {
        if (!orderHistory) return [];
        return orderHistory.filter((order: any) =>
            order.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orderHistory, searchTerm]);

    const paginatedHistory = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredHistory.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredHistory, currentPage]);

    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

    // SECTION: Mempersiapkan data untuk ditampilkan di dalam grafik.
    const orderChartData = orderData ? { /* ... */ } : null;
    const favoriteProductsChartData = favoriteProducts ? { /* ... */ } : null;

    // SECTION: Opsi konfigurasi untuk grafik (tampilan, tooltip, dll).
    const chartOptions = { /* ... */ };
    const doughnutOptions = { /* ... */ };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dasbor" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* SECTION: Tampilan kondisional, render dashboard pengguna atau admin */}
                {isUserDashboard ? (
                    <Tabs defaultValue="overview" className="w-full space-y-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">Performa Penjualan</TabsTrigger>
                            <TabsTrigger value="orders">Riwayat Pesanan</TabsTrigger>
                        </TabsList>

                        {/* SECTION: Konten Tab Performa (Grafik dan Ringkasan) */}
                        <TabsContent value="overview" className="space-y-4">
                            {/* Kartu Ringkasan */}
                            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                                {cards.map((c) => ( <Card key={c.title}>{/* ... */}</Card> ))}
                            </div>

                            {/* Grafik-grafik */}
                            <div className="grid gap-4 md:grid-cols-2">
                                {orderChartData && <Card>{/* Grafik Tren Pesanan */}</Card>}
                                {favoriteProductsChartData && <Card>{/* Grafik Produk Favorit */}</Card>}
                            </div>
                            {favoriteProductsChartData && <Card>{/* Grafik Perbandingan Produk */}</Card>}
                        </TabsContent>

                        {/* SECTION: Konten Tab Riwayat Pesanan */}
                        <TabsContent value="orders" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Riwayat Pesanan Anda</CardTitle>
                                    {/* Input Pencarian */}
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Input placeholder="Cari berdasarkan produk..." value={searchTerm} onChange={(e) => { /* ... */ }} />
                                        <span>{filteredHistory.length} data ditemukan</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {/* Tabel Riwayat Pesanan */}
                                    <div className="overflow-x-auto">
                                        <Table>{/* ... */}</Table>
                                    </div>

                                    {/* Navigasi Halaman (Pagination) */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-between space-x-2 py-4">
                                            {/* ... */}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                ) : (
                    /* SECTION: Tampilan untuk dashboard admin (lebih sederhana) */
                    cards.length > 0 && (
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            {cards.map((c) => (
                                <Card key={c.title}>
                                    <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
                                    <CardContent className="text-3xl font-semibold">{c.value}</CardContent>
                                </Card>
                            ))}
                        </div>
                    )
                )}
            </div>
        </AppLayout>
    );
}