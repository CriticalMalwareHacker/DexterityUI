"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type MenuItem = { name: string; href: string; icon?: React.ReactElement | string };

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

/* ─── Collapsible sub-menu with toggle ─── */
const Menu = ({
    children,
    items,
    collapsed,
    currentPath,
}: {
    children: React.ReactNode;
    items: MenuItem[];
    collapsed: boolean;
    currentPath: string;
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const isAnyChildActive = items.some((item) => currentPath === item.href);

    return (
        <div>
            <button
                onClick={() => !collapsed && setIsOpen((v) => !v)}
                className="w-full flex items-center justify-between text-gray-400 p-2 rounded-lg hover:bg-white/5 transition-colors duration-150"
            >
                <div className="flex items-center gap-x-2">{children}</div>
                {!collapsed && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </button>

            {/* Animated panel */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${!collapsed && isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="mx-4 px-2 border-l border-[#2a2a2a] text-sm font-medium mt-1">
                    {items.map((item, idx) => {
                        const isActive = currentPath === item.href;
                        return (
                            <li key={idx}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-150 ${isActive
                                        ? "text-white bg-white/8"
                                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5 active:bg-white/10"
                                        }`}
                                >
                                    {item.icon ? <div className="text-gray-500">{item.icon}</div> : null}
                                    <span>{item.name}</span>
                                    {isActive && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

/* ─── Sidebar ─── */
const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
    const pathname = usePathname();

    const navigation: MenuItem[] = [
        {
            href: "/Documentation",
            name: "Overview",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            ),
        },
        {
            href: "/Documentation/Installation",
            name: "Installation",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            ),
        },
    ];

    const navsFooter: MenuItem[] = [
        {
            href: "#",
            name: "Help",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
            ),
        },
        {
            href: "#",
            name: "Settings",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
    ];

    const nestedNav: MenuItem[] = [
        { name: "Badge", href: "/Documentation/Components/badge" },
        { name: "Button", href: "/Documentation/Components/button" },
        { name: "Card", href: "/Documentation/Components/card" },
        { name: "Comet Card", href: "/Documentation/Components/comet-card" },
        { name: "Draggable Card", href: "/Documentation/Components/draggable-card" },
        { name: "Login", href: "/Documentation/Components/login" },
        { name: "Signup", href: "/Documentation/Components/signup" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 h-full border-r border-[#1a1a1a] bg-[#0a0a0a] transition-all duration-300 ease-in-out z-20 ${collapsed ? "w-[68px]" : "w-65"
                    }`}
            >
                <div className="flex flex-col h-full px-2">
                    {/* ── Header: brand + collapse toggle ── */}
                    <div className="h-20 flex items-center justify-between px-2 shrink-0">
                        {!collapsed && (
                            <Link href="/" className="flex items-center gap-x-3 min-w-0 group">
                                <div className="truncate">
                                    <span className="block text-gray-200 text-2xl font-bold truncate group-hover:text-white transition-colors">
                                        Dexterity UI
                                    </span>
                                </div>
                            </Link>
                        )}

                        {/* Collapse / expand button */}
                        <button
                            onClick={onToggle}
                            className={`p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-white/5 active:bg-white/10 transition-colors ${collapsed ? "mx-auto" : ""
                                }`}
                            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className={`w-5 h-5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* ── Thin separator ── */}
                    <div className="mx-2 border-t border-[#1a1a1a] mb-3 shrink-0" />

                    {/* ── Navigation links (scrollable) ── */}
                    <div className="overflow-y-auto flex-1 scrollbar-thin">
                        <ul className="text-sm font-medium space-y-1">
                            {navigation.map((item, idx) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={idx} className="group relative">
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-x-3 p-2 rounded-lg transition-colors duration-150 ${isActive
                                                ? "text-white bg-white/8"
                                                : "text-gray-400 hover:bg-white/5 hover:text-gray-200 active:bg-white/10"
                                                }`}
                                        >
                                            <div className={`shrink-0 transition-colors ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>
                                                {item.icon}
                                            </div>
                                            {!collapsed && <span>{item.name}</span>}
                                        </Link>
                                        {/* Tooltip when collapsed */}
                                        {collapsed && (
                                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md bg-[#1a1a1a] text-gray-200 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
                                                {item.name}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}

                            <li>
                                <Menu items={nestedNav} collapsed={collapsed} currentPath={pathname}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-500 shrink-0"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25L12 17.25 2.25 12l4.179-2.25m11.142 0L12 7.5" />
                                    </svg>
                                    {!collapsed && "Components"}
                                </Menu>
                            </li>
                        </ul>
                    </div>

                    {/* ── Footer nav — pinned to bottom ── */}
                    <div className="pt-2 mt-auto border-t border-[#1a1a1a] pb-4 shrink-0">
                        <ul className="text-sm font-medium space-y-1">
                            {navsFooter.map((item, idx) => (
                                <li key={idx} className="group relative">
                                    <button
                                        className="w-full flex items-center gap-x-3 text-gray-400 p-2 rounded-lg hover:bg-white/5 hover:text-gray-200 active:bg-white/10 duration-150"
                                    >
                                        <div className="text-gray-500 group-hover:text-gray-300 shrink-0">{item.icon}</div>
                                        {!collapsed && <span>{item.name}</span>}
                                    </button>
                                    {collapsed && (
                                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md bg-[#1a1a1a] text-gray-200 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
                                            {item.name}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
