import { useCallback, useEffect, useState } from "react";

export type Appearance = "light" | "dark" | "system";

const prefersDark = () => {
    if (typeof window === "undefined") {
        return false;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === "undefined") {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    const isDark = appearance === "dark" || (appearance === "system" && prefersDark());

    document.documentElement.classList.toggle("dark", isDark);
};

const mediaQuery = () => {
    if (typeof window === "undefined") {
        return null;
    }

    return window.matchMedia("(prefers-color-scheme: dark)");
};

const handleSystemThemeChange = () => {
    const currentAppearance = localStorage.getItem("appearance") as Appearance | null;
    if (currentAppearance !== "system") {
        return; // Only react to system changes when user selected 'system'
    }
    applyTheme("system");
};

export function initializeTheme() {
    const savedAppearance = (localStorage.getItem("appearance") as Appearance) || "light";
    // persist default if missing
    if (!localStorage.getItem("appearance")) {
        localStorage.setItem("appearance", savedAppearance);
        setCookie("appearance", savedAppearance);
    }
    applyTheme(savedAppearance);
    mediaQuery()?.addEventListener("change", handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>("light");

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);

        // Store in localStorage for client-side persistence...
        localStorage.setItem("appearance", mode);

        // Store in cookie for SSR...
        setCookie("appearance", mode);

        applyTheme(mode);
    }, []);

    useEffect(() => {
        const savedAppearance = localStorage.getItem("appearance") as Appearance | null;
        updateAppearance(savedAppearance || "light");

        return () => mediaQuery()?.removeEventListener("change", handleSystemThemeChange);
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
