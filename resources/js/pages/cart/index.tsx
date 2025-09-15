import { Head, useForm, usePage } from '@inertiajs/react';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type BreadcrumbItem } from '@/types';
import FlashMessage from '@/components/flash-message';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [];

export default function Cart() {
    const { cartItems, subtotal } = usePage().props as any;
    const { delete: destroy } = useForm({});
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter and paginate cart items
    const filteredCartItems = useMemo(() => {
        return cartItems.filter((item: any) =>
            item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [cartItems, searchTerm]);

    const paginatedCartItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCartItems.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCartItems, currentPage]);

    const totalPages = Math.ceil(filteredCartItems.length / itemsPerPage);

    return (
        <>
            <Navbar />
            <Head title="Keranjang" />
            <FlashMessage />
            <div className="container mx-auto max-w-5xl space-y-6 p-4">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Keranjang Belanja</CardTitle>
                        {cartItems.length > 0 && (
                            <div className="flex items-center space-x-2 mt-4">
                                <Input
                                    placeholder="Cari produk dalam keranjang..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="max-w-sm"
                                />
                                <span className="text-sm text-muted-foreground">
                                    {filteredCartItems.length} item ditemukan
                                </span>
                            </div>
                        )}
                    </CardHeader>
                    <CardContent>
                        {cartItems.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground mb-4">Keranjang belanja Anda masih kosong</p>
                                <Button asChild>
                                    <a href="/products">Mulai Belanja</a>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Produk</TableHead>
                                                <TableHead className="text-center">Jumlah</TableHead>
                                                <TableHead className="text-right">Harga Satuan</TableHead>
                                                <TableHead className="text-right">Total Harga</TableHead>
                                                <TableHead className="w-32">Aksi</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedCartItems.map((item: any) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">{item.product.name}</TableCell>
                                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                                    <TableCell className="text-right">Rp{(item.product.price || 0).toLocaleString()}</TableCell>
                                                    <TableCell className="text-right font-medium">
                                                        Rp{((item.product.price || 0) * item.quantity).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => destroy(`/cart/remove/${item.id}`)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            Hapus
                                                        </Button>
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
                                            Menampilkan {((currentPage - 1) * itemsPerPage) + 1} hingga {Math.min(currentPage * itemsPerPage, filteredCartItems.length)} dari {filteredCartItems.length} item
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                Sebelumnya
                                            </Button>
                                            <div className="flex items-center space-x-1">
                                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                                    .filter(page => 
                                                        page === 1 || 
                                                        page === totalPages || 
                                                        Math.abs(page - currentPage) <= 1
                                                    )
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
                                                    ))
                                                }
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                Selanjutnya
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Summary and Actions */}
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg font-semibold">Subtotal:</span>
                                        <span className="text-xl font-bold">Rp{(subtotal || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <Button asChild size="lg">
                                            <a href="/checkout">Lanjut ke Checkout</a>
                                        </Button>
                                        <Button asChild variant="secondary" size="lg" className="bg-green-500 text-white hover:bg-green-600">
                                            <a
                                                href={`https://wa.me/628123456789?text=${encodeURIComponent(
                                                    filteredCartItems
                                                        .map((i: any) => `${i.product.name} x${i.quantity}`)
                                                        .join(', ') +
                                                        ' - Total: Rp' + (subtotal || 0).toLocaleString()
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Pesan via WhatsApp
                                            </a>
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="lg"
                                            onClick={() => {
                                                if (confirm('Bersihkan semua item di keranjang?')) {
                                                    destroy('/cart/clear');
                                                }
                                            }}
                                        >
                                            Bersihkan Keranjang
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </>
    );
}
