import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useMemo, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dasbor Admin",
        href: "/admin/dashboard",
    },
];

export default function AdminDashboard() {
    const { summary, salesData, productSalesData, bestSellers, allSales } = usePage().props as any;
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredSales = useMemo(() => {
        return allSales.filter(
            (sale: any) =>
                sale.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.customer_name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [allSales, searchTerm]);

    const paginatedSales = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredSales.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredSales, currentPage]);

    const totalPages = Math.ceil(filteredSales.length / itemsPerPage);

    const summaryCards = [
        { title: "Total Produk", value: summary?.products || 0 },
        { title: "Total Pelanggan", value: summary?.customers || 0 },
        { title: "Total Pesanan", value: summary?.orders || 0 },
        { title: "Total Penjualan", value: `Rp${(summary?.total_sales || 0).toLocaleString()}` },
    ];

    // Prepare chart data
    const salesChartData = {
        labels: salesData.map((item: any) => item.date),
        datasets: [
            {
                label: "Penjualan Harian (Rp)",
                data: salesData.map((item: any) => item.total),
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                fill: true,
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
        plugins: {
            legend: {
                position: "top" as const,
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "right" as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${context.label}: ${context.parsed} units`;
                    },
                },
            },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dasbor Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header with Invoice Button */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Dasbor Admin</h1>
                    <Link href="/admin/invoice">
                        <Button className="bg-green-600 hover:bg-green-700">
                            📄 Buat Faktur Penjualan
                        </Button>
                    </Link>
                </div>
                
                <Tabs defaultValue="overview" className="w-full space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="overview">Ikhtisar & Grafik</TabsTrigger>
                        <TabsTrigger value="sales">Detail Penjualan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        {/* Summary Cards */}
                        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                            {summaryCards.map((card) => (
                                <Card key={card.title}>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="text-2xl font-bold">{card.value}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Charts */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tren Penjualan (30 Hari Terakhir)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <Line data={salesChartData} options={chartOptions} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Produk Terlaris</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
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
                                <div className="h-[400px]">
                                    <Bar data={productSalesChartData} options={chartOptions} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="sales" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Semua Data Penjualan</CardTitle>
                                <div className="mt-4 flex items-center space-x-2">
                                    <Input
                                        placeholder="Cari berdasarkan produk atau pelanggan..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="max-w-sm"
                                    />
                                    <span className="text-sm text-muted-foreground">{filteredSales.length} data ditemukan</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>ID</TableHead>
                                                <TableHead>Produk</TableHead>
                                                <TableHead>Pelanggan</TableHead>
                                                <TableHead>Kode Pos</TableHead>
                                                <TableHead className="text-right">Jumlah</TableHead>
                                                <TableHead className="text-right">Harga</TableHead>
                                                <TableHead className="text-right">Total</TableHead>
                                                <TableHead className="text-right">Tanggal</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedSales.map((sale: any) => (
                                                <TableRow key={sale.id}>
                                                    <TableCell>{sale.id}</TableCell>
                                                    <TableCell className="font-medium">{sale.product_name}</TableCell>
                                                    <TableCell>{sale.customer_name}</TableCell>
                                                    <TableCell>{sale.customer_postal_code || "-"}</TableCell>
                                                    <TableCell className="text-right">{sale.quantity}</TableCell>
                                                    <TableCell className="text-right">Rp{sale.price}</TableCell>
                                                    <TableCell className="text-right font-medium">Rp{sale.total}</TableCell>
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
