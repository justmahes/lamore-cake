import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Instagram, Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export const Footer = () => {
    return (
        <footer id="footer" className="mt-16 bg-gradient-to-b from-secondary/40 to-secondary/60">
            <div className="container mx-auto px-4">
                {/* Main grid */}
                <section className="grid grid-cols-2 gap-x-12 gap-y-10 py-14 md:grid-cols-4 xl:grid-cols-6">
                    <div className="col-span-full xl:col-span-2">
                        <a rel="noreferrer noopener" href="/" className="flex items-center gap-3 text-xl font-bold">
                            <img src="/assets/brand/logo.png" alt="Lamore Cake" className="h-12 w-auto md:h-14" />
                            <span className="hidden sm:inline">Lamore Cake</span>
                        </a>
                        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                            Homemade, fresh baked daily. Cita rasa tradisional Bali dengan sentuhan modern.
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href="https://www.instagram.com/la.morecake/"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="rounded-md p-2 text-muted-foreground transition hover:bg-muted"
                                        >
                                            <Instagram className="size-5" />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>Instagram</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">Produk & Bantuan</h3>
                        <a rel="noreferrer noopener" href="/products" className="text-sm text-muted-foreground transition hover:text-foreground">
                            Produk
                        </a>
                        <a rel="noreferrer noopener" href="/about#galeri" className="text-sm text-muted-foreground transition hover:text-foreground">
                            Galeri
                        </a>
                        <a rel="noreferrer noopener" href="/checkout" className="text-sm text-muted-foreground transition hover:text-foreground">
                            Cara Pemesanan
                        </a>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">Perusahaan</h3>
                        <a rel="noreferrer noopener" href="/about" className="text-sm text-muted-foreground transition hover:text-foreground">
                            Tentang Kami
                        </a>
                        <a rel="noreferrer noopener" href="#" className="text-sm text-muted-foreground transition hover:text-foreground">
                            Kebijakan & Privasi
                        </a>
                        <a rel="noreferrer noopener" href="#" className="text-sm text-muted-foreground transition hover:text-foreground">
                            Syarat & Ketentuan
                        </a>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-bold">Kontak</h3>
                        <a
                            href="https://maps.app.goo.gl/ZEb8Y9bWZ3sjqdbu7"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-start gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                        >
                            <MapPin className="mt-0.5 size-4" />
                            <span>Jl. Imam Bonjol Gg. Veteran II No.5, Pemecutan Klod, Denpasar, Bali 80113</span>
                        </a>
                        <a href="https://wa.me/6289634584455?text=Saya%20tertarik%20untuk%20memesan%20kue%20di%20Lamore%20Cake
" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
                            <Phone className="size-4" /> 089634584455
                        </a>
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="size-4" /> -
                        </span>
                    </div>
                </section>

                {/* Bottom bar */}
                <section className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground md:flex-row">
                    <p className="order-2 md:order-1">© {new Date().getFullYear()} Lamore Cake. All rights reserved.</p>
                    <div className="order-1 flex items-center gap-2 md:order-2">
                        <Button variant="outline" size="sm" className="group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <ArrowUp className="mr-2 size-4 transition-transform group-hover:-translate-y-0.5" /> Ke atas
                        </Button>
                    </div>
                </section>
            </div>
        </footer>
    );
};

