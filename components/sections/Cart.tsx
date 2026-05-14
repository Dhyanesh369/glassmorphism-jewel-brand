"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/context/CartContext";

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, closeCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Prevent scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/5 backdrop-blur-sm"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md glass-mist shadow-2xl"
          >
            <div className="flex h-full flex-col p-8">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <ShoppingBag className="w-5 h-5 text-foreground/40" />
                  <h2 className="font-heading text-xl tracking-wider uppercase">The Atelier</h2>
                </div>
                <button 
                  onClick={closeCart}
                  className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                {items.length > 0 ? (
                  <div className="flex flex-col gap-8">
                    {items.map((item) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-6"
                      >
                        <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-xl bg-secondary/20">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-grow flex-col justify-between py-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium tracking-wide">{item.name}</h3>
                            <span className="text-sm font-light text-foreground/60">{item.price}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 border border-foreground/5 rounded-full px-3 py-1">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-xs text-foreground/40 hover:text-foreground">-</button>
                              <span className="text-xs font-medium">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-xs text-foreground/40 hover:text-foreground">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-foreground/20 hover:text-destructive transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-6 text-center opacity-40">
                    <ShoppingBag className="w-12 h-12 stroke-[1px]" />
                    <p className="text-sm font-light tracking-wide">Your collection is empty. The ritual awaits.</p>
                  </div>
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-foreground/5">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-medium uppercase tracking-widest text-foreground/40">Subtotal</span>
                  <span className="text-lg font-heading tracking-wide">${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isCheckingOut}
                  className="w-full h-16 rounded-full bg-foreground text-background text-[10px] font-medium tracking-[0.2em] uppercase transition-all hover:bg-foreground/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? "Preparing..." : "Acquire Artifacts"}
                </button>
                <button 
                  onClick={closeCart}
                  className="w-full py-4 text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors"
                >
                  Continue Curation
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
