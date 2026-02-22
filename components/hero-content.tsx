"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PhoneCallIcon, Github, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export function HeroContent() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll("[data-animate]");

        // Make sure elements are visible before animating
        gsap.set(elements, { opacity: 0, y: 40 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            delay: 0.3,
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex flex-col items-center justify-center gap-5 pt-32 pb-30"
        >
            <a
                data-animate
                className={cn(
                    "group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow",
                    "transition-all"
                )}
                href="https://github.com/CriticalMalwareHacker/ui-components"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Github className="size-3 text-muted-foreground" />
                <span className="text-xs">Star on Github!</span>
                <Star className="size-3 text-muted-foreground" />
                <span className="block h-5 border-l" />
                <ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1" />
            </a>

            <h1
                data-animate
                className={cn(
                    "text-balance text-center text-4xl tracking-tight md:text-5xl lg:text-6xl",
                    "text-shadow-[0_0px_50px_theme(--color-foreground/.2)]"
                )}
            >
                A Niche UI Library<br /> for Developers
            </h1>

            <p
                data-animate
                className="mx-auto max-w-md text-center text-base text-foreground/80 tracking-wider sm:text-lg md:text-xl"
            >
                Conecting you with world-class talent <br /> to scale, innovate and lead
            </p>

            <div
                data-animate
                className="flex flex-row flex-wrap items-center justify-center gap-3 pt-2"
            >
                <Button
                    className="rounded-full border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/10"
                    size="lg"
                >
                    Get Started
                </Button>
                <Button
                    className="rounded-full bg-white text-black hover:bg-white/90"
                    size="lg"
                >
                    Browse Components{" "}
                    <ArrowRightIcon className="size-4 ms-2" data-icon="inline-end" />
                </Button>
            </div>
        </div>
    );
}
