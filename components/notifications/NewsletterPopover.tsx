"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";

export default function NewsletterPopover() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1.5 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-32 right-8 z-[100] hidden lg:block"
        >
          <div className="glass-mist rounded-2xl p-8 w-80 shadow-2xl border border-white/40">
            <button 
              onClick={() => setIsDismissed(true)}
              className="absolute top-4 right-4 p-1 hover:bg-foreground/5 rounded-full transition-colors"
            >
              <X className="h-3 w-3 text-foreground/40" />
            </button>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-medium tracking-[0.4em] uppercase text-foreground/40">The Circle</span>
                <h3 className="font-heading text-2xl tracking-wide">Stay Close to the <span className="italic opacity-70">Ritual.</span></h3>
              </div>
              <p className="text-xs font-light text-foreground/40 leading-relaxed">
                Join our curated circle for seasonal previews and material insights.
              </p>
              <form className="flex items-center border-b border-foreground/10 pb-2 transition-all focus-within:border-foreground">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent text-[11px] font-light outline-none flex-grow placeholder:text-foreground/20"
                />
                <button type="submit" className="text-foreground/40 hover:text-foreground transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
