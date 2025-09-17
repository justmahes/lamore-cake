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

            <FAQ />
            <Footer />
            <ScrollToTop />
        </>
    );
}

export default App;
