"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MoveDown } from "lucide-react";

export default function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const title = "Johnny Boy";

    return (
        <motion.div
            style={{ y, opacity }}
            className="py-32 md:py-48 text-center flex flex-col items-center justify-center min-h-[80vh] relative z-20"
        >
            <h1 className="text-[12vw] md:text-[10rem] font-bold mb-6 tracking-tighter text-black leading-[0.8] select-none pointer-events-none mix-blend-multiply">
                {title.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ y: 100, opacity: 0, rotate: 10 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        transition={{
                            duration: 1,
                            ease: [0.33, 1, 0.68, 1],
                            delay: index * 0.1,
                        }}
                        className="inline-block origin-bottom"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-xl md:text-3xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed text-balance"
            >
                Exploring the boundaries of color and form through <span className="text-primary font-medium italic">playful chaos</span>.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-24 animate-bounce"
            >
                <MoveDown className="w-8 h-8" />
            </motion.div>
        </motion.div>
    );
}
