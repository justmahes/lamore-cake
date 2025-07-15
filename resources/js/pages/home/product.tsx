import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import ImagePreview from "@/components/image-preview";
import mediumZoom from "medium-zoom";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function GuestProductShow() {
    const { product } = usePage().props as any;

    useEffect(() => {
        mediumZoom(".tiptap-content img", { background: "rgba(0,0,0,0.8)" });
    }, []);

    return (
        <>
            <Head title={product.name} />
            <Navbar />
            <div className="container mx-auto space-y-4 p-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                {product.image && (
                    <ImagePreview src={product.image} alt={product.name} className="h-80 w-full object-cover" />
                )}
                <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: product.description }} />
                <p className="font-bold">Rp {product.price}</p>
            </div>
            <Footer />
        </>
    );
}
