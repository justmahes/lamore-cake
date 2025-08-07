import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
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
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Keranjang",
        href: "/cart",
    },
];

export default function Cart() {
    const { cartItems, subtotal } = usePage().props as any;
    const { delete: destroy } = useForm({});
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keranjang" />
            <div className="container mx-auto space-y-6 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Keranjang</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Produk</TableHead>
                                    <TableHead>Jml</TableHead>
                                    <TableHead>Harga</TableHead>
                                    <TableHead className="w-24" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartItems.map((item: any) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>Rp {item.product.price}</TableCell>
                                        <TableCell>
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    destroy(`/cart/remove/${item.id}`);
                                                }}
                                            >
                                                <Button type="submit" variant="link" className="text-red-500 px-0">
                                                    Hapus
                                                </Button>
                                            </form>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <p className="mt-4 font-bold">Subtotal: Rp {subtotal}</p>
                        <div className="mt-4 flex gap-2">
                            <Button asChild>
                                <a href="/checkout">Checkout</a>
                            </Button>
                            <Button asChild variant="secondary" className="bg-green-500 text-white hover:bg-green-600">
                                <a
                                    href={`https://wa.me/628123456789?text=${encodeURIComponent(
                                        cartItems
                                            .map((i: any) => `${i.product.name} x${i.quantity}`)
                                            .join(', ') +
                                            ' - Total: ' + subtotal
                                    )}`}
                                >
                                    Pesan via WhatsApp
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
