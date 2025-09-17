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
        answer: "Ya, Lamore Cake memberikan gratis ongkir untuk area Denpasar dan sekitar Denpasar.",
        value: "item-free-shipping",
    },
    {
        question: "Apakah Lamore Cake hanya beroperasi di Denpasar?",
        answer: "Saat ini Lamore Cake hanya melayani pembelian di wilayah Denpasar dan sekitar Denpasar. Kami belum melayani pengiriman ke luar Denpasar.",
        value: "item-operation-area",
    },
    {
        question: "Bagaimana cara penyimpanan kue basah agar tahan lama?",
        answer: "Simpan di kulkas (±4°C) dalam wadah tertutup. Umumnya tahan hingga 3–5 hari tergantung jenisnya. Untuk suhu ruang (24–30°C), sebaiknya dikonsumsi di hari yang sama.",
        value: "item-6",
    },
    {
        question: "Berapa umur simpan produk Lamore Cake?",
        answer: "Rata-rata kue basah bertahan 1 hari di suhu ruang dan 3–5 hari di kulkas. Beberapa produk memiliki tanggal kadaluwarsa khusus yang tertera pada halaman produk.",
        value: "item-7",
    },
    {
        question: "Apa saja jenis jajanan tradisional yang tersedia?",
        answer: "Kami menyediakan berbagai jajanan tradisional Bali homemade, termasuk pudding tape, kue bolu Bali, dan hampers aneka jajanan tradisional.",
        value: "item-2",
    },
    {
        question: "Apakah semua produk Lamore Cake dibuat sendiri (homemade)?",
        answer: "Ya, semua jajanan di Lamore Cake dibuat sendiri (homemade) dengan bahan-bahan segar dan berkualitas tinggi setiap harinya.",
        value: "item-3",
    },
    {
        question: "Bagaimana cara memesan jajanan di Lamore Cake?",
        answer: "Anda bisa datang langsung ke toko kami atau memesan melalui kontak yang tersedia di website ini. Kami juga melayani pemesanan untuk acara khusus.",
        value: "item-4",
    },
    {
        question: "Apakah Lamore Cake menerima pesanan khusus atau dalam jumlah besar?",
        answer: "Tentu, kami melayani pesanan khusus dan dalam jumlah besar untuk acara seperti ulang tahun, arisan, atau perkumpulan. Mohon hubungi kami untuk informasi lebih lanjut.",
        value: "item-5",
    },
];

export const FAQ = () => {
    return (
        <section id="faq" className="relative container mx-auto py-24 sm:py-32">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Pertanyaan Yang Sering <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">Ditanyakan</span>
            </h2>

            <Accordion type="single" collapsible className="AccordionRoot w-full">
                {FAQList.map(({ question, answer, value }: FAQProps) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger className="cursor-pointer text-left">{question}</AccordionTrigger>

                        <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <h3 className="mt-4 font-medium">
                Masih ada pertanyaan?{" "}
                <a rel="noreferrer noopener" href="https://wa.me/6289634584455?text=Saya%20tertarik%20untuk%20memesan%20kue%20di%20Lamore%20Cake
" className="border-primary text-primary transition-all hover:border-b-2">
                    Hubungi kami
                </a>
            </h3>
        </section>
    );
};
