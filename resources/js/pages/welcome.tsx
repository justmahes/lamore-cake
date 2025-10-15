/**
 * Halaman ini adalah halaman selamat datang default dari framework Laravel.
 * Fungsinya adalah sebagai halaman awal (landing page) setelah instalasi baru.
 * Fitur utama:
 * - Menampilkan logo Laravel dan beberapa tautan sumber daya.
 * - Memberikan tombol navigasi yang berbeda tergantung pada status login pengguna:
 *   - Jika pengguna sudah login, akan ada tombol "Belanja Sekarang" yang mengarah ke halaman produk.
 *   - Jika belum login, akan ada tombol "Log in" dan "Register".
 */
import { type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Welcome() {
    // SECTION: Mengambil data otentikasi untuk menentukan tombol yang akan ditampilkan.
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                {/* Memuat font kustom dari Google Fonts */}
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center ...">
                <header className="mb-6 w-full ...">
                    {/* SECTION: Navigasi di header */}
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            // Tombol jika pengguna sudah login
                            <Link href="/products" className="...">
                                Belanja Sekarang
                            </Link>
                        ) : (
                            // Tombol jika pengguna belum login
                            <>
                                <Link href={route("login")} className="...">
                                    Log in
                                </Link>
                                <Link href={route("register")} className="...">
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center ...">
                    {/* SECTION: Konten utama halaman selamat datang */}
                    <main className="flex w-full ...">
                        <div className="flex-1 ...">
                            <h1 className="mb-1 font-medium">Let's get started</h1>
                            <p className="mb-2 ...">
                                Laravel has an incredibly rich ecosystem.
                                <br />
                                We suggest starting with the following.
                            </p>
                            {/* Tautan ke dokumentasi dan sumber daya Laravel */}
                            <ul className="mb-4 flex flex-col lg:mb-6">
                                {/* ... */}
                            </ul>
                            <ul className="flex gap-3 text-sm leading-normal">
                                <li>
                                    <a href="https://cloud.laravel.com" target="_blank" className="...">
                                        Deploy now
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* SECTION: Bagian visual dengan logo Laravel */}
                        <div className="relative ...">
                            {/* SVG Logo Laravel */}
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}