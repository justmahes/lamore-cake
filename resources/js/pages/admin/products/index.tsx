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
    const { products, categories } = usePage().props as any;
    const [searchTerm, setSearchTerm] = useState("");
    const [expiryFilter, setExpiryFilter] = useState<'all' | 'expired' | 'near' | 'valid'>("all");
    const [sortByExpiry, setSortByExpiry] = useState<'none' | 'soonest' | 'latest'>("none");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

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

    // Filter and paginate products
    const filteredProducts = useMemo(() => {
        const now = Date.now();
        const list = products.filter((product: any) => {
            const matchesText =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.kategori && product.kategori.toLowerCase().includes(searchTerm.toLowerCase()));
            if (!matchesText) return false;

            // Category filter (matches kategori_id or category name)
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
            if (expiryFilter === 'valid') return !expired && !nearExpiry; // includes null (no date)
            return true; // 'all'
        });

        if (sortByExpiry !== 'none') {
            return [...list].sort((a: any, b: any) => {
                const dl = (p: any) => (p.expires_at ? Math.ceil((new Date(p.expires_at).getTime() - now) / (1000 * 60 * 60 * 24)) : Number.POSITIVE_INFINITY);
                const ad = dl(a);
                const bd = dl(b);
                if (sortByExpiry === 'soonest') return ad - bd; // expired (negatives) first, then nearest
                return bd - ad; // latest expiry first, no-date last
            });
        }
        return list;
    }, [products, searchTerm, categoryFilter, expiryFilter, sortByExpiry]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Transform "none" to empty string before submission
        if (data.kategori_id === "none") {
            setData("kategori_id", "");
        }
        post("/admin/products", {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

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

    const cancelEdit = () => {
        setEditing(null);
        editForm.reset();
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            // Transform "none" to empty string before submission
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

    const { delete: deleteProduct } = useForm({});
    const restoreForm = useForm({});
    const stockZeroForm = useForm({});

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

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardContent className="flex items-center gap-3 p-4">
                            <PackageSearch className="text-muted-foreground" />
                            <div>
                                <div className="text-sm text-muted-foreground">Total Produk</div>
                                <div className="text-2xl font-semibold">{products.length || 0}</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-3 p-4">
                            <PackageOpen className="text-muted-foreground" />
                            <div>
                                <div className="text-sm text-muted-foreground">Habis Stok</div>
                                <div className="text-2xl font-semibold">{products.filter((p: any) => Number(p.stock) <= 0).length || 0}</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-3 p-4">
                            <PackageCheck className="text-muted-foreground" />
                            <div>
                                <div className="text-sm text-muted-foreground">Kategori</div>
                                <div className="text-2xl font-semibold">{categories.length || 0}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="list" className="w-full space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="list">Daftar Produk</TabsTrigger>
                        <TabsTrigger value="add">Tambah Produk</TabsTrigger>
                        <TabsTrigger value="trash">Sampah</TabsTrigger>
                    </TabsList>

                    <TabsContent value="list" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Semua Produk</CardTitle>
                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <div className="relative w-full max-w-sm">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            placeholder="Cari berdasarkan nama atau kategori..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="pl-9"
                                        />
                                        {searchTerm && (
                                            <button
                                                type="button"
                                                onClick={() => setSearchTerm("")}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted/70"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="grid gap-1">
                                            <Label htmlFor="expiry-filter" className="text-xs text-muted-foreground">Status</Label>
                                            <Select value={expiryFilter} onValueChange={(v) => { setExpiryFilter(v as any); setCurrentPage(1); }}>
                                                <SelectTrigger id="expiry-filter" className="w-[12rem]">
                                                    <SelectValue placeholder="Semua status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Semua</SelectItem>
                                                    <SelectItem value="expired">Sudah kadaluwarsa</SelectItem>
                                                    <SelectItem value="near">Hampir kadaluwarsa (&lt;= 3 hari)</SelectItem>
                                                    <SelectItem value="valid">Masih layak (&gt; 3 hari / tanpa tanggal)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-1">
                                            <Label htmlFor="expiry-sort" className="text-xs text-muted-foreground">Urutkan</Label>
                                            <Select value={sortByExpiry} onValueChange={(v) => { setSortByExpiry(v as any); setCurrentPage(1); }}>
                                                <SelectTrigger id="expiry-sort" className="w-[12rem]">
                                                    <SelectValue placeholder="Tanpa urutan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Tanpa urutan</SelectItem>
                                                    <SelectItem value="soonest">Terdekat kadaluwarsa</SelectItem>
                                                    <SelectItem value="latest">Terjauh kadaluwarsa</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <span className="hidden text-sm text-muted-foreground sm:inline">{filteredProducts.length} produk ditemukan</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Gambar</TableHead>
                                                <TableHead>Nama</TableHead>
                                                <TableHead>Kategori</TableHead>
                                                <TableHead className="text-right">Harga</TableHead>
                                                <TableHead className="text-right">Jumlah</TableHead>
                                                <TableHead>Kadaluwarsa</TableHead>
                                                <TableHead className="w-32">Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedProducts.map((p: any) => {
                                                const daysLeft = p.expires_at ? Math.ceil((new Date(p.expires_at).getTime() - Date.now()) / (1000*60*60*24)) : null;
                                                const nearExpiry = typeof daysLeft === 'number' && daysLeft >= 0 && daysLeft <= 3;
                                                const expired = typeof daysLeft === 'number' && daysLeft < 0;
                                                const lowStock = Number(p.stock) < 20;
                                                return (
                                                <TableRow key={p.id} className={expired ? 'bg-red-50' : (nearExpiry ? 'bg-amber-50' : '')}>
                                                    <TableCell>
                                                        {p.image && (
                                                            <ImagePreview src={p.image} alt={p.name} className="h-10 w-10 rounded object-cover" />
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <span>{p.name}</span>
                                                            {expired && (
                                                                <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">Sudah kadaluwarsa</span>
                                                            )}
                                                            {!expired && nearExpiry && (
                                                                <span className="inline-flex items-center rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Hampir kadaluwarsa</span>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{p.category ? p.category.nama : p.kategori || "-"}</TableCell>
                                                    <TableCell className="text-right">Rp{(p.price || 0).toLocaleString()}</TableCell>
                                                    <TableCell className="text-right">
                                                        {lowStock ? (
                                                            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                                                                {p.stock} (Stok menipis)
                                                            </span>
                                                        ) : (
                                                            p.stock
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{p.expires_at ? new Date(p.expires_at).toLocaleDateString() : '-'}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="outline" size="sm" onClick={() => startEdit(p)} aria-label="Edit">
                                                                        <Edit3 className="size-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Edit</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => destroy(`/admin/products/${p.id}`)}
                                                                        className="text-red-600 hover:text-red-700"
                                                                        aria-label="Hapus"
                                                                    >
                                                                        <Trash2 className="size-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Arsipkan</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                        {expired && (
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => stockZeroForm.put(`/admin/products/${p.id}/stock-zero`)}
                                                                            className="text-amber-700 hover:text-amber-800"
                                                                        >
                                                                            Tandai Stok 0
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>Set stok menjadi 0</TooltipContent>
                                                                </Tooltip>
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

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between space-x-2 py-4">
                                        <div className="text-sm text-muted-foreground">
                                            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                                            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
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

                    <TabsContent value="add" className="space-y-4">
                        {/* Add Product Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tambahkan Produk Baru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nama Produk</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData("name", e.target.value)}
                                                placeholder="Masukkan nama produk"
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="kategori">Kategori</Label>
                                            <Select
                                                value={data.kategori_id || "none"}
                                                onValueChange={(value) => setData("kategori_id", value === "none" ? "" : value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih kategori" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Tidak ada kategori</SelectItem>
                                                    {categories.map((category: any) => (
                                                        <SelectItem key={category.id} value={category.id.toString()}>
                                                            {category.nama}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.kategori_id} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="price">Harga (Rp)</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                value={data.price}
                                                onChange={(e) => setData("price", e.target.value)}
                                                placeholder="0"
                                            />
                                            <InputError message={errors.price} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="stock">Jumlah Stok</Label>
                                            <Input
                                                id="stock"
                                                type="number"
                                                value={data.stock}
                                                onChange={(e) => setData("stock", e.target.value)}
                                                placeholder="0"
                                            />
                                            <InputError message={errors.stock} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="expires_at">Tanggal Kadaluwarsa</Label>
                                            <Input
                                                id="expires_at"
                                                type="date"
                                                value={data.expires_at}
                                                onChange={(e) => setData("expires_at", e.target.value)}
                                            />
                                            <InputError message={(errors as any).expires_at} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Deskripsi</Label>
                                        <TiptapEditor content={data.description} onChange={(html) => setData("description", html)} />
                                        <p className="text-xs text-muted-foreground">Contoh info yang disarankan: "Daya tahan: 1 hari suhu ruang, 3–5 hari di kulkas. Simpan dalam wadah tertutup."</p>
                                        <InputError message={errors.description} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="image">Gambar Produk</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData("image", e.target.files ? e.target.files[0] : null)}
                                        />
                                        <InputError message={errors.image} />
                                    </div>
                                    <Button type="submit" className="w-full md:w-auto">
                                        Tambah Produk
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="trash" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Produk Terarsip (Sampah)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nama</TableHead>
                                                <TableHead>Kategori</TableHead>
                                                <TableHead>Kadaluwarsa</TableHead>
                                                <TableHead className="w-40">Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {(usePage().props as any).trashed?.map((p: any) => (
                                                <TableRow key={p.id}>
                                                    <TableCell className="font-medium">{p.name}</TableCell>
                                                    <TableCell>{p.category ? p.category.nama : p.kategori || "-"}</TableCell>
                                                    <TableCell>{p.expires_at ? new Date(p.expires_at).toLocaleDateString() : '-'}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => restoreForm.post(`/admin/products/${p.id}/restore`)}
                                                            >
                                                                Pulihkan
                                                            </Button>
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

            {/* Edit Product Modal */}
            <Dialog open={editing !== null} onOpenChange={() => cancelEdit()}>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Ubah Produk: {editing?.name}</DialogTitle>
                    </DialogHeader>
                    {editing && (
                        <form onSubmit={submitEdit} className="space-y-4" encType="multipart/form-data">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="ename">Nama Produk</Label>
                                    <Input id="ename" value={editForm.data.name} onChange={(e) => editForm.setData("name", e.target.value)} />
                                    <InputError message={editForm.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="ekategori">Kategori</Label>
                                    <Select
                                        value={editForm.data.kategori_id || "none"}
                                        onValueChange={(value) => editForm.setData("kategori_id", value === "none" ? "" : value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Tidak ada kategori</SelectItem>
                                            {categories.map((category: any) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={editForm.errors.kategori_id} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="eprice">Harga (Rp)</Label>
                                    <Input
                                        id="eprice"
                                        type="number"
                                        value={editForm.data.price}
                                        onChange={(e) => editForm.setData("price", e.target.value)}
                                    />
                                    <InputError message={editForm.errors.price} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="estock">Jumlah Stok</Label>
                                    <Input
                                        id="estock"
                                        type="number"
                                        value={editForm.data.stock}
                                        onChange={(e) => editForm.setData("stock", e.target.value)}
                                    />
                                    <InputError message={editForm.errors.stock} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="eexpires_at">Tanggal Kadaluwarsa</Label>
                                    <Input
                                        id="eexpires_at"
                                        type="date"
                                        value={editForm.data.expires_at}
                                        onChange={(e) => editForm.setData("expires_at", e.target.value)}
                                    />
                                    <InputError message={(editForm.errors as any).expires_at} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Deskripsi</Label>
                                <TiptapEditor content={editForm.data.description} onChange={(html) => editForm.setData("description", html)} />
                                <p className="text-xs text-muted-foreground">Contoh info yang disarankan: "Daya tahan: 1 hari suhu ruang, 3–5 hari di kulkas. Simpan dalam wadah tertutup."</p>
                                <InputError message={editForm.errors.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="eimage">Gambar Produk</Label>
                                <Input
                                    id="eimage"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => editForm.setData("image", e.target.files ? e.target.files[0] : null)}
                                />
                                <InputError message={editForm.errors.image} />
                                {editing.image && (
                                    <div className="mt-2">
                                        <p className="mb-2 text-sm text-muted-foreground">Current image:</p>
                                        <ImagePreview src={editing.image} alt={editing.name} className="h-20 w-20 rounded object-cover" />
                                    </div>
                                )}
                            </div>
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
