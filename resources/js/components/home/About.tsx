import { Reveal } from "./Reveal";
import { Statistics } from "./Statistics";

const aboutImage = "/assets/home/3.jpg";

export const About = () => {
    return (
        <section id="tentang-kami" className="relative overflow-hidden py-24 sm:py-28">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-emerald-100" aria-hidden="true" />
            <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-emerald-200/40" aria-hidden="true" />
            <div className="container relative mx-auto grid items-center gap-16 px-4 md:grid-cols-2 lg:gap-20">
                <Reveal className="order-2 flex flex-col gap-6 text-slate-700 md:order-1">
                    <span className="inline-flex w-max items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                        Tentang Kami
                    </span>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                        Meramu Tradisi Bali dengan Sentuhan Kekinian
                    </h2>
                    <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                        Lamore Cake lahir dari kecintaan kami terhadap cita rasa Bali yang autentik. Kami menggabungkan resep turun-temurun dengan teknik pastry modern sehingga setiap cake tampil cantik, higienis, dan penuh makna untuk momen spesial Anda.
                    </p>
                    <ul className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                        {["Dapur bersertifikasi halal", "Pengiriman aman & rapi", "Menu custom untuk event", "Harga bersahabat untuk UMKM"].map((item) => (
                            <li key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">{"\u2713"}</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-[0_25px_70px_-45px_rgba(15,118,110,0.45)]">
                        <Statistics />
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="/about"
                            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
                        >
                            Kenali kisah kami
                        </a>
                        <a
                            href="https://wa.me/6289634584455?text=Halo%20Lamore%20Cake%2C%20saya%20ingin%20diskusi%20custom%20cake"
                            className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50"
                        >
                            Konsultasi custom cake
                        </a>
                    </div>
                </Reveal>

                <Reveal delay={120} className="order-1 md:order-2">
                    <article className="group relative overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-[0_35px_90px_-45px_rgba(15,118,110,0.45)]">
                        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-emerald-200/30 via-transparent to-transparent" aria-hidden="true" />
                        <img
                            src={aboutImage}
                            alt="Produk unggulan Lamore Cake"
                            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Fresh Every Day</p>
                            <p className="mt-2 text-base text-slate-600">
                                Semua cake dibuat di dapur kami setiap pagi menggunakan bahan lokal berkualitas tinggi dan tanpa pengawet.
                            </p>
                        </div>
                    </article>
                </Reveal>
            </div>
        </section>
    );
};
