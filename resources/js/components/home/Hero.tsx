import { Reveal } from "./Reveal";
import { HeroCards } from "./HeroCards";

export const Hero = () => {
    return (
        <section className="relative isolate overflow-hidden">
            <div
                className="absolute inset-0 -z-30 bg-[url('/assets/home/2.jpg')] bg-cover bg-center bg-fixed opacity-40"
                aria-hidden="true"
            />
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-emerald-500/70 via-teal-600/70 to-amber-200/60" aria-hidden="true" />
            <div className="absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-300/40 blur-3xl" aria-hidden="true" />
            <div className="absolute -right-16 bottom-0 -z-10 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-emerald-900/40" aria-hidden="true" />

            <div className="container relative z-10 mx-auto flex flex-col items-center gap-16 px-4 pb-24 pt-32 md:flex-row md:items-end md:justify-between md:pt-36 lg:gap-20">
                <Reveal className="max-w-2xl text-center text-white md:text-left" delay={100}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-50 shadow-lg backdrop-blur">
                        Kreasi Manis Bali Modern
                    </span>
                    <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl sm:text-5xl lg:text-6xl">
                        Rayakan Momen Manis dengan Lamore Cake yang Lembut & Otentik
                    </h1>
                    <p className="mt-5 text-base text-emerald-50/80 sm:text-lg">
                        Perpaduan resep turun-temurun dan teknik artisan masa kini, menghadirkan cake & jajanan terbaik untuk setiap perayaan Anda.
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:items-start">
                        <a
                            href="/products"
                            className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 px-8 py-3 text-base font-semibold text-slate-900 shadow-[0_15px_35px_-10px_rgba(251,191,36,0.7)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_18px_40px_-8px_rgba(251,191,36,0.85)]"
                        >
                            Pesan Sekarang
                        </a>
                        <a
                            href="#produk-unggulan"
                            className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/15"
                        >
                            Jelajahi Menu
                        </a>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
                        {["Rasa autentik Bali", "Bahan segar harian", "Custom cake & hampers"].map((item) => (
                            <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">✓</span>
                                {item}
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal className="relative w-full max-w-xl" delay={250}>
                    <div className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] bg-gradient-to-br from-white/30 to-transparent opacity-60 blur-2xl" aria-hidden="true" />
                    <HeroCards />
                </Reveal>
            </div>
        </section>
    );
};
