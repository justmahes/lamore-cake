/**
 * Halaman ini digunakan ketika pengguna lupa kata sandi mereka.
 * Pengguna dapat memasukkan alamat email mereka untuk menerima tautan reset kata sandi.
 * Fitur utama:
 * - Menampilkan form untuk memasukkan alamat email.
 * - Mengirim permintaan ke server untuk mengirim email reset kata sandi.
 * - Menampilkan status (misalnya, jika email berhasil dikirim).
 * - Tautan untuk kembali ke halaman login.
 */

// Components
import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";

export default function ForgotPassword({ status }: { status?: string }) {
    // SECTION: Inisialisasi form untuk menampung alamat email pengguna.
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: "",
    });

    // SECTION: Fungsi yang dijalankan saat form disubmit.
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Mengirim alamat email ke server untuk proses reset password.
        post(route("password.email"));
    };

    return (
        <AuthLayout title="Lupa kata sandi" description="Masukkan email Anda untuk menerima tautan reset kata sandi">
            <Head title="Lupa kata sandi" />

            {/* Menampilkan pesan status jika ada (misal: email berhasil dikirim) */}
            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="space-y-6">
                {/* SECTION: Form untuk memasukkan email */}
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="email@contoh.com"
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Kirim tautan reset kata sandi
                        </Button>
                    </div>
                </form>

                {/* Tautan untuk kembali ke halaman login */}
                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Atau, kembali ke</span>
                    <TextLink href={route("login")}>masuk</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}