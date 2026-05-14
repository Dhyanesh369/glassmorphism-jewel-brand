import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/animations/CustomCursor";
import BackToTop from "@/components/animations/BackToTop";
import PageTransition from "@/components/animations/PageTransition";
import Preloader from "@/components/animations/Preloader";
import Navbar from "@/components/sections/Navbar";
import { CartProvider } from "@/lib/context/CartContext";
import ScrollProgress from "@/components/animations/ScrollProgress";
import NotificationManager from "@/components/notifications/NotificationManager";
import NewsletterPopover from "@/components/notifications/NewsletterPopover";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aeris.studio'),
  title: {
    default: "AERIS | Weightless Artifacts for the Modern Ritual",
    template: "%s | AERIS"
  },
  description: "AERIS explores the dialogue between raw material and refined vision. Discover minimalist 14k gold and sterling silver jewelry designed for your daily ritual.",
  keywords: ["minimalist jewelry", "modern fashion", "14k gold", "sterling silver", "weightless artifacts"],
  authors: [{ name: "AERIS Studio" }],
  openGraph: {
    title: "AERIS | Modern Jewelry & Artifacts",
    description: "Discover minimalist 14k gold and sterling silver jewelry designed for your daily ritual.",
    url: 'https://aeris.studio',
    siteName: 'AERIS',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'AERIS Modern Jewelry',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AERIS | Modern Jewelry & Artifacts",
    description: "Discover minimalist 14k gold and sterling silver jewelry designed for your daily ritual.",
    images: ['/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AERIS Studio',
  url: 'https://aeris.studio',
  logo: 'https://aeris.studio/hero.png',
  description: 'Weightless jewelry for the digital curator. Curated, minimal, and modern.',
  sameAs: [
    'https://instagram.com/aeris.studio',
    'https://pinterest.com/aerisstudio'
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <NotificationManager />
          <NewsletterPopover />
          <ScrollProgress />
          <SmoothScroll />
          <CustomCursor />
          <Preloader />
          <Navbar />
          <main className="flex-grow">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}
