"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [lang, setLang] = useState<"EN" | "KR">("EN");

    const toggleLang = () => {
        setLang((prev) => (prev === "EN" ? "KR" : "EN"));
    };

    return (
        <nav
            className="fixed top-6 left-1/2 -translate-x-1/2 transform z-[10002] flex items-center justify-between px-8 py-3 w-[90%] max-w-4xl transition-all duration-300"
        >
            <div className="text-xl font-black tracking-tighter text-black uppercase cursor-pointer hover:scale-105 hover:text-white transition-all">
                <Link href="/">Johnny Boy</Link>
            </div>

            <div className="flex items-center gap-8 text-sm font-medium text-gray-800">
                <Link href="/" className="relative hover:text-white transition-colors group">
                    Work
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </Link>
                <Link href="/profile" className="relative hover:text-white transition-colors group">
                    Profile
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </Link>

                <button
                    onClick={toggleLang}
                    className="px-3 py-1 text-[10px] font-bold tracking-widest border border-gray-400 rounded-full hover:bg-black hover:text-white hover:border-black transition-all"
                >
                    {lang}
                </button>
            </div>
        </nav>
    );
}
