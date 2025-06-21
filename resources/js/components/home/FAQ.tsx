import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/home/ui/accordion";

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
        <section
            id="faq"
            className="container py-24 sm:py-32"
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Questions
                </span>
            </h2>

            <Accordion
                type="single"
                collapsible
                className="w-full AccordionRoot"
            >
                {FAQList.map(({ question, answer, value }: FAQProps) => (
                    <AccordionItem
                        key={value}
                        value={value}
                    >
                        <AccordionTrigger className="text-left cursor-pointer">
                            {question}
                        </AccordionTrigger>

                        <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <h3 className="font-medium mt-4">
                Still have questions?{" "}
                <a
                    rel="noreferrer noopener"
                    href="#"
                    className="text-primary transition-all border-primary hover:border-b-2"
                >
                    Contact us
                </a>
            </h3>
        </section>
    );
};
