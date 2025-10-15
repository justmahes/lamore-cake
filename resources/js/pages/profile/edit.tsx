/**
 * Halaman ini memungkinkan pengguna untuk mengedit profil mereka.
 * Terdiri dari tiga bagian utama: informasi profil, ubah kata sandi, dan hapus akun.
 * Fitur utama:
 * - Form untuk memperbarui informasi pribadi (nama, email, telepon, alamat).
 * - Form terpisah untuk mengubah kata sandi, yang memerlukan kata sandi saat ini.
 * - Bagian untuk menghapus akun, yang memerlukan konfirmasi kata sandi dalam sebuah dialog.
 * - Menampilkan notifikasi (toast) setelah aksi berhasil (misal: profil diperbarui).
 */
import { FormEvent, type RefObject, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Head, useForm, usePage } from "@inertiajs/react";

import FlashMessage from "@/components/flash-message";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash, KeyRound, Lock, Mail, MapPin, Phone, ShieldAlert, Trash2, UserRound } from "lucide-react";

// ... (Definisi class CSS dan fungsi helper)

export default function ProfileEdit() {
    // SECTION: Mengambil data pengguna dan menginisialisasi tiga form terpisah.
    const { auth } = usePage().props as any;
    const user = auth?.user || {};

    // Form untuk data profil
    const profileForm = useForm({ /* ... */ });
    // Form untuk mengubah kata sandi
    const passwordForm = useForm({ /* ... */ });
    // Form untuk menghapus akun
    const deleteForm = useForm({ password: "" });

    // Refs untuk fokus input dan state untuk dialog hapus akun.
    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const deletePasswordRef = useRef<HTMLInputElement>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // ... (Definisi array untuk field form agar mudah di-render)

    // SECTION: Fungsi handler untuk submit setiap form.
    const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        profileForm.patch(route("profile.update"), { /* ... */ });
    };

    const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        passwordForm.put(route("password.update"), { /* ... */ });
    };

    const handleDeleteAccount = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        deleteForm.delete(route("profile.destroy"), { /* ... */ });
    };

    const closeDeleteDialog = () => { /* ... */ };

    return (
        <>
            <Navbar />
            <Head title="Ubah Profil" />
            <FlashMessage />
            <main className="bg-slate-50">
                <div className="container mx-auto ...">
                    <div className="space-y-8">
                        {/* SECTION: Kartu dan Form untuk Informasi Profil */}
                        <Card className="...">
                            <CardHeader className="...">
                                <CardTitle>Informasi Profil</CardTitle>
                                <p>Perbarui data pribadi kamu...</p>
                            </CardHeader>
                            <CardContent className="...">
                                <form onSubmit={handleProfileSubmit} className="...">
                                    {/* ... (Render input fields profil) */}
                                    <Button type="submit" disabled={profileForm.processing}>Simpan Profil</Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* SECTION: Kartu dan Form untuk Ubah Kata Sandi */}
                        <Card className="...">
                            <CardHeader className="...">
                                <CardTitle>Ubah Kata Sandi</CardTitle>
                                <p>Pastikan kata sandi baru kamu kuat...</p>
                            </CardHeader>
                            <CardContent className="...">
                                <form onSubmit={handlePasswordSubmit} className="...">
                                    {/* ... (Render input fields kata sandi) */}
                                    <Button type="submit" disabled={passwordForm.processing}>Simpan Kata Sandi</Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* SECTION: Kartu untuk Hapus Akun */}
                        <Card className="border-red-100 ...">
                            <CardHeader className="...">
                                <CardTitle className="text-red-600">Hapus Akun</CardTitle>
                                {/* ... (Peringatan) */}
                            </CardHeader>
                            <CardContent className="...">
                                <p>Setelah akun dihapus, kamu tidak dapat mengembalikan data...</p>
                                <Button type="button" onClick={() => setIsDeleteDialogOpen(true)} className="bg-red-500 ...">
                                    Hapus Akun Saya
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            {/* SECTION: Dialog konfirmasi untuk hapus akun */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => !open && closeDeleteDialog()}>
                <DialogContent className="...">
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Konfirmasi Penghapusan Akun</DialogTitle>
                        <DialogDescription>Masukkan kata sandi untuk mengonfirmasi.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleDeleteAccount} className="...">
                        {/* ... (Input kata sandi untuk konfirmasi) */}
                        <DialogFooter className="...">
                            <Button type="button" variant="outline" onClick={closeDeleteDialog}>Batal</Button>
                            <Button type="submit" variant="destructive" disabled={deleteForm.processing}>Hapus Akun Permanen</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Footer />
        </>
    );
}