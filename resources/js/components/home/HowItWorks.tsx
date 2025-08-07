import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";
import { type JSX } from "react";

interface FeatureProps {
    icon: JSX.Element;
    title: string;
    description: string;
}

const features: FeatureProps[] = [
    {
        icon: <MedalIcon />,
        title: "Pilih Produk",
        description:
            "Jelajahi berbagai pilihan kue dan pastry berkualitas tinggi yang kami tawarkan di katalog online.",
    },
    {
        icon: <MapIcon />,
        title: "Pesan Online",
        description:
            "Tambahkan produk pilihan ke keranjang dan lakukan pemesanan dengan mudah melalui sistem online kami.",
    },
    {
        icon: <PlaneIcon />,
        title: "Proses Pembuatan",
        description:
            "Tim baker kami akan menyiapkan pesanan Anda dengan bahan segar dan standar kualitas terbaik.",
    },
    {
        icon: <GiftIcon />,
        title: "Siap Dinikmati",
        description:
            "Pesanan siap untuk pickup atau delivery sesuai jadwal yang telah disepakati. Nikmati kelezatannya!",
    },
];

export const HowItWorks = () => {
    return (
        <section
            id="howItWorks"
            className="container text-center py-24 sm:py-32"
        >
            <h2 className="text-3xl md:text-4xl font-bold ">
                Cara{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Memesan{" "}
                </span>
                di Lamore Cake
            </h2>
            <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
                Empat langkah mudah untuk menikmati kelezatan kue dan pastry berkualitas premium dari Lamore Cake.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map(({ icon, title, description }: FeatureProps) => (
                    <Card
                        key={title}
                        className="bg-muted/50"
                    >
                        <CardHeader>
                            <CardTitle className="grid gap-4 place-items-center">
                                {icon}
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>{description}</CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
