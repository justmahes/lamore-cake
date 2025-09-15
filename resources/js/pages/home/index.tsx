// landing page
import { FAQ } from "@/components/home/FAQ";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { Featured } from "@/components/home/Featured";
import { CategoryQuick } from "@/components/home/CategoryQuick";
import { Navbar } from "@/components/home/Navbar";
import { ScrollToTop } from "@/components/home/ScrollToTop";
import { Testimonials } from "@/components/home/Testimonials";
import { Head } from "@inertiajs/react";
// import "@/components/home/App.css";

function App() {
    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <Hero />
            <Featured />
            <CategoryQuick />
            <Features />
            <Testimonials />
            {/* General storage and shelf-life note */}
            <section className="container mx-auto py-12">
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-2 text-xl font-semibold">Catatan Umum Penyimpanan</h3>
                    <p className="text-sm text-muted-foreground">
                        Semua kue basah Lamore Cake sebaiknya dikonsumsi maksimal 1 hari pada suhu ruang.
                        Untuk ketahanan lebih lama, simpan dalam wadah tertutup di kulkas (±4°C) dan konsumsi dalam 3–5 hari.
                        Beberapa produk memiliki tanggal kadaluwarsa spesifik di halaman produk masing-masing.
                    </p>
                </div>
            </section>
            <FAQ />
            <Footer />
            <ScrollToTop />
        </>
    );
}

export default App;
