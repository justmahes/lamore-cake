import AppLayout from "@/layouts/app-layout";
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
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold">Customers</h1>

                {editing && (
                    <form onSubmit={submitEdit} className="mb-6">
                        <div className="mb-2">
                            <label>Name</label>
                            <input className="w-full border" value={editForm.data.name} onChange={(e) => editForm.setData("name", e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label>Email</label>
                            <input
                                className="w-full border"
                                value={editForm.data.email}
                                onChange={(e) => editForm.setData("email", e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label>Phone</label>
                            <input
                                className="w-full border"
                                value={editForm.data.phone}
                                onChange={(e) => editForm.setData("phone", e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label>Address</label>
                            <input
                                className="w-full border"
                                value={editForm.data.address}
                                onChange={(e) => editForm.setData("address", e.target.value)}
                            />
                        </div>
                        <button type="submit" className="rounded bg-primary px-4 py-2 text-white">
                            Save
                        </button>
                        <button type="button" onClick={() => setEditing(null)} className="ml-2 rounded border px-4 py-2">
                            Cancel
                        </button>
                    </form>
                )}

                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c: any) => (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.email}</td>
                                <td>
                                    <button className="mr-2 text-primary" onClick={() => startEdit(c)}>
                                        Edit
                                    </button>
                                    <button className="text-red-500" onClick={() => destroy(`/admin/customers/${c.id}`)}>
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
