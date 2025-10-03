import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";

interface TestimonialProps {
    image: string;
    name: string;
    userName: string;
    comment: string;
    rating: number;
}

const testimonials: TestimonialProps[] = [
    {
        image: "https://cdn.pixabay.com/photo/2018/07/28/09/23/woman-3567600_960_720.jpg",
        name: "Sari Wijayanti",
        userName: "@sari_wiji",
        comment:
            "Kue-kue di Lamore Cake selalu segar dan enak! Favorit saya brownies cokelat yang lembut dan tidak terlalu manis.",
        rating: 5,
    },
    {
        image: "https://cdn.pixabay.com/photo/2019/09/01/10/13/portrait-4444764_640.jpg",
        name: "Budi Santoso",
        userName: "@budi_santoso",
        comment: "Sudah berlangganan 2 tahun. Kualitas selalu konsisten dan pelayanannya ramah.",
        rating: 5,
    },
    {
        image: "https://cdn.pixabay.com/photo/2022/07/06/12/58/woman-7305088_640.jpg",
        name: "Maya Indira",
        userName: "@maya_indira",
        comment: "Varian rasanya unik! Cake pandan gula merahnya otentik dan packaging sangat rapi.",
        rating: 5,
    },
    {
        image: "https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_640.jpg",
        name: "Ahmad Rifky",
        userName: "@ahmad_rifky",
        comment: "Pesan kue ulang tahun untuk anak saya, hasilnya melebihi ekspektasi!",
        rating: 5,
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/11/19/07/30/girl-2961959_640.jpg",
        name: "Fitri Rahayu",
        userName: "@fitri_rahayu",
        comment: "Croissant dan danish pastry-nya juara! Teksturnya renyah di luar, lembut di dalam.",
        rating: 4,
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_640.jpg",
        name: "Dimas Prakoso",
        userName: "@dimas_prakoso",
        comment: "Lamore Cake jadi andalan kantor untuk meeting. Delivery selalu on time!",
        rating: 5,
    },
];

export const Testimonials = () => {
    return (
        <section className="relative overflow-hidden py-24 sm:py-28">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-emerald-100" aria-hidden="true" />
            <div className="container relative mx-auto px-4 text-slate-900">
                <Reveal className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                        Cerita Pelanggan
                    </span>
                    <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                        Dipercaya Ribuan Pelanggan untuk Setiap Momen Manis
                    </h2>
                    <p className="mt-3 text-base text-slate-600 sm:text-lg">
                        Mereka berbagi pengalaman yang membuat kami terus berinovasi dan menjaga kualitas terbaik.
                    </p>
                </Reveal>

                <Reveal className="mt-12" delay={150}>
                    <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {testimonials.map((testimonial) => (
                                <CarouselItem key={testimonial.userName} className="pl-2 md:basis-1/2 md:pl-4 xl:basis-1/3">
                                    <Card className="h-full rounded-3xl border border-emerald-100 bg-white p-7 text-slate-800 shadow-[0_25px_60px_-35px_rgba(15,118,110,0.35)] transition duration-300 hover:-translate-y-2">
                                        <CardHeader className="flex flex-row items-center gap-4 pb-5">
                                            <Avatar className="h-14 w-14 ring-2 ring-emerald-200">
                                                <AvatarImage alt="" src={testimonial.image} loading="lazy" decoding="async" />
                                                <AvatarFallback>
                                                    {testimonial.name
                                                        .split(" ")
                                                        .map((part) => part[0])
                                                        .join("")
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <CardTitle className="text-lg font-semibold text-slate-900">
                                                    {testimonial.name}
                                                </CardTitle>
                                                <span className="text-sm text-emerald-500">{testimonial.userName}</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-6">
                                            <p className="text-base leading-relaxed text-slate-700">“{testimonial.comment}”</p>
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-600">
                                                    Rating
                                                </span>
                                                <div className="flex items-center gap-1 text-amber-400">
                                                    {Array.from({ length: 5 }).map((_, starIndex) => (
                                                        <Star
                                                            key={`${testimonial.userName}-${starIndex}`}
                                                            className={cn(
                                                                "h-5 w-5",
                                                                starIndex < testimonial.rating
                                                                    ? "fill-amber-400 text-amber-400"
                                                                    : "text-amber-200"
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-2 top-1/2 -translate-y-1/2 border-none bg-white/70 text-emerald-600 shadow hover:bg-white md:-left-10" />
                        <CarouselNext className="-right-2 top-1/2 -translate-y-1/2 border-none bg-white/70 text-emerald-600 shadow hover:bg-white md:-right-10" />
                    </Carousel>
                </Reveal>
            </div>
        </section>
    );
};
