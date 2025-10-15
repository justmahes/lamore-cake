import { About } from "@/components/home/About";
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

function App() {
    return (
        <>
            <Head title="Lamore Cake - Kue Bali Modern" />
            <Navbar />
            <main className="bg-white text-slate-900">
                <Hero />
                <Featured />
                <CategoryQuick />
                <Features />
                <About />
                <Testimonials />
                <FAQ />
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}

export default App;
