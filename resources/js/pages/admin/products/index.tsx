import { Head, usePage } from '@inertiajs/react';

export default function AdminProducts() {
    const { products } = usePage().props as any;
    return (
        <div className="container mx-auto p-4">
            <Head title="Admin Products" />
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
            <table className="w-full mb-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p: any) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
