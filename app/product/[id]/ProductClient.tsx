"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useState } from "react";

const productData = {
  "orb-ring": {
    name: "The Orb Ring",
    price: "$240",
    category: "Rings — Morning Mist",
    description: "A dialogue between raw material and minimalist vision. The Orb Ring features a single, perfectly smooth silver orb anchored to a hand-hammered band. Designed to catch and hold the soft morning light.",
    details: [
      "925 Sterling Silver",
      "Hand-polished Finish",
      "Weightless Architecture",
      "Est. 2024 Collection"
    ],
    images: ["/ring.png", "/ring-2.png", "/ring-3.png"]
  },
  "mist-pendant": {
    name: "Mist Pendant",
    price: "$380",
    category: "Necklaces — Morning Mist",
    description: "An organic droplet of sterling silver suspended on a weightless chain. Captures the clarity of the dawn and the fluidity of light.",
    details: [
      "925 Sterling Silver",
      "18-inch Fine Chain",
      "Water-drop Silhouette",
      "Signature Mist Finish"
    ],
    images: ["/pendant.png", "/pendant-2.png", "/mist.png"]
  },
  "solis-bracelet": {
    name: "Solis Bracelet",
    price: "$420",
    category: "Bracelets — Ethereal Gold",
    description: "Warm 14k gold chain featuring hand-hammered Solis discs. Designed to settle into your daily ritual with a soft, enduring glow.",
    details: [
      "14k Recycled Gold",
      "Hammered Texture",
      "Adjustable Length",
      "Glow-capture Polishing"
    ],
    images: ["/bracelet.png", "/bracelet-2.png", "/gold.png"]
  },
  "gold-earrings": {
    name: "Gold Artifacts",
    price: "$310",
    category: "Earrings — Ethereal Gold",
    description: "Minimalist gold hoops with a subtle organic texture. A permanent anchor for the modern vision.",
    details: [
      "14k Gold-filled",
      "Organic Surface",
      "Weightless Daily Wear",
      "Hypoallergenic"
    ],
    images: ["/earrings.png", "/gold.png", "/edit-hero.png"]
  }
};

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = productData[id as keyof typeof productData];
  const { addToCart } = useCart();
  const [isFavorited, setIsFavorited] = useState(false);
  const [shareText, setShareText] = useState("Share");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareText("Copied");
    setTimeout(() => setShareText("Share"), 2000);
  };

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="min-h-screen bg-background pb-24 pt-32">
      <div className="container mx-auto px-6">
        <Link href="/shop" className="flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-3 h-3" />
          Back to Curation
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
          {/* 70% Gallery */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="grid grid-cols-1 gap-6 sm:gap-8">
              {product.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/20"
                >
                  <Image
                    src={img}
                    alt={`${product.name} - View ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* 30% Sticky Info */}
          <div className="relative">
            <div className="lg:sticky lg:top-40 flex flex-col gap-8 sm:gap-10">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">{product.category}</span>
                <h1 className="font-heading text-4xl sm:text-6xl">{product.name}</h1>
                <span className="text-xl font-light text-foreground/60">{product.price}</span>
              </div>

              <div className="h-px w-full bg-foreground/5" />

              <p className="text-sm font-light leading-relaxed text-foreground/60">
                {product.description}
              </p>

              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/80">Artifact Details</h4>
                <ul className="flex flex-col gap-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="text-xs font-light text-foreground/40 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden flex-col gap-4 pt-6 lg:flex">
                <button 
                  onClick={() => addToCart({ id, name: product.name, price: product.price, image: product.images[0] })}
                  className="w-full h-16 rounded-full bg-foreground text-background text-[10px] font-medium tracking-[0.2em] uppercase transition-all hover:bg-foreground/90 active:scale-[0.98]"
                >
                  Acquire Artifact
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`flex-grow h-14 rounded-full border border-foreground/10 flex items-center justify-center gap-2 text-[10px] font-medium tracking-[0.2em] uppercase transition-all ${isFavorited ? "bg-accent/20 border-accent" : "hover:bg-secondary/20"}`}
                  >
                    <Heart className={`w-3 h-3 ${isFavorited ? "fill-accent stroke-accent" : ""}`} />
                    {isFavorited ? "Saved" : "Save to Curation"}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="w-14 h-14 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-secondary/20 transition-all text-[10px] uppercase font-medium tracking-widest"
                  >
                    {shareText === "Copied" ? "Link" : <Share2 className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Mobile Sticky CTA */}
              <div className="fixed bottom-0 left-0 right-0 z-50 glass-mist p-6 border-t border-foreground/5 lg:hidden">
                <button 
                  onClick={() => addToCart({ id, name: product.name, price: product.price, image: product.images[0] })}
                  className="w-full h-14 rounded-full bg-foreground text-background text-[10px] font-medium tracking-[0.2em] uppercase transition-all active:scale-[0.98]"
                >
                  Acquire Artifact — {product.price}
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4 mb-24 lg:mb-0">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-medium tracking-[0.2em] uppercase text-foreground/40">Shipping</span>
                  <span className="text-[10px] font-light">Complimentary Global Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-32 pt-24 border-t border-foreground/5">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Continue the Ritual</span>
              <h2 className="font-heading text-4xl">You May Also Acquire</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(productData)
                .filter(([key]) => key !== id)
                .slice(0, 3)
                .map(([key, p], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="group flex flex-col gap-5"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary/20">
                      <Link href={`/product/${key}`} className="absolute inset-0">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart({ id: key, name: p.name, price: p.price, image: p.images[0] });
                        }}
                        className="absolute bottom-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full glass-mist opacity-100 transition-all duration-500 hover:scale-110 hover:bg-foreground hover:text-background md:opacity-0 md:group-hover:opacity-100"
                      >
                        <span className="text-lg font-light">+</span>
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium tracking-wide">{p.name}</h3>
                        <span className="text-sm font-light text-foreground/40">{p.price}</span>
                      </div>
                      <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-foreground/30">{p.category}</span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
