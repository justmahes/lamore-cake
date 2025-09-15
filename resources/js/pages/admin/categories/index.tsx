import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Search, Edit3, Trash2, Tags } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Kategori",
        href: "/admin/categories",
    },
];

export default function AdminCategories() {
    const { categories } = usePage().props as any;
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data, setData, post, reset, errors } = useForm({
        nama: "",
        deskripsi: "",
    });

    const [editing, setEditing] = useState<any>(null);
    const editForm = useForm({
        nama: "",
        deskripsi: "",
    });

    // Filter and paginate categories
    const filteredCategories = useMemo(() => {
        return categories.filter(
            (category: any) =>
                category.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (category.deskripsi && category.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())),
        );
    }, [categories, searchTerm]);

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const paginatedCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/admin/categories", {
            onSuccess: () => {
                reset();
                setCurrentPage(1);
            },
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        editForm.put(`/admin/categories/${editing.id}`, {
            onSuccess: () => {
                setEditing(null);
                editForm.reset();
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
            editForm.delete(`/admin/categories/${id}`);
        }
    };

    const handleEdit = (category: any) => {
        setEditing(category);
        editForm.setData({
            nama: category.nama || "",
            deskripsi: category.deskripsi || "",
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Kategori" />
            <div className="container mx-auto p-4 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Kelola Kategori</h1>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="flex items-center gap-3 p-4">
                            <Tags className="text-muted-foreground" />
                            <div>
                                <div className="text-sm text-muted-foreground">Total Kategori</div>
                                <div className="text-2xl font-semibold">{categories.length || 0}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="list" className="w-full">
                    <TabsList>
                        <TabsTrigger value="list">Daftar Kategori</TabsTrigger>
                        <TabsTrigger value="add">Tambah Kategori</TabsTrigger>
                    </TabsList>

                    <TabsContent value="list" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Daftar Kategori</CardTitle>
                                <div className="mt-4">
                                    <div className="relative w-full max-w-sm">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="text"
                                            placeholder="Cari berdasarkan nama atau deskripsi..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Deskripsi</TableHead>
                                            <TableHead>Dibuat</TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedCategories.map((c: any) => (
                                            <TableRow key={c.id} className="hover:bg-muted/50">
                                                <TableCell className="font-medium">{c.id}</TableCell>
                                                <TableCell className="font-medium">{c.nama}</TableCell>
                                                <TableCell>{c.deskripsi || "-"}</TableCell>
                                                <TableCell>{new Date(c.created_at).toLocaleDateString("id-ID")}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button size="sm" onClick={() => handleEdit(c)} variant="outline" aria-label="Edit">
                                                                        <Edit3 className="size-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Edit</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button size="sm" onClick={() => handleDelete(c.id)} variant="outline" className="text-red-600 hover:text-red-700" aria-label="Hapus">
                                                                        <Trash2 className="size-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Hapus</TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center space-x-2 mt-4">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <Button
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                                variant={currentPage === i + 1 ? "default" : "outline"}
                                                size="sm"
                                            >
                                                {i + 1}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="add">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tambah Kategori Baru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="nama">Nama Kategori</Label>
                                        <Input
                                            id="nama"
                                            type="text"
                                            value={data.nama}
                                            onChange={(e) => setData("nama", e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.nama} />
                                    </div>

                                    <div>
                                        <Label htmlFor="deskripsi">Deskripsi</Label>
                                        <Input
                                            id="deskripsi"
                                            type="text"
                                            value={data.deskripsi}
                                            onChange={(e) => setData("deskripsi", e.target.value)}
                                        />
                                        <InputError message={errors.deskripsi} />
                                    </div>

                                    <Button type="submit" disabled={!data.nama.trim()}>
                                        Simpan Kategori
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Edit Dialog */}
                <Dialog open={editing !== null} onOpenChange={() => setEditing(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Kategori</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="enama">Nama Kategori</Label>
                                <Input
                                    id="enama"
                                    type="text"
                                    value={editForm.data.nama}
                                    onChange={(e) => editForm.setData("nama", e.target.value)}
                                    required
                                />
                                <InputError message={editForm.errors.nama} />
                            </div>

                            <div>
                                <Label htmlFor="edeskripsi">Deskripsi</Label>
                                <Input
                                    id="edeskripsi"
                                    type="text"
                                    value={editForm.data.deskripsi}
                                    onChange={(e) => editForm.setData("deskripsi", e.target.value)}
                                />
                                <InputError message={editForm.errors.deskripsi} />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={editForm.processing}>
                                    Update Kategori
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                                    Batal
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
