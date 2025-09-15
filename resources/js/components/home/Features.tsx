import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Badge } from "./ui/badge";

const featureList: string[] = ["Menggoda Selera", "Jajanan Fresh", "Lembut dan Nikmat", "Kue Penuh Cinta", "Promo & Penawaran Spesial"];

export const Features = () => {
    return (
        <section id="features" className="container mx-auto space-y-8 py-24 sm:py-32">
            <h2 className="text-3xl font-bold md:text-center lg:text-4xl">
                <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">Apa Yang Kami Tawarkan?</span>
            </h2>

            <div className="flex flex-wrap gap-4 md:justify-center">
                {featureList.map((feature: string) => (
                    <div key={feature}>
                        <Badge variant="secondary" className="text-sm">
                            {feature}
                        </Badge>
                    </div>
                ))}
            </div>

            <div className="bg-white px-4 py-10 sm:py-12 md:px-8 lg:px-16 xl:px-24">
                <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
                    <div className="relative flex flex-col items-center gap-4 md:flex-row">
                        <div className="w-full overflow-hidden rounded-2xl">
                            <Carousel>
                                <CarouselContent>
                                    <CarouselItem>
                                        <img src="/assets/home/2.jpg" alt="Owner" className="h-full w-full object-cover" />
                                    </CarouselItem>
                                    <CarouselItem>
                                        <img src="/assets/home/3.jpg" alt="Lamore Cake" className="h-full w-full object-cover" />
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 md:-left-12" />
                                <CarouselNext className="right-3 top-1/2 -translate-y-1/2 md:-right-12" />
                            </Carousel>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-2 text-sm font-semibold text-accent sm:text-base">Tentang Lamore Cake Kami</h4>
                        <h2 className="mb-3 text-2xl font-bold leading-tight text-secondary-foreground sm:mb-4 sm:text-3xl md:text-4xl">
                            Kelezatan Lamore Cake Tradisional <br /> Penuh Dengan Cinta
                        </h2>
                        <p className="mb-6 text-sm text-gray-600 sm:text-base">
                            Setiap butir Lamore Cake dibuat dengan sepenuh hati dan ketelitian, sehingga menghasilkan kelezatan yang sempurna di
                            setiap gigitan. Kami menjaga kualitas dan kebersihan agar Anda dapat menikmati Lamore Cake dengan aman dan nyaman.
                        </p>
                        <div className="inline-block rounded-xl bg-primary-foreground p-4 shadow-md sm:p-6">
                            <p className="text-2xl font-bold leading-tight text-primary sm:text-3xl">4+</p>
                            <p className="text-xs font-semibold uppercase text-gray-700 sm:text-sm">Tahun Usaha Lamore Cake</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
