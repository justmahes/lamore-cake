import TiptapEditor from "@/components/tiptap-editor";
import AppLayout from "@/layouts/app-layout";
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
    const { data, setData, post, reset } = useForm({
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
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold">Manage Products</h1>
                <form onSubmit={handleSubmit} className="mb-6" encType="multipart/form-data">
                    <div className="mb-2">
                        <label>Name</label>
                        <input className="w-full border" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label>Price</label>
                        <input className="w-full border" type="number" value={data.price} onChange={(e) => setData("price", e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label>Stock</label>
                        <input className="w-full border" type="number" value={data.stock} onChange={(e) => setData("stock", e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label>Description</label>
                        <TiptapEditor content={data.description} onChange={(html) => setData("description", html)} />
                    </div>
                    <div className="mb-2">
                        <label>Image</label>
                        <input type="file" onChange={(e) => setData("image", e.target.files ? e.target.files[0] : null)} />
                    </div>
                    <button type="submit" className="rounded bg-primary px-4 py-2 text-white">
                        Add Product
                    </button>
                </form>
                {editing && (
                    <form onSubmit={submitEdit} className="mb-6" encType="multipart/form-data">
                        <h2 className="mb-2 font-semibold">Edit Product</h2>
                        <div className="mb-2">
                            <label>Name</label>
                            <input className="w-full border" value={editForm.data.name} onChange={(e) => editForm.setData("name", e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label>Price</label>
                            <input
                                className="w-full border"
                                type="number"
                                value={editForm.data.price}
                                onChange={(e) => editForm.setData("price", e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label>Stock</label>
                            <input
                                className="w-full border"
                                type="number"
                                value={editForm.data.stock}
                                onChange={(e) => editForm.setData("stock", e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label>Description</label>
                            <TiptapEditor content={editForm.data.description} onChange={(html) => editForm.setData("description", html)} />
                        </div>
                        <div className="mb-2">
                            <label>Image</label>
                            <input type="file" onChange={(e) => editForm.setData("image", e.target.files ? e.target.files[0] : null)} />
                        </div>
                        <button type="submit" className="rounded bg-primary px-4 py-2 text-white">
                            Save
                        </button>
                        <button type="button" onClick={() => setEditing(null)} className="ml-2 rounded border px-4 py-2">
                            Cancel
                        </button>
                    </form>
                )}

                <table className="mb-4 w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p: any) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td>{p.stock}</td>
                                <td>
                                    <button className="mr-2 text-primary" onClick={() => startEdit(p)}>
                                        Edit
                                    </button>
                                    <button className="text-red-500" onClick={() => destroy(`/admin/products/${p.id}`)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
