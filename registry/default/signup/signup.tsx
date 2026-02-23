"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface SignupFormProps {
    onSubmit?: (values: { name: string; email: string; password: string }) => void;
    onGoogleSignIn?: () => void;
    onSignIn?: () => void;
    className?: string;
}

export function SignupForm({
    onSubmit,
    onGoogleSignIn,
    onSignIn,
    className,
}: SignupFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    const strength = (() => {
        if (password.length === 0) return 0;
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    })();

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
    const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"][strength];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) return;
        setLoading(true);
        await onSubmit?.({ name, email, password });
        setLoading(false);
    };

    return (
        <div
            className={cn(
                "w-full max-w-sm rounded-2xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl p-8 shadow-2xl",
                className
            )}
        >
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Create an account</h1>
                <p className="mt-1 text-sm text-neutral-500">Start building something great today</p>
            </div>

            {/* Google Sign-Up */}
            <button
                type="button"
                onClick={onGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200 mb-6"
            >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
            </button>

            {/* Divider */}
            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/8" />
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-[#0a0a0a] px-3 text-neutral-600">or sign up with email</span>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                    <label htmlFor="signup-name" className="block text-sm font-medium text-neutral-400">
                        Full name
                    </label>
                    <input
                        id="signup-name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/25 focus:bg-white/8 focus:ring-0"
                    />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label htmlFor="signup-email" className="block text-sm font-medium text-neutral-400">
                        Email
                    </label>
                    <input
                        id="signup-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/25 focus:bg-white/8 focus:ring-0"
                    />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <label htmlFor="signup-password" className="block text-sm font-medium text-neutral-400">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 8 characters"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-white/25 focus:bg-white/8 focus:ring-0"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-300 transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Password strength bar */}
                    {password.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-white/10"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-neutral-500">
                                Strength:{" "}
                                <span className={`font-medium ${strength === 1 ? "text-red-400" :
                                        strength === 2 ? "text-yellow-400" :
                                            strength === 3 ? "text-blue-400" :
                                                "text-green-400"
                                    }`}>
                                    {strengthLabel}
                                </span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5 shrink-0">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-white peer-checked:border-white transition-all" />
                        {agreed && (
                            <svg className="absolute inset-0 w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <span className="text-xs text-neutral-500 leading-relaxed">
                        I agree to the{" "}
                        <span className="text-neutral-300 hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                        {" "}and{" "}
                        <span className="text-neutral-300 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                    </span>
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading || !agreed}
                    className="mt-2 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-white/5"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Creating account…
                        </span>
                    ) : (
                        "Create account"
                    )}
                </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-neutral-600">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={onSignIn}
                    className="text-neutral-300 font-medium hover:text-white transition-colors"
                >
                    Sign in
                </button>
            </p>
        </div>
    );
}
