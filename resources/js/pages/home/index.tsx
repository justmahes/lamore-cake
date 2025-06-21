// landing page
import { About } from "@/components/home/About";
import { FAQ } from "@/components/home/FAQ";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { Navbar } from "@/components/home/Navbar";
import { Newsletter } from "@/components/home/Newsletter";
import { ScrollToTop } from "@/components/home/ScrollToTop";
import { Testimonials } from "@/components/home/Testimonials";
import { Head } from "@inertiajs/react";
// import "@/components/home/App.css";

function App() {
    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <div className="container mx-auto px-4">
                <Hero />
                <About />
                <Features />
                <Testimonials />
                <Newsletter />
                <FAQ />
                <Footer />
                <ScrollToTop />
            </div>
        </>
    );
}

export default App;
