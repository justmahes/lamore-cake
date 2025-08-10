import ImagePreview from "@/components/image-preview";
import InputError from "@/components/input-error";
import TiptapEditor from "@/components/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Produk",
        href: "/admin/products",
    },
];

export default function AdminProducts() {
    const { products } = usePage().props as any;
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data, setData, post, reset, errors } = useForm({
        name: "",
        kategori: "",
        price: "",
        stock: "",
        description: "",
        image: null as File | null,
    });

    const [editing, setEditing] = useState<any>(null);
    const editForm = useForm({
        name: "",
        kategori: "",
        price: "",
        stock: "",
        description: "",
        image: null as File | null,
    });

    // Filter and paginate products
    const filteredProducts = useMemo(() => {
        return products.filter(
            (product: any) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.kategori && product.kategori.toLowerCase().includes(searchTerm.toLowerCase())),
        );
    }, [products, searchTerm]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
            price: product.price,
            stock: product.stock,
            description: product.description,
            image: null,
        });
    };

    const cancelEdit = () => {
        setEditing(null);
        editForm.reset();
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            editForm.post(`/admin/products/${editing.id}`, {
                method: "put",
                forceFormData: true,
                onSuccess: () => {
                    cancelEdit();
                },
            });
        }
    };

    const { delete: destroy } = useForm({});

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Products" />
            <div className="container mx-auto space-y-6 p-4">
                <h1 className="text-2xl font-bold">Kelola Produk</h1>

                <Tabs defaultValue="list" className="w-full space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="list">Daftar Produk</TabsTrigger>
                        <TabsTrigger value="add">Tambah Produk</TabsTrigger>
                    </TabsList>

                    <TabsContent value="list" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Semua Produk</CardTitle>
                                <div className="mt-4 flex items-center space-x-2">
                                    <Input
                                        placeholder="Cari berdasarkan nama atau kategori..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="max-w-sm"
                                    />
                                    <span className="text-sm text-muted-foreground">{filteredProducts.length} produk ditemukan</span>
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
                                                <TableHead className="w-32">Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedProducts.map((p: any) => (
                                                <TableRow key={p.id}>
                                                    <TableCell>
                                                        {p.image && (
                                                            <ImagePreview src={p.image} alt={p.name} className="h-10 w-10 rounded object-cover" />
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="font-medium">{p.name}</TableCell>
                                                    <TableCell>{p.kategori || "-"}</TableCell>
                                                    <TableCell className="text-right">Rp{(p.price || 0).toLocaleString()}</TableCell>
                                                    <TableCell className="text-right">{p.stock}</TableCell>
                                                    <TableCell>
                                                        <div className="flex space-x-2">
                                                            <Button variant="outline" size="sm" onClick={() => startEdit(p)}>
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => destroy(`/admin/products/${p.id}`)}
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
                                                placeholder="Enter product name"
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="kategori">Kategori</Label>
                                            <Input
                                                id="kategori"
                                                value={data.kategori}
                                                onChange={(e) => setData("kategori", e.target.value)}
                                                placeholder="Enter product category"
                                            />
                                            <InputError message={errors.kategori} />
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
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Deskripsi</Label>
                                        <TiptapEditor content={data.description} onChange={(html) => setData("description", html)} />
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
                                    <Input
                                        id="ekategori"
                                        value={editForm.data.kategori}
                                        onChange={(e) => editForm.setData("kategori", e.target.value)}
                                    />
                                    <InputError message={editForm.errors.kategori} />
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
                            </div>
                            <div className="grid gap-2">
                                <Label>Deskripsi</Label>
                                <TiptapEditor content={editForm.data.description} onChange={(html) => editForm.setData("description", html)} />
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
                                    {editForm.processing ? "Saving..." : "Save Changes"}
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
