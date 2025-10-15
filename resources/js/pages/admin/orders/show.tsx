/**
 * Halaman ini menampilkan detail dari satu pesanan spesifik untuk admin.
 * Admin dapat melihat informasi lengkap pesanan dan mengubah statusnya.
 * Fitur utama:
 * - Menampilkan detail pelanggan, total harga, dan alamat pengiriman.
 * - Menampilkan status pesanan saat ini dengan label berwarna.
 * - Menyediakan dropdown untuk mengubah status pesanan (misal: dari 'pending' ke 'processing').
 * - Tombol untuk menyimpan perubahan status atau menghapus pesanan.
 */
import ImagePreview from "@/components/image-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Orders",
        href: "/admin/orders",
    },
];

export default function AdminOrderShow() {
    // SECTION: Mengambil data pesanan tunggal dari server.
    const { order } = usePage().props as any;
    // SECTION: Inisialisasi form untuk mengubah status pesanan.
    const { data, setData, post, delete: destroy } = useForm({ status: order.status });

    // SECTION: Mendefinisikan label dan warna untuk setiap status pesanan.
    const statusMap: Record<string, { label: string; color: string }> = {
        pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
        paid: { label: 'Pembayaran Berhasil', color: 'bg-blue-100 text-blue-800' },
        processing: { label: 'Di Proses', color: 'bg-amber-100 text-amber-800' },
        shipped: { label: 'Dikirim', color: 'bg-purple-100 text-purple-800' },
        delivered: { label: 'Selesai', color: 'bg-green-100 text-green-800' },
        cancelled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800' },
    };

    // SECTION: Fungsi untuk mengirim permintaan perubahan status ke server.
    const updateStatus = () => {
        post(`/admin/orders/${order.id}/status`, {
            method: "post",
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order ${order.id}`} />
            <div className="container mx-auto space-y-6 p-4">
                <h1 className="text-2xl font-bold">Order #{order.id}</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Detail Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {/* SECTION: Menampilkan informasi dasar pesanan */}
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                                <div className="text-sm text-muted-foreground">Pelanggan</div>
                                <div className="font-medium">{order.user?.name ?? '-'}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Total</div>
                                <div className="font-semibold">Rp{(order.total_price || 0).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Alamat</div>
                                <div className="font-medium break-words">{order.address}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Status Saat Ini</div>
                                <div>
                                    <span className={`rounded px-2 py-1 text-xs font-medium ${statusMap[data.status]?.color || 'bg-accent'}`}>
                                        {statusMap[data.status]?.label || data.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* SECTION: Dropdown untuk mengubah status pesanan */}
                        <div className="space-y-1 pt-2">
                            <label className="block text-sm font-medium">Ubah Status</label>
                            <div className="max-w-xs">
                                <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="paid">Konfirmasi</SelectItem>
                                        <SelectItem value="processing">Di Proses</SelectItem>
                                        <SelectItem value="shipped">Dikirim</SelectItem>
                                        <SelectItem value="delivered">Selesai</SelectItem>
                                        <SelectItem value="cancelled">Dibatalkan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        {/* SECTION: Tombol aksi untuk menyimpan atau menghapus */}
                        {/* Bukti pembayaran tidak diperlukan karena diverifikasi melalui Midtrans dashboard */}
                        <div className="flex gap-2">
                            <Button onClick={updateStatus}>Simpan Status</Button>
                            <Button variant="destructive" onClick={() => destroy(`/admin/orders/${order.id}`)}>
                                Hapus Order
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}