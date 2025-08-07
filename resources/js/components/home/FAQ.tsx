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
                <a rel="noreferrer noopener" href="#" className="border-primary text-primary transition-all hover:border-b-2">
                    Hubungi kami
                </a>
            </h3>
        </section>
    );
};
