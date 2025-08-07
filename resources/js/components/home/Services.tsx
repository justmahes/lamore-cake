import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import { type JSX } from "react";
import cubeLeg from "./assets/cube-leg.png";

interface ServiceProps {
    title: string;
    description: string;
    icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
    {
        title: "Kualitas Premium",
        description:
            "Menggunakan bahan-bahan berkualitas tinggi dan resep tradisional yang telah teruji untuk menghasilkan cita rasa yang istimewa.",
        icon: <ChartIcon />,
    },
    {
        title: "Custom Order", 
        description:
            "Melayani pemesanan kue custom untuk berbagai acara spesial seperti ulang tahun, pernikahan, dan perayaan lainnya.",
        icon: <WalletIcon />,
    },
    {
        title: "Fresh Daily",
        description:
            "Semua produk kami diproduksi segar setiap hari untuk menjamin kesegaran dan kelezatan yang optimal bagi pelanggan.",
        icon: <MagnifierIcon />,
    },
];

export const Services = () => {
    return (
        <section className="container py-24 sm:py-32">
            <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                            Keunggulan{" "}
                        </span>
                        Lamore Cake
                    </h2>

                    <p className="text-muted-foreground text-xl mt-4 mb-8 ">
                        Kami berkomitmen memberikan yang terbaik dengan layanan berkualitas tinggi dan produk yang selalu segar.
                    </p>

                    <div className="flex flex-col gap-8">
                        {serviceList.map(({ icon, title, description }: ServiceProps) => (
                            <Card key={title}>
                                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                                    <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                                        {icon}
                                    </div>
                                    <div>
                                        <CardTitle>{title}</CardTitle>
                                        <CardDescription className="text-md mt-2">
                                            {description}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>

                <img
                    src={cubeLeg}
                    className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
                    alt="About services"
                />
            </div>
        </section>
    );
};
