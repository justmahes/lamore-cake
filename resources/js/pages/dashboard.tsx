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
    const { summary, orderData, favoriteProducts, orderHistory } = usePage().props as any;
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // For admin dashboard (existing functionality)
    const adminCards = [] as { title: string; value: any }[];
    if (summary?.products !== undefined) {
        adminCards.push({ title: "Total Produk", value: summary.products });
    }
    if (summary?.customers !== undefined) {
        adminCards.push({ title: "Total Pelanggan", value: summary.customers });
    }
    if (summary?.orders !== undefined) {
        adminCards.push({ title: "Total Pesanan", value: summary.orders });
    }

    // For user dashboard
    const userCards = [] as { title: string; value: any }[];
    if (summary?.total_orders !== undefined) {
        userCards.push({ title: "Total Pesanan", value: summary.total_orders });
    }
    if (summary?.completed_orders !== undefined) {
        userCards.push({ title: "Pesanan Selesai", value: summary.completed_orders });
    }
    if (summary?.pending_orders !== undefined) {
        userCards.push({ title: "Pesanan Tertunda", value: summary.pending_orders });
    }
    if (summary?.total_spent !== undefined) {
        userCards.push({ title: "Total Pengeluaran", value: `Rp${(summary.total_spent || 0).toLocaleString()}` });
    }

    const isUserDashboard = userCards.length > 0;
    const cards = isUserDashboard ? userCards : adminCards;

    // Filter and paginate order history for user dashboard
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

    // Prepare chart data for user dashboard
    const orderChartData = orderData ? {
        labels: orderData.map((item: any) => item.date),
        datasets: [
            {
                label: 'Jumlah Pesanan',
                data: orderData.map((item: any) => item.count),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
            },
        ],
    } : null;

    const favoriteProductsChartData = favoriteProducts ? {
        labels: favoriteProducts.map((item: any) => item.name),
        datasets: [
            {
                label: 'Jumlah Dipesan',
                data: favoriteProducts.map((item: any) => item.qty),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(199, 199, 199, 0.8)',
                    'rgba(83, 102, 255, 0.8)',
                    'rgba(255, 99, 255, 0.8)',
                    'rgba(99, 255, 132, 0.8)',
                ],
            },
        ],
    } : null;

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                mode: 'index' as const,
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
                position: 'right' as const,
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        return `${context.label}: ${context.parsed} items`;
                    }
                }
            },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dasbor" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {isUserDashboard ? (
                    <Tabs defaultValue="overview" className="w-full space-y-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">Ikhtisar & Grafik</TabsTrigger>
                            <TabsTrigger value="orders">Riwayat Pesanan</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-4">
                            {/* Summary Cards */}
                            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                                {cards.map((c) => (
                                    <Card key={c.title}>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-medium">{c.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <div className="text-2xl font-bold">{c.value}</div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Charts */}
                            <div className="grid gap-4 md:grid-cols-2">
                                {orderChartData && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Tren Pesanan (30 Hari Terakhir)</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-[300px]">
                                                <Line data={orderChartData} options={chartOptions} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {favoriteProductsChartData && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Produk Favorit Anda</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-[300px]">
                                                <Doughnut data={favoriteProductsChartData} options={doughnutOptions} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>

                            {/* Bar Chart */}
                            {favoriteProductsChartData && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Perbandingan Pesanan Produk</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[400px]">
                                            <Bar data={favoriteProductsChartData} options={chartOptions} />
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="orders" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Riwayat Pesanan Anda</CardTitle>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Input
                                            placeholder="Cari berdasarkan produk..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="max-w-sm"
                                        />
                                        <span className="text-sm text-muted-foreground">
                                            {filteredHistory.length} data ditemukan
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>ID Pesanan</TableHead>
                                                    <TableHead>Produk</TableHead>
                                                    <TableHead className="text-right">Jumlah</TableHead>
                                                    <TableHead className="text-right">Harga</TableHead>
                                                    <TableHead className="text-right">Total</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Tanggal</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {paginatedHistory.map((order: any, index: number) => (
                                                    <TableRow key={`${order.order_id}-${order.id}-${index}`}>
                                                        <TableCell>{order.order_id}</TableCell>
                                                        <TableCell className="font-medium">{order.product_name}</TableCell>
                                                        <TableCell className="text-right">{order.quantity}</TableCell>
                                                        <TableCell className="text-right">Rp{order.price}</TableCell>
                                                        <TableCell className="text-right font-medium">Rp{order.total}</TableCell>
                                                        <TableCell>
                                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'
                                                            }`}>
                                                                {order.status}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-right">{order.date}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    
                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-between space-x-2 py-4">
                                            <div className="text-sm text-muted-foreground">
                                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredHistory.length)} of {filteredHistory.length} entries
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
                                                        .filter(page => 
                                                            page === 1 || 
                                                            page === totalPages || 
                                                            Math.abs(page - currentPage) <= 1
                                                        )
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
                                                        ))
                                                    }
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
                ) : (
                    // Admin dashboard (simple cards)
                    cards.length > 0 && (
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            {cards.map((c) => (
                                <Card key={c.title}>
                                    <CardHeader>
                                        <CardTitle>{c.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-3xl font-semibold">
                                        {c.value}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )
                )}
            </div>
        </AppLayout>
    );
}
