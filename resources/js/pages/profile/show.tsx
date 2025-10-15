/**
 * Halaman ini menampilkan ringkasan profil pengguna yang sedang login.
 * Ini adalah halaman "lihat" (read-only) di mana pengguna dapat melihat data mereka.
 * Fitur utama:
 * - Menampilkan foto profil (avatar), nama, dan email pengguna.
 * - Menampilkan detail informasi pribadi seperti telepon, alamat, dan kode pos.
 * - Menyediakan tombol navigasi untuk:
 *   - Pindah ke halaman "Ubah Profil".
 *   - Pindah ke halaman "Ubah Password".
 *   - Melakukan logout.
 */
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FlashMessage from "@/components/flash-message";
import { Head, router, usePage } from "@inertiajs/react";
import { Hash, Mail, MapPin, Phone, UserRound } from "lucide-react";

import type { ComponentType } from "react";

// ... (Definisi tipe dan fungsi helper `asDisplay`)

export default function ProfileShow() {
    // SECTION: Mengambil data pengguna dari server.
    const { auth } = usePage().props as any;
    const user = auth?.user ?? {};

    // SECTION: Memformat data pengguna untuk ditampilkan, dengan fallback jika data kosong.
    const displayName = asDisplay(user.name);
    const email = asDisplay(user.email);
    const phone = asDisplay(user.phone);
    const address = asDisplay(user.address);
    const postalCode = asDisplay(user.postal_code);

    const avatarUrl = user?.avatar_url ?? user?.profile_photo_url ?? undefined;
    const avatarFallback = (user?.name && String(user.name).trim().charAt(0).toUpperCase()) || "U";

    // Array yang mendefinisikan detail profil untuk memudahkan rendering.
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
                    <Card className="relative overflow-hidden ...">
                        {/* Efek visual latar belakang */}
                        <div className="pointer-events-none absolute ..." />
                        
                        {/* SECTION: Header kartu profil, menampilkan avatar dan nama. */}
                        <CardHeader className="relative z-10 ...">
                            <div className="flex flex-col items-center ...">
                                <div className="relative">
                                    <div className="absolute inset-0 ..." />
                                    <Avatar className="relative size-24 ...">
                                        <AvatarImage src={avatarUrl} alt={displayName} />
                                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <span className="text-xs ...">Profil</span>
                                    <CardTitle className="mt-2 ...">{displayName}</CardTitle>
                                    <p className="mt-2 ...">Atur informasi akunmu...</p>
                                </div>
                            </div>
                        </CardHeader>

                        {/* SECTION: Konten kartu, menampilkan detail profil dan tombol aksi. */}
                        <CardContent className="relative z-10 ...">
                            {/* Menampilkan detail nama, email, telepon, dll. */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                {profileDetails.map(({ label, value, icon: Icon }) => (
                                    <div key={label} className="flex ...">
                                        {/* ... (Ikon dan teks detail) */}
                                    </div>
                                ))}
                            </div>
                            {/* Tombol-tombol navigasi */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Button asChild className="...">
                                    <a href="/profile/edit">Ubah Profil</a>
                                </Button>
                                <Button asChild variant="outline" className="...">
                                    <a href="/settings/password">Ubah Password</a>
                                </Button>
                                <Button type="button" variant="outline" onClick={() => router.post("/logout")} className="...">
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