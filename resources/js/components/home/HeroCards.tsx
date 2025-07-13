import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { LightBulbIcon } from "./Icons";

export const HeroCards = () => {
    return (
        <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
            {/* Testimonial */}
            <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar>
                        <AvatarImage
                            alt=""
                            src="https://github.com/shadcn.png"
                        />
                        <AvatarFallback>Profile</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <CardTitle className="text-lg">Anjayani</CardTitle>
                        <CardDescription>@anjayani</CardDescription>
                    </div>
                </CardHeader>

                <CardContent>So Delicious</CardContent>
            </Card>

            {/* Team */}
            <Card className="p-0 absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <img src="https://placehold.co/600x520?text=Cake" alt="Cake Image" />
            </Card>

            {/* Pricing */}
            <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader>
                    <CardTitle className="flex ml-auto justify-between mb-2">
                        <Badge
                            variant="secondary"
                            className="text-sm text-primary"
                        >
                            Most popular
                        </Badge>
                    </CardTitle>
                    <div>
                        <span className="text-xl font-bold">Cake Manis Asam Jawa</span>
                    </div>

                    <CardDescription>
                        Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button className="w-full">Detail</Button>
                </CardContent>
            </Card>

            {/* Service */}
            <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                    <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                        <LightBulbIcon />
                    </div>
                    <div>
                        <CardTitle>Tahukah kamu?</CardTitle>
                        <CardDescription className="text-md mt-2">
                            Untuk pengalaman terbaik, cicipi jajanan Lamore Cake selagi segar.
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};
