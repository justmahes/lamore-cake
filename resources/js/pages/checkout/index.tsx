/**
 * Halaman ini merupakan langkah kedua dari proses checkout, yaitu pengisian detail pengiriman.
 * Pengguna memasukkan informasi pribadi dan alamat untuk tujuan pengiriman pesanan.
 * Fitur utama:
 * - Menampilkan progress bar checkout (Keranjang -> Pengiriman -> Pembayaran).
 * - Form untuk mengisi nama, email, telepon, dan alamat lengkap.
 * - Pemilihan area Denpasar (Utara, Timur, Barat, Selatan) yang akan otomatis mengisi kode pos.
 * - Menggunakan data pengguna yang sudah login untuk mengisi form secara otomatis jika tersedia.
 * - Validasi input di sisi klien untuk email dan nomor telepon.
 * - Tombol untuk melanjutkan ke langkah pembayaran atau kembali ke halaman sebelumnya.
 */
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Check, Hash, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Head, useForm, usePage } from "@inertiajs/react";

import FlashMessage from "@/components/flash-message";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// ... (definisi class CSS)

// Fungsi helper untuk menampilkan notifikasi
const pushToast = (detail: ToastDetail) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("app:toast", { detail }));
};

// Definisi langkah-langkah checkout
const steps: Step[] = [
    { label: "Keranjang", status: "complete" },
    { label: "Pengiriman", status: "current" },
    { label: "Pembayaran", status: "upcoming" },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?\d{8,15}$/;

export default function Checkout() {
    // SECTION: Mengambil data pengguna yang login dan menginisialisasi form.
    const { auth } = usePage().props as any;
    const user = auth?.user || {};

    // Logika untuk mem-parsing alamat yang sudah ada untuk mengisi form.
    const savedArea = (() => { /* ... */ })();
    const savedAddressLine = (() => { /* ... */ })();
    const savedPostal = (() => { /* ... */ })();

    const form = useForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        area: savedArea,
        postal_code: savedPostal,
        address_line: savedAddressLine,
    });

    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);

    // SECTION: Fungsi untuk mengambil kode pos secara otomatis berdasarkan area yang dipilih.
    const fetchPostal = async (area: string) => {
        form.setData("area", area);
        try {
            const res = await fetch(`/api/postal-code?city=denpasar&area=${encodeURIComponent(area)}`);
            if (res.ok) {
                const data = await res.json();
                if (data?.postal_code) {
                    form.setData("postal_code", String(data.postal_code));
                    pushToast({ type: "info", text: "Kode pos diperbarui otomatis sesuai area." });
                }
            }
        } catch (error) {
            // Biarkan kode pos yang ada jika request gagal
        }
    };

    // SECTION: Fungsi yang dijalankan saat form pengiriman disubmit.
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post("/checkout", {
            onSuccess: () => {
                pushToast({ type: "success", text: "Alamat pengiriman tersimpan. Lanjutkan pembayaran." });
            },
        });
    };

    // SECTION: Fungsi validasi saat input email atau telepon berubah.
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => { /* ... */ };
    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => { /* ... */ };

    // State untuk menampilkan notifikasi error jika form belum lengkap.
    const [showErrorToast, setShowErrorToast] = useState(false);
    const hasErrors = useMemo(() => Object.keys(form.errors).length > 0, [form.errors]);

    useEffect(() => {
        if (hasErrors) {
            setShowErrorToast(true);
            const timer = setTimeout(() => setShowErrorToast(false), 6000);
            return () => clearTimeout(timer);
        }
    }, [hasErrors]);

    // ... (definisi style untuk progress bar)

    return (
        <>
            <Navbar />
            <Head title="Checkout" />
            <FlashMessage />
            <main className="bg-slate-50">
                <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 pb-28 pt-28">
                    {/* SECTION: Menampilkan progress bar langkah checkout */}
                    <nav aria-label="Progress" className="...">
                        <ol className="...">
                            {steps.map((step, index) => (
                                <li key={step.label} className="...">
                                    {/* ... (Tampilan setiap langkah) */}
                                </li>
                            ))}
                        </ol>
                    </nav>

                    {/* SECTION: Form utama untuk detail pengiriman */}
                    <Card className="overflow-hidden rounded-3xl ...">
                        <CardHeader className="...">
                            <CardTitle>Detail Pengiriman</CardTitle>
                            <p>Pesananmu akan dikirim ke alamat ini dalam 1-2 hari kerja.</p>
                        </CardHeader>
                        <CardContent className="py-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    {/* Input Nama, Email, Telepon */}
                                    {/* ... */}

                                    {/* Dropdown pilihan Area (Denpasar) */}
                                    <div className="space-y-2">
                                        {/* ... */}
                                    </div>

                                    {/* Input Kode Pos (otomatis terisi) */}
                                    <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
                                        {/* ... */}
                                    </div>
                                </div>

                                {/* Input Alamat Lengkap */}
                                <div className="space-y-1.5">
                                    {/* ... */}
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                        Sebelumnya
                                    </Button>
                                    <Button type="submit" disabled={form.processing}>
                                        Lanjutkan Pembayaran
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Notifikasi error jika ada field yang belum diisi */}
            {showErrorToast && (
                <div className="fixed top-4 right-4 ...">
                    {/* ... */}
                </div>
            )}

            <Footer />
        </>
    );
}