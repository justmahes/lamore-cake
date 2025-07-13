import { Head, useForm, usePage } from '@inertiajs/react';
import TiptapEditor from '@/components/tiptap-editor';

export default function AdminProducts() {
    const { products } = usePage().props as any;
    const { data, setData, post, reset } = useForm({
        name: '',
        price: '',
        stock: '',
        description: '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/products', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="container mx-auto p-4">
            <Head title="Admin Products" />
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
            <form onSubmit={handleSubmit} className="mb-6" encType="multipart/form-data">
                <div className="mb-2">
                    <label>Name</label>
                    <input
                        className="border w-full"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label>Price</label>
                    <input
                        className="border w-full"
                        type="number"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label>Stock</label>
                    <input
                        className="border w-full"
                        type="number"
                        value={data.stock}
                        onChange={e => setData('stock', e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label>Description</label>
                    <TiptapEditor
                        content={data.description}
                        onChange={html => setData('description', html)}
                    />
                </div>
                <div className="mb-2">
                    <label>Image</label>
                    <input
                        type="file"
                        onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                    />
                </div>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                    Add Product
                </button>
            </form>
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
