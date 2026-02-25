"use client";

import React, { useState } from "react";
import {
    DraggableCardBody,
    DraggableCardContainer,
} from "@/registry/default/draggable-card/draggable-card";

/* ─── Code strings ─── */

const installCommand = `npx shadcn@latest add "https://dexterityui.vercel.app/r/draggable-card.json"`;

const usageCode = `import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card"

export default function Example() {
  const items = [
    {
      title: "Iceland",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    // ...more items
  ]

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 dark:text-neutral-800">
        Drag the cards around!
      </p>
      {items.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  )
}`;

const sourceCode = `"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "motion/react";

export const DraggableCardBody = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  // ... spring physics, 3D tilt, glare, drag constraints
  // Full source: registry/default/draggable-card/draggable-card.tsx
};

export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("[perspective:3000px]", className)}>{children}</div>
  );
};`;

/* ─── Helpers ─── */

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            onClick={handleCopy}
            className="absolute top-1.5 right-3 p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Copy to clipboard"
        >
            {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
            )}
        </button>
    );
}

function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
    return (
        <div className="relative rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a]">
                <span className="text-xs text-neutral-500 font-mono">{language}</span>
            </div>
            <CopyButton text={code} />
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code className="text-neutral-300 font-mono">{code}</code>
            </pre>
        </div>
    );
}

function Tabs({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
    const [active, setActive] = useState(0);
    return (
        <div>
            <div className="flex gap-1 border-b border-[#1a1a1a] mb-0">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`px-4 py-2 text-sm font-medium transition-colors relative ${active === i ? "text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                    >
                        {tab.label}
                        {active === i && <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />}
                    </button>
                ))}
            </div>
            <div className="mt-0">{tabs[active].content}</div>
        </div>
    );
}

/* ─── Demo items ─── */
const items = [
    {
        title: "Tyler Durden",
        image:
            "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
        title: "The Narrator",
        image:
            "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
        title: "Iceland",
        image:
            "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
        title: "Japan",
        image:
            "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
        title: "Norway",
        image:
            "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
        title: "New Zealand",
        image:
            "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
        title: "Canada",
        image:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
];

/* ═══════════════════════════════════════════════════════════
 * PAGE
 * ═══════════════════════════════════════════════════════════ */

export default function DraggableCardPage() {
    return (
        <div className="max-w-4xl space-y-12 pb-16">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-white">Draggable Card</h1>
                    <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/20">
                        Premium
                    </span>
                </div>
                <p className="text-neutral-400 text-lg leading-relaxed">
                    A physics-driven draggable card with 3D tilt, glare effect, and momentum-based spring animations. Scatter them across the screen and drag to explore.
                </p>
            </div>

            {/* ─── Interactive demo ─────────────────────────── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-white">Interactive Demo</h2>
                    <span className="inline-flex items-center rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                        Drag the cards
                    </span>
                </div>

                {/* Demo area */}
                <Tabs
                    tabs={[
                        {
                            label: "Preview",
                            content: (
                                <div className="rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden">
                                    <DraggableCardContainer className="relative flex min-h-[600px] w-full items-center justify-center overflow-clip">
                                        <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
                                            If its your first day at Fight Club, you have to fight.
                                        </p>
                                        {items.map((item) => (
                                            <DraggableCardBody key={item.title} className={item.className}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="pointer-events-none relative z-10 h-80 w-80 object-cover"
                                                />
                                                <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                                                    {item.title}
                                                </h3>
                                            </DraggableCardBody>
                                        ))}
                                    </DraggableCardContainer>
                                </div>
                            ),
                        },
                        {
                            label: "Code",
                            content: <CodeBlock code={usageCode} />,
                        },
                    ]}
                />
            </section>

            {/* ─── Installation ──────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Installation</h2>
                <p className="text-neutral-400 text-sm">
                    Install the draggable-card via the shadcn CLI:
                </p>
                <CodeBlock code={installCommand} language="bash" />
                <p className="text-neutral-400 text-sm">
                    Requires <code className="text-neutral-200 bg-[#1a1a1a] px-1.5 py-0.5 rounded text-xs border border-[#2a2a2a]">motion</code> (framer-motion).
                </p>
            </section>

            {/* ─── Props ──────────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Props</h2>

                <h3 className="text-sm font-semibold text-neutral-300 mt-6">DraggableCardContainer</h3>
                <div className="rounded-lg border border-[#1a1a1a] overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#1a1a1a] bg-[#0e0e0e]">
                                <th className="text-left text-neutral-500 font-medium px-4 py-2">Prop</th>
                                <th className="text-left text-neutral-500 font-medium px-4 py-2">Type</th>
                                <th className="text-left text-neutral-500 font-medium px-4 py-2">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[#1a1a1a] hover:bg-white/[0.02]">
                                <td className="px-4 py-2"><code className="font-mono text-neutral-200 text-xs">className</code></td>
                                <td className="px-4 py-2"><code className="font-mono text-purple-400 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">string</code></td>
                                <td className="px-4 py-2 text-neutral-400 text-xs">Additional CSS classes. Applies perspective: 3000px by default.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02]">
                                <td className="px-4 py-2"><code className="font-mono text-neutral-200 text-xs">children</code></td>
                                <td className="px-4 py-2"><code className="font-mono text-purple-400 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">ReactNode</code></td>
                                <td className="px-4 py-2 text-neutral-400 text-xs">DraggableCardBody components to render inside.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-sm font-semibold text-neutral-300 mt-6">DraggableCardBody</h3>
                <div className="rounded-lg border border-[#1a1a1a] overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#1a1a1a] bg-[#0e0e0e]">
                                <th className="text-left text-neutral-500 font-medium px-4 py-2">Prop</th>
                                <th className="text-left text-neutral-500 font-medium px-4 py-2">Type</th>
                                <th className="text-left text-neutral-500 font-medium px-4 py-2">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[#1a1a1a] hover:bg-white/[0.02]">
                                <td className="px-4 py-2"><code className="font-mono text-neutral-200 text-xs">className</code></td>
                                <td className="px-4 py-2"><code className="font-mono text-purple-400 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">string</code></td>
                                <td className="px-4 py-2 text-neutral-400 text-xs">Position and rotation classes (e.g. absolute top-10 left-[20%] rotate-[-5deg]).</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02]">
                                <td className="px-4 py-2"><code className="font-mono text-neutral-200 text-xs">children</code></td>
                                <td className="px-4 py-2"><code className="font-mono text-purple-400 text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">ReactNode</code></td>
                                <td className="px-4 py-2 text-neutral-400 text-xs">Card content — images, text, etc.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ─── Features ──────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Features</h2>
                <div className="grid gap-2">
                    {[
                        { icon: "🎯", text: "3D tilt — card rotates to follow cursor position with spring physics" },
                        { icon: "💎", text: "Glare effect — dynamic white overlay that shifts with mouse movement" },
                        { icon: "⚡", text: "Momentum — cards carry velocity on release with spring bounce" },
                        { icon: "🖱️", text: "Drag constraints — cards stay within the viewport boundaries" },
                        { icon: "🔄", text: "Spring reset — tilt smoothly resets to zero when released" },
                        { icon: "📐", text: "Perspective container — 3000px perspective for realistic 3D depth" },
                    ].map((f, i) => (
                        <div key={i} className="flex items-start gap-3 rounded-lg border border-[#1a1a1a] bg-[#111111] px-4 py-3">
                            <span className="shrink-0 text-sm">{f.icon}</span>
                            <span className="text-neutral-400 text-sm">{f.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Source ────────────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Source</h2>
                <CodeBlock code={sourceCode} />
            </section>
        </div>
    );
}
