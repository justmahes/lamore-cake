import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import ModeToggle from "@/components/mode-toggle";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Package, Users, ShoppingBag, Coins, TrendingUp, Search, Download, ArrowUpDown, X } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard Admin",
        href: "/admin/dashboard",
    },
];

export default function AdminDashboard() {
    const { summary, salesData, productSalesData, bestSellers, allSales, recentSuccess, lowStock } = usePage().props as any;
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortKey, setSortKey] = useState<"product" | "customer" | "total" | "date">("date");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const filteredSales = useMemo(() => {
        return allSales.filter(
            (sale: any) =>
                sale.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.customer_name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [allSales, searchTerm]);

    const sortedSales = useMemo(() => {
        const copy = [...filteredSales];
        copy.sort((a: any, b: any) => {
            const dir = sortDir === "asc" ? 1 : -1;
            if (sortKey === "product") return a.product_name.localeCompare(b.product_name) * dir;
            if (sortKey === "customer") return a.customer_name.localeCompare(b.customer_name) * dir;
            if (sortKey === "total") return (Number(a.total) - Number(b.total)) * dir;
            // date
            return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
        });
        return copy;
    }, [filteredSales, sortKey, sortDir]);

    const paginatedSales = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedSales.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedSales, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedSales.length / itemsPerPage);
    const [showNewOrderAlert, setShowNewOrderAlert] = useState(false);
    useEffect(() => {
        if (typeof recentSuccess === 'number' && recentSuccess > 0) {
            setShowNewOrderAlert(true);
            const t = setTimeout(() => setShowNewOrderAlert(false), 3500);
            return () => clearTimeout(t);
        }
    }, [recentSuccess]);

    const toggleSort = (key: typeof sortKey) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
        setCurrentPage(1);
    };

    const exportCsv = () => {
        const rows = [
            ["ID", "Produk", "Pelanggan", "Kode Pos", "Jumlah", "Harga", "Total", "Tanggal"],
            ...sortedSales.map((s: any) => [
                s.id,
                s.product_name,
                s.customer_name,
                s.customer_postal_code ?? "",
                s.quantity,
                s.price,
                s.total,
                s.date,
            ]),
        ];
        const csv = rows.map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `sales-export.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const idr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
    const summaryCards = [
        { title: "Total Produk", value: summary?.products || 0, icon: Package },
        { title: "Total Pelanggan", value: summary?.customers || 0, icon: Users },
        { title: "Total Pesanan", value: summary?.orders || 0, icon: ShoppingBag },
        { title: "Total Penjualan", value: idr.format(Number(summary?.total_sales || 0)), icon: Coins },
    ];

    // Prepare chart data
    const [rangeDays, setRangeDays] = useState<7 | 30 | 90>(30);
    const salesDataRanged = useMemo(() => {
        try {
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - rangeDays);
            const parsed = salesData.map((it: any) => ({ ...it, dateObj: new Date(it.date) }));
            return parsed.filter((it: any) => isFinite((it as any).dateObj) && it.dateObj >= cutoff);
        } catch {
            return salesData;
        }
    }, [salesData, rangeDays]);
    const salesChartData = {
        labels: salesDataRanged.map((item: any) => item.date),
        datasets: [
            {
                label: "Penjualan Harian (Rp)",
                data: salesDataRanged.map((item: any) => item.total),
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.25)",
                fill: true,
                tension: 0.35,
                pointRadius: 2,
                pointHoverRadius: 4,
            },
        ],
    };

    const productSalesChartData = {
        labels: productSalesData.map((item: any) => item.name),
        datasets: [
            {
                label: "Unit Terjual",
                data: productSalesData.map((item: any) => item.qty),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 205, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                    "rgba(199, 199, 199, 0.8)",
                    "rgba(83, 102, 255, 0.8)",
                    "rgba(255, 99, 255, 0.8)",
                    "rgba(99, 255, 132, 0.8)",
                ],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
                callbacks: {
                    label: function (context: any) {
                        const v = Number(context.parsed.y || context.parsed || 0);
                        return `${context.dataset.label}: ${idr.format(v)}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: "rgba(0,0,0,0.08)" },
                ticks: {
                    callback: function (value: any) {
                        return idr.format(Number(value));
                    },
                },
            },
            x: { grid: { display: false } },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        layout: {
            padding: {
                top: 12,
                bottom: 12,
                left: 12,
                right: 12,
            },
        },
        plugins: {
            legend: {
                position: "right" as const,
                align: "start" as const,
                labels: {
                    boxWidth: 14,
                    boxHeight: 14,
                    padding: 10,
                    usePointStyle: true,
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${context.label}: ${context.parsed} units`;
                    },
                },
            },
        },
        cutout: "70%",
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {showNewOrderAlert && (
                    <div className="animate-in fade-in slide-in-from-top-1 rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-900">
                        Ada pesanan masuk! Periksa dan konfirmasi segera.
                    </div>
                )}
                {lowStock?.count > 0 && (
                    <div className="relative rounded-md border border-amber-300 bg-amber-50 p-3 pr-8 text-sm text-amber-900">
                        <button
                            onClick={(e) => { try { localStorage.setItem('hide_low_stock_alert', '1'); } catch {} const box = (e.currentTarget as HTMLElement).parentElement as HTMLElement | null; if (box) box.remove(); }}
                            className="absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded hover:bg-amber-100"
                            aria-label="Tutup"
                            title="Tutup"
                        >
                            <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <div id="low-stock-alert">
                            Stok menipis: {lowStock.count} produk di bawah {lowStock.threshold}. Silakan tambah stok.
                            {Array.isArray(lowStock.items) && lowStock.items.length > 0 && (
                                <div className="mt-2 text-xs">
                                    Nama Produk: {lowStock.items.map((it: any) => `${it.name} (${it.stock})`).join(', ')}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* Header with Invoice Button */}
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Dashboard Admin</h1>
                    <Link href="/admin/invoice">
                        <Button onClick > Cetak Invoice</Button>
                    </Link>

                </div>
                <div className="flex justify-end -mt-2 mb-2">
                    <ModeToggle />
                </div>

                <Tabs defaultValue="overview" className="w-full space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="overview">Performa Penjualan</TabsTrigger>
                        <TabsTrigger value="sales">Detail Penjualan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        {/* Summary Cards */}
                        <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {summaryCards.map((card) => {
                                const Icon = (card as any).icon as any;
                                return (
                                    <Card key={card.title}>
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                            {Icon && <Icon className="size-5 text-muted-foreground" />}
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <div className="text-2xl font-semibold">{card.value}</div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Charts */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tren Penjualan (30 Hari Terakhir)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-3 flex items-center gap-2">
                                        <Button size="sm" variant={rangeDays === 7 ? "default" : "outline"} onClick={() => setRangeDays(7)}>
                                            7 Hari
                                        </Button>
                                        <Button size="sm" variant={rangeDays === 30 ? "default" : "outline"} onClick={() => setRangeDays(30)}>
                                            30 Hari
                                        </Button>
                                        <Button size="sm" variant={rangeDays === 90 ? "default" : "outline"} onClick={() => setRangeDays(90)}>
                                            90 Hari
                                        </Button>
                                        <div className="ml-auto inline-flex items-center gap-1 text-sm text-muted-foreground">
                                            <TrendingUp className="size-4" /> Tren
                                        </div>
                                    </div>
                                    <div className="h-[320px]">
                                        <Line data={salesChartData} options={chartOptions} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Produk Terlaris</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="mx-auto h-[260px] w-full max-w-[320px] md:h-[280px] md:max-w-[360px]">
                                        <Doughnut data={productSalesChartData} options={doughnutOptions} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Bar Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Perbandingan Penjualan Produk</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[360px]">
                                    <Bar data={productSalesChartData} options={chartOptions} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="sales" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Semua Data Penjualan</CardTitle>
                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    <div className="relative w-full max-w-sm">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            placeholder="Cari berdasarkan produk atau pelanggan..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="pl-9"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-muted-foreground">Rows:</label>
                                        <select
                                            className="h-9 rounded-md border px-2 text-sm"
                                            value={itemsPerPage}
                                            onChange={(e) => {
                                                setItemsPerPage(Number(e.target.value));
                                                setCurrentPage(1);
                                            }}
                                        >
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                        </select>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={exportCsv} className="ml-auto">
                                        <Download className="mr-2 size-4" /> Export CSV
                                    </Button>
                                    <span className="hidden text-sm text-muted-foreground md:inline">{sortedSales.length} data ditemukan</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="max-h-[520px] overflow-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="sticky top-0 z-10 bg-background">
                                                <TableHead>ID</TableHead>
                                                <TableHead>
                                                    <button className="inline-flex items-center gap-1" onClick={() => toggleSort("product")}>Produk <ArrowUpDown className="size-3.5 opacity-60" /></button>
                                                </TableHead>
                                                <TableHead>
                                                    <button className="inline-flex items-center gap-1" onClick={() => toggleSort("customer")}>Pelanggan <ArrowUpDown className="size-3.5 opacity-60" /></button>
                                                </TableHead>
                                                <TableHead>Kode Pos</TableHead>
                                                <TableHead className="text-right">Jumlah</TableHead>
                                                <TableHead className="text-right">Harga</TableHead>
                                                <TableHead className="text-right">
                                                    <button className="inline-flex items-center gap-1" onClick={() => toggleSort("total")}>Total <ArrowUpDown className="size-3.5 opacity-60" /></button>
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    <button className="inline-flex items-center gap-1" onClick={() => toggleSort("date")}>Tanggal <ArrowUpDown className="size-3.5 opacity-60" /></button>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedSales.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">
                                                        Tidak ada data untuk filter saat ini.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            {paginatedSales.map((sale: any) => (
                                                <TableRow key={sale.id} className="hover:bg-muted/50">
                                                    <TableCell>{sale.id}</TableCell>
                                                    <TableCell className="font-medium">{sale.product_name}</TableCell>
                                                    <TableCell>{sale.customer_name}</TableCell>
                                                    <TableCell>{sale.customer_postal_code || "-"}</TableCell>
                                                    <TableCell className="text-right">{sale.quantity}</TableCell>
                                                    <TableCell className="text-right">{idr.format(Number(sale.price || 0))}</TableCell>
                                                    <TableCell className="text-right font-medium">{idr.format(Number(sale.total || 0))}</TableCell>
                                                    <TableCell className="text-right">{sale.date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between space-x-2 py-4">
                                        <div className="text-sm text-muted-foreground">
                                            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                                            {Math.min(currentPage * itemsPerPage, filteredSales.length)} of {filteredSales.length} entries
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </Button>
                                            <div className="flex items-center space-x-1">
                                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                                    .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                                                    .map((page, index, array) => (
                                                        <div key={page} className="flex items-center">
                                                            {index > 0 && array[index - 1] !== page - 1 && (
                                                                <span className="px-2 text-muted-foreground">...</span>
                                                            )}
                                                            <Button
                                                                variant={currentPage === page ? "default" : "outline"}
                                                                size="sm"
                                                                onClick={() => setCurrentPage(page)}
                                                            >
                                                                {page}
                                                            </Button>
                                                        </div>
                                                    ))}
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
