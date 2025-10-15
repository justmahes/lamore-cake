/**
 * Halaman ini berfungsi untuk membuat dan menampilkan invoice (faktur) penjualan.
 * Admin dapat melihat pratinjau invoice dan mencetaknya.
 * Fitur utama:
 * - Menampilkan data penjualan dalam format faktur yang siap cetak.
 * - Menghitung total penjualan, total transaksi, dan rata-rata per transaksi.
 * - Menyediakan tombol untuk memicu fungsi cetak browser.
 * - Memiliki dua tampilan: satu untuk pratinjau di layar, dan satu lagi format khusus untuk dicetak.
 */
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Printer } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Dashboard",
        href: "/admin/dashboard",
    },
    {
        title: "Sales Invoice",
        href: "/admin/invoice",
    },
];

export default function AdminInvoice() {
    // SECTION: Mengambil data penjualan, ringkasan, dan rentang tanggal dari server.
    const { salesData, summary, dateRange } = usePage().props as any;
    const [isPrintMode, setIsPrintMode] = useState(false);

    const currentDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // SECTION: Fungsi untuk mengaktifkan mode cetak dan memanggil fungsi print browser.
    const handlePrint = () => {
        setIsPrintMode(true);
        setTimeout(() => {
            window.print();
            setIsPrintMode(false);
        }, 100);
    };

    // SECTION: Menghitung total dari data penjualan.
    const totalSales = salesData?.reduce((sum: number, item: any) => sum + parseFloat(item.total || 0), 0) || 0;
    const totalTransactions = salesData?.length || 0;
    const averagePerTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0;

    // SECTION: Tampilan khusus yang akan dirender saat mode cetak aktif.
    if (isPrintMode) {
        return (
            <div className="min-h-screen bg-white p-8 text-black">
                <Head title="Sales Invoice - Print" />
                <style>{`@media print{ @page{ size:A4; margin:12mm } .no-print{ display:none!important } .avoid-break-inside{ break-inside: avoid } .page-break{ break-after: page } }`}</style>
                <div className="mx-auto w-[210mm] max-w-full">
                    {/* Header Invoice */}
                    <div className="mb-6 flex items-start justify-between border-b border-gray-300 pb-4">
                        <div className="flex items-center gap-4">
                            <img src="/assets/brand/logo.png" alt="Lamore Cake" className="h-10 w-10" />
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">LAMORE CAKE</h1>
                                <p className="text-xs text-gray-600">Jl. Imam Bonjol Gg. Veteran II No.5, Pemecutan Klod, Kec. Denpasar Bar., Kota Denpasar, Bali 80113</p>
                                <p className="text-xs text-gray-600">Telp: 089634584455 | Email: -</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold">Sales Report Invoice</p>
                            <p className="text-xs text-gray-600">Generated: {currentDate}</p>
                            {dateRange && (
                                <p className="text-xs text-gray-600">Period: {dateRange.start} - {dateRange.end}</p>
                            )}
                        </div>
                    </div>

                    {/* Ringkasan Total */}
                    <div className="mb-6 grid grid-cols-3 gap-4">
                        <div className="rounded border border-gray-300 p-3">
                            <p className="text-xs text-gray-600">Total Sales</p>
                            <p className="text-xl font-semibold">Rp{totalSales.toLocaleString('id-ID')}</p>
                        </div>
                        <div className="rounded border border-gray-300 p-3">
                            <p className="text-xs text-gray-600">Total Transactions</p>
                            <p className="text-xl font-semibold">{totalTransactions}</p>
                        </div>
                        <div className="rounded border border-gray-300 p-3">
                            <p className="text-xs text-gray-600">Average / Transaction</p>
                            <p className="text-xl font-semibold">Rp{averagePerTransaction.toLocaleString('id-ID')}</p>
                        </div>
                    </div>

                    {/* Tabel Detail Penjualan */}
                    <div className="mb-8">
                        <h2 className="mb-2 text-base font-semibold">Sales Details</h2>
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-3 py-2 text-left">Order ID</th>
                                    <th className="border border-gray-300 px-3 py-2 text-left">Product</th>
                                    <th className="border border-gray-300 px-3 py-2 text-left">Customer</th>
                                    <th className="border border-gray-300 px-3 py-2 text-right">Qty</th>
                                    <th className="border border-gray-300 px-3 py-2 text-right">Price</th>
                                    <th className="border border-gray-300 px-3 py-2 text-right">Total</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData?.map((sale: any, index: number) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border border-gray-300 px-3 py-2">{sale.id}</td>
                                        <td className="border border-gray-300 px-3 py-2">{sale.product_name}</td>
                                        <td className="border border-gray-300 px-3 py-2">{sale.customer_name}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-right">{sale.quantity}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-right">Rp{parseInt(sale.price).toLocaleString('id-ID')}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-right font-semibold">Rp{parseInt(sale.total).toLocaleString('id-ID')}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-xs">{new Date(sale.date).toLocaleDateString('id-ID')}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-200 font-semibold">
                                    <td className="border border-gray-300 px-3 py-2" colSpan={5}>GRAND TOTAL</td>
                                    <td className="border border-gray-300 px-3 py-2 text-right text-lg">Rp{totalSales.toLocaleString('id-ID')}</td>
                                    <td className="border border-gray-300 px-3 py-2"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Bagian Tanda Tangan */}
                    <div className="mt-10 grid grid-cols-2 gap-8">
                        <div>
                            <p className="mb-12 text-sm text-gray-600">Prepared by,</p>
                            <div className="border-t border-gray-500" />
                            <p className="mt-2 text-sm">Admin</p>
                        </div>
                        <div className="text-right">
                            <p className="mb-12 text-sm text-gray-600">Approved by,</p>
                            <div className="border-t border-gray-500" />
                            <p className="mt-2 text-sm">Manager</p>
                        </div>
                    </div>

                    {/* Footer Invoice */}
                    <div className="mt-8 border-t border-gray-300 pt-4 text-center text-xs text-gray-500">
                        <p>Lamore Cake • lamorecake.id • Denpasar, Bali</p>
                        <p>Printed on {currentDate}</p>
                    </div>
                </div>
            </div>
        );
    }

    // SECTION: Tampilan pratinjau invoice di halaman web.
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales Invoice" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Tombol untuk mencetak invoice */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Sales Invoice</h1>
                    <Button onClick={handlePrint} className="print:hidden">
                        Print Invoice
                    </Button>
                </div>

                {/* Pratinjau Invoice */}
                <Card className="print:shadow-none print:border-none">
                    <CardContent className="p-8">
                        {/* Header */}
                        <div className="mb-6 flex items-start justify-between border-b border-border pb-4">
                            <div className="flex items-center gap-4">
                                <img src="/assets/brand/logo.png" alt="Lamore Cake" className="h-10 w-10" />
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">LAMORE CAKE</h2>
                                    <p className="text-xs text-muted-foreground">Jl. Imam Bonjol Gg. Veteran II No.5, Pemecutan Klod, Kec. Denpasar Bar., Kota Denpasar, Bali 80113</p>
                                    <p className="text-xs text-muted-foreground">Telp: 089634584455 | Email: -</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold">Sales Report Invoice</p>
                                <p className="text-xs text-muted-foreground">Generated: {currentDate}</p>
                                {dateRange && (
                                    <p className="text-xs text-muted-foreground">Period: {dateRange.start} - {dateRange.end}</p>
                                )}
                            </div>
                        </div>

                        {/* Bagian Ringkasan Total */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                                    <p className="text-2xl font-bold text-green-600">
                                        Rp{totalSales.toLocaleString('id-ID')}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <h3 className="text-lg font-semibold mb-2">Total Transactions</h3>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {totalTransactions}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <h3 className="text-lg font-semibold mb-2">Average per Transaction</h3>
                                    <p className="text-2xl font-bold text-purple-600">
                                        Rp{averagePerTransaction.toLocaleString('id-ID')}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tabel Detail Penjualan */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4">Sales Details</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-border">
                                    <thead>
                                        <tr className="bg-muted">
                                            <th className="border border-border px-4 py-2 text-left">Order ID</th>
                                            <th className="border border-border px-4 py-2 text-left">Product</th>
                                            <th className="border border-border px-4 py-2 text-left">Customer</th>
                                            <th className="border border-border px-4 py-2 text-right">Qty</th>
                                            <th className="border border-border px-4 py-2 text-right">Price</th>
                                            <th className="border border-border px-4 py-2 text-right">Total</th>
                                            <th className="border border-border px-4 py-2 text-center">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salesData?.map((sale: any, index: number) => (
                                            <tr key={index}>
                                                <td className="border border-border px-4 py-2">{sale.id}</td>
                                                <td className="border border-border px-4 py-2">{sale.product_name}</td>
                                                <td className="border border-border px-4 py-2">{sale.customer_name}</td>
                                                <td className="border border-border px-4 py-2 text-right">{sale.quantity}</td>
                                                <td className="border border-border px-4 py-2 text-right">
                                                    Rp{parseInt(sale.price).toLocaleString('id-ID')}
                                                </td>
                                                <td className="border border-border px-4 py-2 text-right font-semibold">
                                                    Rp{parseInt(sale.total).toLocaleString('id-ID')}
                                                </td>
                                                <td className="border border-border px-4 py-2 text-center text-sm">
                                                    {new Date(sale.date).toLocaleDateString('id-ID')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-muted font-bold">
                                            <td className="border border-border px-4 py-2" colSpan={5}>
                                                GRAND TOTAL
                                            </td>
                                            <td className="border border-border px-4 py-2 text-right text-lg">
                                                Rp{totalSales.toLocaleString('id-ID')}
                                            </td>
                                            <td className="border border-border px-4 py-2"></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* Footer Pratinjau */}
                        <div className="text-center mt-8 pt-6 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                Faktur ini dibuat secara otomatis oleh Sistem Manajemen Lamore Cake
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Print Date: {currentDate}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}