import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";

declare global {
    interface Window {
        snap: any;
    }
}

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        category: string;
        image: string;
        price: number;
    };
}

interface PageProps {
    cartItems: CartItem[];
    snapToken: string;
    tempOrderId: string;
    totalAmount: number;
    clientKey: string;
    isProduction: boolean;
    [key: string]: unknown;
}

type ToastDetail = {
    type: "success" | "error" | "warning" | "info";
    text: string;
    duration?: number;
    id?: string;
};

export default function CheckoutPayment() {
    const { cartItems, snapToken, tempOrderId, totalAmount, clientKey, isProduction } = usePage<PageProps>().props;
    const [isLoading, setIsLoading] = useState(false);
    const [snapLoaded, setSnapLoaded] = useState(false);

    const pushToast = useCallback(
        (detail: ToastDetail) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(new CustomEvent("app:toast", { detail }));
        },
        []
    );

    useEffect(() => {
        // Load Midtrans Snap script
        const script = document.createElement("script");
        script.src = isProduction ? "https://app.midtrans.com/snap/snap.js" : "https://app.stg.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", clientKey);
        console.log(snapToken);

        script.onload = () => {
            setSnapLoaded(true);
            // Auto-trigger payment popup when script is loaded
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
            // Don't remove script as it might be needed for retries
        };
    }, [clientKey, isProduction, pushToast]);

    const handlePayment = () => {
        if (!snapLoaded || !window.snap) {
            console.log("Snap not ready yet, retrying...");
            setTimeout(handlePayment, 500);
            return;
        }

        setIsLoading(true);

        window.snap.pay(snapToken, {
            onSuccess: function (result: any) {
                console.log("Payment success:", result);
                pushToast({
                    type: "success",
                    text: "Pembayaran berhasil! Pesanan kamu sedang kami proses.",
                    duration: 6000,
                });
                setIsLoading(false);
                // Redirect will be handled by the callback URL
            },
            onPending: function (result: any) {
                console.log("Payment pending:", result);
                pushToast({
                    type: "info",
                    text: "Pembayaran tertunda. Selesaikan pembayaranmu di Midtrans untuk melanjutkan pesanan.",
                    duration: 7000,
                });
                setIsLoading(false);
                // Redirect will be handled by the callback URL
            },
            onError: function (result: any) {
                console.error("Payment error:", result);
                const message = result?.status_message || "Transaksi pembayaran gagal diproses.";
                pushToast({
                    type: "error",
                    text: `Midtrans: ${message}`,
                    duration: 7000,
                });
                setIsLoading(false);
                // Redirect will be handled by the callback URL
            },
            onClose: function () {
                console.log("Payment popup closed");
                setIsLoading(false);
                // User closed the popup, redirect back to transactions
                window.location.href = "/transactions";
            },
        });
    };

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
                    {/* Cart Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Cart Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Payment ID</p>
                                    <p className="font-semibold">{tempOrderId}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Items</p>
                                    <div className="space-y-2">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex justify-between">
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.product.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {item.quantity} x Rp {item.product.price.toLocaleString()}
                                                    </p>
                                                </div>
                                                <p className="font-semibold">Rp {(item.quantity * item.product.price).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>Rp {totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Status */}
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
                                            Payment window should open automatically. Complete payment to create your order.
                                        </p>
                                        <Button onClick={retryPayment} disabled={isLoading} size="lg" className="w-full">
                                            {isLoading ? "Processing..." : "Open Payment Window"}
                                        </Button>

                                        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                            <p className="text-sm text-blue-800">
                                                <strong>Note:</strong> Your order will only be created after successful payment. Your cart items will
                                                be reserved during payment processing.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 border-t pt-4">
                                    <p className="text-sm text-gray-500">
                                        Having trouble?{" "}
                                        <a href="/cart" className="text-blue-600 hover:underline">
                                            Go back to cart
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
