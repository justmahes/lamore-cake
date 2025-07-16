import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Head, usePage } from "@inertiajs/react";

export default function GuestProducts() {
    const { products, auth } = usePage().props as any;
    return (
        <>
            <Head title="Products" />
            <Navbar />
            <div className="container mx-auto space-y-4 p-4">
                <h1 className="text-2xl font-bold">Products</h1>
                <div className="grid gap-4 md:grid-cols-3">
                    {products.map((p: any) => (
                        <div key={p.id} className="rounded border p-4">
                            <a href={auth.user ? `/products/${p.id}` : `/guest/products/${p.id}`}>
                                <img src={p.image} alt={p.name} className="mb-2 h-40 w-full object-cover" />
                                <h2 className="font-semibold">{p.name}</h2>
                            </a>
                            {/* <div dangerouslySetInnerHTML={{ __html: p.description }} /> */}
                            <p className="font-bold">Rp {p.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
