import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { SharedData } from "@/types";
import { usePage, router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { Menu, User, ShoppingCart } from "lucide-react";
import { buttonVariants } from "./ui/button";

interface RouteProps {
    href: string;
    label: string;
}

const commonRoutes: RouteProps[] = [
    { href: "/products", label: "Produk" },
    { href: "/about", label: "Tentang" },
];

export const Navbar = () => {
    const { auth, cart_count } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isAdmin = Boolean((auth as any)?.user?.role === "admin");

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => setIsScrolled(window.scrollY > 12);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const routeList: RouteProps[] = useMemo(
        () => [
            ...(isAdmin ? [{ href: "/admin/dashboard", label: "Admin" }] : []),
            ...commonRoutes,
            ...(auth.user ? [{ href: "/transactions", label: "Pesanan" }] : []),
            ...(auth.user ? [{ href: "/cart", label: "Keranjang" }] : []),
            ...(auth.user ? [] : [{ href: "/login", label: "Masuk" }]),
        ],
        [auth.user, isAdmin]
    );

    const current = typeof window !== "undefined" ? window.location.pathname : "";

    const desktopLinkClass = (href: string) => {
        const active = current === href || (href !== "/" && current.startsWith(href));
        return cn(
            "relative rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:text-emerald-600",
            "after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-emerald-400 after:content-[''] after:transition-transform after:duration-300 hover:after:scale-x-100",
            active && "text-emerald-600 after:scale-x-100 after:bg-emerald-500"
        );
    };

    const iconButtonClass = "rounded-full border border-transparent px-3 py-2 text-slate-500 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-600";

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 border-b border-emerald-100 bg-white/95 text-slate-900 shadow-sm backdrop-blur transition-all duration-300",
                isScrolled && "shadow-md"
            )}
        >
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container flex items-center justify-between gap-6 px-4 py-4">
                    <NavigationMenuItem className="flex font-bold">
                        <a
                            rel="noreferrer noopener"
                            href="/"
                            className="flex items-center gap-4 text-lg font-bold tracking-tight text-slate-900"
                        >
                            <img
                                src="/assets/brand/logo.png"
                                alt="Lamore Cake"
                                className="h-9 w-auto transition-transform duration-300 hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />
                            <span>Lamore Cake</span>
                        </a>
                    </NavigationMenuItem>

                    <span className="flex md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger
                                className="rounded-full border border-emerald-100 bg-white px-3 py-2 text-slate-600 shadow-sm transition hover:border-emerald-200 hover:text-emerald-600"
                                aria-label="Buka navigasi"
                            >
                                <Menu className="h-5 w-5" aria-hidden="true" />
                            </SheetTrigger>

                            <SheetContent side="left" className="bg-white/95 backdrop-blur-xl">
                                <SheetHeader>
                                    <SheetTitle className="text-xl font-bold text-slate-900">Lamore Cake</SheetTitle>
                                </SheetHeader>
                                <nav className="mt-6 flex flex-col gap-2">
                                    {routeList.map(({ href, label }) => (
                                        <a
                                            rel="noreferrer noopener"
                                            key={label}
                                            href={href}
                                            onClick={() => setIsOpen(false)}
                                            className="inline-flex items-center gap-2 rounded-full border border-emerald-100 px-4 py-2 text-base font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </span>

                    <nav className="hidden items-center gap-3 md:flex">
                        {routeList.map((route) => {
                            if (route.label === "Keranjang") {
                                return null;
                            }

                            return (
                                <a
                                    rel="noreferrer noopener"
                                    href={route.href}
                                    key={route.label}
                                    className={desktopLinkClass(route.href)}
                                >
                                    {route.label}
                                </a>
                            );
                        })}

                        {auth.user && (
                            <a
                                href="/cart"
                                aria-label="Keranjang"
                                className={cn(
                                    iconButtonClass,
                                    "relative inline-flex items-center justify-center"
                                )}
                                title="Keranjang"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {(cart_count ?? 0) > 0 && (
                                    <span className="absolute -right-1 -top-1 inline-flex min-w-[18px] translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 px-1.5 text-[10px] font-semibold leading-4 text-white">
                                        {Math.min(99, Number(cart_count))}
                                    </span>
                                )}
                            </a>
                        )}

                        {auth.user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={cn(
                                            buttonVariants({ variant: "ghost" }),
                                            iconButtonClass,
                                            "!bg-transparent"
                                        )}
                                        aria-label="Profil"
                                        title="Profil"
                                    >
                                        <User className="h-5 w-5" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        className="font-medium transition hover:bg-emerald-50 hover:text-emerald-600"
                                        onClick={() => (window.location.href = "/profile")}
                                    >
                                        Kelola Profil
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="font-medium text-red-600 transition hover:bg-red-50"
                                        onClick={() => router.post(route("logout"))}
                                    >
                                        Keluar
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </nav>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
};
