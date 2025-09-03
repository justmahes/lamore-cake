import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment Success" />
            <div className="container mx-auto space-y-6 p-4">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-green-600">
                            Payment Successful!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-gray-600">
                            Thank you for your order! Your payment has been processed successfully.
                        </p>
                        <p className="text-sm text-gray-500">
                            You will receive an email confirmation shortly with your order details.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                            <Button asChild>
                                <Link href="/transactions">
                                    View Order History
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/products">
                                    Continue Shopping
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}