"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeUpVariant, defaultViewport, aerisEasing } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";

const collections = [
  {
    title: "Morning Mist",
    description: "Cool-toned silver capturing the dawn.",
    image: "/mist.png",
    href: "/collection/morning-mist",
    offset: false,
    accent: "rgba(200, 210, 220, 0.15)",
  },
  {
    title: "Ethereal Gold",
    description: "Warm 14k pieces designed to hold the light of a fading sun.",
    image: "/gold.png",
    href: "/collection/ethereal-gold",
    offset: true,
    accent: "rgba(200, 180, 140, 0.15)",
  },
];

export default function Collections() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} id="collections" className="section-padding container mx-auto px-6 relative">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />

      <div className="flex flex-col gap-24 sm:gap-48">
        <motion.div 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex flex-col items-center text-center gap-6"
        >
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">The Edit</span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl text-shimmer">Curated Rhythm</h2>
          <p className="max-w-md text-sm font-light leading-relaxed text-foreground/40">
            Two moods. One vision. Select your atmosphere.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 sm:gap-24 md:grid-cols-2">
          {collections.map((collection, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 1.2, delay: index * 0.2, ease: aerisEasing }}
              className={`relative flex flex-col gap-6 sm:gap-8 ${collection.offset ? "md:pt-32" : ""}`}
            >
              <Link href={collection.href} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
                {/* Color accent glow on hover */}
                <div
                  className="absolute inset-0 z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 80%, ${collection.accent}, transparent 70%)` }}
                />

                <motion.div style={{ y }} className="absolute -inset-[10%]">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-all duration-[1.5s] group-hover:scale-110"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Enhanced Glass Label */}
                <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                  <div className="glass-mist rounded-full px-6 py-3 flex items-center justify-center gap-3">
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground">View Curation</span>
                    <ArrowUpRight className="w-3 h-3 text-foreground/60" />
                  </div>
                </div>

                {/* Collection number */}
                <div className="absolute top-8 left-8 z-20">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    0{index + 1}
                  </span>
                </div>
              </Link>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-2xl tracking-wide">{collection.title}</h3>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="text-foreground/20"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>
                <p className="text-sm font-light text-foreground/60 max-w-sm">{collection.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
