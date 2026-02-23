"use client";

import React, { useState } from "react";
import { LoginForm } from "@/registry/default/login/login";

const installCommand = `npx shadcn@latest add "https://dexterityui.vercel.app/r/login.json"`;

const usageCode = `import { LoginForm } from "@/components/ui/login"

export default function Page() {
    return (
        <LoginForm
            onSubmit={async ({ email, password }) => {
                // handle sign in
                console.log(email, password)
            }}
            onGoogleSignIn={() => {
                // handle Google OAuth
            }}
            onForgotPassword={() => {
                // redirect to /forgot-password
            }}
            onSignUp={() => {
                // redirect to /signup
            }}
        />
    )
}`;

/* ─── Copy button ─── */
function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={handleCopy} className="absolute top-1.5 right-3 p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Copy">
            {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
            )}
        </button>
    );
}

/* ─── Code block ─── */
function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
    return (
        <div className="relative rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden">
            <div className="flex items-center px-4 py-2 border-b border-[#1a1a1a] bg-[#111]">
                <span className="text-xs text-neutral-500 font-mono uppercase tracking-widest">{language}</span>
            </div>
            <CopyButton text={code} />
            <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
                <code className="text-neutral-300 font-mono">{code}</code>
            </pre>
        </div>
    );
}

/* ─── Tabs ─── */
function Tabs({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
    const [active, setActive] = useState(0);
    return (
        <div>
            <div className="flex gap-1 border-b border-[#1a1a1a]">
                {tabs.map((tab, i) => (
                    <button key={i} onClick={() => setActive(i)} className={`px-4 py-2 text-sm font-medium transition-colors relative ${active === i ? "text-white" : "text-neutral-500 hover:text-neutral-300"}`}>
                        {tab.label}
                        {active === i && <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />}
                    </button>
                ))}
            </div>
            <div>{tabs[active].content}</div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="max-w-4xl space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Login Form</h1>
                <p className="text-neutral-400 text-lg">
                    A dark-themed login component with email/password, Google OAuth, show/hide password, and a loading state.
                </p>
            </div>

            {/* Preview / Code */}
            <section>
                <Tabs tabs={[
                    {
                        label: "Preview",
                        content: (
                            <div className="rounded-lg border border-[#1a1a1a] bg-[#111] p-10 flex items-center justify-center">
                                <LoginForm
                                    onSubmit={async ({ email, password }) => { console.log(email, password); }}
                                    onGoogleSignIn={() => { }}
                                    onForgotPassword={() => { }}
                                    onSignUp={() => { }}
                                />
                            </div>
                        ),
                    },
                    { label: "Code", content: <CodeBlock code={usageCode} /> },
                ]} />
            </section>

            {/* Installation */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Installation</h2>
                <CodeBlock code={installCommand} language="bash" />
            </section>

            {/* Props */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Props</h2>
                <div className="rounded-xl border border-[#1a1a1a] overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#1a1a1a] bg-[#111]">
                                <th className="text-left px-4 py-3 text-neutral-400 font-medium">Prop</th>
                                <th className="text-left px-4 py-3 text-neutral-400 font-medium">Type</th>
                                <th className="text-left px-4 py-3 text-neutral-400 font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { prop: "onSubmit", type: "(values) => void", desc: "Called with { email, password } on form submit." },
                                { prop: "onGoogleSignIn", type: "() => void", desc: "Called when the Google button is clicked." },
                                { prop: "onForgotPassword", type: "() => void", desc: "Called when 'Forgot password?' is clicked." },
                                { prop: "onSignUp", type: "() => void", desc: "Called when the 'Sign up' link is clicked." },
                                { prop: "className", type: "string", desc: "Additional classes for the root container." },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-[#1a1a1a] last:border-0">
                                    <td className="px-4 py-3 font-mono text-xs text-neutral-200">{row.prop}</td>
                                    <td className="px-4 py-3 font-mono text-xs text-purple-400">{row.type}</td>
                                    <td className="px-4 py-3 text-neutral-500 text-xs">{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
