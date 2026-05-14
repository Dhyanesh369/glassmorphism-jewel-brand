"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

export default function EditPage() {
  const { addToCart } = useCart();
  return (
    <div className="min-h-screen bg-background pt-40 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col gap-6 mb-24 text-center items-center"
        >
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Seasonal Curation</span>
          <h1 className="font-heading text-6xl sm:text-8xl lg:text-[10rem] leading-[0.9] tracking-tighter">
            The Edit <br /> <span className="italic opacity-60 text-4xl sm:text-6xl lg:text-8xl">S/S 2024</span>
          </h1>
        </motion.div>

        {/* Featured Composition */}
        <section className="grid grid-cols-1 gap-24 lg:grid-cols-2 lg:items-center mb-48">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src="/edit-hero.png"
              alt="The Seasonal Composition"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex flex-col gap-10 lg:pl-12"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Featured Set</span>
              <h2 className="font-heading text-4xl sm:text-6xl">Modern <br /> <span className="italic opacity-80">Continuity.</span></h2>
              <p className="max-w-md text-base font-light leading-relaxed text-foreground/60">
                This season, we explore the dialogue between raw material and refined 
                vision. The Solis Bracelet and Orb Ring are paired to create a 
                composition of enduring weightlessness.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/product/orb-ring" className="group flex items-center justify-between border-b border-foreground/10 pb-4 transition-colors hover:border-foreground">
                <span className="text-sm font-light uppercase tracking-widest">The Orb Ring</span>
                <span className="text-xs opacity-40">$240</span>
              </Link>
              <Link href="/shop" className="group flex items-center justify-between border-b border-foreground/10 pb-4 transition-colors hover:border-foreground">
                <span className="text-sm font-light uppercase tracking-widest">Solis Bracelet</span>
                <span className="text-xs opacity-40">$420</span>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Curated Grid - Different Rhythm */}
        <section className="flex flex-col gap-24">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Curated Rhythm</span>
            <h2 className="font-heading text-4xl">Essential Artifacts</h2>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Mist Pendant", price: "$380", image: "/pendant.png", id: "mist-pendant" },
              { name: "Gold Artifacts", price: "$310", image: "/earrings.png", id: "gold-earrings" },
              { name: "The Orb Ring", price: "$240", image: "/ring.png", id: "orb-ring" },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`flex flex-col gap-6 ${index === 1 ? "lg:-mt-24" : ""}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary/20">
                  <Link href={`/product/${product.id}`} className="absolute inset-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      });
                    }}
                    className="absolute bottom-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full glass-mist opacity-100 transition-all duration-500 hover:scale-110 hover:bg-foreground hover:text-background"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground">{product.name}</span>
                  <span className="text-[10px] font-light text-foreground/40">{product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
