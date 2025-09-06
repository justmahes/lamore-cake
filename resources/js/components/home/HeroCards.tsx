import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

import { LightBulbIcon } from "./Icons";

export const HeroCards = () => {
    return (
        <div className="relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex">
            {/* Testimonial */}
            <Card className="absolute -top-[15px] w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar>
                        <AvatarImage alt="" src="https://cdn.pixabay.com/photo/2015/07/14/06/09/man-844212_640.jpg" />
                        <AvatarFallback>Profile</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <CardTitle className="text-lg">Anjayani</CardTitle>
                        <CardDescription>@anjayani</CardDescription>
                    </div>
                </CardHeader>

                <CardContent>Sangat Nikmat!</CardContent>
            </Card>

            {/* Team */}
            <Card className="absolute top-4 right-[20px] flex w-80 flex-col items-center justify-center overflow-hidden p-0 shadow-black/10 drop-shadow-xl dark:shadow-white/10">
                <img src="https://cdn.pixabay.com/photo/2015/01/06/20/58/cake-590815_960_720.jpg" alt="Cake Image" />
            </Card>

            {/* Pricing */}
            <Card className="absolute top-[150px] left-[50px] w-72 shadow-black/10 drop-shadow-xl dark:shadow-white/10">
                <CardHeader>
                    <CardTitle className="mb-2 ml-auto flex justify-between">
                        <Badge variant="secondary" className="text-sm text-primary">
                            Most popular
                        </Badge>
                    </CardTitle>
                    <div>
                        <span className="text-xl font-bold">Cake Manis Asam Jawa</span>
                    </div>

                    <CardDescription>
                        Nikmati kelezatan kue tradisional dengan cita rasa asam jawa yang menyegarkan dan tekstur yang lembut.
                    </CardDescription>
                </CardHeader>

                {/* <CardContent>
                    <Button className="w-full">Detail</Button>
                </CardContent> */}
            </Card>

            {/* Service */}
            <Card className="absolute -right-[10px] bottom-[65px] w-[350px] shadow-black/10 drop-shadow-xl dark:shadow-white/10">
                <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
                    <div className="mt-1 rounded-2xl bg-primary/20 p-1">
                        <LightBulbIcon />
                    </div>
                    <div>
                        <CardTitle>Tahukah kamu?</CardTitle>
                        <CardDescription className="text-md mt-2">Untuk pengalaman terbaik, cicipi jajanan Lamore Cake selagi segar.</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};
