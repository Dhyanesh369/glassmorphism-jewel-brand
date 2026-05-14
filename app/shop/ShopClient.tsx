"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useState } from "react";

const products = [
  { id: "orb-ring", name: "The Orb Ring", price: "$240", image: "/ring.png", category: "Rings", material: "Sterling Silver" },
  { id: "mist-pendant", name: "Mist Pendant", price: "$380", image: "/pendant.png", category: "Necklaces", material: "Sterling Silver" },
  { id: "solis-bracelet", name: "Solis Bracelet", price: "$420", image: "/bracelet.png", category: "Bracelets", material: "14k Gold" },
  { id: "gold-earrings", name: "Gold Artifacts", price: "$310", image: "/earrings.png", category: "Earrings", material: "14k Gold" },
];

export default function ShopPage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMaterial, setActiveMaterial] = useState("All");
  const [sortBy, setSortBy] = useState("Default");

  const filteredProducts = products
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .filter(p => activeMaterial === "All" || p.material === activeMaterial)
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''));
      if (sortBy === "Price: High to Low") return parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', ''));
      return 0;
    });

  const categories = ["All", "Rings", "Necklaces", "Bracelets", "Earrings"];
  const materials = ["All", "Sterling Silver", "14k Gold"];

  return (
    <div className="min-h-screen bg-background pt-40 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-12 sm:gap-24">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col gap-6"
            >
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Curation</span>
              <h1 className="font-heading text-6xl sm:text-8xl">The Atelier.</h1>
              <p className="max-w-xl text-sm font-light leading-relaxed text-foreground/60">
                Explore our full collection of weightless artifacts. Each piece is 
                crafted to settle into your daily ritual.
              </p>
            </motion.div>

            <div className="flex flex-col gap-10">
              {/* Category Filter */}
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-foreground/30">Category</span>
                <div className="flex flex-wrap items-center gap-6">
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-[10px] font-medium tracking-[0.2em] uppercase transition-colors ${activeCategory === cat ? "text-foreground" : "text-foreground/40 hover:text-foreground"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Filter */}
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-foreground/30">Material</span>
                <div className="flex flex-wrap items-center gap-6">
                  {materials.map((mat) => (
                    <button 
                      key={mat}
                      onClick={() => setActiveMaterial(mat)}
                      className={`text-[10px] font-medium tracking-[0.2em] uppercase transition-colors ${activeMaterial === mat ? "text-foreground" : "text-foreground/40 hover:text-foreground"}`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center justify-between border-t border-foreground/5 pt-6 mt-2">
                <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-foreground/30">
                  Showing {filteredProducts.length} artifacts
                </span>
                <select 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/60 outline-none cursor-pointer hover:text-foreground"
                >
                  <option value="Default">Sort By</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="group flex flex-col gap-6"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary/20">
                    <Link href={`/product/${product.id}`} className="absolute inset-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
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
                      className="absolute bottom-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full glass-mist opacity-100 transition-all duration-500 hover:scale-110 hover:bg-foreground hover:text-background md:opacity-0 md:group-hover:opacity-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
                      <span className="text-sm font-light text-foreground/40">{product.price}</span>
                    </div>
                    <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-foreground/20">{product.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
