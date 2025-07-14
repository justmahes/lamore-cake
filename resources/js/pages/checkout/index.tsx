import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Checkout",
        href: "/checkout",
    },
];

export default function Checkout() {
    const { address, phone } = usePage().props as any;
    const { post, errors } = useForm<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/checkout");
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Checkout" />
            <div className="container mx-auto space-y-6 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Checkout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Shipping Address</Label>
                                <p>{address}</p>
                                <InputError message={errors.address} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Phone</Label>
                                <p>{phone}</p>
                                <InputError message={errors.phone} />
                            </div>
                            <Button type="submit">Place Order</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
