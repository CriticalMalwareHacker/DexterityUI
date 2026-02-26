"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
 * Types
 * ──────────────────────────────────────────────────────────── */

export interface CometCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** URL of the card image */
    imageUrl: string;
    /** Card title */
    title: string;
    /** Card description */
    description: string;
    /** Optional badge text shown over the image */
    badge?: string;
    /** "default" — simple hover zoom | "comet" — rotating border + 3D tilt */
    variant?: "default" | "comet";
    /** Click handler — when provided the card becomes interactive */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /** Alt text for the image (defaults to title) */
    imageAlt?: string;
}

/* ────────────────────────────────────────────────────────────
 * Component
 * ──────────────────────────────────────────────────────────── */

const CometCard = React.forwardRef<HTMLDivElement, CometCardProps>(
    (
        {
            imageUrl,
            title,
            description,
            badge,
            variant = "default",
            onClick,
            imageAlt,
            className,
            ...props
        },
        ref
    ) => {
        const cardRef = React.useRef<HTMLDivElement>(null);
        const isComet = variant === "comet";
        const isClickable = !!onClick;

        /* ── 3D tilt state (comet only) ─────────────────────────── */
        const [tilt, setTilt] = React.useState({ rotateX: 0, rotateY: 0 });
        const [isHovered, setIsHovered] = React.useState(false);

        /**
         * 3D TILT EFFECT — how it works:
         *
         * 1. We get the card's bounding rect on every mousemove.
         * 2. Compute the cursor's position as a fraction (0 → 1) of the
         *    card's width (x) and height (y).
         * 3. Map those fractions to a rotation range of ±12 degrees:
         *      rotateX  = (0.5 − y) × 24   ← tilt around the X-axis
         *      rotateY  = (x − 0.5) × 24   ← tilt around the Y-axis
         *    When the cursor is dead-center both values are 0 (flat).
         *    Moving up   → positive rotateX (top tips toward you)
         *    Moving left → negative rotateY (left tips toward you)
         * 4. The transform is applied with `perspective(800px)` so the
         *    rotation is rendered in 3D space.
         * 5. On mouse-leave we smoothly reset to (0, 0).
         */
        const handleMouseMove = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!isComet || !cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width; // 0 → 1
                const y = (e.clientY - rect.top) / rect.height; // 0 → 1
                setTilt({
                    rotateX: (0.5 - y) * 24, // max ±12°
                    rotateY: (x - 0.5) * 24,
                });
            },
            [isComet]
        );

        const handleMouseEnter = React.useCallback(() => setIsHovered(true), []);
        const handleMouseLeave = React.useCallback(() => {
            setIsHovered(false);
            setTilt({ rotateX: 0, rotateY: 0 });
        }, []);

        /* ── keyboard support ───────────────────────────────────── */
        const handleKeyDown = React.useCallback(
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (isClickable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
                }
            },
            [isClickable, onClick]
        );

        /* ── computed transforms ────────────────────────────────── */
        const cardStyle: React.CSSProperties = isComet
            ? {
                transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: isHovered
                    ? "transform 0.1s ease-out"
                    : "transform 0.5s ease-out",
            }
            : {};

        return (
            /*
             * Outer wrapper — for the "comet" variant this holds the rotating
             * conic-gradient border that peeks through behind the inner card.
             */
            <div
                className={cn("relative group", isComet && "p-[2px]")}
                style={cardStyle}
            >
                {/* ── Rotating gradient border (comet only) ────────── */}
                {isComet && (
                    <div
                        aria-hidden="true"
                        className={cn(
                            "absolute inset-0 rounded-[16px] opacity-0 transition-opacity duration-500",
                            "group-hover:opacity-100"
                        )}
                        style={{
                            background:
                                "conic-gradient(from var(--comet-angle, 0deg), #ff4d4d, #f9cb28, #0ccda8, #3b82f6, #a855f7, #ff4d4d)",
                            animation: isHovered
                                ? "comet-spin 3s linear infinite"
                                : "none",
                        }}
                    />
                )}

                {/* ── Inner card ───────────────────────────────────── */}
                <div
                    ref={(node) => {
                        // merge forwarded ref + internal ref
                        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current =
                            node;
                        if (typeof ref === "function") ref(node);
                        else if (ref)
                            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                                node;
                    }}
                    role={isClickable ? "button" : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    aria-label={
                        isClickable ? `${title} — ${description}` : undefined
                    }
                    onClick={onClick}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "relative flex flex-col overflow-hidden rounded-[16px] bg-[#1F2121]",
                        isClickable &&
                        "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
                        className
                    )}
                    {...props}
                >
                    {/* ── Image container (3:4 aspect ratio) ─────── */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[12px]">
                        <img
                            src={imageUrl}
                            alt={imageAlt ?? title}
                            className={cn(
                                "h-full w-full object-cover transition-transform duration-500 ease-out",
                                "group-hover:scale-110"
                            )}
                            draggable={false}
                        />

                        {/* ── Badge overlay ─────────────────────────── */}
                        {badge && (
                            <span className="absolute top-3 left-3 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold font-mono text-white backdrop-blur-md">
                                {badge}
                            </span>
                        )}
                    </div>

                    {/* ── Text content ───────────────────────────── */}
                    <div className="flex flex-col gap-1 px-4 py-4">
                        <h3 className="text-sm font-semibold font-mono tracking-tight text-white line-clamp-1">
                            {title}
                        </h3>
                        <p className="text-xs font-mono text-neutral-400 line-clamp-2">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
);

CometCard.displayName = "CometCard";

export { CometCard };
