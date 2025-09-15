import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { Testimonials } from "@/components/home/Testimonials";
import { Statistics } from "@/components/home/Statistics";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/home/ui/accordion";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";

const galleryImages = [
    "/assets/gallery/1.jpg",
    "/assets/gallery/2.jpg",
    "/assets/gallery/3.jpg",
    "/assets/gallery/4.jpg",
    "/assets/gallery/5.jpg",
    "/assets/gallery/6.jpg",
    "/assets/gallery/7.jpg",
];

export default function About() {
    return (
        <>
            <Head title="About Lamore Cake" />
            <Navbar />
            <div className="min-h-screen bg-white pb-10 font-sans text-gray-800">
                {/* Hero */}
                <section className="relative bg-[url('https://cdn.pixabay.com/photo/2015/01/06/20/58/cake-590815_960_720.jpg')] bg-cover bg-center py-24 text-white">
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
                        <h1 className="mb-3 text-4xl font-extrabold sm:text-5xl">Lamore Cake</h1>
                        <p className="text-lg opacity-95">UMKM Jajanan Tradisional Bali</p>
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <a href="#tentang" className="inline-block">
                                <Button size="lg" variant="default">Jelajahi</Button>
                            </a>
                            <a href="#galeri" className="inline-block">
                                <Button size="lg" variant="secondary">Lihat Galeri</Button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Tabs: Tentang / Visi / Misi */}
                <section id="tentang" className="mx-auto max-w-5xl px-4 py-16">
                    <Tabs defaultValue="tentang" className="w-full">
                        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                            <h2 className="text-2xl font-semibold">Kenali Lamore Cake</h2>
                            <TabsList>
                                <TabsTrigger value="tentang">Tentang</TabsTrigger>
                                <TabsTrigger value="visi">Visi</TabsTrigger>
                                <TabsTrigger value="misi">Misi</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="tentang" className="mt-6 text-lg leading-relaxed">
                            Lamore Cake merupakan usaha rumahan yang berlokasi di Jl. Imam Bonjol Gg. Veteran II No.5, Denpasar. Kami menyediakan berbagai
                            jajanan tradisional Bali seperti Pudding Tape, Kue Bolu Bali, hingga hampers untuk berbagai acara. Semua dibuat homemade dengan
                            bahan segar dan proses yang higienis.
                        </TabsContent>
                        <TabsContent value="visi" className="mt-6 text-lg leading-relaxed">
                            Menjadi penyedia kue tradisional Bali terkemuka yang menghadirkan kehangatan, kualitas, dan cita rasa autentik ke lebih banyak pelanggan.
                        </TabsContent>
                        <TabsContent value="misi" className="mt-6">
                            <ul className="list-disc space-y-2 pl-6 text-lg">
                                <li>Menyediakan jajanan homemade berkualitas tinggi dengan rasa konsisten.</li>
                                <li>Melestarikan budaya kuliner Bali melalui inovasi yang tetap autentik.</li>
                                <li>Memberdayakan ekonomi lokal melalui rantai pasok dan kolaborasi komunitas.</li>
                            </ul>
                        </TabsContent>
                    </Tabs>

                    {/* Highlighted Stats */}
                    <div className="mt-12 rounded-lg bg-muted/50 p-8">
                        <Statistics />
                    </div>
                </section>

                {/* Interaktif Galeri */}
                <section id="galeri" className="mx-auto max-w-6xl px-4 py-10">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Galeri Rasa</h3>
                        <p className="text-muted-foreground">Geser untuk melihat pilihan favorit pelanggan</p>
                    </div>
                    <div className="relative">
                        <Carousel className="w-full" opts={{ align: "start" }}>
                            <CarouselContent>
                                {galleryImages.map((src, idx) => (
                                    <CarouselItem key={src} className="md:basis-1/2 lg:basis-1/3">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="group block w-full overflow-hidden rounded-lg border bg-white shadow hover:shadow-md">
                                                    <img src={src} alt={`Galeri ${idx + 1}`} className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-3xl">
                                                <DialogHeader>
                                                    <DialogTitle>Galeri #{idx + 1}</DialogTitle>
                                                </DialogHeader>
                                                <img src={src} alt={`Galeri ${idx + 1}`} className="w-full rounded-md object-cover" />
                                            </DialogContent>
                                        </Dialog>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </section>

                {/* Testimoni & FAQ dihapus sesuai permintaan */}

                {/* Lokasi dengan dialog peta besar */}
                <section className="container mx-auto max-w-5xl px-4 py-16">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Lokasi</h3>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">Lihat Peta Lebih Besar</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-5xl">
                                <DialogHeader>
                                    <DialogTitle>La.Morecake - Denpasar</DialogTitle>
                                </DialogHeader>
                                <div className="h-[70vh] w-full">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4858.174333588356!2d115.1948643!3d-8.6861332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd241c11d6c254d%3A0xb52725e3528d65b5!2sLa.Morecake!5e1!3m2!1sid!2sid!4v1754136686084!5m2!1sid!2sid"
                                        width="100%"
                                        height="100%"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="h-[45vh] overflow-hidden rounded-lg border">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4858.174333588356!2d115.1948643!3d-8.6861332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd241c11d6c254d%3A0xb52725e3528d65b5!2sLa.Morecake!5e1!3m2!1sid!2sid!4v1754136686084!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
