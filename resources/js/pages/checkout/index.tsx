import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Check, Hash, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Head, useForm, usePage } from "@inertiajs/react";

import FlashMessage from "@/components/flash-message";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const inputBaseClass =
    "peer flex h-12 w-full items-center rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-inner shadow-emerald-50 transition placeholder-transparent focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:cursor-not-allowed disabled:opacity-70";

const iconInputClass = cn(inputBaseClass, "pl-10 pr-4");

const textAreaClass =
    "peer min-h-[120px] w-full rounded-md border border-gray-200 bg-white p-4 text-sm font-medium text-slate-900 shadow-inner shadow-emerald-50 transition placeholder:text-slate-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:cursor-not-allowed disabled:opacity-70";

const iconWrapperClass =
    "pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-emerald-500";

type ToastDetail = {
    type: "success" | "error" | "warning" | "info";
    text: string;
    duration?: number;
    id?: string;
    replace?: boolean;
};

const pushToast = (detail: ToastDetail) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("app:toast", { detail }));
};

type Step = {
    label: string;
    status: "complete" | "current" | "upcoming";
};

const steps: Step[] = [
    { label: "Keranjang", status: "complete" },
    { label: "Pengiriman", status: "current" },
    { label: "Pembayaran", status: "upcoming" },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?\d{8,15}$/;

export default function Checkout() {
    const { auth } = usePage().props as any;
    const user = auth?.user || {};

    const savedArea = (() => {
        const addr: string = user.address || "";
        const match = addr.match(/Denpasar\s+(Utara|Timur|Barat|Selatan)/i);
        if (!match) return "";
        const area = match[1]?.toLowerCase();
        if (area === "utara") return "Utara";
        if (area === "timur") return "Timur";
        if (area === "barat") return "Barat";
        if (area === "selatan") return "Selatan";
        return "";
    })();

    const savedAddressLine = (() => {
        let addr: string = user.address || "";
        if (!addr) return "";
        addr = addr.replace(/^\s*Denpasar\s+(Utara|Timur|Barat|Selatan)\s*,\s*/i, "");
        addr = addr.replace(/\s*(\d{5})\s*$/, "");
        return addr.trim();
    })();

    const savedPostal = (() => {
        if (user.postal_code) return String(user.postal_code);
        const addr: string = user.address || "";
        const match = addr.match(/(\d{5})\s*$/);
        return match ? match[1] : "";
    })();

    const form = useForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        area: savedArea,
        postal_code: savedPostal,
        address_line: savedAddressLine,
    });

    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const fetchPostal = async (area: string) => {
        form.setData("area", area);
        try {
            const res = await fetch(`/api/postal-code?city=denpasar&area=${encodeURIComponent(area)}`);
            if (res.ok) {
                const data = await res.json();
                if (data?.postal_code) {
                    form.setData("postal_code", String(data.postal_code));
                    pushToast({ type: "info", text: "Kode pos diperbarui otomatis sesuai area." });
                }
            }
        } catch (error) {
            // keep existing postal code if request fails
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post("/checkout", {
            onSuccess: () => {
                pushToast({ type: "success", text: "Alamat pengiriman tersimpan. Lanjutkan pembayaran." });
            },
        });
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        form.setData("email", value);
        setEmailError(!value ? null : emailPattern.test(value) ? null : "Format email tidak valid");
    };

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        form.setData("phone", value);
        setPhoneError(!value ? null : phonePattern.test(value) ? null : "Nomor telepon minimal 8 digit");
    };

    const [showErrorToast, setShowErrorToast] = useState(false);
    const hasErrors = useMemo(() => Object.keys(form.errors).length > 0, [form.errors]);

    useEffect(() => {
        if (hasErrors) {
            setShowErrorToast(true);
            const timer = setTimeout(() => setShowErrorToast(false), 6000);
            return () => clearTimeout(timer);
        }
    }, [hasErrors]);

    const circleBase = "flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300";
    const circleStyles: Record<Step["status"], string> = {
        complete: "border-emerald-500 bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-lg shadow-emerald-300/60",
        current: "border-emerald-500 bg-white text-emerald-600",
        upcoming: "border-gray-300 bg-white text-gray-400",
    };
    const textStyles: Record<Step["status"], string> = {
        complete: "text-emerald-600",
        current: "text-emerald-600 font-semibold",
        upcoming: "text-gray-400",
    };

    return (
        <>
            <Navbar />
            <Head title="Checkout" />
            <FlashMessage />
            <main className="bg-slate-50">
                <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 pb-28 pt-28">
                    <nav aria-label="Progress" className="rounded-3xl border border-emerald-100 bg-white/80 p-4 shadow-sm shadow-emerald-100/60">
                        <ol className="flex snap-x overflow-x-auto justify-between gap-6 md:gap-10">
                            {steps.map((step, index) => (
                                <li key={step.label} className="flex min-w-[120px] snap-center flex-col items-center gap-2 text-center transition-all duration-300">
                                    <div className={cn(circleBase, circleStyles[step.status])} aria-current={step.status === "current" ? "step" : undefined}>
                                        {step.status === "complete" ? <Check className="h-5 w-5" /> : index + 1}
                                    </div>
                                    <span className={cn("text-sm transition-colors duration-300", textStyles[step.status])}>{step.label}</span>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <Card className="overflow-hidden rounded-3xl border border-emerald-100 bg-white/95 shadow-xl shadow-emerald-100/60 transition-all duration-300">
                        <CardHeader className="border-b border-emerald-50 pb-4">
                            <CardTitle className="text-2xl font-bold text-slate-900">Detail Pengiriman</CardTitle>
                            <p className="text-sm text-slate-500">Pesananmu akan dikirim ke alamat ini dalam 1-2 hari kerja.</p>
                        </CardHeader>
                        <CardContent className="py-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <div className="relative">
                                            <span className={iconWrapperClass}>
                                                <UserRound className="h-4 w-4" />
                                            </span>
                                            <Input
                                                id="name"
                                                placeholder=" "
                                                value={form.data.name}
                                                onChange={(event) => form.setData("name", event.target.value)}
                                                autoComplete="name"
                                                required
                                                className={cn(iconInputClass, form.errors.name && "border-red-300 focus:border-red-400 focus:ring-red-200")}
                                            />
                                            <Label
                                                htmlFor="name"
                                                className="pointer-events-none absolute left-10 -top-2 bg-white px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-2 peer-focus:text-green-500"
                                            >
                                                Nama Lengkap
                                            </Label>
                                        </div>
                                        <InputError message={form.errors.name} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="relative">
                                            <span className={iconWrapperClass}>
                                                <Mail className="h-4 w-4" />
                                            </span>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder=" "
                                                value={form.data.email}
                                                onChange={handleEmailChange}
                                                autoComplete="email"
                                                required
                                                className={cn(iconInputClass, (emailError || form.errors.email) && "border-red-300 focus:border-red-400 focus:ring-red-200")}
                                            />
                                            <Label
                                                htmlFor="email"
                                                className="pointer-events-none absolute left-10 -top-2 bg-white px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-2 peer-focus:text-green-500"
                                            >
                                                Email
                                            </Label>
                                        </div>
                                        <InputError message={emailError || form.errors.email} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="relative">
                                            <span className={iconWrapperClass}>
                                                <Phone className="h-4 w-4" />
                                            </span>
                                            <Input
                                                id="phone"
                                                placeholder=" "
                                                value={form.data.phone}
                                                onChange={handlePhoneChange}
                                                autoComplete="tel"
                                                required
                                                className={cn(iconInputClass, (phoneError || form.errors.phone) && "border-red-300 focus:border-red-400 focus:ring-red-200")}
                                            />
                                            <Label
                                                htmlFor="phone"
                                                className="pointer-events-none absolute left-10 -top-2 bg-white px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-2 peer-focus:text-green-500"
                                            >
                                                No. Telepon
                                            </Label>
                                        </div>
                                        <InputError message={phoneError || form.errors.phone} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="area" className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                                            Area (Denpasar)
                                        </Label>
                                        <div className="relative">
                                            <span className={iconWrapperClass}>
                                                <MapPin className="h-4 w-4" />
                                            </span>
                                            <Select value={form.data.area} onValueChange={(value) => fetchPostal(value)}>
                                                <SelectTrigger
                                                    id="area"
                                                    className={cn(
                                                        "flex h-12 w-full items-center rounded-md border border-gray-200 bg-white pl-10 pr-10 text-left text-sm font-medium text-slate-900 shadow-inner shadow-emerald-50 transition focus:border-green-400 focus:ring-2 focus:ring-green-400",
                                                        form.errors.area && "border-red-300 focus:border-red-400 focus:ring-red-200"
                                                    )}
                                                >
                                                    <SelectValue placeholder="Pilih area" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border border-emerald-100 bg-white shadow-lg shadow-emerald-100/70">
                                                    <SelectItem value="Utara">Denpasar Utara</SelectItem>
                                                    <SelectItem value="Timur">Denpasar Timur</SelectItem>
                                                    <SelectItem value="Barat">Denpasar Barat</SelectItem>
                                                    <SelectItem value="Selatan">Denpasar Selatan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <InputError message={form.errors.area} />
                                    </div>

                                    <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
                                        <div className="relative">
                                            <span className={iconWrapperClass}>
                                                <Hash className="h-4 w-4" />
                                            </span>
                                            <Input
                                                id="postal"
                                                type="text"
                                                placeholder=" "
                                                value={form.data.postal_code}
                                                readOnly
                                                className={cn(iconInputClass, "cursor-not-allowed pr-24", form.errors.postal_code && "border-red-300 focus:border-red-400 focus:ring-red-200")}
                                            />
                                            <Label
                                                htmlFor="postal"
                                                className="pointer-events-none absolute left-10 -top-2 bg-white px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-2 peer-focus:text-green-500"
                                            >
                                                Kode Pos
                                            </Label>
                                            <span className="absolute right-3 top-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600">
                                                Otomatis
                                            </span>
                                        </div>
                                        <InputError message={form.errors.postal_code} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="relative">
                                        <textarea
                                            id="address_line"
                                            placeholder="Masukkan alamat lengkap"
                                            value={form.data.address_line}
                                            onChange={(event) => form.setData("address_line", event.target.value)}
                                            className={cn(textAreaClass, form.errors.address_line && "border-red-300 focus:border-red-400 focus:ring-red-200")}
                                        />
                                        <Label
                                            htmlFor="address_line"
                                            className="pointer-events-none absolute left-4 -top-2 bg-white px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 transition-all duration-150 peer-focus:-top-2 peer-focus:text-green-500"
                                        >
                                            Alamat Lengkap
                                        </Label>
                                    </div>
                                    <InputError message={form.errors.address_line || form.errors.address} />
                                </div>

                                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-600 shadow-sm transition-transform duration-150 hover:scale-[1.01] hover:border-emerald-300 hover:bg-emerald-50 sm:w-auto"
                                        onClick={() => window.history.back()}
                                    >
                                        Sebelumnya
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={form.processing}
                                        className="w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/40 transition-transform duration-150 hover:scale-[1.01] hover:shadow-emerald-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 sm:w-auto"
                                    >
                                        Lanjutkan Pembayaran
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {showErrorToast && (
                <div className="fixed top-4 right-4 z-50 w-[min(92vw,28rem)] rounded-xl bg-red-600/95 text-white shadow-lg ring-1 ring-black/10">
                    <div className="flex items-start gap-3 px-4 py-3">
                        <div className="flex-1">
                            <div className="text-sm font-semibold">Data belum lengkap</div>
                            <div className="text-sm leading-5">Lengkapi data pengiriman sebelum melanjutkan pembayaran.</div>
                        </div>
                        <button
                            type="button"
                            aria-label="Tutup notifikasi"
                            className="text-lg font-semibold opacity-85 transition-opacity hover:opacity-100"
                            onClick={() => setShowErrorToast(false)}
                        >
                            x
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
