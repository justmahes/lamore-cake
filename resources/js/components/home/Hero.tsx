import { HeroCards } from "./HeroCards";
import { Button } from "./ui/button";

export const Hero = () => {
    return (
        <section className="relative overflow-hidden">
            <img src="assets/background.svg" alt="Background" className="absolute top-0 z-0 h-screen w-full object-cover" />

            <div className="container mx-auto grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2">
                <div className="z-10 space-y-6 text-center lg:text-start">
                    <main className="text-5xl font-bold md:text-6xl">
                        <h1 className="inline text-5xl font-extrabold">Jantung Kuliner Tradisional Bali di Denpasar</h1>
                    </main>

                    <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
                        Temukan keautentikan rasa dan suasana ramah di pusat jajanan homemade favorit masyarakat lokal sejak 2024.
                    </p>

                    <div className="space-y-4 md:space-y-0 md:space-x-4">
                        <a href="/products">
                            <Button className="w-full cursor-pointer border border-primary md:w-1/3">Produk Kami</Button>
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
