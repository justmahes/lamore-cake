import { type PropsWithChildren } from "react";
import AppLogoIcon from "@/components/app-logo-icon";
import AppLogo from "@/components/app-logo";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";

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

            <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col items-center justify-center p-6 md:flex-row md:gap-10 md:p-10">
                {/* Left panel (branding) */}
                <div className="relative hidden w-[50%] flex-1 flex-col justify-center md:flex">
                    <div className="mb-6 flex items-center gap-3">
                        <img src="/assets/brand/logo.png" alt="Lamore Cake" className="h-14 w-auto md:h-16" />
                        <div className="sr-only">
                            <AppLogo />
                        </div>
                    </div>

                    <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                        Selamat datang kembali ke Lamore Cake
                    </h2>
                    <p className="mt-3 max-w-md text-balance text-muted-foreground">
                        Nikmati pengalaman berbelanja kue yang mulus, cepat, dan menyenangkan. Masuk untuk melanjutkan pesanan Anda atau buat akun baru.
                    </p>

                    <div className="relative mt-10 overflow-hidden rounded-xl border shadow-sm">
                        <PlaceholderPattern className="h-40 w-full text-rose-400/20 dark:text-rose-500/10" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/70 via-transparent to-white/30 dark:from-[#0B0B0C]/50 dark:via-transparent dark:to-[#0B0B0C]/40" />
                    </div>
                </div>

                {/* Right panel (auth card) */}
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="mb-4 flex items-center justify-center md:hidden">
                        <img src="/assets/brand/logo.png" alt="Lamore Cake" className="h-10 w-auto" />
                    </div>
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
