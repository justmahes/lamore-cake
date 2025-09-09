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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Pengaturan profil",
        href: "/settings/profile",
    },
];

type ProfileForm = {
    name: string;
    email: string;
    phone: any;
    address: any;
    postal_code: any;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string; }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone,
        address: auth.user.address,
        postal_code: auth.user.postal_code || "",
    });

    const [isAutoFetching, setIsAutoFetching] = useState(false);

    const fetchPostalCode = useCallback(async (cityName: string) => {
        if (!cityName || cityName.length < 3) return;
        
        try {
            setIsAutoFetching(true);
            const response = await fetch(`https://kodepos.vercel.app/search/?q=${encodeURIComponent(cityName)}`);
            const result = await response.json();
            
            if (result.statusCode === 200 && result.data && result.data.length > 0) {
                const firstResult = result.data[0];
                setData("postal_code", firstResult.code.toString());
            }
        } catch (error) {
            console.error("Failed to fetch postal code:", error);
        } finally {
            setIsAutoFetching(false);
        }
    }, [setData]);

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

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Nama lengkap"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Alamat email</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Alamat email"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="text">Nomor Telepon</Label>

                            <Input
                                name="phone"
                                required
                                id="phone"
                                type="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                                placeholder="Nomor Telepon"
                            />

                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="text">Alamat</Label>

                            <Input
                                name="address"
                                required
                                id="address"
                                type="address"
                                className="mt-1 block w-full"
                                value={data.address}
                                onChange={(e) => setData("address", e.target.value)}
                                placeholder="Alamat"
                            />

                            <InputError className="mt-2" message={errors.address} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="postal_code">
                                Kode Pos 
                                {isAutoFetching && <span className="text-sm text-muted-foreground ml-2">(mencari...)</span>}
                            </Label>

                            <Input
                                name="postal_code"
                                id="postal_code"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.postal_code}
                                onChange={(e) => setData("postal_code", e.target.value)}
                                placeholder="Kode pos akan terisi otomatis"
                            />

                            <InputError className="mt-2" message={errors.postal_code} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    Alamat email Anda belum diverifikasi.{" "}
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
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

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Tersimpan</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
