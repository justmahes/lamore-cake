import { Head, usePage } from '@inertiajs/react';

export default function UploadPayment() {
    const { order } = usePage().props as any;
    return (
        <div className="container mx-auto p-4">
            <Head title="Payment" />
            <h1 className="text-2xl font-bold mb-4">Upload Payment Proof</h1>
            <form method="post" action={`/payment/upload/${order.id}`} encType="multipart/form-data">
                <input type="file" name="proof" className="mb-4" />
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                    Upload
                </button>
            </form>
        </div>
    );
}
