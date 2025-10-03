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

const inputBaseClass =
    "h-12 w-full rounded-2xl border border-emerald-100 bg-white/95 pl-11 pr-4 text-sm font-medium text-slate-900 shadow-inner shadow-emerald-50 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-70";

const iconWrapperClass =
    "pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-emerald-500";

type ToastDetail = {
    type: "success" | "error" | "warning" | "info";
    text: string;
    duration?: number;
    id?: string;
    replace?: boolean;
};

const pushToast = (detail: ToastDetail) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("app:toast", { detail }));
};

export default function ProfileEdit() {
    const { auth } = usePage().props as any;
    const user = auth?.user || {};

    const profileForm = useForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        postal_code: user.postal_code || "",
    });

    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const deleteForm = useForm({
        password: "",
    });

    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const deletePasswordRef = useRef<HTMLInputElement>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const profileFields: Array<{
        id: keyof typeof profileForm.data;
        label: string;
        type: string;
        icon: LucideIcon;
        autoComplete?: string;
        required?: boolean;
    }> = [
        { id: "name", label: "Nama", type: "text", icon: UserRound, autoComplete: "name", required: true },
        { id: "email", label: "Email", type: "email", icon: Mail, autoComplete: "email", required: true },
        { id: "phone", label: "Nomor Telepon", type: "tel", icon: Phone, autoComplete: "tel", required: true },
        { id: "address", label: "Alamat", type: "text", icon: MapPin, autoComplete: "street-address", required: true },
        { id: "postal_code", label: "Kode Pos", type: "text", icon: Hash, autoComplete: "postal-code", required: true },
    ];

    const passwordFields: Array<{
        id: keyof typeof passwordForm.data;
        label: string;
        type: string;
        icon: LucideIcon;
        autoComplete?: string;
        required?: boolean;
        ref?: RefObject<HTMLInputElement>;
    }> = [
        {
            id: "current_password",
            label: "Kata Sandi Saat Ini",
            type: "password",
            icon: Lock,
            autoComplete: "current-password",
            required: true,
            ref: currentPasswordRef,
        },
        {
            id: "password",
            label: "Kata Sandi Baru",
            type: "password",
            icon: KeyRound,
            autoComplete: "new-password",
            required: true,
            ref: newPasswordRef,
        },
        {
            id: "password_confirmation",
            label: "Konfirmasi Kata Sandi",
            type: "password",
            icon: KeyRound,
            autoComplete: "new-password",
            required: true,
        },
    ];

    const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        profileForm.patch(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => {
                pushToast({ type: "success", text: "Profil berhasil diperbarui." });
            },
        });
    };

    const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        passwordForm.put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => {
                pushToast({ type: "success", text: "Kata sandi berhasil diperbarui." });
                passwordForm.reset();
            },
            onError: (errors) => {
                if (errors.password) {
                    passwordForm.reset("password", "password_confirmation");
                    newPasswordRef.current?.focus();
                }
                if (errors.current_password) {
                    passwordForm.reset("current_password");
                    currentPasswordRef.current?.focus();
                }
            },
        });
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        deleteForm.reset();
        deleteForm.clearErrors();
    };

    const handleDeleteAccount = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        deleteForm.delete(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => {
                pushToast({ type: "warning", text: "Akun kamu berhasil dijadwalkan untuk dihapus." });
                closeDeleteDialog();
            },
            onError: () => deletePasswordRef.current?.focus(),
            onFinish: () => deleteForm.reset("password"),
        });
    };

    return (
        <>
            <Navbar />
            <Head title="Ubah Profil" />
            <FlashMessage />
            <main className="bg-slate-50">
                <div className="container mx-auto max-w-4xl px-4 pb-24 pt-24">
                    <div className="space-y-8">
                        <Card className="overflow-hidden rounded-3xl border border-emerald-100 bg-white/95 shadow-xl shadow-emerald-100/60">
                            <CardHeader className="border-b border-emerald-50 pb-6">
                                <CardTitle className="text-2xl font-bold text-slate-900">Informasi Profil</CardTitle>
                                <p className="text-sm text-slate-500">
                                    Perbarui data pribadi kamu untuk mempercepat proses pemesanan Lamore Cake.
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-6 py-6">
                                <form onSubmit={handleProfileSubmit} className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        {profileFields.map(({ id, label, type, icon: Icon, autoComplete, required }) => (
                                            <div key={id} className="space-y-1.5">
                                                <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                                                    {label}
                                                </Label>
                                                <div className="relative">
                                                    <span className={iconWrapperClass}>
                                                        <Icon className="h-4 w-4" />
                                                    </span>
                                                    <Input
                                                        id={id}
                                                        type={type}
                                                        autoComplete={autoComplete}
                                                        required={required}
                                                        value={profileForm.data[id]}
                                                        onChange={(event) => profileForm.setData(id, event.target.value)}
                                                        className={inputBaseClass}
                                                    />
                                                </div>
                                                <InputError message={profileForm.errors[id]} />
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={profileForm.processing}
                                        className="w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition-transform duration-150 hover:scale-[1.01] hover:shadow-emerald-500/60"
                                    >
                                        Simpan Profil
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden rounded-3xl border border-emerald-100 bg-white/95 shadow-xl shadow-emerald-100/60">
                            <CardHeader className="border-b border-emerald-50 pb-6">
                                <CardTitle className="text-2xl font-bold text-slate-900">Ubah Kata Sandi</CardTitle>
                                <p className="text-sm text-slate-500">Pastikan kata sandi baru kamu kuat dan mudah diingat.</p>
                            </CardHeader>
                            <CardContent className="space-y-6 py-6">
                                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        {passwordFields.map(({ id, label, type, icon: Icon, autoComplete, required, ref }) => (
                                            <div key={id} className="space-y-1.5 sm:col-span-2">
                                                <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                                                    {label}
                                                </Label>
                                                <div className="relative">
                                                    <span className={iconWrapperClass}>
                                                        <Icon className="h-4 w-4" />
                                                    </span>
                                                    <Input
                                                        id={id}
                                                        type={type}
                                                        autoComplete={autoComplete}
                                                        required={required}
                                                        ref={ref}
                                                        value={passwordForm.data[id]}
                                                        onChange={(event) => passwordForm.setData(id, event.target.value)}
                                                        className={inputBaseClass}
                                                    />
                                                </div>
                                                <InputError message={passwordForm.errors[id]} />
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={passwordForm.processing}
                                        className="w-full rounded-full bg-emerald-500 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 transition-transform duration-150 hover:scale-[1.01] hover:bg-emerald-600"
                                    >
                                        Simpan Kata Sandi
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden rounded-3xl border border-red-100 bg-white/95 shadow-xl shadow-red-100/50">
                            <CardHeader className="flex flex-col gap-2 border-b border-red-50 pb-6">
                                <CardTitle className="text-2xl font-bold text-red-600">Hapus Akun</CardTitle>
                                <div className="flex items-start gap-3 rounded-2xl bg-red-50/70 p-4 text-sm text-red-600">
                                    <ShieldAlert className="mt-1 h-5 w-5" />
                                    <div>
                                        <p className="font-semibold">Tindakan permanen</p>
                                        <p>Semua data dan riwayat pesanan akan dihapus. Pastikan tidak ada pesanan aktif sebelum melanjutkan.</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 py-6">
                                <p className="text-sm text-slate-500">
                                    Setelah akun dihapus, kamu tidak dapat mengembalikan data yang telah hilang. Kami sarankan untuk menyelesaikan pembayaran atau pesanan yang masih berlangsung dahulu.
                                </p>
                                <Button
                                    type="button"
                                    onClick={() => setIsDeleteDialogOpen(true)}
                                    className="w-full rounded-full bg-red-500 py-3 text-sm font-semibold text-white shadow-md shadow-red-500/30 transition-transform duration-150 hover:scale-[1.01] hover:bg-red-600"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                                    Hapus Akun Saya
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => (open ? setIsDeleteDialogOpen(true) : closeDeleteDialog())}>
                <DialogContent className="rounded-3xl border border-red-100">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-red-600">Konfirmasi Penghapusan Akun</DialogTitle>
                        <DialogDescription className="text-sm text-slate-500">
                            Setelah akun dihapus, seluruh data kamu akan hilang permanen. Masukkan kata sandi untuk mengonfirmasi.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleDeleteAccount} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="delete_password" className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                                Kata Sandi
                            </Label>
                            <div className="relative">
                                <span className={iconWrapperClass}>
                                    <Lock className="h-4 w-4" />
                                </span>
                                <Input
                                    id="delete_password"
                                    type="password"
                                    ref={deletePasswordRef}
                                    value={deleteForm.data.password}
                                    onChange={(event) => deleteForm.setData("password", event.target.value)}
                                    autoComplete="current-password"
                                    required
                                    className={inputBaseClass}
                                />
                            </div>
                            <InputError message={deleteForm.errors.password} />
                        </div>
                        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDeleteDialog}
                                className="w-full rounded-full border border-slate-200 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={deleteForm.processing}
                                className="w-full rounded-full bg-red-500 py-2 text-sm font-semibold text-white shadow-md shadow-red-500/30 transition-transform duration-150 hover:scale-[1.01] hover:bg-red-600"
                            >
                                Hapus Akun Permanen
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Footer />
        </>
    );
}
