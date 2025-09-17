import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Checkout",
        href: "/checkout",
    },
    {
        title: "Success",
        href: "/payment/success",
    },
];

export default function PaymentSuccess() {
    return (
        <>
            <Navbar />
            <Head title="Payment Success" />
            <div className="container mx-auto max-w-2xl space-y-6 p-4">
                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-green-600">
                            Pembayaran Berhasil !
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-gray-600">
                          Terima kasih atas pesanan Anda ! Pembayaran Anda telah berhasil diproses.
                        </p>
                        <p className="text-sm text-gray-500">
                            Anda akan segera menerima konfirmasi dengan detail pesanan Anda.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                            <Button asChild>
                                <Link href="/transactions">
                                    Lihat Riwayat Pesanan
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/products">
                                    Belanja Lagi
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </>
    );
}
