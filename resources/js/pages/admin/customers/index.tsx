import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Kustomer",
        href: "/admin/customers",
    },
];

export default function AdminCustomers() {
    const { customers } = usePage().props as any;
    const [editing, setEditing] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const editForm = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    // Filter and paginate customers
    const filteredCustomers = useMemo(() => {
        return customers.filter(
            (customer: any) =>
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (customer.phone && customer.phone.toLowerCase().includes(searchTerm.toLowerCase())),
        );
    }, [customers, searchTerm]);

    const paginatedCustomers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCustomers, currentPage]);

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const startEdit = (customer: any) => {
        setEditing(customer);
        editForm.setData({
            name: customer.name ?? "",
            email: customer.email ?? "",
            phone: customer.phone ?? "",
            address: customer.address ?? "",
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            editForm.put(`/admin/customers/${editing.id}`, {
                onSuccess: () => {
                    setEditing(null);
                    editForm.reset();
                },
            });
        }
    };

    const { delete: destroy } = useForm({});

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Customers" />
            <div className="container mx-auto space-y-6 p-4">
                <h1 className="text-2xl font-bold">Kustomer</h1>

                {editing && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Ubah Kustomer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitEdit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama</Label>
                                    <Input id="name" value={editForm.data.name} onChange={(e) => editForm.setData("name", e.target.value)} />
                                    <InputError message={editForm.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={editForm.data.email} onChange={(e) => editForm.setData("email", e.target.value)} />
                                    <InputError message={editForm.errors.email} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Nomor HP</Label>
                                    <Input id="phone" value={editForm.data.phone} onChange={(e) => editForm.setData("phone", e.target.value)} />
                                    <InputError message={editForm.errors.phone} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="address">Alamat</Label>
                                    <Input id="address" value={editForm.data.address} onChange={(e) => editForm.setData("address", e.target.value)} />
                                    <InputError message={editForm.errors.address} />
                                </div>
                                <div className="flex gap-2">
                                    <Button type="submit">Save</Button>
                                    <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Kustomer</CardTitle>
                        <div className="mt-4 flex items-center space-x-2">
                            <Input
                                placeholder="Cari berdasarkan nama, email atau nomor HP..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="max-w-sm"
                            />
                            <span className="text-sm text-muted-foreground">{filteredCustomers.length} kustomer ditemukan</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Nomor HP</TableHead>
                                        <TableHead>Alamat</TableHead>
                                        <TableHead className="w-32">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedCustomers.map((c: any) => (
                                        <TableRow key={c.id}>
                                            <TableCell className="font-medium">{c.name}</TableCell>
                                            <TableCell>{c.email}</TableCell>
                                            <TableCell>{c.phone || "-"}</TableCell>
                                            <TableCell>{c.address || "-"}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm" onClick={() => startEdit(c)}>
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => destroy(`/admin/customers/${c.id}`)}
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
                                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)}{" "}
                                    of {filteredCustomers.length} entries
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
