"use client";

import React, { useState } from "react";

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

/* ─── Terminal block ─── */
function TerminalBlock({ command, label = "Terminal" }: { command: string; label?: string }) {
    return (
        <div className="relative rounded-xl border border-[#222] bg-[#0d0d0d] overflow-hidden shadow-2xl max-w-3xl">
            <div className="flex items-center px-4 py-3 bg-[#161616] border-b border-[#222]">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">{label}</span>
            </div>
            <CopyButton text={command} />
            <div className="p-6 font-mono text-sm sm:text-base text-gray-300">
                <div className="flex items-center gap-4">
                    <span className="text-purple-500 select-none">❯</span>
                    <span className="text-white">{command}</span>
                </div>
            </div>
        </div>
    );
}

/* ─── Code block ─── */
function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
    return (
        <div className="relative rounded-xl border border-[#222] bg-[#0d0d0d] overflow-hidden shadow-2xl max-w-3xl">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#222] bg-[#161616]">
                <span className="text-xs text-neutral-500 font-mono uppercase tracking-widest">{language}</span>
            </div>
            <CopyButton text={code} />
            <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
                <code className="text-neutral-300 font-mono">{code}</code>
            </pre>
        </div>
    );
}

/* ─── Page ─── */
export default function InstallationPage() {
    return (
        <div className="max-w-4xl space-y-16 pb-20">
            {/* Header */}
            <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 drop-shadow-sm">
                    Installation
                </h1>
                <p className="text-xl text-neutral-400 leading-relaxed font-medium max-w-2xl">
                    Get <span className="text-gray-100 font-semibold">Dexterity UI</span> up and running
                    in your project in under a minute.
                </p>
            </div>

            {/* Prerequisites */}
            <section className="space-y-5 relative">
                <div className="absolute -inset-y-4 -inset-x-6 z-0 bg-gradient-to-b from-[#1a1a1a]/50 to-transparent opacity-50 blur-2xl rounded-3xl pointer-events-none"></div>

                <h2 className="text-3xl font-bold text-gray-100 tracking-tight relative z-10 flex items-center gap-3">
                    <span className="text-neutral-700 font-light select-none">#</span> Prerequisites
                </h2>

                <div className="rounded-2xl border border-[#222] bg-[#0a0a0a]/80 backdrop-blur-xl p-8 shadow-2xl relative z-10 text-neutral-300 font-light leading-relaxed">
                    <p className="mb-6 text-lg">
                        Before installing Dexterity UI, make sure your project has the following dependencies set up:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { name: "React", version: "18+", color: "text-blue-400" },
                            { name: "Tailwind CSS", version: "v4+", color: "text-cyan-400" },
                            { name: "TypeScript", version: "5+", color: "text-blue-300" },
                            { name: "class-variance-authority", version: "latest", color: "text-purple-400" },
                        ].map((dep) => (
                            <div key={dep.name} className="flex items-center gap-3 rounded-lg border border-[#1a1a1a] bg-[#111111] px-4 py-3">
                                <span className={`text-sm font-semibold ${dep.color}`}>{dep.name}</span>
                                <span className="text-xs text-neutral-600 font-mono">{dep.version}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Using shadcn CLI */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-100 tracking-tight flex items-center gap-3">
                    <span className="text-neutral-700 font-light select-none">#</span> Using the shadcn CLI
                </h2>
                <p className="text-neutral-400 text-lg max-w-2xl">
                    The easiest way to add Dexterity UI components. Each component is installed individually,
                    giving you <strong className="text-gray-200 font-medium">full control</strong> over what goes into your bundle.
                </p>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-200">1. Initialize shadcn</h3>
                        <p className="text-neutral-500 text-sm">If you haven&apos;t already set up shadcn in your project:</p>
                        <TerminalBlock command="npx shadcn@latest init" />
                    </div>

                    <div className="space-y-2 pt-4">
                        <h3 className="text-lg font-semibold text-gray-200">2. Add a component</h3>
                        <p className="text-neutral-500 text-sm">Install any component from our registry:</p>
                        <TerminalBlock command={`npx shadcn@latest add "https://dexterityui.vercel.app/r/button.json"`} />
                    </div>

                    <div className="space-y-2 pt-4">
                        <h3 className="text-lg font-semibold text-gray-200">3. Import and use</h3>
                        <p className="text-neutral-500 text-sm">The component is now ready in your project:</p>
                        <CodeBlock
                            code={`import { Button } from "@/components/ui/button"

export default function App() {
    return (
        <Button variant="default">
            Get Started
        </Button>
    )
}`}
                        />
                    </div>
                </div>
            </section>

            {/* Available Components */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-100 tracking-tight flex items-center gap-3">
                    <span className="text-neutral-700 font-light select-none">#</span> Available Components
                </h2>
                <p className="text-neutral-400 text-lg max-w-2xl">
                    Install any of these components individually via the shadcn CLI.
                </p>

                <div className="space-y-3">
                    {[
                        {
                            name: "Button",
                            desc: "Versatile button with 6 variants and 4 sizes.",
                            cmd: `npx shadcn@latest add "https://dexterityui.vercel.app/r/button.json"`,
                        },
                        {
                            name: "Badge",
                            desc: "Inline badge with default, secondary, destructive, and outline variants.",
                            cmd: `npx shadcn@latest add "https://dexterityui.vercel.app/r/badge.json"`,
                        },
                        {
                            name: "Card",
                            desc: "Card with header, title, description, action, content, and footer slots.",
                            cmd: `npx shadcn@latest add "https://dexterityui.vercel.app/r/card.json"`,
                        },
                    ].map((component) => (
                        <div key={component.name} className="group rounded-xl border border-[#1a1a1a] bg-[#111111] p-5 hover:bg-[#161616] hover:border-[#2a2a2a] transition-all duration-300">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-200">{component.name}</h3>
                                    <p className="text-neutral-500 text-sm mt-0.5">{component.desc}</p>
                                </div>
                            </div>
                            <div className="relative rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden">
                                <CopyButton text={component.cmd} />
                                <div className="px-4 py-3 font-mono text-xs sm:text-sm text-neutral-300 overflow-x-auto">
                                    <span className="text-purple-500 select-none mr-3">❯</span>
                                    {component.cmd}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Project Structure */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-100 tracking-tight flex items-center gap-3">
                    <span className="text-neutral-700 font-light select-none">#</span> Project Structure
                </h2>
                <p className="text-neutral-400 text-lg max-w-2xl">
                    After installation, components are placed in your project like this:
                </p>

                <CodeBlock
                    language="plaintext"
                    code={`your-project/
├── components/
│   └── ui/
│       ├── button.tsx      ← installed via CLI
│       ├── badge.tsx
│       └── card.tsx
├── lib/
│   └── utils.ts            ← cn() helper
└── ...`}
                />
            </section>

            {/* Utilities */}
            <section className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                <h2 className="text-2xl font-bold text-gray-200 tracking-tight flex items-center gap-3">
                    <span className="text-neutral-700 font-light select-none">#</span> Utility: cn()
                </h2>
                <p className="text-neutral-400 text-lg max-w-2xl">
                    All components use a <code className="text-neutral-300 bg-[#1a1a1a] px-1.5 py-0.5 rounded text-sm font-mono border border-[#2a2a2a]">cn()</code> utility
                    for class merging. Make sure you have it in your project:
                </p>
                <CodeBlock
                    code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}`}
                />

                <div className="space-y-2 pt-2">
                    <p className="text-neutral-500 text-sm">Install the required dependencies:</p>
                    <TerminalBlock command="npm install clsx tailwind-merge" />
                </div>
            </section>
        </div>
    );
}
