import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { SharedData } from "@/types";
import { usePage, router } from "@inertiajs/react";
import { useState } from "react";

// import { GitHubLogoIcon } from "@radix-ui/react-icons";
// import { ModeToggle } from "./mode-toggle";
import { Menu, User } from "lucide-react";
// import { LogoIcon } from "./Icons";
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
    const { auth } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isAdmin = Boolean((auth as any)?.user?.role === 'admin');
    const routeList: RouteProps[] = [
        ...(isAdmin ? [{ href: "/admin/dashboard", label: "Admin" }] : []),
        ...commonRoutes,
        ...(auth.user ? [{ href: "/cart", label: "Keranjang" }] : []),
        ...(auth.user ? [{ href: "/transactions", label: "Pesanan" }] : []),
        ...(auth.user ? [] : [{ href: "/login", label: "Masuk" }]),
    ];
    const current = typeof window !== "undefined" ? window.location.pathname : "";
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container flex h-14 w-screen items-center justify-between px-4">
                    <NavigationMenuItem className="flex font-bold">
                        <a rel="noreferrer noopener" href="/" className="ml-2 flex items-center gap-2 text-xl font-bold">
                            <img src="/assets/brand/logo.png" alt="Lamore Cake" className="h-8 w-auto md:h-9" />
                            <span className="hidden sm:inline">Lamore Cake</span>
                        </a>
                    </NavigationMenuItem>

                    {/* mobile */}
                    <span className="flex md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger className="px-2">
                                <Menu className="flex h-5 w-5 md:hidden" onClick={() => setIsOpen(true)}>
                                    <span className="sr-only">Menu Icon</span>
                                </Menu>
                            </SheetTrigger>

                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle className="text-xl font-bold">Lamore Cake</SheetTitle>
                                </SheetHeader>
                                <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                                    {routeList.map(({ href, label }: RouteProps) => (
                                        <a
                                            rel="noreferrer noopener"
                                            key={label}
                                            href={href}
                                            onClick={() => setIsOpen(false)}
                                            className={buttonVariants({ variant: "ghost" })}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </span>

                    {/* desktop */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {routeList.map((route: RouteProps, i) => {
                            const active = current === route.href || (route.href !== "/" && current.startsWith(route.href));
                            return (
                                <a
                                    rel="noreferrer noopener"
                                    href={route.href}
                                    key={i}
                                    className={`text-[15px] ${buttonVariants({
                                        variant: active ? "default" : "ghost",
                                    })}`}
                                    aria-current={active ? "page" : undefined}
                                >
                                    {route.label}
                                </a>
                            );
                        })}
                        {auth.user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className={buttonVariants({ variant: "ghost" })} aria-label="Profil">
                                        <User className="h-5 w-5" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      className="hover:bg-primary hover:text-primary-foreground font-medium"
                                      onClick={() => (window.location.href = "/profile/edit")}
                                    >
                                      Kelola Profil
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="group/destructive text-red-600 hover:bg-red-50 focus:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 font-medium"
                                      onClick={() => router.post(route('logout'))}
                                    >
                                      <span className="group-hover/destructive:text-red-700 dark:group-hover/destructive:text-red-300">Keluar</span>
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
