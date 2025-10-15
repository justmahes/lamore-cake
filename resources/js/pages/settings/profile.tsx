/**
 * Halaman ini adalah bagian dari pengaturan akun, khusus untuk mengedit informasi profil pengguna.
 * Fitur utama:
 * - Form untuk memperbarui nama, email, telepon, alamat, dan kode pos.
 * - Mengisi form secara otomatis dengan data pengguna yang sudah ada.
 * - Fitur untuk mengambil kode pos secara otomatis berdasarkan alamat yang dimasukkan.
 * - Menampilkan notifikasi jika email pengguna belum diverifikasi, dengan opsi untuk mengirim ulang email verifikasi.
 * - Menampilkan pesan "Tersimpan" sesaat setelah profil berhasil diperbarui.
 * - Menyertakan komponen `DeleteUser` untuk fungsionalitas hapus akun.
 */
import { type BreadcrumbItem, type SharedData } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState, useCallback } from "react";

import DeleteUser from "@/components/delete-user";
import HeadingSmall from "@/components/heading-small";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";

// ... (Definisi breadcrumbs dan tipe ProfileForm)

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string; }) {
    // SECTION: Mengambil data otentikasi dan menginisialisasi form dengan data pengguna.
    const { auth } = usePage<SharedData>().props;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone,
        address: auth.user.address,
        postal_code: auth.user.postal_code || "",
    });

    const [isAutoFetching, setIsAutoFetching] = useState(false);

    // SECTION: Fungsi untuk mengambil data kode pos dari API eksternal secara otomatis.
    const fetchPostalCode = useCallback(async (cityName: string) => {
        // ... (Logika fetch API)
    }, [setData]);

    // SECTION: Efek untuk memicu pengambilan kode pos saat pengguna selesai mengetik alamat.
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (data.address) {
                const cityMatch = data.address.match(/([a-zA-Z\s]+)/);
                if (cityMatch) {
                    fetchPostalCode(cityMatch[1].trim());
                }
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [data.address, fetchPostalCode]);

    // SECTION: Fungsi yang dijalankan saat form profil disubmit.
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan profil" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Informasi profil" description="Perbarui nama dan alamat email Anda" />

                    {/* SECTION: Form untuk mengedit profil pengguna */}
                    <form onSubmit={submit} className="space-y-6">
                        {/* Input Nama, Email, Telepon, Alamat, Kode Pos */}
                        {/* ... */}

                        {/* SECTION: Notifikasi jika email belum diverifikasi */}
                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    Alamat email Anda belum diverifikasi.{" "}
                                    <Link href={route("verification.send")} method="post" as="button" className="...">
                                        Klik di sini untuk mengirim ulang email verifikasi.
                                    </Link>
                                </p>
                                {status === "verification-link-sent" && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Tautan verifikasi baru telah dikirim ke alamat email Anda.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing} className="cursor-pointer">Simpan</Button>
                            {/* Pesan konfirmasi "Tersimpan" */}
                            <Transition show={recentlySuccessful} ...>
                                <p className="text-sm text-neutral-600">Tersimpan</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                {/* SECTION: Komponen terpisah untuk fungsionalitas hapus akun */}
                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}