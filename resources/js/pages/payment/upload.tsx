import { Head, usePage } from '@inertiajs/react';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';

export default function UploadPayment() {
    const { order } = usePage().props as any;
    return (
        <>
            <Head title="Payment" />
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Upload Payment Proof</h1>
                <p className="mb-4">Transfer to BCA 1234567890 and upload the receipt below.</p>
                <form method="post" action={`/payment/upload/${order.id}`} encType="multipart/form-data">
                    <input type="file" name="proof" className="mb-4" />
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                        Upload
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}
