"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

const collectionData = {
  "morning-mist": {
    title: "Morning Mist",
    description: "Cool-toned silver and moonstone artifacts designed for a serene daily ritual. Each piece captures the clarity of the dawn.",
    heroImage: "/mist.png",
    products: [
      { id: "orb-ring", name: "The Orb Ring", price: "$240", image: "/ring.png" },
      { id: "mist-pendant", name: "Mist Pendant", price: "$380", image: "/pendant.png" },
    ]
  },
  "ethereal-gold": {
    title: "Ethereal Gold",
    description: "Warm 14k gold pieces that glow with intentionality. Designed to hold the light of a fading sun.",
    heroImage: "/gold.png",
    products: [
      { id: "solis-bracelet", name: "Solis Bracelet", price: "$420", image: "/bracelet.png" },
      { id: "gold-earrings", name: "Gold Artifacts", price: "$310", image: "/earrings.png" },
    ]
  }
};

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const collection = collectionData[slug as keyof typeof collectionData];
  const { addToCart } = useCart();

  if (!collection) return <div>Collection not found.</div>;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Cinematic Header */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0"
        >
          <Image
            src={collection.heroImage}
            alt={collection.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
        </motion.div>

        <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="flex flex-col gap-6"
          >
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Mood Selection</span>
            <h1 className="font-heading text-6xl sm:text-8xl">{collection.title}</h1>
            <p className="max-w-xl text-sm font-light leading-relaxed text-foreground/60">
              {collection.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product List */}
      <section className="container mx-auto px-6 pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {collection.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
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
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
