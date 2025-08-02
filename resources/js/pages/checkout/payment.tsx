import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

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
}

export default function CheckoutPayment() {
    const { cartItems, snapToken, tempOrderId, totalAmount, clientKey, isProduction } = usePage().props as PageProps;
    const [isLoading, setIsLoading] = useState(false);
    const [snapLoaded, setSnapLoaded] = useState(false);

    useEffect(() => {
        // Load Midtrans Snap script
        const script = document.createElement('script');
        script.src = isProduction 
            ? 'https://app.midtrans.com/snap/snap.js' 
            : 'https://app.stg.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', clientKey);
        
        script.onload = () => {
            setSnapLoaded(true);
            // Auto-trigger payment popup when script is loaded
            handlePayment();
        };
        
        script.onerror = () => {
            console.error('Failed to load Midtrans Snap script');
        };
        
        document.head.appendChild(script);

        return () => {
            // Don't remove script as it might be needed for retries
        };
    }, [clientKey, isProduction]);

    const handlePayment = () => {
        if (!snapLoaded || !window.snap) {
            console.log('Snap not ready yet, retrying...');
            setTimeout(handlePayment, 500);
            return;
        }

        setIsLoading(true);

        window.snap.pay(snapToken, {
            onSuccess: function(result: any) {
                console.log('Payment success:', result);
                // Redirect will be handled by the callback URL
            },
            onPending: function(result: any) {
                console.log('Payment pending:', result);
                // Redirect will be handled by the callback URL
            },
            onError: function(result: any) {
                console.log('Payment error:', result);
                // Redirect will be handled by the callback URL
            },
            onClose: function() {
                console.log('Payment popup closed');
                setIsLoading(false);
                // User closed the popup, redirect back to transactions
                window.location.href = '/transactions';
            }
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
            <div className="container mx-auto p-4 max-w-4xl">
                <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>
                
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
                                                <p className="font-semibold">
                                                    Rp {(item.quantity * item.product.price).toLocaleString()}
                                                </p>
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
                            <div className="text-center space-y-4">
                                {!snapLoaded ? (
                                    <div>
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                        <p className="text-gray-600">Loading payment gateway...</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-gray-600 mb-4">
                                            Payment window should open automatically. Complete payment to create your order.
                                        </p>
                                        <Button 
                                            onClick={retryPayment}
                                            disabled={isLoading}
                                            size="lg"
                                            className="w-full"
                                        >
                                            {isLoading ? 'Processing...' : 'Open Payment Window'}
                                        </Button>
                                        
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                            <p className="text-sm text-blue-800">
                                                <strong>Note:</strong> Your order will only be created after successful payment. 
                                                Your cart items will be reserved during payment processing.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="mt-6 pt-4 border-t">
                                    <p className="text-sm text-gray-500">
                                        Having trouble? <a href="/cart" className="text-blue-600 hover:underline">Go back to cart</a>
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