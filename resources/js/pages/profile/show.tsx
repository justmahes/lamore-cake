import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FlashMessage from "@/components/flash-message";
import { Head, router, usePage } from "@inertiajs/react";
import { Hash, Mail, MapPin, Phone, UserRound } from "lucide-react";

import type { ComponentType } from "react";

type DetailField = {
    label: string;
    value: string;
    icon: ComponentType<{ className?: string }>;
};

const asDisplay = (value?: string | null) => {
    if (!value) return "Belum diisi";
    const trimmed = value.trim();
    return trimmed.length ? trimmed : "Belum diisi";
};

export default function ProfileShow() {
    const { auth } = usePage().props as any;
    const user = auth?.user ?? {};

    const displayName = asDisplay(user.name);
    const email = asDisplay(user.email);
    const phone = asDisplay(user.phone);
    const address = asDisplay(user.address);
    const postalCode = asDisplay(user.postal_code);

    const avatarUrl = user?.avatar_url ?? user?.profile_photo_url ?? undefined;
    const avatarFallback = (user?.name && String(user.name).trim().charAt(0).toUpperCase()) || "U";

    const profileDetails: DetailField[] = [
        { label: "Nama", value: displayName, icon: UserRound },
        { label: "Email", value: email, icon: Mail },
        { label: "Telepon", value: phone, icon: Phone },
        { label: "Alamat", value: address, icon: MapPin },
        { label: "Kode Pos", value: postalCode, icon: Hash },
    ];

    return (
        <>
            <Navbar />
            <Head title="Profil" />
            <FlashMessage />
            <main className="bg-slate-50">
                <div className="container mx-auto max-w-4xl px-4 pb-24 pt-24">
                    <Card className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/90 shadow-xl shadow-emerald-100/60">
                        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[110%] -translate-x-1/2 rounded-[3rem] bg-gradient-to-r from-emerald-300/30 via-emerald-400/20 to-emerald-300/30 blur-3xl" />
                        <CardHeader className="relative z-10 flex flex-col items-center gap-6 border-b border-emerald-50 pb-10 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-xl" />
                                    <Avatar className="relative size-24 border-4 border-white bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-400/40">
                                        <AvatarImage src={avatarUrl} alt={displayName} className="object-cover" />
                                        <AvatarFallback className="text-2xl font-semibold text-emerald-600">
                                            {avatarFallback}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-500">Profil</span>
                                    <CardTitle className="mt-2 text-3xl font-bold text-slate-900">{displayName}</CardTitle>
                                    <p className="mt-2 max-w-md text-sm text-slate-500">
                                        Atur informasi akunmu agar proses pemesanan Lamore Cake semakin mudah.
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10 space-y-8 px-6 py-8">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {profileDetails.map(({ label, value, icon: Icon }) => (
                                    <div
                                        key={label}
                                        className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-sm shadow-emerald-100/40"
                                    >
                                        <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                                            <p className="text-sm font-semibold text-slate-900">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Button
                                    asChild
                                    className="rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition-transform duration-150 hover:scale-[1.01] hover:shadow-emerald-500/60"
                                >
                                    <a href="/profile/edit">Ubah Profil</a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-full border border-emerald-200 px-6 py-2 text-sm font-semibold text-emerald-600 transition-transform duration-150 hover:scale-[1.01] hover:bg-emerald-50"
                                >
                                    <a href="/settings/password">Ubah Password</a>
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.post("/logout")}
                                    className="rounded-full border border-red-200 px-6 py-2 text-sm font-semibold text-red-500 transition-transform duration-150 hover:scale-[1.01] hover:bg-red-50"
                                >
                                    Logout
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </>
    );
}
