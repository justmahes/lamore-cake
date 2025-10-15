/**
 * Halaman ini menampilkan laporan penjualan sederhana untuk admin.
 * Saat ini, fitur utamanya adalah untuk menampilkan produk terlaris (best sellers).
 * Fitur utama:
 * - Menampilkan judul laporan "Sales Report".
 * - Menampilkan kartu (Card) yang berisi tabel produk terlaris.
 * - Tabel tersebut memiliki dua kolom: "Product" (Nama Produk) dan "Sold" (Jumlah Terjual).
 * - Data produk terlaris diambil dari server dan ditampilkan dalam tabel.
 */
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Sales Report",
        href: "/admin/reports/sales",
    },
];

export default function SalesReport() {
    // SECTION: Mengambil data produk terlaris (bestSellers) dari server.
    const { bestSellers } = usePage().props as any;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales Report" />
            <div className="container mx-auto space-y-6 p-4">
            <h1 className="text-2xl font-bold">Sales Report</h1>
            {/* SECTION: Kartu untuk menampilkan laporan produk terlaris */}
            <Card>
                <CardHeader>
                    <CardTitle>Best Sellers</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* SECTION: Tabel yang berisi daftar produk terlaris */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Sold</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bestSellers.map((b: any) => (
                                <TableRow key={b.product_id}>
                                    <TableCell>{b.product.name}</TableCell>
                                    <TableCell>{b.qty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            </div>
        </AppLayout>
    );
}