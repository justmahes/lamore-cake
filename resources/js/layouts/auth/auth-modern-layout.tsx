import { type PropsWithChildren } from "react";

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthModernLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative min-h-svh w-full overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-[#0B0B0C] dark:via-[#0B0B0C] dark:to-[#0B0B0C]">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -left-16 -top-16 size-72 rounded-full bg-rose-200/60 blur-3xl dark:bg-rose-500/20" />
            <div className="pointer-events-none absolute -right-16 -bottom-16 size-72 rounded-full bg-pink-200/60 blur-3xl dark:bg-pink-500/20" />

            <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col items-center justify-center gap-10 p-6 md:flex-row md:gap-16 md:p-10">
                {/* Left panel (branding) */}
                <div className="relative flex w-full flex-1 flex-col items-center text-center md:w-[50%] md:items-start md:text-left">
                    <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                        Selamat datang kembali ke Lamore Cake
                    </h2>
                    <p className="mt-3 max-w-md text-balance text-muted-foreground">
                        Nikmati pengalaman berbelanja kue yang mulus, cepat, dan menyenangkan. Masuk untuk melanjutkan pesanan Anda atau buat akun baru.
                    </p>

                    <div className="mt-10 w-full max-w-md grid gap-4 rounded-xl border border-rose-200/60 bg-white/70 p-6 text-left shadow-sm backdrop-blur-sm dark:border-rose-500/20 dark:bg-white/5">
                        <div className="flex items-center gap-3 text-sm font-medium text-rose-500 dark:text-rose-300">
                            <img src="/assets/brand/logo.png" alt="Lamore Cake" className="h-12 w-auto object-contain" />
                            Nikmati layanan personal dari Lamore Cake
                        </div>
                        <ul className="grid list-disc gap-2 pl-5 text-sm text-muted-foreground">
                            <li>Kelola pesanan dan pantau status pengiriman dengan mudah.</li>
                            <li>Simpan alamat favorit untuk checkout lebih cepat.</li>
                            <li>Dapatkan penawaran spesial dan rekomendasi rasa terbaru.</li>
                        </ul>
                    </div>
                </div>

                {/* Right panel (auth card) */}
                <div className="w-full max-w-md">
                    <div className="bg-card relative rounded-2xl border shadow-md shadow-rose-400/5 transition-shadow duration-300 hover:shadow-rose-400/10">
                        <div className="px-6 pb-2 pt-6 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                        </div>
                        <div className="px-6 pb-6">{children}</div>
                    </div>

                    <p className="mt-6 text-center text-xs text-muted-foreground">
                        Dengan melanjutkan, Anda menyetujui Kebijakan Privasi dan Ketentuan Layanan kami.
                    </p>
                </div>
            </div>
        </div>
    );
}
