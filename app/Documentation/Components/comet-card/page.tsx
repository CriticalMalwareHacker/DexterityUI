"use client";

import React, { useState } from "react";
import { CometCard } from "@/registry/default/comet-card/comet-card";

/* ─── Code strings ─── */

const installCommand = `npx shadcn@latest add "https://dexterityui.vercel.app/r/comet-card.json"`;

const usageCode = `import { CometCard } from "@/components/ui/comet-card"

export default function Example() {
    return (
        <CometCard
            imageUrl="/your-image.jpg"
            title="Card Title"
            description="A short description of the card content."
            badge="New"
            variant="comet"
            onClick={() => alert("clicked")}
        />
    )
}`;

const sourceCode = `"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface CometCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  description: string;
  badge?: string;
  variant?: "default" | "comet";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  imageAlt?: string;
}

const CometCard = React.forwardRef<HTMLDivElement, CometCardProps>(
  ({ imageUrl, title, description, badge, variant = "default",
     onClick, imageAlt, className, ...props }, ref) => {
    // ... full source at registry/default/comet-card/comet-card.tsx
  }
);`;

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

/* ─── Demo images (Unsplash) ─── */
const DEMO_IMAGES = [
    {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=800&fit=crop",
        title: "Mountain Vista",
        description: "Serene alpine landscape bathed in golden hour light.",
        badge: "Featured",
    },
    {
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=800&fit=crop",
        title: "Starlit Peaks",
        description: "A breathtaking view of snow-capped mountains under the night sky.",
        badge: "Popular",
    },
    {
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=800&fit=crop",
        title: "Forest Mist",
        description: "Fog rolling through a dense old-growth forest at dawn.",
    },
    {
        url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=800&fit=crop",
        title: "Ocean Horizon",
        description: "Where the sea meets the sky in an infinite gradient of blue.",
        badge: "New",
    },
];

/* ─── Page ─── */
export default function CometCardPage() {
    const [clickLog, setClickLog] = useState<string>("");

    return (
        <div className="max-w-4xl space-y-12 pb-16">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-white">Comet Card</h1>
                    <span className="inline-flex items-center rounded-full bg-purple-500/15 px-2.5 py-0.5 text-xs font-semibold text-purple-400 ring-1 ring-purple-500/20">
                        New
                    </span>
                </div>
                <p className="text-neutral-400 text-lg leading-relaxed">
                    An image card with hover zoom, optional rotating gradient border, and 3D tilt effect that responds to cursor position.
                </p>
            </div>

            {/* ─── Default variant ─────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Default Variant</h2>
                <p className="text-neutral-500 text-sm">
                    Simple image card with smooth hover zoom. No border effects.
                </p>
                <Tabs
                    tabs={[
                        {
                            label: "Preview",
                            content: (
                                <div className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-8 md:p-10">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                                        {DEMO_IMAGES.slice(0, 3).map((img, i) => (
                                            <CometCard
                                                key={i}
                                                imageUrl={img.url}
                                                title={img.title}
                                                description={img.description}
                                                badge={img.badge}
                                                variant="default"
                                                className="w-full max-w-[240px]"
                                            />
                                        ))}
                                    </div>
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

            {/* ─── Comet variant ─────────────────────────── */}
            <section className="space-y-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-white">Comet Variant</h2>
                    <span className="inline-flex items-center rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                        Interactive
                    </span>
                </div>
                <p className="text-neutral-500 text-sm">
                    Hover over the cards to reveal the rotating rainbow border and 3D tilt effect. Click any card to test the click handler.
                </p>
                <div className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-8 md:p-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
                        {DEMO_IMAGES.map((img, i) => (
                            <CometCard
                                key={i}
                                imageUrl={img.url}
                                title={img.title}
                                description={img.description}
                                badge={img.badge}
                                variant="comet"
                                className="w-full max-w-[200px]"
                                onClick={() =>
                                    setClickLog(`Clicked: ${img.title}`)
                                }
                            />
                        ))}
                    </div>
                    {clickLog && (
                        <div className="mt-6 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <p className="text-sm font-mono text-neutral-400">
                                {clickLog}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ─── Installation ──────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Installation</h2>
                <div className="space-y-3">
                    <p className="text-neutral-400 text-sm">
                        Install the comet-card component via the shadcn CLI:
                    </p>
                    <CodeBlock code={installCommand} language="bash" />
                </div>
                <div className="space-y-3 pt-2">
                    <p className="text-neutral-400 text-sm">
                        No additional dependencies required beyond <code className="text-neutral-200 bg-[#1a1a1a] px-1.5 py-0.5 rounded text-xs border border-[#2a2a2a]">clsx</code> and <code className="text-neutral-200 bg-[#1a1a1a] px-1.5 py-0.5 rounded text-xs border border-[#2a2a2a]">tailwind-merge</code>.
                    </p>
                </div>
            </section>

            {/* ─── Props reference ───────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Props</h2>
                <div className="rounded-lg border border-[#1a1a1a] overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#1a1a1a] bg-[#0e0e0e]">
                                <th className="text-left text-neutral-500 font-medium px-4 py-3">Prop</th>
                                <th className="text-left text-neutral-500 font-medium px-4 py-3">Type</th>
                                <th className="text-left text-neutral-500 font-medium px-4 py-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: "imageUrl", type: "string", desc: "URL of the card image.", required: true },
                                { name: "title", type: "string", desc: "Card title displayed below the image.", required: true },
                                { name: "description", type: "string", desc: "Short description text.", required: true },
                                { name: "badge", type: "string", desc: "Optional badge text overlaid on the image.", required: false },
                                { name: "variant", type: '"default" | "comet"', desc: 'Card style variant. Defaults to "default".', required: false },
                                { name: "onClick", type: "MouseEventHandler", desc: "Click handler — makes the card interactive & keyboard-navigable.", required: false },
                                { name: "imageAlt", type: "string", desc: "Custom alt text for the image. Defaults to title.", required: false },
                                { name: "className", type: "string", desc: "Additional classes merged via cn().", required: false },
                            ].map((prop) => (
                                <tr key={prop.name} className="border-b border-[#1a1a1a] last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <code className="text-sm font-mono text-neutral-200">
                                                {prop.name}
                                            </code>
                                            {prop.required && (
                                                <span className="text-[10px] font-medium text-amber-400/80">required</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <code className="text-xs font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">{prop.type}</code>
                                    </td>
                                    <td className="px-4 py-3 text-neutral-400">{prop.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ─── Accessibility ─────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Accessibility</h2>
                <div className="grid gap-2">
                    {[
                        'When onClick is provided the card renders role="button" and tabIndex={0}.',
                        "Focus ring appears on keyboard focus via focus-visible.",
                        "Enter and Space keys trigger the click handler.",
                        "Images always have descriptive alt text.",
                        "Decorative gradient border is marked aria-hidden.",
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 rounded-lg border border-[#1a1a1a] bg-[#111111] px-4 py-3">
                            <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <span className="text-neutral-400 text-sm">{item}</span>
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
