import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Payment",
        href: "/payment",
    },
];

export default function UploadPayment() {
    const { order } = usePage().props as any;
    const { data, setData, post } = useForm({ proof: null as File | null });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/payment/upload/${order.id}`, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Upload Payment Proof</h1>
                <p className="mb-4">Transfer to BCA 1234567890 and upload the receipt below.</p>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                        type="file"
                        className="mb-4"
                        onChange={(e) => setData('proof', e.target.files ? e.target.files[0] : null)}
                    />
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                        Upload
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
