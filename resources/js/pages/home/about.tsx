import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Reveal } from "@/components/home/Reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Head } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    CakeSlice,
    Gift,
    Smile,
    ThumbsUp,
    ShoppingBag,
    Layers,
    CalendarCheck,
    Leaf,
    ChefHat,
    Package,
    Heart
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const heroImage = "/assets/home/1.jpg";

const storyPoints: Array<{ icon: LucideIcon; title: string; description: string }> = [
    {
        icon: CakeSlice,
        title: "Rasa Autentik Bali",
        description: "Resep turun-temurun dengan sentuhan modern yang menjaga cita rasa khas Bali dalam setiap gigitan."
    },
    {
        icon: Gift,
        title: "Hampers dan Custom Cake",
        description: "Buat momen spesial dengan paket hampers atau cake custom yang dirancang sesuai keinginan."
    },
    {
        icon: Smile,
        title: "Pengalaman Hangat",
        description: "Kami percaya pelayanan ramah dan komunikasi personal membuat pelanggan merasa seperti keluarga."
    }
];

const stats = [
    { value: 5000, suffix: "+", label: "Porsi Terjual", icon: ShoppingBag },
    { value: 95, suffix: "%", label: "Pelanggan Puas", icon: ThumbsUp },
    { value: 15, suffix: "+", label: "Varian Jajanan", icon: Layers },
    { value: 2021, suffix: "", label: "Berdiri Sejak", icon: CalendarCheck }
];

const galleryItems = [
    { src: "/assets/gallery/1.jpg", caption: "Signature Bolu Bali" },
    { src: "/assets/gallery/2.jpg", caption: "Pudding Tape Lembut" },
    { src: "/assets/gallery/3.jpg", caption: "Hampers Eksklusif" },
    { src: "/assets/gallery/4.jpg", caption: "Dessert Table" },
    { src: "/assets/gallery/5.jpg", caption: "Kue Tradisional" },
    { src: "/assets/gallery/6.jpg", caption: "Croissant Artisan" },
    { src: "/assets/gallery/7.jpg", caption: "Assorted Pastry" }
];

const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4858.174333588356!2d115.1948643!3d-8.6861332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd241c11d6c254d%3A0xb52725e3528d65b5!2sLa.Morecake!5e1!3m2!1sid!2sid!4v1754136686084!5m2!1sid!2sid";

