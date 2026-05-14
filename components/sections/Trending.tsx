"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { defaultViewport, aerisEasing } from "@/lib/animations";
import MagneticElement from "@/components/animations/MagneticElement";

const products = [
  {
    id: "orb-ring",
    name: "The Orb Ring",
    price: "$240",
    image: "/ring.png",
    category: "Silver / Moonstone",
    badge: "Signature",
  },
  {
    id: "mist-pendant",
    name: "Mist Pendant",
    price: "$380",
    image: "/pendant.png",
    category: "14k Gold / Pearl",
    badge: null,
  },
  {
    id: "solis-bracelet",
    name: "Solis Bracelet",
    price: "$420",
    image: "/bracelet.png",
    category: "Hammered Silver",
    badge: "New",
  },
];

export default function Trending() {
  const { addToCart } = useCart();
  return (
    <section className="section-padding container mx-auto px-6 relative">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />

      <div className="flex flex-col gap-12 sm:gap-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3 sm:gap-4">
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Curated Edits</span>
            <h2 className="text-4xl sm:text-6xl font-heading text-shimmer">Recent Curations</h2>
          </div>
          <MagneticElement strength={0.2}>
            <Link href="/shop" className="group flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/60 transition-colors hover:text-foreground">
              The Atelier
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 transition-all group-hover:bg-foreground group-hover:text-background group-hover:scale-110">
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </Link>
          </MagneticElement>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 1, delay: index * 0.1, ease: aerisEasing }}
              className="group flex flex-col gap-5"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary/20">
                <Link href={`/product/${product.id}`} className="absolute inset-0 z-[1]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-[1.5s] group-hover:scale-110"
                  />
                </Link>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-6 left-6 z-[3]">
                    <span className="px-4 py-1.5 rounded-full glass-mist text-[9px] font-medium tracking-[0.2em] uppercase">
                      {product.badge}
                    </span>
                  </div>
                )}
                
                {/* Quick Add button */}
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
                  className="absolute bottom-6 right-6 z-[3] flex h-11 w-11 items-center justify-center rounded-full glass-mist opacity-100 transition-all duration-500 hover:scale-110 hover:bg-foreground hover:text-background md:opacity-0 md:group-hover:opacity-100"
                >
                  <Plus className="h-4 w-4" />
                </button>

                {/* Quick View text */}
                <div className="absolute bottom-6 left-6 z-[3] opacity-0 translate-y-2 transition-all duration-500 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/70">Quick View</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium tracking-wide group-hover:opacity-70 transition-opacity">{product.name}</h3>
                  <span className="text-sm font-light text-foreground/40">{product.price}</span>
                </div>
                <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-foreground/30">{product.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
