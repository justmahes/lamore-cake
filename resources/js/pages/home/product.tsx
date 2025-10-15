import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImagePreview from "@/components/image-preview";
import mediumZoom from "medium-zoom";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function GuestProductShow() {
    const { product } = usePage().props as any;
    const [open, setOpen] = useState(false);

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
                <div className="rounded-lg border bg-card p-4">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-lg font-semibold">Rp {product.price}</p>
                        <div className="text-sm text-gray-600">Stok: <span className="font-medium">{product.stock ?? '-'}</span></div>
                    </div>
                    {product.expires_at && (
                        new Date(product.expires_at).getTime() < Date.now() ? (
                            <div className="mb-2 text-sm text-red-600">Sudah kadaluwarsa — penjual akan segera restock produk</div>
                        ) : (
                            <div className="mb-2 text-sm text-amber-600">Kadaluwarsa: {new Date(product.expires_at).toLocaleDateString()}</div>
                        )
                    )}
                    <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: product.description }} />
                    <div className="mt-4">
                        <Button className="w-full" onClick={() => setOpen(true)}>Beli</Button>
                    </div>
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Masuk untuk Melanjutkan</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">Anda harus login atau daftar untuk membeli produk ini.</p>
                    <DialogFooter className="sm:space-x-2">
                        <a href="/login"><Button className="w-full sm:w-auto">Login</Button></a>
                        <a href="/register"><Button variant="outline" className="w-full sm:w-auto">Daftar</Button></a>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Footer />
        </>
    );
}
