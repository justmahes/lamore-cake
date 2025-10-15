/**
 * Halaman ini berfungsi untuk mengatur tampilan aplikasi, seperti mode terang (light) atau gelap (dark).
 * Halaman ini merupakan bagian dari layout pengaturan yang lebih besar.
 * Fitur utama:
 * - Menampilkan judul dan deskripsi untuk pengaturan tampilan.
 * - Merender komponen `AppearanceTabs` yang berisi logika dan UI untuk mengubah tema.
 */
import { Head } from "@inertiajs/react";

import AppearanceTabs from "@/components/appearance-tabs";
import HeadingSmall from "@/components/heading-small";
import { type BreadcrumbItem } from "@/types";

import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Appearance settings",
        href: "/settings/appearance",
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            {/* SECTION: Menggunakan layout khusus untuk halaman pengaturan */}
            <SettingsLayout>
                <div className="space-y-6">
                    {/* Judul dan deskripsi halaman */}
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    
                    {/* SECTION: Komponen inti yang menangani pilihan tema (terang/gelap) */}
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}