"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag, Home, Menu } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";

interface MobileNavProps {
  onOpenSearch: () => void;
  onOpenMenu: () => void;
}

export default function MobileNav({ onOpenSearch, onOpenMenu }: MobileNavProps) {
  const { cartCount, openCart } = useCart();
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 md:hidden"
    >
      <nav className="flex items-center gap-8 rounded-full glass-mist px-8 py-4 shadow-xl">
        <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground">
          <Home className="w-5 h-5" />
        </Link>
        <button 
          onClick={onOpenSearch}
          className="text-foreground/60 transition-colors hover:text-foreground"
        >
          <Search className="w-5 h-5" />
        </button>
        <button 
          onClick={openCart}
          className="relative text-foreground/60 transition-colors hover:text-foreground"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-background">
              {cartCount}
            </span>
          )}
        </button>
        <button 
          onClick={onOpenMenu}
          className="text-foreground/60 transition-colors hover:text-foreground"
        >
          <Menu className="w-5 h-5" />
        </button>
      </nav>
    </motion.div>
  );
}
