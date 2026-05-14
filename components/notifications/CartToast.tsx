"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

interface CartToastProps {
  item: { name: string; image: string; price: string } | null;
  onClose: () => void;
}

export default function CartToast({ item, onClose }: CartToastProps) {
  useEffect(() => {
    if (item) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-32 left-1/2 z-[100] w-[90%] max-w-sm"
        >
          <div className="glass-mist rounded-2xl p-4 shadow-2xl flex items-center gap-4 border border-white/40">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-secondary/20 shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-grow flex-col gap-1">
              <div className="flex items-center gap-2">
                <Check className="h-3 w-3 text-accent" />
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent">Added to Bag</span>
              </div>
              <h4 className="text-sm font-medium tracking-wide">{item.name}</h4>
              <span className="text-xs font-light text-foreground/40">{item.price}</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-foreground/40" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
