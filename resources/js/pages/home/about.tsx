import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Head } from "@inertiajs/react";

export default function About() {
    return (
        <>
            <Head title="About Lamore Cake" />
            <Navbar />
            <div className="min-h-screen bg-white font-sans text-gray-800">
                <section className="relative bg-[url('https://cdn.pixabay.com/photo/2015/01/06/20/58/cake-590815_960_720.jpg')] bg-cover bg-center py-24 text-white">
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
                        <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl">Lamore Cake</h1>
                        <p className="text-lg">UMKM Jajanan Tradisional Bali</p>
                    </div>
                </section>

                <section className="mx-auto max-w-4xl space-y-6 px-4 py-16">
                    <h2 className="text-2xl font-semibold">Tentang Kami</h2>
                    <p>
                        Lamore Cake merupakan usaha rumahan yang berlokasi di Jl. Imam Bonjol Gg. Veteran II No.5, Denpasar. Kami menyediakan berbagai
                        jajanan tradisional Bali seperti Pudding Tape, Kue Bolu Bali, hingga hampers untuk berbagai acara.
                    </p>

                    <h3 className="mt-8 text-xl font-semibold">Visi</h3>
                    <p>Menjadi penyedia kue tradisional Bali terkemuka.</p>

                    <h3 className="mt-8 text-xl font-semibold">Misi</h3>
                    <ul className="list-disc space-y-2 pl-5">
                        <li>Menyediakan jajanan home made berkualitas tinggi.</li>
                        <li>Melestarikan budaya kuliner Bali.</li>
                        <li>Memberdayakan ekonomi lokal.</li>
                    </ul>
                </section>
            </div>
            <Footer />
        </>
    );
}
