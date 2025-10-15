/**
 * Halaman ini adalah bagian dari pengaturan akun, khusus untuk mengubah kata sandi.
 * Pengguna harus memasukkan kata sandi saat ini sebelum dapat mengatur kata sandi baru.
 * Fitur utama:
 * - Form untuk memasukkan kata sandi saat ini, kata sandi baru, dan konfirmasi kata sandi baru.
 * - Menangani pengiriman data ke server untuk validasi dan pembaruan.
 * - Menampilkan pesan error jika validasi gagal (misal: kata sandi saat ini salah).
 * - Menampilkan pesan "Tersimpan" sesaat setelah kata sandi berhasil diubah.
 */
import InputError from "@/components/input-error";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { type BreadcrumbItem } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

import HeadingSmall from "@/components/heading-small";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Pengaturan kata sandi",
        href: "/settings/password",
    },
];

export default function Password() {
    // SECTION: Refs untuk mengarahkan fokus ke input jika terjadi error.
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    // SECTION: Inisialisasi form untuk data perubahan kata sandi.
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    // SECTION: Fungsi yang dijalankan saat form disubmit.
    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        // Mengirim data ke server untuk memperbarui kata sandi.
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(), // Reset form setelah berhasil
            onError: (errors) => {
                // Fokus ke input yang relevan jika ada error
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan kata sandi" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Perbarui kata sandi" description="Pastikan akun Anda menggunakan kata sandi yang panjang dan acak untuk tetap aman" />

                    {/* SECTION: Form untuk mengubah kata sandi */}
                    <form onSubmit={updatePassword} className="space-y-6">
                        {/* Input Kata Sandi Saat Ini */}
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">Kata sandi saat ini</Label>
                            <Input id="current_password" ref={currentPasswordInput} type="password" ... />
                            <InputError message={errors.current_password} />
                        </div>

                        {/* Input Kata Sandi Baru */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Kata sandi baru</Label>
                            <Input id="password" ref={passwordInput} type="password" ... />
                            <InputError message={errors.password} />
                        </div>

                        {/* Input Konfirmasi Kata Sandi Baru */}
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Konfirmasi kata sandi</Label>
                            <Input id="password_confirmation" type="password" ... />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Simpan kata sandi</Button>

                            {/* Pesan konfirmasi yang muncul sesaat setelah berhasil */}
                            <Transition show={recentlySuccessful} ...>
                                <p className="text-sm text-neutral-600">Tersimpan</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}