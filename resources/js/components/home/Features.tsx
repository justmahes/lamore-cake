import { Badge } from "./ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import image from "./assets/growth.png";
import image3 from "./assets/reflecting.png";
import image4 from "./assets/looking-ahead.png";

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
const featureList: string[] = [
    "Galeri Jajanan Tradisional",
    "Detail Produk & Harga",
    "Form Pemesanan Online",
    "Testimoni Pelanggan",
    "Lokasi & Jam Buka",
    "Artikel Budaya Kuliner Bali",
    "Promo & Penawaran Spesial",
    "Kontak & Dukungan Pelanggan",
    "Integrasi Media Sosial",
];

export const Features = () => {
    return (
        <section
            id="features"
            className="container py-24 sm:py-32 space-y-8"
        >
            <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Nikmati Keunggulan Lamore Cake
                </span>
            </h2>

            <div className="flex flex-wrap md:justify-center gap-4">
                {featureList.map((feature: string) => (
                    <div key={feature}>
                        <Badge
                            variant="secondary"
                            className="text-sm"
                        >
                            {feature}
                        </Badge>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map(({ title, description, image }: FeatureProps) => (
                    <Card key={title}>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>

                        <CardContent>{description}</CardContent>

                        <CardFooter>
                            <img
                                src={image}
                                alt="About feature"
                                className="w-[200px] lg:w-[300px] mx-auto"
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};
