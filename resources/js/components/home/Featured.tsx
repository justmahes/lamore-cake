import { Reveal } from "./Reveal";
import { Badge } from "./ui/badge";

const featuredProducts = [
    {
        image: "/assets/home/1.jpg",
        title: "Signature Bolu Bali",
        description: "Bolu pandan lembut dengan aroma daun suji, favorit sepanjang masa.",
        label: "Signature",
        href: "/products",
    },
    {
        image: "/assets/home/2.jpg",
        title: "Pudding Tape Lumer",
        description: "Perpaduan tape legit dan pudding susu yang creamy.",
        label: "Terlaris",
        href: "/products",
    },
    {
        image: "/assets/home/3.jpg",
        title: "Hampers Eksklusif",
        description: "Pilihan hampers cantik untuk hadiah dan hampers perusahaan.",
        label: "Favorit Event",
        href: "/products",
    },
    {
        image: "/assets/home/1.jpg",
        title: "Kue Basah Premium",
        description: "Assorted jajanan tradisional Bali homemade siap santap.",
        label: "New Arrival",
        href: "/products",
    },
];

export function Featured() {
    return (
        <section id="produk-unggulan" className="relative overflow-hidden py-24 sm:py-28">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50" aria-hidden="true" />
            <div className="absolute left-1/2 top-12 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden="true" />

            <div className="container relative mx-auto px-4">
                <Reveal className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                        Produk Unggulan
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Kualitas Premium untuk Setiap Selera
                    </h2>
                    <p className="mt-3 text-base text-slate-600 sm:text-lg">
                        Dari cake klasik hingga hampers personal, semua dibuat dengan sentuhan modern dan rasa autentik Bali.
                    </p>
                </Reveal>

                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {featuredProducts.map((product, index) => (
                        <Reveal key={product.title} delay={100 + index * 80}>
                            <article className="group h-full overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_30px_60px_-35px_rgba(13,148,136,0.25)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_40px_80px_-35px_rgba(13,148,136,0.35)]">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <Badge className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-600 shadow">
                                        {product.label}
                                    </Badge>
                                </div>
                                <div className="flex flex-col gap-4 px-6 pb-6 pt-6">
                                    <h3 className="text-xl font-semibold text-slate-900">{product.title}</h3>
                                    <p className="text-sm text-slate-600">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-emerald-600">Ready setiap hari</span>
                                        <a href={product.href} className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200">
                                            Pesan
                                            <span aria-hidden="true">→</span>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
