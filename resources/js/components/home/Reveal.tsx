import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = containerRef.current;
        if (!element || typeof window === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "transition-all duration-700 ease-out will-change-transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};
