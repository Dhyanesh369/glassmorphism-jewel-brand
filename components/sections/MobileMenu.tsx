"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { label: "The Edit", href: "/edit", subtitle: "S/S 2024 Curation" },
  { label: "The Atelier", href: "/shop", subtitle: "Full Collection" },
  { label: "The Journal", href: "/journal", subtitle: "Modern Rituals" },
  { label: "Our Narrative", href: "/about", subtitle: "The Vision" },
  { label: "Sustainability", href: "/sustainability", subtitle: "Material Integrity" },
  { label: "Concierge", href: "/contact", subtitle: "Personal Curation" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-3xl md:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-8">
            <span className="font-heading text-xl tracking-[0.3em] uppercase">AERIS</span>
            <button 
              onClick={onClose}
              className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links Grid */}
          <div className="flex flex-col gap-8 px-8 pt-12">
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Navigation</span>
            <nav className="flex flex-col gap-6">
              {menuLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.8 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={onClose}
                    className="group flex items-end justify-between border-b border-foreground/5 pb-4 transition-colors hover:border-foreground/20"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-heading text-4xl sm:text-5xl">{link.label}</span>
                      <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-foreground/30">{link.subtitle}</span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-foreground/20 group-hover:text-foreground transition-colors mb-2" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-8 px-8 pt-12 border-t border-foreground/5 mt-auto mb-24">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  onClose();
                  // Trigger search from Navbar state or use a global store
                  // For now, let's assume we can trigger it
                  window.dispatchEvent(new CustomEvent('open-search'));
                }}
                className="flex flex-col gap-2 p-6 rounded-2xl bg-secondary/30"
              >
                <Search className="w-5 h-5 text-foreground/40" />
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Search</span>
              </button>
              <button 
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent('open-cart'));
                }}
                className="flex flex-col gap-2 p-6 rounded-2xl bg-secondary/30"
              >
                <ShoppingBag className="w-5 h-5 text-foreground/40" />
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase">The Bag</span>
              </button>
            </div>
          </div>

          {/* Social / Footer Links */}
          <div className="absolute bottom-12 left-8 right-8 flex justify-between items-center">
            <div className="flex gap-6">
              {["Instagram", "Pinterest"].map((social) => (
                <button key={social} className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40">
                  {social}
                </button>
              ))}
            </div>
            <Link 
              href="/privacy" 
              onClick={onClose}
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/20"
            >
              Privacy
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
