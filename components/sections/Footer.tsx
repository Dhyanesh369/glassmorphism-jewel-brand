"use client";

import Link from "next/link";
import { Camera, Send, Globe, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-secondary/40 backdrop-blur-md border-t border-foreground/5 overflow-hidden">
      {/* Large background brand text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        <span className="font-heading text-[20vw] tracking-[0.2em] uppercase text-foreground/[0.015] leading-none whitespace-nowrap">
          AERIS
        </span>
      </div>

      {/* Newsletter Hero Strip */}
      <div className="border-b border-foreground/5 py-16 sm:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Join the Circle</span>
            <h3 className="font-heading text-3xl sm:text-4xl">Stay Close to the <span className="italic opacity-70">Ritual.</span></h3>
            
            {isSubscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent"
              >
                ✦ Welcome to the Ritual ✦
              </motion.p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center w-full max-w-md border-b border-foreground/10 pb-3 transition-all focus-within:border-foreground">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="bg-transparent text-sm font-light outline-none flex-grow placeholder:text-foreground/20"
                  required
                />
                <button type="submit" className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors">
                  Subscribe
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-8">
            <Link href="/" className="font-heading text-2xl tracking-[0.3em] uppercase text-foreground w-fit">
              AERIS
            </Link>
            <p className="max-w-xs text-xs font-light leading-relaxed text-foreground/40">
              Artifacts of enduring beauty. Designed at the intersection of 
              minimalist vision and modern self-expression.
            </p>
            <div className="flex items-center gap-6">
              {[
                { Icon: Camera, href: "#" },
                { Icon: Globe, href: "#" },
                { Icon: Send, href: "#" },
              ].map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/5 text-foreground/40 transition-all hover:text-foreground hover:border-foreground/20 hover:scale-110"
                >
                  <Icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/60">Collection</span>
            <div className="flex flex-col gap-4">
              <Link href="/collection/morning-mist" className="text-sm font-light text-foreground/40 hover:text-foreground transition-colors hover:translate-x-1 transform duration-300 inline-block">Morning Mist</Link>
              <Link href="/collection/ethereal-gold" className="text-sm font-light text-foreground/40 hover:text-foreground transition-colors hover:translate-x-1 transform duration-300 inline-block">Ethereal Gold</Link>
              <Link href="/shop" className="text-sm font-light text-foreground/40 hover:text-foreground transition-colors hover:translate-x-1 transform duration-300 inline-block">The Solis Edit</Link>
              <Link href="/shop" className="text-sm font-light text-foreground/40 hover:text-foreground transition-colors hover:translate-x-1 transform duration-300 inline-block">Artifacts</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/60">Studio</span>
            <div className="flex flex-col gap-4">
              <Link href="/about" className="text-sm font-light text-foreground/40 hover:text-foreground transition-colors hover:translate-x-1 transform duration-300 inline-block">Our Narrative</Link>
              <Link href="/journal" className="text-sm font-light text-foreground/40 hover:text-foreground transition-colors hover:translate-x-1 transform duration-300 inline-block">The Journal</Link>
              <Link href="/sustainability" className="text-sm font-light text-foreground/40 hover:text-foreground transition-colors hover:translate-x-1 transform duration-300 inline-block">Sustainability</Link>
              <Link href="/contact" className="text-sm font-light text-foreground/40 hover:text-foreground transition-colors hover:translate-x-1 transform duration-300 inline-block">Contact</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/60">The Studio</span>
            <address className="not-italic text-sm font-light text-foreground/40 leading-relaxed">
              72 Ethereal Lane<br />
              Digital Mist, 10240
            </address>
            <a href="mailto:concierge@aeris.studio" className="text-sm font-light text-foreground/40 hover:text-foreground transition-colors">
              concierge@aeris.studio
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-foreground/5">
        <div className="container mx-auto px-6 py-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="text-[10px] font-medium tracking-[0.1em] text-foreground/20 uppercase">© 2024 AERIS Studio. All rights reserved.</span>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-[10px] font-medium tracking-[0.1em] text-foreground/20 uppercase hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-medium tracking-[0.1em] text-foreground/20 uppercase hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
