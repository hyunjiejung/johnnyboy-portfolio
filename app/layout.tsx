import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Johnny Boy Portfolio",
  description: "Artist Portfolio of Johnny Boy",
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased bg-gray-50/50 text-gray-900 overflow-x-hidden selection:bg-primary selection:text-white cursor-none`}>
        <CustomCursor />
        <div className="bg-noise" />
        <Navbar />
        <main className="pt-24 min-h-screen relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
