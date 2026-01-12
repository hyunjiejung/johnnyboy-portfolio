"use client";

import { Artwork } from "@/lib/notion";
import { motion } from "framer-motion";
import Image from "next/image";

interface GalleryProps {
    artworks: Artwork[];
}

export default function Gallery({ artworks }: GalleryProps) {
    if (!artworks || artworks.length === 0) {
        return <div className="text-center py-20 text-gray-400">No artworks found.</div>;
    }

    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-4 pb-20 pt-12">
            {artworks.map((art, index) => (
                <motion.div
                    key={art.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="break-inside-avoid mb-8 group relative overflow-hidden rounded-sm bg-gray-100 shadow-lg cursor-none"
                >
                    {art.imageUrl ? (
                        <div className="relative w-full overflow-hidden">
                            <Image
                                src={art.imageUrl}
                                alt={art.title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 will-change-transform"
                                unoptimized
                            />
                        </div>
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400 italic">
                            No Image
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                            <h3 className="text-3xl font-bold text-white mb-2 italic tracking-wide">{art.title}</h3>
                            <div className="flex items-center gap-4 text-white/80 text-sm font-medium uppercase tracking-widest">
                                <span>{art.year}</span>
                                <span className="w-1 h-1 bg-primary rounded-full" />
                                <span>{art.medium}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
