import Link from "next/link";

export default function DocumentationPage() {
    return (
        <div className="max-w-4xl space-y-16 pb-20">
            {/* Header / Hero Typography */}
            <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 drop-shadow-sm">
                    Documentation
                </h1>
                <p className="text-xl text-neutral-400 leading-relaxed font-medium max-w-2xl">
                    Welcome to <span className="text-gray-100 font-semibold">Dexterity UI</span>.
                    The beautifully crafted, highly customizable component library designed for modern web applications.
                </p>
            </div>

            {/* Introduction Section */}
            <section className="space-y-5 relative">
                {/* Subtle background glow */}
                <div className="absolute -inset-y-4 -inset-x-6 z-0 bg-gradient-to-b from-[#1a1a1a]/50 to-transparent opacity-50 blur-2xl rounded-3xl pointer-events-none"></div>

                <h2 className="text-3xl font-bold text-gray-100 tracking-tight relative z-10 flex items-center gap-3">
                    <span className="text-neutral-700 font-light select-none">#</span> Introduction
                </h2>

                <div className="rounded-2xl border border-[#222] bg-[#0a0a0a]/80 backdrop-blur-xl p-8 shadow-2xl relative z-10 text-neutral-300 font-light leading-relaxed">
                    <p className="mb-6 text-lg">
                        Dexterity UI is built on top of modern web standards, providing you with a set of accessible, highly reusable components designed to accelerate your development workflow without sacrificing design fidelity.
                    </p>
                    <p className="text-lg">
                        Whether you are building an intricate dashboard, a high-conversion marketing site, or a complex SaaS application, our components are engineered to look gorgeous out of the box while remaining <strong className="text-gray-100 font-medium">100% customizable</strong>.
                    </p>
                </div>
            </section>

            {/* Installation Section — links to full page */}
            <Link href="/Documentation/Installation" className="block group">
                <section className="space-y-6 rounded-2xl border border-[#222] bg-[#0a0a0a]/80 backdrop-blur-xl p-8 shadow-2xl hover:border-[#333] transition-all duration-300">
                    <h2 className="text-3xl font-bold text-gray-100 tracking-tight flex items-center gap-3 group-hover:text-blue-400 transition-colors">
                        <span className="text-neutral-700 font-light select-none">#</span> Installation
                        <span className="text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all ml-auto">&rarr;</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl">
                        Get up and running in seconds. Add components to your project via the shadcn CLI.
                    </p>
                </section>
            </Link>

            {/* Quick Links / Next Steps */}
            <section className="space-y-6 pt-10 border-t border-[#1a1a1a]">
                <h2 className="text-2xl font-bold text-gray-200 tracking-tight">Next Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group rounded-xl border border-[#1a1a1a] bg-[#111111] p-6 shadow-sm hover:bg-[#161616] hover:border-gray-700 transition-all duration-300 cursor-pointer">
                        <h3 className="text-lg font-semibold text-gray-200 mb-2 group-hover:text-blue-400 transition-colors flex justify-between items-center">
                            Explore Components
                            <span className="text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">&rarr;</span>
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            Browse our extensive collection of pre-built, accessible components.
                        </p>
                    </div>

                    <div className="group rounded-xl border border-[#1a1a1a] bg-[#111111] p-6 shadow-sm hover:bg-[#161616] hover:border-gray-700 transition-all duration-300 cursor-pointer">
                        <h3 className="text-lg font-semibold text-gray-200 mb-2 group-hover:text-purple-400 transition-colors flex justify-between items-center">
                            Integration Guides
                            <span className="text-neutral-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all">&rarr;</span>
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            Learn how to integrate Dexterity UI seamlessly with Next.js, Vite, and more.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
