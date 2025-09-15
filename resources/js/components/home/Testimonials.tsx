import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TestimonialProps {
    image: string;
    name: string;
    userName: string;
    comment: string;
}

const testimonials: TestimonialProps[] = [
    {
        image: "https://cdn.pixabay.com/photo/2018/07/28/09/23/woman-3567600_960_720.jpg",
        name: "Sari Wijayanti",
        userName: "@sari_wiji",
        comment:
            "Kue-kue di Lamore Cake selalu segar dan enak! Favorit saya adalah brownies cokelat yang lembut dan tidak terlalu manis. Selalu jadi andalan untuk acara keluarga.",
    },
    {
        image: "https://cdn.pixabay.com/photo/2019/09/01/10/13/portrait-4444764_640.jpg",
        name: "Budi Santoso",
        userName: "@budi_santoso",
        comment:
            "Sudah berlangganan 2 tahun di Lamore Cake. Kualitas selalu konsisten dan pelayanannya ramah. Harga juga bersaing dengan kualitas premium.",
    },

    {
        image: "https://cdn.pixabay.com/photo/2022/07/06/12/58/woman-7305088_640.jpg",
        name: "Maya Indira",
        userName: "@maya_indira",
        comment:
            "Yang paling saya suka dari Lamore Cake adalah variasi rasanya yang unik! Cake pandan gula merah mereka benar-benar otentik dan mengingatkan masa kecil. Packaging juga rapi dan cantik.",
    },
    {
        image: "https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_640.jpg",
        name: "Ahmad Rifky",
        userName: "@ahmad_rifky",
        comment:
            "Pesen kue ulang tahun di Lamore Cake untuk anak saya. Hasilnya melebihi ekspektasi! Dekorasinya cantik dan rasanya lezat. Anak-anak pada suka semua.",
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/11/19/07/30/girl-2961959_640.jpg",
        name: "Fitri Rahayu",
        userName: "@fitri_rahayu",
        comment: "Croissant dan danish pastry-nya juara! Tekstur renyah di luar, lembut di dalam. Perfect untuk sarapan atau teman minum teh sore.",
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_640.jpg",
        name: "Dimas Prakoso",
        userName: "@dimas_prakoso",
        comment:
            "Lamore Cake jadi toko kue langganan kantor untuk acara meeting. Kue tar buah segar mereka selalu jadi favorit tim. Delivery juga selalu on time!",
    },
];

export const Testimonials = () => {
    return (
        <section id="testimonials" className="relative overflow-hidden">
            <img src="assets/inter-section.svg" alt="Background" className="absolute inset-0 z-0 h-full w-full object-cover" />

            <div className="relative container mx-auto py-24 sm:py-32">
                <h2 className="text-3xl font-bold md:text-4xl">
                    Mengapa
                    <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent"> Lamore Cake </span>
                    Jadi Pilihan Utama?
                </h2>

                <p className="pt-4 pb-8 text-xl text-muted-foreground">
                    Temukan kelezatan otentik dan kehangatan komunitas yang membuat pelanggan kami jatuh cinta.
                </p>

                <div className="z-10 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {testimonials.map(({ image, name, userName, comment }: TestimonialProps) => (
                        <Card
                            key={userName}
                            className="group overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg md:break-inside-avoid"
                        >
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <Avatar className="transition duration-200 group-hover:ring-2 group-hover:ring-accent group-hover:ring-offset-2">
                                    <AvatarImage alt="" src={image} />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col">
                                    <CardTitle className="text-lg transition-colors duration-200 group-hover:text-foreground">{name}</CardTitle>
                                    <CardDescription className="transition-colors duration-200 group-hover:text-accent">{userName}</CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent className="transition-colors duration-200 group-hover:text-foreground">{comment}</CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
