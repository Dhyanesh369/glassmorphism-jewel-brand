import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import Navbar from "@/components/sections/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agency Template | Premium Digital Experiences",
  description: "High-end, conversion-focused website template built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground`}>
        <SmoothScroll />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
