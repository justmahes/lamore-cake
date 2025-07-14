import TiptapEditor from "@/components/tiptap-editor";
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
import InputError from "@/components/input-error";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Admin Products",
        href: "/admin/products",
    },
];

export default function AdminProducts() {
    const { products } = usePage().props as any;
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        image: null as File | null,
    });

    const [editing, setEditing] = useState<any>(null);
    const editForm = useForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        image: null as File | null,
    });

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
            price: product.price,
            stock: product.stock,
            description: product.description,
            image: null,
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            editForm.post(`/admin/products/${editing.id}`, {
                method: "put",
                forceFormData: true,
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
            <Head title="Admin Products" />
            <div className="container mx-auto space-y-6 p-4">
                <h1 className="text-2xl font-bold">Manage Products</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Add Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" value={data.price} onChange={(e) => setData("price", e.target.value)} />
                                <InputError message={errors.price} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stock">Stock</Label>
                                <Input id="stock" type="number" value={data.stock} onChange={(e) => setData("stock", e.target.value)} />
                                <InputError message={errors.stock} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <TiptapEditor content={data.description} onChange={(html) => setData("description", html)} />
                                <InputError message={errors.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <Input id="image" type="file" onChange={(e) => setData("image", e.target.files ? e.target.files[0] : null)} />
                                <InputError message={errors.image} />
                            </div>
                            <Button type="submit">Add Product</Button>
                        </form>
                    </CardContent>
                </Card>
                {editing && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Product</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitEdit} className="space-y-4" encType="multipart/form-data">
                                <div className="grid gap-2">
                                    <Label htmlFor="ename">Name</Label>
                                    <Input id="ename" value={editForm.data.name} onChange={(e) => editForm.setData("name", e.target.value)} />
                                    <InputError message={editForm.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="eprice">Price</Label>
                                    <Input
                                        id="eprice"
                                        type="number"
                                        value={editForm.data.price}
                                        onChange={(e) => editForm.setData("price", e.target.value)}
                                    />
                                    <InputError message={editForm.errors.price} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="estock">Stock</Label>
                                    <Input
                                        id="estock"
                                        type="number"
                                        value={editForm.data.stock}
                                        onChange={(e) => editForm.setData("stock", e.target.value)}
                                    />
                                    <InputError message={editForm.errors.stock} />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Description</Label>
                                    <TiptapEditor content={editForm.data.description} onChange={(html) => editForm.setData("description", html)} />
                                    <InputError message={editForm.errors.description} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="eimage">Image</Label>
                                    <Input id="eimage" type="file" onChange={(e) => editForm.setData("image", e.target.files ? e.target.files[0] : null)} />
                                    <InputError message={editForm.errors.image} />
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
                        <CardTitle>Product List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead className="w-32" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell>{p.name}</TableCell>
                                        <TableCell>{p.price}</TableCell>
                                        <TableCell>{p.stock}</TableCell>
                                        <TableCell>
                                            <Button variant="link" onClick={() => startEdit(p)} className="px-0 mr-2">Edit</Button>
                                            <Button variant="link" className="text-red-500 px-0" onClick={() => destroy(`/admin/products/${p.id}`)}>
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
