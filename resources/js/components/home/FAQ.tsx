import { Reveal } from "./Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/home/ui/accordion";

interface FAQProps {
    question: string;
    answer: string;
    value: string;
}

const FAQList: FAQProps[] = [
    {
        question: "Di mana lokasi Lamore Cake?",
        answer: "Lamore Cake berlokasi di Jalan Imam Bonjol Gg. Veteran II No.5, Denpasar, Bali.",
        value: "item-1",
    },
    {
        question: "Apakah pengiriman di area Denpasar gratis?",
        answer: "Ya, kami memberikan gratis ongkir untuk area Denpasar dan sekitarnya.",
        value: "item-free-shipping",
    },
    {
        question: "Apakah Lamore Cake hanya beroperasi di Denpasar?",
        answer: "Saat ini kami melayani pemesanan untuk wilayah Denpasar dan sekitarnya.",
        value: "item-operation-area",
    },
    {
        question: "Bagaimana cara penyimpanan kue basah agar tahan lama?",
        answer: "Simpan di kulkas (4-6°C) dalam wadah tertutup rapat. Konsumsi maksimal 3-5 hari tergantung jenis kue.",
        value: "item-storage",
    },
    {
        question: "Berapa umur simpan produk Lamore Cake?",
        answer: "Rata-rata kue basah bertahan 1 hari di suhu ruang dan hingga 5 hari di kulkas. Detail kedaluwarsa tertulis di halaman produk.",
        value: "item-shelf-life",
    },
    {
        question: "Apa saja jenis jajanan tradisional yang tersedia?",
        answer: "Kami menyediakan pudding tape, kue bolu Bali, assorted kue basah, hingga hampers lengkap.",
        value: "item-2",
    },
    {
        question: "Apakah semua produk dibuat homemade?",
        answer: "Ya, semua jajanan dibuat di dapur kami setiap hari dengan bahan lokal terbaik tanpa pengawet.",
        value: "item-3",
    },
    {
        question: "Bagaimana cara memesan Lamore Cake?",
        answer: "Anda bisa pesan melalui website, WhatsApp, atau datang langsung ke toko kami di Denpasar.",
        value: "item-4",
    },
    {
        question: "Apakah menerima pesanan custom atau jumlah besar?",
        answer: "Tentu! Hubungi kami minimal H-3 untuk pesanan event, corporate, atau desain custom.",
        value: "item-5",
    },
];

export const FAQ = () => {
    return (
        <section id="faq" className="relative overflow-hidden py-24 sm:py-28">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-amber-50" aria-hidden="true" />
            <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-emerald-100/40" aria-hidden="true" />
            <div className="container relative mx-auto max-w-4xl px-4">
                <Reveal className="text-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                        FAQ
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <p className="mt-3 text-base text-slate-600">
                        Kami merangkum hal-hal penting agar pengalaman memesan Lamore Cake semakin mudah.
                    </p>
                </Reveal>

                <Reveal delay={150} className="mt-12 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-[0_35px_80px_-45px_rgba(13,148,136,0.35)] backdrop-blur">
                    <Accordion type="single" collapsible className="w-full">
                        {FAQList.map(({ question, answer, value }: FAQProps) => (
                            <AccordionItem key={value} value={value}>
                                <AccordionTrigger className="text-left text-base font-semibold text-slate-900">
                                    {question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-relaxed text-slate-600">
                                    {answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Reveal>

                <Reveal delay={250} className="mt-10 text-center text-sm text-slate-600">
                    Masih ada pertanyaan?{" "}
                    <a
                        rel="noreferrer noopener"
                        href="https://wa.me/6289634584455?text=Halo%20Lamore%20Cake%2C%20saya%20ingin%20bertanya%20lebih%20lanjut"
                        className="font-semibold text-emerald-600 transition hover:text-emerald-500"
                    >
                        Hubungi kami via WhatsApp
                    </a>
                </Reveal>
            </div>
        </section>
    );
};
