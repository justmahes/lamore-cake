import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Customers",
        href: "/admin/customers",
    },
];

export default function AdminCustomers() {
    const { customers } = usePage().props as any;
    const [editing, setEditing] = useState<any>(null);

    const editForm = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

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
                <h1 className="text-2xl font-bold">Customers</h1>

                {editing && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Customer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitEdit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value={editForm.data.name} onChange={(e) => editForm.setData("name", e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={editForm.data.email} onChange={(e) => editForm.setData("email", e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" value={editForm.data.phone} onChange={(e) => editForm.setData("phone", e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" value={editForm.data.address} onChange={(e) => editForm.setData("address", e.target.value)} />
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
                        <CardTitle>Customer List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="w-32" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell>{c.name}</TableCell>
                                        <TableCell>{c.email}</TableCell>
                                        <TableCell>
                                            <Button variant="link" onClick={() => startEdit(c)} className="px-0 mr-2">Edit</Button>
                                            <Button variant="link" className="text-red-500 px-0" onClick={() => destroy(`/admin/customers/${c.id}`)}>
                                                Delete
                                            </Button>
                                        </TableCell>
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
