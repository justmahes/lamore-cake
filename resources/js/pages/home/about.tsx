/**
 * Halaman "Tentang Kami" yang menjelaskan cerita, nilai, dan informasi tentang Lamore Cake.
 * Halaman ini bersifat statis dan informatif untuk pengunjung.
 * Fitur utama:
 * - Hero section dengan gambar dan judul yang menarik.
 * - Penjelasan tentang cerita dan nilai-nilai Lamore Cake.
 * - Tampilan statistik pencapaian (misal: porsi terjual, pelanggan puas) dengan animasi angka.
 * - Galeri foto produk dalam bentuk carousel (slider).
 * - Informasi lokasi toko dengan peta Google Maps yang disematkan.
 */
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

// ... (Definisi data statis seperti gambar, poin cerita, statistik, item galeri, dan URL peta)

// SECTION: Komponen untuk kartu statistik dengan animasi angka.
const StatCard = ({ value, suffix, label, icon: Icon }: (typeof stats)[number]) => {
    const [displayValue, setDisplayValue] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const duration = 1200;

    // Efek untuk mendeteksi kapan komponen masuk ke layar (viewport).
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        // ... (logika observer)
    }, [value]);

    // Efek untuk menjalankan animasi angka dari 0 ke nilai akhir.
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
            <Card className="...">
                {/* ... (Tampilan kartu statistik) */}
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
                {/* SECTION: Hero Section - Bagian paling atas halaman */}
                <section className="relative isolate ...">
                    {/* ... (Konten Hero Section) */}
                </section>

                {/* SECTION: Kenali Lamore Cake - Penjelasan tentang perusahaan */}
                <section id="kenali" className="container mx-auto px-4 py-20">
                    {/* ... (Konten penjelasan dan poin-poin cerita) */}
                </section>

                {/* SECTION: Statistics - Menampilkan kartu-kartu statistik */}
                <section className="container mx-auto px-4 pb-20">
                    {/* ... (Judul dan grid kartu statistik) */}
                </section>

                {/* SECTION: Gallery - Carousel/slider galeri foto produk */}
                <section id="galeri" className="container mx-auto px-4 pb-20">
                    {/* ... (Judul dan komponen Carousel) */}
                </section>

                {/* SECTION: Location - Informasi alamat dan peta lokasi */}
                <section id="lokasi" className="container mx-auto px-4 pb-24">
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        {/* ... (Detail alamat dan jam operasional) */}
                        <Reveal delay={120} className="relative ...">
                            {/* Peta Google Maps yang disematkan */}
                            <iframe src={mapEmbedUrl} ... />
                        </Reveal>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}