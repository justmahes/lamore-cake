import { Reveal } from "./Reveal";
import { Badge } from "./ui/badge";
import { Leaf, Sparkles, Timer, Trophy } from "lucide-react";

const highlights = [
    {
        icon: Leaf,
        title: "Bahan Segar & Natural",
        description: "Menggunakan bahan lokal pilihan tanpa pengawet sehingga rasa dan kualitas selalu terjaga.",
    },
    {
        icon: Sparkles,
        title: "Sentuhan Artisanal",
        description: "Setiap cake dihias manual oleh pastry chef kami, dengan detail yang memanjakan mata.",
    },
    {
        icon: Timer,
        title: "Produksi Cepat",
        description: "Sistem pre-order yang efisien memastikan pesanan Anda siap tepat waktu, bahkan untuk acara besar.",
    },
    {
        icon: Trophy,
        title: "Terpercaya Sejak 2021",
        description: "Telah menjadi pilihan utama lebih dari 5.000 pelanggan dengan rating 4.9/5.",
    },
];

export const Features = () => {
    return (
        <section className="relative overflow-hidden py-24 sm:py-28">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-emerald-50 to-white" aria-hidden="true" />
            <div className="container mx-auto px-4">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-teal-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-teal-700">
                        Keunggulan Lamore Cake
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Homemade Modern yang Dibuat dengan Sepenuh Hati
                    </h2>
                    <p className="mt-3 text-base text-slate-600 sm:text-lg">
                        Kami memadukan resep tradisi dengan teknik pastry modern untuk menghadirkan pengalaman manis yang tak terlupakan.
                    </p>
                </Reveal>

                <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {highlights.map(({ icon: Icon, title, description }, index) => (
                        <Reveal key={title} delay={120 + index * 80}>
                            <article className="group flex h-full flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-[0_25px_60px_-45px_rgba(13,148,136,0.55)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_-40px_rgba(13,148,136,0.55)]">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition group-hover:scale-110">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                                <p className="text-sm text-slate-600">{description}</p>
                                <Badge className="mt-auto w-max rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                    Terbukti oleh pelanggan
                                </Badge>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
