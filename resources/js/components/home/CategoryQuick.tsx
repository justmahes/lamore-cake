import { Reveal } from "./Reveal";

const categories = [
    {
        name: "Kue Basah",
        description: "Klepon, lupis, dan varian tradisional favorit yang dibuat fresh setiap hari.",
        image: "/assets/home/1.jpg",
        href: "/products?category=kue-basah",
        accent: "from-emerald-400/20 via-emerald-500/10 to-teal-400/20",
    },
    {
        name: "Cake Custom",
        description: "Rayakan momen spesial dengan desain cake personal dan bahan premium.",
        image: "/assets/home/2.jpg",
        href: "/products?category=cake",
        accent: "from-amber-400/20 via-orange-300/20 to-pink-300/10",
    },
    {
        name: "Hampers",
        description: "Pilihan hampers cantik untuk gift, corporate, atau hantaran keluarga.",
        image: "/assets/home/3.jpg",
        href: "/products?category=hampers",
        accent: "from-teal-400/15 via-emerald-300/20 to-sky-300/10",
    },
    {
        name: "Minuman",
        description: "Signature drinks pendamping dessert, siap menyegarkan hari Anda.",
        image: "/assets/home/2.jpg",
        href: "/products?category=minuman",
        accent: "from-blue-400/15 via-cyan-300/20 to-emerald-300/10",
    },
];

export function CategoryQuick() {
    return (
        <section className="container mx-auto px-4 py-24">
            <Reveal className="flex flex-col gap-4 text-center sm:text-left">
                <span className="mx-auto inline-flex items-center justify-center rounded-full bg-slate-900/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600 sm:mx-0">
                    Jelajah Menu
                </span>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Temukan Favoritmu dalam Sekejap
                    </h2>
                    <a
                        href="/products"
                        className="inline-flex items-center justify-center rounded-full border border-slate-900/10 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50"
                    >
                        Lihat Seluruh Produk
                    </a>
                </div>
                <p className="mx-auto max-w-2xl text-base text-slate-600 sm:mx-0">
                    Pilih kategori yang sesuai dengan kebutuhanmu. Semua tersedia dengan proses pemesanan cepat dan pengiriman aman.
                </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {categories.map((category, index) => (
                    <Reveal key={category.name} delay={100 + index * 80}>
                        <a
                            href={category.href}
                            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_50px_-35px_rgba(15,118,110,0.35)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_-25px_rgba(15,118,110,0.35)]"
                        >
                            <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${category.accent}`} aria-hidden="true" />
                            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="mt-6 flex flex-1 flex-col gap-3 text-left">
                                <h3 className="text-xl font-semibold text-slate-900">{category.name}</h3>
                                <p className="text-sm text-slate-600">{category.description}</p>
                                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition group-hover:gap-3">
                                    Lihat koleksi
                                    <span aria-hidden="true">→</span>
                                </span>
                            </div>
                        </a>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
