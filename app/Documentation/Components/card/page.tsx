"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardAction,
} from "@/registry/default/card/card";

const installCommand = `npx shadcn@latest add "https://dexterityui.vercel.app/r/card.json"`;

const usageCode = `import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

export default function Example() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card content</p>
            </CardContent>
            <CardFooter>
                <p>Card footer</p>
            </CardFooter>
        </Card>
    )
}`;

const sourceCode = `import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }) {
    return (
        <div
            data-slot="card"
            className={cn(
                "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
                className
            )}
            {...props}
        />
    )
}

function CardHeader({ className, ...props }) {
    return (
        <div
            data-slot="card-header"
            className={cn(
                "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 ...",
                className
            )}
            {...props}
        />
    )
}

function CardTitle({ className, ...props }) {
    return (
        <div
            data-slot="card-title"
            className={cn("leading-none font-semibold", className)}
            {...props}
        />
    )
}

function CardDescription({ className, ...props }) {
    return (
        <div
            data-slot="card-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    )
}

function CardContent({ className, ...props }) {
    return (
        <div
            data-slot="card-content"
            className={cn("px-6", className)}
            {...props}
        />
    )
}

function CardFooter({ className, ...props }) {
    return (
        <div
            data-slot="card-footer"
            className={cn("flex items-center px-6", className)}
            {...props}
        />
    )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`;

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
export default function CardPage() {
    return (
        <div className="max-w-4xl space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Card</h1>
                <p className="text-neutral-400 text-lg">
                    A card component with header, title, description, action, content, and footer sub-components.
                </p>
            </div>

            {/* Preview + Code tabs */}
            <section>
                <Tabs
                    tabs={[
                        {
                            label: "Preview",
                            content: (
                                <div className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-10 flex flex-wrap items-center justify-center gap-6">
                                    <Card className="w-[350px]">
                                        <CardHeader>
                                            <CardTitle>Create project</CardTitle>
                                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-neutral-400">
                                                Choose a framework and configure your new project settings.
                                            </p>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <button className="px-4 py-2 text-sm rounded-md border border-[#2a2a2a] text-neutral-300 hover:bg-white/5 transition-colors">
                                                Cancel
                                            </button>
                                            <button className="px-4 py-2 text-sm rounded-md bg-white text-black hover:bg-white/90 transition-colors">
                                                Deploy
                                            </button>
                                        </CardFooter>
                                    </Card>
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
                        Install the card component via the shadcn CLI:
                    </p>
                    <CodeBlock code={installCommand} language="bash" />
                </div>

                <div className="space-y-3 pt-2">
                    <p className="text-neutral-400 text-sm">
                        No additional dependencies required.
                    </p>
                </div>
            </section>

            {/* Sub-components */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Sub-components</h2>
                <div className="grid gap-3">
                    {[
                        { name: "Card", desc: "The root container with border, shadow, and rounded corners." },
                        { name: "CardHeader", desc: "Top section with grid layout for title and actions." },
                        { name: "CardTitle", desc: "Semibold title text." },
                        { name: "CardDescription", desc: "Muted description text below the title." },
                        { name: "CardAction", desc: "Optional action slot aligned to the top-right of the header." },
                        { name: "CardContent", desc: "Main body content area with horizontal padding." },
                        { name: "CardFooter", desc: "Bottom section with flex layout for actions." },
                    ].map((item) => (
                        <div key={item.name} className="flex items-start gap-3 rounded-lg border border-[#1a1a1a] bg-[#111111] p-4">
                            <code className="text-sm font-mono text-neutral-200 bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#2a2a2a] shrink-0">
                                {`<${item.name}>`}
                            </code>
                            <span className="text-neutral-400 text-sm">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Examples with action */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">With Action</h2>
                <div className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-10 flex flex-wrap items-center justify-center gap-6">
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>You have 3 unread messages.</CardDescription>
                            <CardAction>
                                <button className="px-3 py-1 text-xs rounded-md bg-white text-black hover:bg-white/90 transition-colors">
                                    Mark all read
                                </button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-neutral-400">
                                Your recent notifications will appear here.
                            </p>
                        </CardContent>
                    </Card>
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
