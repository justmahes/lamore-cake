import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export const HeroCards = () => {
    return (
        <div className="relative grid gap-6 rounded-[32px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-white/20 blur-3xl" aria-hidden="true" />
            <div className="grid gap-6 sm:grid-cols-2">
                <Card className="border-white/30 bg-white/95 shadow-lg shadow-emerald-500/10 transition-transform duration-300 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center gap-4 pb-4">
                        <Avatar className="ring-2 ring-emerald-200">
                            <AvatarImage alt="" src="https://cdn.pixabay.com/photo/2015/07/14/06/09/man-844212_640.jpg" loading="lazy" decoding="async" />
                            <AvatarFallback>SW</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg text-slate-900">Sukmawati</CardTitle>
                            <CardDescription className="text-emerald-500">@sukmawati</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">
                        “Selalu lembut & wangi! Lamore Cake sudah jadi langganan keluarga sejak 2021.”
                    </CardContent>
                </Card>

                <Card className="overflow-hidden border-white/30 bg-white/5 shadow-lg shadow-emerald-500/15 transition-transform duration-300 hover:-translate-y-1">
                    <div className="relative h-full">
                        <img
                            src="/assets/home/1.jpg"
                            alt="Signature cake"
                            className="h-full w-full rounded-2xl object-cover transition duration-500 ease-out hover:scale-105"
                            loading="lazy"
                            decoding="async"
                        />
                        <Badge className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-600 shadow-lg">
                            Kategori Favorit
                        </Badge>
                    </div>
                </Card>
            </div>

            <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
                <Card className="border-white/30 bg-white/95 shadow-lg shadow-emerald-500/10 transition-transform duration-300 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
                        <div>
                            <Badge variant="secondary" className="rounded-full bg-emerald-100 text-emerald-600">
                                Custom Order
                            </Badge>
                            <CardTitle className="mt-3 text-2xl font-bold text-slate-900">Hampers Premium</CardTitle>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">Start from 150K</span>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">
                        Koleksi hampers cantik dengan pilihan kue tradisional dan modern, siap memikat hati penerima.
                    </CardContent>
                </Card>

                <Card className="flex flex-col justify-between border-white/30 bg-white/95 p-5 text-slate-700 shadow-lg shadow-emerald-500/10 transition-transform duration-300 hover:-translate-y-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-slate-900">Tahukah kamu?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <p>Kue kami dibuat segar setiap pagi dengan bahan lokal berkualitas dan tanpa pengawet tambahan.</p>
                        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-3 py-2 text-emerald-700">
                            <span className="text-xl">✨</span>
                            Pesan H-1 untuk request dekorasi khusus.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
