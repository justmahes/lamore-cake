/**
 * Halaman ini berfungsi sebagai form pendaftaran untuk pengguna baru.
 * Pengguna memasukkan nama, email, dan kata sandi untuk membuat akun baru.
 * Fitur utama:
 * - Form input untuk nama, email, kata sandi, dan konfirmasi kata sandi.
 * - Tombol untuk menampilkan/menyembunyikan kata sandi dan konfirmasinya.
 * - Indikator kekuatan kata sandi untuk membantu pengguna membuat kata sandi yang aman.
 * - Validasi sederhana di sisi klien untuk format email dan kecocokan kata sandi.
 * - Menangani proses pendaftaran dengan mengirim data ke server.
 * - Tautan untuk beralih ke halaman login jika pengguna sudah memiliki akun.
 */
import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { FormEventHandler, useMemo, useState } from "react";

import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    // SECTION: Inisialisasi form untuk data pendaftaran.
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // State untuk mengatur visibilitas kata sandi.
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    // Validasi format email di sisi klien.
    const isEmailValid = useMemo(() => {
        if (!data.email) return undefined;
        const pattern = /.+@.+\..+/i;
        return pattern.test(data.email);
    }, [data.email]);

    // SECTION: Logika untuk menghitung dan menampilkan kekuatan kata sandi.
    const passwordStrength = useMemo(() => {
        const pwd = data.password || "";
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        return Math.min(3, Math.floor(score / 2));
    }, [data.password]);

    // SECTION: Fungsi yang dijalankan saat form pendaftaran disubmit.
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Mengirim data pendaftaran ke server.
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthLayout title="Buat akun" description="Masukkan detail Anda di bawah untuk membuat akun">
            <Head title="Daftar" />
            {/* SECTION: Form pendaftaran utama */}
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    {/* Input Nama */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <div className="relative">
                            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                disabled={processing}
                                placeholder="Nama lengkap"
                                className="pl-9"
                            />
                        </div>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Input Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                disabled={processing}
                                placeholder="email@contoh.com"
                                aria-invalid={errors.email ? true : undefined}
                                className="pl-9"
                            />
                        </div>
                        {isEmailValid === false && (
                            <div className="text-xs text-amber-600">Format email tampak tidak valid.</div>
                        )}
                        <InputError message={errors.email} />
                    </div>

                    {/* Input Kata Sandi */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Kata Sandi</Label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                disabled={processing}
                                placeholder="Kata Sandi"
                                aria-invalid={errors.password ? true : undefined}
                                className="pl-9 pr-9"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition hover:bg-muted/40"
                                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                        {/* Indikator kekuatan kata sandi */}
                        {data.password && (
                            <div className="flex items-center gap-2">
                                <div className="h-1 w-full overflow-hidden rounded bg-muted">
                                    <div
                                        className={
                                            "h-full transition-all " +
                                            (passwordStrength === 0
                                                ? "w-1/4 bg-red-500"
                                                : passwordStrength === 1
                                                ? "w-2/4 bg-amber-500"
                                                : passwordStrength === 2
                                                ? "w-3/4 bg-lime-500"
                                                : "w-full bg-emerald-500")
                                        }
                                    />
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {passwordStrength === 0
                                        ? "Lemah"
                                        : passwordStrength === 1
                                        ? "Sedang"
                                        : passwordStrength === 2
                                        ? "Baik"
                                        : "Kuat"}
                                </span>
                            </div>
                        )}
                        <InputError message={errors.password} />
                    </div>

                    {/* Input Konfirmasi Kata Sandi */}
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi kata sandi</Label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="password_confirmation"
                                type={showPasswordConfirm ? "text" : "password"}
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                disabled={processing}
                                placeholder="Konfirmasi kata sandi"
                                className="pl-9 pr-9"
                                aria-invalid={errors.password_confirmation ? true : undefined}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordConfirm((s) => !s)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition hover:bg-muted/40"
                                aria-label={showPasswordConfirm ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                                tabIndex={-1}
                            >
                                {showPasswordConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                        {data.password_confirmation && data.password_confirmation !== data.password && (
                            <div className="text-xs text-amber-600">Kata sandi tidak cocok.</div>
                        )}
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing} aria-busy={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Buat akun
                    </Button>
                </div>

                {/* Tautan untuk beralih ke halaman login */}
                <div className="text-center text-sm text-muted-foreground">
                    Sudah punya akun?{" "}
                    <TextLink href={route("login")} tabIndex={6}>
                        Masuk
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}