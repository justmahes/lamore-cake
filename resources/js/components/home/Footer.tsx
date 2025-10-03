import { Reveal } from "./Reveal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Instagram, Phone, Mail, MapPin, ArrowUpRight, Facebook, Globe } from "lucide-react";

const socialLinks = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/la.morecake/",
        icon: Instagram,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/lamorecake",
        icon: Facebook,
    },
    {
        label: "Website",
        href: "https://lamorecake.id",
        icon: Globe,
    },
];

export const Footer = () => {
    return (
        <footer className="relative mt-24 bg-gradient-to-br from-emerald-100 via-white to-emerald-200">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(110,231,183,0.45),_transparent_55%)]" aria-hidden="true" />
            <div className="container mx-auto grid gap-y-14 gap-x-16 px-4 py-20 lg:grid-cols-12">
                <Reveal className="flex flex-col gap-5 lg:col-span-4">
                    <a href="/" className="flex items-center gap-3 text-xl font-bold text-emerald-900">
                        <img
                            src="/assets/brand/logo.png"
                            alt="Lamore Cake"
                            className="h-10 w-auto"
                            loading="lazy"
                            decoding="async"
                        />
                        Lamore Cake
                    </a>
                    <p className="max-w-sm text-sm text-slate-600">
                        Homemade dessert studio yang mengangkat cita rasa tradisional Bali dengan sentuhan modern. Fresh baked setiap hari dengan bahan lokal terbaik.
                    </p>
                    <TooltipProvider>
                        <div className="flex items-center gap-3">
                            {socialLinks.map(({ label, href, icon: Icon }) => (
                                <Tooltip key={label}>
                                    <TooltipTrigger asChild>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-300/70 text-emerald-600 transition hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-100/40 hover:text-emerald-700"
                                        >
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>{label}</TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </TooltipProvider>
                </Reveal>

                <Reveal className="grid gap-12 text-sm text-slate-600 lg:col-span-8 lg:grid-cols-2">
                    <div className="space-y-5">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Navigasi</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/products" className="transition hover:text-emerald-600">
                                    Produk
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="transition hover:text-emerald-600">
                                    Tentang
                                </a>
                            </li>
                            <li>
                                <a href="/checkout" className="transition hover:text-emerald-600">
                                    Pemesanan
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="transition hover:text-emerald-600">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Hubungi Kami</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-slate-600">
                                <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
                                <span>Jl. Imam Bonjol Gg. Veteran II No.5, Pemecutan Klod, Denpasar, Bali 80113</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600">
                                <Phone className="h-4 w-4 text-emerald-600" />
                                <a
                                    href="https://wa.me/6289634584455?text=Halo%20Lamore%20Cake%2C%20saya%20ingin%20memesan"
                                    className="transition hover:text-emerald-600"
                                >
                                    0896 3458 4455
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600">
                                <Mail className="h-4 w-4 text-emerald-600" />
                                <a href="mailto:hello@lamorecake.id" className="transition hover:text-emerald-600">
                                    hello@lamorecake.id
                                </a>
                            </li>
                        </ul>
                        <a
                            href="https://wa.me/6289634584455?text=Halo%20Lamore%20Cake%2C%20saya%20ingin%20membuat%20pesanan"
                            className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/70 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50"
                        >
                            Konsultasi Pesanan
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </Reveal>
            </div>

            <div className="border-t border-emerald-200/60 bg-emerald-50/40">
                <div className="container mx-auto flex flex-col gap-3 px-4 py-4 text-xs text-emerald-700 sm:flex-row sm:items-center sm:justify-between">
                    <span>(c) {new Date().getFullYear()} Lamore Cake. All rights reserved.</span>
                    <div className="flex gap-4">
                        <a href="#" className="transition hover:text-emerald-600">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition hover:text-emerald-600">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

