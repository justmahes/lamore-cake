/**
 * Halaman ini merupakan langkah terakhir dari proses checkout, yaitu pembayaran.
 * Halaman ini berintegrasi dengan Midtrans Snap untuk memproses pembayaran.
 * Fitur utama:
 * - Secara otomatis memuat script Midtrans Snap.
 * - Menampilkan ringkasan pesanan (item, jumlah, total harga).
 * - Secara otomatis membuka popup pembayaran Midtrans setelah script berhasil dimuat.
 * - Menangani berbagai status pembayaran dari Midtrans (success, pending, error, close).
 * - Menampilkan notifikasi (toast) yang sesuai dengan status pembayaran.
 * - Memberikan tombol untuk mencoba membuka kembali popup pembayaran jika gagal terbuka otomatis.
 */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";

// Mendeklarasikan `snap` pada object `window` untuk integrasi Midtrans
declare global {
    interface Window {
        snap: any;
    }
}

// ... (definisi tipe data)

export default function CheckoutPayment() {
    // SECTION: Mengambil data yang diperlukan untuk pembayaran dari server (snapToken, detail pesanan, dll).
    const { cartItems, snapToken, tempOrderId, totalAmount, clientKey, isProduction } = usePage<PageProps>().props;
    const [isLoading, setIsLoading] = useState(false);
    const [snapLoaded, setSnapLoaded] = useState(false);

    // Fungsi helper untuk menampilkan notifikasi.
    const pushToast = useCallback(
        (detail: ToastDetail) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(new CustomEvent("app:toast", { detail }));
        },
        []
    );

    // SECTION: Efek untuk memuat script Midtrans Snap saat komponen dimuat.
    useEffect(() => {
        const script = document.createElement("script");
        script.src = isProduction ? "https://app.midtrans.com/snap/snap.js" : "https://app.stg.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", clientKey);

        script.onload = () => {
            setSnapLoaded(true);
            // Otomatis memicu popup pembayaran setelah script dimuat.
            handlePayment();
        };

        script.onerror = () => {
            console.error("Failed to load Midtrans Snap script");
            pushToast({
                type: "error",
                text: "Gagal memuat gateway Midtrans. Periksa koneksi Anda lalu coba lagi.",
                duration: 7000,
            });
        };

        document.head.appendChild(script);

        return () => {
            // Script tidak dihapus agar bisa digunakan untuk percobaan ulang.
        };
    }, [clientKey, isProduction, pushToast]);

    // SECTION: Fungsi utama untuk membuka popup pembayaran Midtrans Snap.
    const handlePayment = () => {
        if (!snapLoaded || !window.snap) {
            setTimeout(handlePayment, 500); // Coba lagi jika snap belum siap
            return;
        }

        setIsLoading(true);

        window.snap.pay(snapToken, {
            // Callback saat pembayaran berhasil
            onSuccess: function (result: any) {
                pushToast({ type: "success", text: "Pembayaran berhasil! Pesanan kamu sedang kami proses." });
                setIsLoading(false);
                // Pengalihan halaman akan ditangani oleh URL callback dari server
            },
            // Callback saat pembayaran tertunda
            onPending: function (result: any) {
                pushToast({ type: "info", text: "Pembayaran tertunda. Selesaikan pembayaranmu untuk melanjutkan." });
                setIsLoading(false);
            },
            // Callback saat terjadi error
            onError: function (result: any) {
                const message = result?.status_message || "Transaksi pembayaran gagal diproses.";
                pushToast({ type: "error", text: `Midtrans: ${message}` });
                setIsLoading(false);
            },
            // Callback saat popup pembayaran ditutup oleh pengguna
            onClose: function () {
                setIsLoading(false);
                window.location.href = "/transactions"; // Arahkan ke riwayat transaksi
            },
        });
    };

    // Fungsi untuk mencoba kembali pembayaran
    const retryPayment = () => {
        if (snapLoaded) {
            handlePayment();
        }
    };

    return (
        <AppLayout>
            <Head title={`Payment Processing`} />
            <div className="container mx-auto max-w-4xl p-4">
                <h1 className="mb-6 text-2xl font-bold">Complete Your Payment</h1>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* SECTION: Menampilkan ringkasan keranjang belanja */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Cart Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                           {/* ... (Detail item dan total harga) */}
                        </CardContent>
                    </Card>

                    {/* SECTION: Menampilkan status proses pembayaran */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 text-center">
                                {!snapLoaded ? (
                                    <div>
                                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                                        <p className="text-gray-600">Loading payment gateway...</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="mb-4 text-gray-600">
                                            Jendela pembayaran akan terbuka otomatis. Selesaikan untuk membuat pesanan.
                                        </p>
                                        <Button onClick={retryPayment} disabled={isLoading} size="lg" className="w-full">
                                            {isLoading ? "Processing..." : "Buka Jendela Pembayaran"}
                                        </Button>
                                        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                            <p className="text-sm text-blue-800">
                                                <strong>Catatan:</strong> Pesanan Anda akan dibuat setelah pembayaran berhasil.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 border-t pt-4">
                                    <p className="text-sm text-gray-500">
                                        Mengalami masalah?{" "}
                                        <a href="/cart" className="text-blue-600 hover:underline">
                                            Kembali ke keranjang
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}