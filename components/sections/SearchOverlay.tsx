"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowUpRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const allProducts = [
  { id: "orb-ring", name: "The Orb Ring", price: "$240", image: "/ring.png", category: "Rings", collection: "Morning Mist" },
  { id: "mist-pendant", name: "Mist Pendant", price: "$380", image: "/pendant.png", category: "Necklaces", collection: "Morning Mist" },
  { id: "solis-bracelet", name: "Solis Bracelet", price: "$420", image: "/bracelet.png", category: "Bracelets", collection: "Ethereal Gold" },
  { id: "gold-earrings", name: "Gold Artifacts", price: "$310", image: "/earrings.png", category: "Earrings", collection: "Ethereal Gold" },
];

const quickLinks = [
  { label: "Morning Mist Collection", href: "/collection/morning-mist" },
  { label: "Ethereal Gold Collection", href: "/collection/ethereal-gold" },
  { label: "The Journal", href: "/journal" },
  { label: "Our Narrative", href: "/about" },
];

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q)
    );
  }, [query]);

  // Prevent scroll when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      if (!isOpen) setQuery("");
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-2xl p-6 overflow-y-auto"
        >
          <button 
            onClick={onClose}
            className="absolute top-12 right-12 p-4 hover:bg-foreground/5 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-4xl mx-auto flex flex-col gap-12 pt-24">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex items-center border-b border-foreground/10 pb-6 transition-all focus-within:border-foreground"
            >
              <Search className="w-8 h-8 text-foreground/20 mr-6 shrink-0" />
              <input 
                autoFocus
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artifacts..." 
                className="bg-transparent text-4xl sm:text-6xl font-heading font-light outline-none flex-grow placeholder:text-foreground/10 w-full"
              />
            </motion.div>

            {/* Search Results */}
            <AnimatePresence mode="wait">
              {query.trim() ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-8"
                >
                  <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">
                    {results.length} {results.length === 1 ? "Result" : "Results"}
                  </span>
                  {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={onClose}
                          className="group flex gap-6 p-4 rounded-2xl transition-colors hover:bg-secondary/30"
                        >
                          <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-xl bg-secondary/20 shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <h3 className="text-sm font-medium tracking-wide group-hover:opacity-70 transition-opacity">{product.name}</h3>
                            <span className="text-xs font-light text-foreground/40">{product.collection} · {product.category}</span>
                            <span className="text-sm font-light text-foreground/60">{product.price}</span>
                          </div>
                          <ArrowUpRight className="h-4 w-4 ml-auto mt-auto text-foreground/20 group-hover:text-foreground transition-colors" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm font-light text-foreground/40">No artifacts match your vision. Try a different query.</p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="suggestions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-12"
                >
                  {/* Quick Links */}
                  <div className="flex flex-col gap-6">
                    <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Quick Navigation</span>
                    <div className="flex flex-col gap-3">
                      {quickLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={onClose}
                          className="group flex items-center justify-between py-3 border-b border-foreground/5 hover:border-foreground/20 transition-colors"
                        >
                          <span className="text-lg font-light group-hover:opacity-70 transition-opacity">{link.label}</span>
                          <ArrowUpRight className="h-4 w-4 text-foreground/20 group-hover:text-foreground transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Tags */}
                  <div className="flex flex-col gap-6">
                    <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Suggested</span>
                    <div className="flex flex-wrap gap-4">
                      {["Ring", "Gold", "Pendant", "Bracelet", "Silver", "Mist"].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-6 py-2.5 rounded-full border border-foreground/5 hover:bg-foreground hover:text-background transition-all text-xs font-light tracking-wider"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
