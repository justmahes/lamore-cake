import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Orders",
        href: "/admin/orders",
    },
];

export default function AdminOrders() {
    const { orders } = usePage().props as any;
    const { delete: destroy } = useForm({});
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter and paginate orders
    const filteredOrders = useMemo(() => {
        return orders.filter(
            (order: any) =>
                order.id.toString().includes(searchTerm.toLowerCase()) ||
                (order.user?.name && order.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (order.status && order.status.toLowerCase().includes(searchTerm.toLowerCase())),
        );
    }, [orders, searchTerm]);

    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredOrders, currentPage]);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Orders" />
            <div className="container mx-auto space-y-6 p-4">
                <h1 className="text-2xl font-bold">Orders</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Order</CardTitle>
                        <div className="mt-4 flex items-center space-x-2">
                            <Input
                                placeholder="Cari berdasarkan ID, kustomer atau status"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="max-w-sm"
                            />
                            <span className="text-sm text-muted-foreground">{filteredOrders.length} order ditemukan</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice ID</TableHead>
                                        <TableHead>Kustomer</TableHead>
                                        <TableHead>Kode Pos</TableHead>
                                        <TableHead className="text-right">Total Harga</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead className="w-32">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedOrders.map((o: any) => (
                                        <TableRow key={o.id}>
                                            <TableCell>
                                                <a className="font-medium text-primary" href={`/admin/orders/${o.id}`}>
                                                    #{o.id}
                                                </a>
                                            </TableCell>
                                            <TableCell className="font-medium">{o?.user?.name || "N/A"}</TableCell>
                                            <TableCell>{o?.user?.postal_code || "-"}</TableCell>
                                            <TableCell className="text-right">Rp{(o?.total_price || 0).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`rounded px-2 py-1 text-xs font-medium ${
                                                        o?.status === "completed"
                                                            ? "bg-green-100 text-green-800"
                                                            : o?.status === "pending"
                                                              ? "bg-yellow-100 text-yellow-800"
                                                              : o?.status === "cancelled"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {o?.status || "Unknown"}
                                                </span>
                                            </TableCell>
                                            <TableCell>{o?.created_at ? new Date(o.created_at).toLocaleDateString("id-ID") : "N/A"}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => (window.location.href = `/admin/orders/${o.id}`)}
                                                    >
                                                        Detail
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => destroy(`/admin/orders/${o.id}`)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between space-x-2 py-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
                                    {filteredOrders.length} entries
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
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
            </div>
        </AppLayout>
    );
}
