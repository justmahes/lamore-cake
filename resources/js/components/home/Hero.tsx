import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
    return (
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
            <div className="text-center lg:text-start space-y-6">
                <main className="text-5xl md:text-6xl font-bold">
                    <h1 className="inline text-5xl font-extrabold">
                        Jantung Kuliner Tradisional Bali di Denpasar
                    </h1>
                </main>

                <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                    Temukan keautentikan rasa dan suasana ramah di pusat jajanan homemade favorit masyarakat lokal sejak 2024.
                </p>

                <div className="space-y-4 md:space-y-0 md:space-x-4">
                    <Button className="w-full md:w-1/3 cursor-pointer">Menu Kami</Button>

                    <a
                        rel="noreferrer noopener"
                        href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                        target="_blank"
                        className={`w-full md:w-1/3 ${buttonVariants({
                            variant: "outline",
                        })}`}
                    >
                        Instagram
                        <InstagramLogoIcon className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Hero cards sections */}
            <div className="z-10">
                <HeroCards />
            </div>

            {/* Shadow effect */}
            <div className="shadow"></div>
        </section>
    );
};
