"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Github, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import TextPressure from "@/components/text-pressure";

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

            {/* ── TextPressure title ── */}
            <div
                data-animate
                className="w-full"
                style={{ height: "clamp(72px, 12vw, 200px)" }}
            >
                <TextPressure
                    text="Dexterity UI"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    textColor="#ffffff"
                    minFontSize={36}
                    widthFactor={1.15}
                />
            </div>

            <h1
                data-animate
                className={cn(
                    "text-balance text-center text-xl tracking-tight md:text-2xl lg:text-3xl text-foreground/50",
                )}
            >
                A Niche UI Library. For Developers
            </h1>

            <p
                data-animate
                className="mx-auto max-w-md text-center text-base text-foreground/80 tracking-wider sm:text-lg md:text-xl"
            >
                Precision-crafted components. <br /> Interaction with intent.
            </p>

            <div
                data-animate
                className="flex flex-row flex-wrap items-center justify-center gap-3 pt-2"
            >
                <Link href="/Documentation">
                    <Button
                        className={cn(
                            "rounded-full size-lg border animate-bg-shine bg-[length:200%_100%] tracking-wide duration-[2200ms] shadow",
                            "dark:bg-[linear-gradient(110deg,#09090B,45%,#27272A,55%,#09090B)] dark:text-zinc-200 dark:border-zinc-800",
                            "bg-[linear-gradient(110deg,#FFF,45%,#E4E4E7,55%,#FFF)] text-zinc-800 border-zinc-300",
                        )}
                        size="lg"
                    >
                        Browse Components{" "}
                        <ArrowRightIcon className="size-4 ms-2" data-icon="inline-end" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
