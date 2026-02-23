"use client";

import React, { useState } from "react";
import { Badge } from "@/registry/default/badge/badge";

const installCommand = `npx shadcn@latest add "https://dexterityui.vercel.app/r/badge.json"`;

const usageCode = `import { Badge } from "@/components/ui/badge"

export default function Example() {
    return <Badge>New</Badge>
}`;

const sourceCode = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 ...",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground",
                secondary: "border-transparent bg-secondary text-secondary-foreground",
                destructive: "border-transparent bg-destructive text-white",
                outline: "text-foreground",
            },
        },
        defaultVariants: { variant: "default" },
    }
)

function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "span"
    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    )
}

export { Badge, badgeVariants }`;

/* ─── Copy button ─── */
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

/* ─── Code block ─── */
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

/* ─── Tab switcher ─── */
function Tabs({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
    const [active, setActive] = useState(0);

    return (
        <div>
            <div className="flex gap-1 border-b border-[#1a1a1a] mb-0">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`px-4 py-2 text-sm font-medium transition-colors relative ${active === i
                            ? "text-white"
                            : "text-neutral-500 hover:text-neutral-300"
                            }`}
                    >
                        {tab.label}
                        {active === i && (
                            <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />
                        )}
                    </button>
                ))}
            </div>
            <div className="mt-0">{tabs[active].content}</div>
        </div>
    );
}

/* ─── Page ─── */
export default function BadgePage() {
    return (
        <div className="max-w-4xl space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Badge</h1>
                <p className="text-neutral-400 text-lg">
                    A badge component with default, secondary, destructive, and outline variants.
                    Supports the <code className="text-neutral-300 bg-[#1a1a1a] px-1.5 py-0.5 rounded text-sm">asChild</code> pattern via Radix Slot.
                </p>
            </div>

            {/* Preview + Code tabs */}
            <section>
                <Tabs
                    tabs={[
                        {
                            label: "Preview",
                            content: (
                                <div className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-10 flex flex-wrap items-center justify-center gap-4">
                                    <Badge variant="default">Default</Badge>
                                    <Badge variant="secondary">Secondary</Badge>
                                    <Badge variant="destructive">Destructive</Badge>
                                    <Badge variant="outline">Outline</Badge>
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

            {/* Installation */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Installation</h2>

                <div className="space-y-3">
                    <p className="text-neutral-400 text-sm">
                        Install the badge component via the shadcn CLI:
                    </p>
                    <CodeBlock code={installCommand} language="bash" />
                </div>

                <div className="space-y-3 pt-2">
                    <p className="text-neutral-400 text-sm">
                        Dependencies installed automatically:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {["@radix-ui/react-slot", "class-variance-authority"].map((dep) => (
                            <span
                                key={dep}
                                className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#1a1a1a] text-neutral-300 text-xs font-mono border border-[#2a2a2a]"
                            >
                                {dep}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Examples */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Examples</h2>
                <div className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-10 flex flex-wrap items-center justify-center gap-4">
                    <Badge variant="default">v1.0.0</Badge>
                    <Badge variant="secondary">Beta</Badge>
                    <Badge variant="destructive">Deprecated</Badge>
                    <Badge variant="outline">Coming Soon</Badge>
                </div>
            </section>

            {/* Source code */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Source</h2>
                <CodeBlock code={sourceCode} />
            </section>
        </div>
    );
}