const StatCard = ({ value, suffix, label, icon: Icon }: (typeof stats)[number]) => {
    const [displayValue, setDisplayValue] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const duration = 1200;

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;
        if (typeof IntersectionObserver === "undefined") {
            setHasAnimated(true);
            setDisplayValue(value);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [value]);

    useEffect(() => {
        if (!hasAnimated) return;

        let animationFrame: number;
        const start = performance.now();

        const step = (timestamp: number) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            setDisplayValue(Math.round(progress * value));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            }
        };

        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
    }, [hasAnimated, value, duration]);

    const formatted = useMemo(() => new Intl.NumberFormat("id-ID").format(displayValue), [displayValue]);

    return (
        <div ref={containerRef}>
            <Card className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex flex-col gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <Icon className="h-5 w-5" />
                    </span>
                    <div>
                        <p className="text-3xl font-bold text-emerald-600">
                            {formatted}
                            {suffix}
                        </p>
                        <p className="text-sm font-medium text-slate-600">{label}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default function About() {
    return (
        <>
            <Head title="Tentang Lamore Cake" />
            <Navbar />
            <main className="bg-white text-slate-900">
                {/* Hero Section */}
                <section className="relative isolate overflow-hidden pt-28 pb-24 sm:pt-32">
                    <img
                        src={heroImage}
                        alt="Lamore Cake hero"
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/85 via-emerald-800/75 to-black/70" aria-hidden="true" />

                    <div className="relative z-10 container mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center text-white">
                        <Reveal className="space-y-6">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">
                                Tentang Kami
                            </span>
                            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                                Cerita Manis di Balik Lamore Cake, Pengrajin Jajanan Bali Modern
                            </h1>
                            <p className="text-base text-emerald-50/85 sm:text-lg">
                                Sejak 2021 kami meramu cake dan jajanan tradisional Bali dengan kualitas premium dan pelayanan penuh kehangatan.
                            </p>
                        </Reveal>

                        <Reveal delay={120} className="flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="/products"
                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-emerald-500/40"
                            >
                                Jelajahi Menu
                            </a>
                            <a
                                href="#galeri"
                                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-emerald-200 hover:bg-white/15"
                            >
                                Lihat Galeri
                            </a>
                        </Reveal>
                    </div>
                </section>

                {/* Kenali Lamore Cake */}
                <section id="kenali" className="container mx-auto px-4 py-20">
                    <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
                        <Reveal className="relative order-2 overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-[0_35px_90px_-45px_rgba(13,148,136,0.35)] lg:order-1">
                            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-emerald-200/40 via-transparent to-transparent" aria-hidden="true" />
                            <img
                                src="/assets/home/3.jpg"
                                alt="Tim Lamore Cake"
                                className="h-full w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Homemade Everyday</p>
                                <p className="mt-2 text-sm text-slate-600">
                                    Produksi dimulai setiap pagi dengan bahan lokal segar dan proses higienis agar selalu siap dinikmati.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={120} className="order-1 space-y-6 text-slate-700 lg:order-2">
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                                Kenali Lamore Cake
                            </span>
                            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                                Meramu Tradisi Bali dengan Teknik Artisan Masa Kini
                            </h2>
                            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                                Lamore Cake hadir dari dapur kecil di Denpasar dengan misi membawa kembali memori manis jajanan Bali ke generasi masa kini.
                                Kami menyeimbangkan resep keluarga dengan teknik bakery modern sehingga setiap produk tampil cantik tanpa menghilangkan rasa asli.
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {storyPoints.map(({ icon: Icon, title, description }) => (
                                    <div key={title} className="flex gap-3 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                                        <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <div className="space-y-1">
                                            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                                            <p className="text-sm text-slate-600">{description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Statistics */}
                <section className="container mx-auto px-4 pb-20">
                    <Reveal className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                            Pencapaian Kami
                        </span>
                        <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Bukti Dedikasi Kami Selama Bertahun-tahun
                        </h2>
                        <p className="mt-3 text-base text-slate-600">
                            Angka-angka ini mewakili kepercayaan pelanggan, kualitas rasa, dan konsistensi pelayanan yang selalu kami jaga.
                        </p>
                    </Reveal>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((item) => (
                            <Reveal key={item.label} delay={140}>
                                <StatCard {...item} />
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* Gallery */}
                <section id="galeri" className="container mx-auto px-4 pb-20">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <Reveal className="space-y-2">
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                                Galeri Rasa
                            </span>
                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Potret Favorit Pelanggan</h2>
                            <p className="text-sm text-slate-600 sm:text-base">
                                Geser untuk melihat kreasi cake, hampers, dan pastry yang menemani momen penting pelanggan kami.
                            </p>
                        </Reveal>
                    </div>
                    <Reveal delay={120}>
                        <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                            <CarouselContent className="-ml-4">
                                {galleryItems.map(({ src, caption }, index) => (
                                    <CarouselItem key={src} className="px-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                        <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                                            <div className="relative aspect-square overflow-hidden">
                                                <img
                                                    src={src}
                                                    alt={caption}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-emerald-600 shadow">
                                                    <Leaf className="h-3.5 w-3.5" />
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div className="px-4 py-4">
                                                <p className="text-sm font-semibold text-slate-800">{caption}</p>
                                                <p className="mt-1 text-xs text-slate-500">Koleksi Lamore Cake</p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="-left-3 top-1/2 -translate-y-1/2 border-none bg-white/80 text-emerald-600 shadow hover:bg-white" />
                            <CarouselNext className="-right-3 top-1/2 -translate-y-1/2 border-none bg-white/80 text-emerald-600 shadow hover:bg-white" />
                        </Carousel>
                    </Reveal>
                </section>

                {/* Location */}
                <section id="lokasi" className="container mx-auto px-4 pb-24">
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        <Reveal className="space-y-4">
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                                Kunjungi Kami
                            </span>
                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Lokasi & Showroom Lamore Cake</h2>
                            <p className="text-base text-slate-600">
                                Datang langsung ke toko kami di Denpasar untuk mencicipi sampler, melakukan konsultasi custom cake, atau sekadar menikmati suasana hangat Lamore Cake.
                            </p>
                            <div className="space-y-3 text-sm text-slate-600">
                                <p className="flex items-center gap-2">
                                    <Package className="h-4 w-4 text-emerald-500" />
                                    Jl. Imam Bonjol Gg. Veteran II No.5, Pemecutan Klod, Denpasar, Bali 80113
                                </p>
                                <p className="flex items-center gap-2">
                                    <ChefHat className="h-4 w-4 text-emerald-500" />
                                    Jam operasional: Setiap hari 09.00 - 20.00 WITA
                                </p>
                                <p className="flex items-center gap-2">
                                    <Heart className="h-4 w-4 text-emerald-500" />
                                    Open kitchen: lihat langsung proses produksi kami setiap pagi! 
                                </p>
                            </div>
                            <a
                                href="https://maps.app.goo.gl/ZEb8Y9bWZ3sjqdbu7"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex w-max items-center justify-center rounded-full border border-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-600 transition hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-emerald-400/10 hover:to-emerald-600/10"
                            >
                                Lihat di Google Maps
                            </a>
                        </Reveal>

                        <Reveal delay={120} className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-lg">
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl">
                                <iframe
                                    src={mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    aria-label="Lokasi Lamore Cake di Google Maps"
                                />
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
