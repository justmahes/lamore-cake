/**
 * Halaman ini adalah pusat pengelolaan produk untuk admin.
 * Memungkinkan admin untuk melakukan semua operasi CRUD (Create, Read, Update, Delete) pada produk.
 * Fitur utama:
 * - Menampilkan daftar semua produk dengan pagination.
 * - Pencarian produk berdasarkan nama atau kategori.
 * - Filter produk berdasarkan status kadaluwarsa (semua, sudah, hampir, masih layak).
 * - Pengurutan produk berdasarkan tanggal kadaluwarsa.
 * - Form untuk menambah produk baru, termasuk upload gambar dan deskripsi rich text.
 * - Dialog (modal) untuk mengubah produk yang sudah ada.
 * - Tab untuk melihat produk yang sudah diarsipkan (soft delete) dan opsi untuk memulihkan atau menghapus permanen.
 */
import ImagePreview from "@/components/image-preview";
import InputError from "@/components/input-error";
import TiptapEditor from "@/components/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Search, Edit3, Trash2, PackageOpen, PackageCheck, PackageSearch } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Produk",
        href: "/admin/products",
    },
];

export default function AdminProducts() {
    // SECTION: Mengambil data produk dan kategori dari server, serta inisialisasi state untuk UI.
    const { products, categories } = usePage().props as any;
    const [searchTerm, setSearchTerm] = useState("");
    const [expiryFilter, setExpiryFilter] = useState<'all' | 'expired' | 'near' | 'valid'>("all");
    const [sortByExpiry, setSortByExpiry] = useState<'none' | 'soonest' | 'latest'>("none");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    // SECTION: Form untuk menambah produk baru.
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        kategori: "",
        kategori_id: "none",
        price: "",
        stock: "",
        description: "",
        image: null as File | null,
        expires_at: "",
    });

    // SECTION: State dan form untuk mode pengeditan produk.
    const [editing, setEditing] = useState<any>(null);
    const editForm = useForm({
        name: "",
        kategori: "",
        kategori_id: "none",
        price: "",
        stock: "",
        description: "",
        image: null as File | null,
        expires_at: "",
    });

    // SECTION: Logika untuk memfilter dan mengurutkan produk berdasarkan input dari admin.
    const filteredProducts = useMemo(() => {
        const now = Date.now();
        const list = products.filter((product: any) => {
            const matchesText =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.kategori && product.kategori.toLowerCase().includes(searchTerm.toLowerCase()));
            if (!matchesText) return false;

            if (categoryFilter !== 'all') {
                const catName = product.category?.nama || product.kategori || '';
                if ((product.kategori_id ? String(product.kategori_id) : '') !== categoryFilter && catName !== categoryFilter) {
                    return false;
                }
            }

            const daysLeft = product.expires_at ? Math.ceil((new Date(product.expires_at).getTime() - now) / (1000 * 60 * 60 * 24)) : null;
            const nearExpiry = typeof daysLeft === 'number' && daysLeft >= 0 && daysLeft <= 3;
            const expired = typeof daysLeft === 'number' && daysLeft < 0;

            if (expiryFilter === 'expired') return expired;
            if (expiryFilter === 'near') return nearExpiry;
            if (expiryFilter === 'valid') return !expired && !nearExpiry;
            return true;
        });

        if (sortByExpiry !== 'none') {
            return [...list].sort((a: any, b: any) => {
                const dl = (p: any) => (p.expires_at ? Math.ceil((new Date(p.expires_at).getTime() - now) / (1000 * 60 * 60 * 24)) : Number.POSITIVE_INFINITY);
                const ad = dl(a);
                const bd = dl(b);
                if (sortByExpiry === 'soonest') return ad - bd;
                return bd - ad;
            });
        }
        return list;
    }, [products, searchTerm, categoryFilter, expiryFilter, sortByExpiry]);

    // SECTION: Logika untuk membagi data produk ke beberapa halaman.
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // SECTION: Fungsi untuk mengirim data produk baru ke server.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.kategori_id === "none") {
            setData("kategori_id", "");
        }
        post("/admin/products", {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    // SECTION: Fungsi untuk masuk ke mode edit dan mengisi form dengan data produk.
    const startEdit = (product: any) => {
        setEditing(product);
        editForm.setData({
            name: product.name,
            kategori: product.kategori || "",
            kategori_id: product.kategori_id ? product.kategori_id.toString() : "none",
            price: product.price,
            stock: product.stock,
            description: product.description,
            image: null,
            expires_at: product.expires_at ? product.expires_at.substring(0, 10) : "",
        });
    };

    // SECTION: Fungsi untuk membatalkan mode edit.
    const cancelEdit = () => {
        setEditing(null);
        editForm.reset();
    };

    // SECTION: Fungsi untuk mengirim data produk yang telah diubah ke server.
    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            if (editForm.data.kategori_id === "none") {
                editForm.setData("kategori_id", "");
            }
            editForm.post(`/admin/products/${editing.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    cancelEdit();
                },
            });
        }
    };

    // SECTION: Inisialisasi form untuk aksi hapus, pulihkan, dan set stok ke nol.
    const { delete: deleteProduct } = useForm({});
    const restoreForm = useForm({});
    const stockZeroForm = useForm({});

    // SECTION: Fungsi untuk mengirim permintaan hapus (soft delete) produk.
    const destroy = (url: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            deleteProduct(url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Products" />
            <div className="container mx-auto space-y-6 p-4">
                <h1 className="text-2xl font-bold">Kelola Produk</h1>

                {/* SECTION: Kartu ringkasan data (total produk, habis stok, kategori) */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* ... */}
                </div>

                <Tabs defaultValue="list" className="w-full space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="list">Daftar Produk</TabsTrigger>
                        <TabsTrigger value="add">Tambah Produk</TabsTrigger>
                        <TabsTrigger value="trash">Sampah</TabsTrigger>
                    </TabsList>

                    {/* SECTION: Tab untuk menampilkan daftar semua produk aktif */}
                    <TabsContent value="list" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Semua Produk</CardTitle>
                                {/* SECTION: Filter dan pencarian untuk tabel produk */}
                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    {/* ... */}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    {/* SECTION: Tabel yang menampilkan data produk */}
                                    <Table>
                                        {/* ... */}
                                        <TableBody>
                                            {paginatedProducts.map((p: any) => {
                                                // ... (logika status kadaluwarsa)
                                                return (
                                                <TableRow key={p.id} /* ... */>
                                                    {/* ... (sel-sel tabel) */}
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            {/* Tombol Edit */}
                                                            <TooltipProvider>
                                                                {/* ... */}
                                                            </TooltipProvider>
                                                            {/* Tombol Arsipkan (Soft Delete) */}
                                                            <TooltipProvider>
                                                                {/* ... */}
                                                            </TooltipProvider>
                                                            {/* Tombol Tandai Stok 0 (jika kadaluwarsa) */}
                                                            {expired && (
                                                                <TooltipProvider>
                                                                    {/* ... */}
                                                                </TooltipProvider>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* SECTION: Navigasi halaman (pagination) untuk daftar produk */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between space-x-2 py-4">
                                        {/* ... */}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SECTION: Tab untuk form menambah produk baru */}
                    <TabsContent value="add" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tambahkan Produk Baru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                                    {/* ... (input fields untuk produk baru) */}
                                    <Button type="submit" className="w-full md:w-auto">
                                        Tambah Produk
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SECTION: Tab untuk menampilkan produk yang diarsipkan (sampah) */}
                    <TabsContent value="trash" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Produk Terarsip (Sampah)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        {/* ... */}
                                        <TableBody>
                                            {(usePage().props as any).trashed?.map((p: any) => (
                                                <TableRow key={p.id}>
                                                    {/* ... */}
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            {/* Tombol untuk memulihkan produk */}
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => restoreForm.post(`/admin/products/${p.id}/restore`)}
                                                            >
                                                                Pulihkan
                                                            </Button>
                                                            {/* Tombol untuk menghapus produk secara permanen */}
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-red-600 hover:text-red-700"
                                                                onClick={() => {
                                                                    if (confirm('Hapus permanen produk ini?')) {
                                                                        deleteProduct(`/admin/products/${p.id}/force`);
                                                                    }
                                                                }}
                                                            >
                                                                Hapus Permanen
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* SECTION: Dialog (modal) untuk mengubah data produk */}
            <Dialog open={editing !== null} onOpenChange={() => cancelEdit()}>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Ubah Produk: {editing?.name}</DialogTitle>
                    </DialogHeader>
                    {editing && (
                        <form onSubmit={submitEdit} className="space-y-4" encType="multipart/form-data">
                            {/* ... (input fields untuk edit produk) */}
                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={editForm.processing}>
                                    {editForm.processing ? "Menyimpan..." : "Simpan perubahan"}
                                </Button>
                                <Button type="button" variant="outline" onClick={cancelEdit}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}