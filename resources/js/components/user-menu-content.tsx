import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/components/user-info";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { type User } from "@/types";
import { Link, router } from "@inertiajs/react";
import { LogOut, Settings } from "lucide-react";

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild className="group hover:cursor-pointer">
                    <Link className="block w-full" href={route("profile.edit")} as="button" prefetch onClick={cleanup}>
                        <Settings className="mr-2 group-hover:stroke-white" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                asChild
                className="group/destructive hover:cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
                <Link
                    className="flex w-full items-center gap-2 px-1.5 py-0.5"
                    method="post"
                    href={route("logout")}
                    as="button"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-1 size-4 text-red-600 group-hover/destructive:text-red-700 dark:text-red-400 dark:group-hover/destructive:text-red-300" />
                    <span className="font-medium">Log out</span>
                </Link>
            </DropdownMenuItem>

        </>
    );
}
