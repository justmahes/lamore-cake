import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import image from "./assets/growth.png";
import image4 from "./assets/looking-ahead.png";
import image3 from "./assets/reflecting.png";
import { Badge } from "./ui/badge";

interface FeatureProps {
    title: string;
    description: string;
    image: string;
}

const features: FeatureProps[] = [
    {
        title: "Pudding Tape Manis",
        description:
            "Nikmati kesegaran dan manisnya pudding tape homemade kami, dibuat dari tape pilihan dengan tekstur lembut yang lumer di mulut. Camilan sempurna untuk segala suasana.",
        image: image,
    },
    {
        title: "Kue Bolu Bali Otentik",
        description:
            "Rasakan kelembutan dan aroma khas Kue Bolu Bali Lamore Cake. Resep tradisional yang diwariskan turun-temurun, menghadirkan cita rasa Bali yang sesungguhnya di setiap gigitan.",
        image: image3,
    },
    {
        title: "Hampers Jajanan Tradisional",
        description:
            "Berikan hadiah spesial dengan hampers eksklusif dari Lamore Cake. Berisi aneka jajanan tradisional Bali pilihan yang dibuat segar, cocok untuk buah tangan atau bingkisan istimewa.",
        image: image4,
    },
];
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

            <div className="bg-white px-4 py-12 md:px-12 lg:px-24">
                <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
                    <div className="relative flex flex-col items-center gap-4 md:flex-row">
                        <div className="w-full overflow-hidden rounded-2xl">
                            <Carousel>
                                <CarouselContent>
                                    <CarouselItem>
                                        <img
                                            src="https://cdn.pixabay.com/photo/2019/07/10/03/58/taro-cake-4327814_640.jpg"
                                            alt="Owner"
                                            className="h-full w-full object-cover"
                                        />
                                    </CarouselItem>
                                    <CarouselItem>
                                        <img
                                            src="https://cdn.pixabay.com/photo/2017/02/27/17/35/cake-2103761_640.jpg"
                                            alt="Klepon"
                                            className="h-full w-full object-cover"
                                        />
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-2 font-semibold text-accent">Tentang Klepon Kami</h4>
                        <h2 className="mb-4 text-3xl leading-tight font-bold text-secondary-foreground md:text-4xl">
                            Kelezatan Klepon Tradisional <br /> Penuh Dengan Cinta
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Setiap butir klepon dibuat dengan sepenuh hati dan ketelitian, sehingga menghasilkan kelezatan yang sempurna di setiap
                            gigitan. Kami menjaga kualitas dan kebersihan agar Anda dapat menikmati klepon dengan aman dan nyaman.
                        </p>
                        <div className="inline-block rounded-xl bg-primary-foreground p-6 shadow-md">
                            <p className="text-3xl leading-tight font-bold text-primary">2+</p>
                            <p className="text-sm font-semibold text-gray-700 uppercase">Tahun Usaha Klepon</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
