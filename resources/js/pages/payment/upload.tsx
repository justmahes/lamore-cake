import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Payment",
        href: "/payment",
    },
];

export default function UploadPayment() {
    const { order } = usePage().props as any;
    const { setData, post, errors } = useForm({ proof: null as File | null });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/payment/upload/${order.id}`, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment" />
            <div className="container mx-auto space-y-6 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Payment Proof</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">Transfer to BCA 1234567890 and upload the receipt below.</p>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="proof">Proof</Label>
                                <Input
                                    id="proof"
                                    type="file"
                                    onChange={(e) => setData('proof', e.target.files ? e.target.files[0] : null)}
                                />
                                <InputError message={errors.proof} />
                            </div>
                            <Button type="submit">Upload</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
