"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 32);
            cursorY.set(e.clientY - 32);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === "A" || (e.target as HTMLElement).tagName === "BUTTON") {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            <motion.svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                animate={{
                    scale: isHovered ? 1.5 : 1,
                }}
                transition={{
                    scale: { duration: 0.2 },
                }}
            >
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="#E60023"
                    stroke="#E60023"
                    strokeWidth="2"
                />
            </motion.svg>
        </motion.div>
    );
}
