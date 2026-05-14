"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { useState, useEffect } from "react";
import Cart from "./Cart";
import SearchOverlay from "./SearchOverlay";
import MobileNav from "./MobileNav";
import MobileMenu from "./MobileMenu";
import MagneticElement from "@/components/animations/MagneticElement";
import { useCart } from "@/lib/context/CartContext";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    const handleOpenCart = () => openCart();
    
    window.addEventListener('open-search', handleOpenSearch);
    window.addEventListener('open-cart', handleOpenCart);
    
    return () => {
      window.removeEventListener('open-search', handleOpenSearch);
      window.removeEventListener('open-cart', handleOpenCart);
    };
  }, [openCart]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 hidden justify-center p-8 md:flex"
      >
        <nav className="flex items-center gap-16 rounded-full glass-mist px-12 py-5 shadow-sm transition-all hover:bg-white/20">
          <div className="flex items-center gap-10">
            <MagneticElement strength={0.2}>
              <Link href="/edit" className="text-[11px] font-medium tracking-[0.2em] uppercase text-foreground/60 transition-colors hover:text-foreground">
                The Edit
              </Link>
            </MagneticElement>
            <MagneticElement strength={0.2}>
              <Link href="/shop" className="text-[11px] font-medium tracking-[0.2em] uppercase text-foreground/60 transition-colors hover:text-foreground">
                The Atelier
              </Link>
            </MagneticElement>
          </div>

          <Link href="/" className="font-heading text-xl tracking-[0.3em] uppercase text-foreground">
            AERIS
          </Link>
          
          <div className="flex items-center gap-10">
            <MagneticElement strength={0.2}>
              <Link href="/journal" className="text-[11px] font-medium tracking-[0.2em] uppercase text-foreground/60 transition-colors hover:text-foreground">
                Journal
              </Link>
            </MagneticElement>
            <div className="flex items-center gap-4 ml-2">
              <MagneticElement strength={0.3}>
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-foreground/60 transition-colors hover:text-foreground p-1"
                >
                  <Search className="w-4 h-4" />
                </button>
              </MagneticElement>
              <MagneticElement strength={0.3}>
                <button 
                  onClick={openCart}
                  className="relative text-foreground/60 transition-colors hover:text-foreground p-1"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-background">
                      {cartCount}
                    </span>
                  )}
                </button>
              </MagneticElement>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Brand Logo for Mobile (Center Top) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-8 md:hidden pointer-events-none">
        <Link href="/" className="font-heading text-lg tracking-[0.3em] uppercase text-foreground pointer-events-auto">
          AERIS
        </Link>
      </div>

      <MobileNav 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      <Cart />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
