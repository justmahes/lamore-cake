import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

// import { GitHubLogoIcon } from "@radix-ui/react-icons";
// import { ModeToggle } from "./mode-toggle";
import { Menu } from "lucide-react";
import { LogoIcon } from "./Icons";
import { buttonVariants } from "./ui/button";

interface RouteProps {
    href: string;
    label: string;
}

const commonRoutes: RouteProps[] = [
    { href: "/gallery", label: "Gallery" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Lamore Cake" },
];

export const Navbar = () => {
    const { auth } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const routeList: RouteProps[] = [
        ...commonRoutes,
        ...(auth.user ? [{ href: "/cart", label: "Cart" }] : []),
        auth.user ? { href: "/dashboard", label: "Dashboard" } : { href: "/login", label: "Login" },
    ];
    return (
        <header className="sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container flex h-14 w-screen justify-between px-4">
                    <NavigationMenuItem className="flex font-bold">
                        <a rel="noreferrer noopener" href="/" className="ml-2 flex text-xl font-bold">
                            <LogoIcon />
                            Lamore Cake
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
                    <nav className="hidden gap-2 md:flex">
                        {routeList.map((route: RouteProps, i) => (
                            <a
                                rel="noreferrer noopener"
                                href={route.href}
                                key={i}
                                className={`text-[17px] ${buttonVariants({
                                    variant: "default",
                                })}`}
                            >
                                {route.label}
                            </a>
                        ))}
                    </nav>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
};
