// landing page
import { FAQ } from "@/components/home/FAQ";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
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
            <Features />
            <Testimonials />
            <FAQ />
            <Footer />
            <ScrollToTop />
        </>
    );
}

export default App;
