import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-poppins"
});

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
      <body className={`${poppins.variable} font-sans antialiased bg-gray-50/50 text-gray-900 overflow-x-hidden selection:bg-primary selection:text-white cursor-none`}>
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
