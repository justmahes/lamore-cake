import { HeroCards } from "./HeroCards";
import { Button } from "./ui/button";

export const Hero = () => {
    return (
        <section className="relative overflow-hidden">
            <img src="assets/background.svg" alt="Background" className="absolute top-0 z-0 h-screen w-full object-cover" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/35 to-black/50" />

            <div className="container relative z-10 mx-auto grid place-items-center gap-8 px-4 py-16 sm:gap-10 sm:px-6 sm:py-20 md:py-28 lg:grid-cols-2">
                <div className="space-y-6 text-center text-white lg:text-start">
                    <main className="text-4xl font-bold drop-shadow sm:text-5xl md:text-6xl">
                        <h1 className="inline text-4xl font-extrabold drop-shadow sm:text-5xl md:text-6xl">Jantung Kuliner Tradisional Bali di Denpasar</h1>
                    </main>

                    <p className="mx-auto text-base text-white/90 drop-shadow sm:text-lg md:w-10/12 lg:mx-0">
                        Temukan keautentikan rasa dan suasana ramah di pusat jajanan homemade favorit masyarakat lokal sejak 2021.
                    </p>

                    <div className="flex flex-col gap-3 md:flex-row">
                        <a href="/products">
                            <Button
                                className="w-full cursor-pointer md:w-auto bg-primary text-primary-foreground border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-accent/40"
                                size="lg"
                            >
                                Belanja Sekarang
                            </Button>
                        </a>
                        <a href="/about">
                            <Button
                                className="w-full cursor-pointer md:w-auto bg-accent text-accent-foreground border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:bg-accent/90 hover:text-accent-foreground focus-visible:ring-accent/40"
                                size="lg"
                            >
                                Tentang Kami
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Hero cards sections */}
                <div className="z-10">
                    <HeroCards />
                </div>

                {/* Shadow effect */}
                <div className="shadow"></div>
            </div>
        </section>
    );
};
