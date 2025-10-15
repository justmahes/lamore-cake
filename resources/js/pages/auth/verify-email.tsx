/**
 * Halaman ini ditampilkan kepada pengguna setelah mereka mendaftar, 
 * meminta mereka untuk memverifikasi alamat email mereka dengan mengklik tautan yang dikirimkan.
 * Fitur utama:
 * - Menampilkan pesan instruksi untuk memeriksa email.
 * - Menyediakan tombol untuk mengirim ulang email verifikasi jika pengguna tidak menerimanya.
 * - Menampilkan pesan status jika email verifikasi baru telah berhasil dikirim.
 * - Menyediakan tautan untuk logout.
 */

// Components
import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth-layout";

export default function VerifyEmail({ status }: { status?: string }) {
    // SECTION: Inisialisasi form untuk mengirim permintaan pengiriman ulang email.
    const { post, processing } = useForm({});

    // SECTION: Fungsi yang dijalankan saat tombol "Resend verification email" diklik.
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Mengirim permintaan ke server untuk mengirim ulang email verifikasi.
        post(route("verification.send"));
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {/* SECTION: Menampilkan pesan konfirmasi jika email verifikasi baru telah dikirim. */}
            {status === "verification-link-sent" && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                {/* Tombol untuk mengirim ulang email verifikasi */}
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Resend verification email
                </Button>

                {/* Tautan untuk logout dari sesi saat ini */}
                <TextLink href={route("logout")} method="post" className="mx-auto block text-sm">
                    Log out
                </TextLink>
            </form>
        </AuthLayout>
    );
}