import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Head } from "@inertiajs/react";

export default function About() {
    return (
        <>
            <Head title="About Lamore Cake" />
            <Navbar />
            <div className="min-h-screen bg-white pb-10 font-sans text-gray-800">
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
                <div className="container mx-auto mb-10 h-[50vh] max-w-4xl px-4">
                    <h2 className="mb-2 text-xl font-bold">Lokasi</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4858.174333588356!2d115.1948643!3d-8.6861332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd241c11d6c254d%3A0xb52725e3528d65b5!2sLa.Morecake!5e1!3m2!1sid!2sid!4v1754136686084!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <Footer />
        </>
    );
}
