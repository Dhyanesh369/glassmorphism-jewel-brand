"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { defaultViewport } from "@/lib/animations";
import { useRef } from "react";
import MagneticElement from "@/components/animations/MagneticElement";

export default function Journal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const textX = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);

  return (
    <section ref={ref} className="section-padding container mx-auto px-6 relative">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 1.2 }}
          className="relative aspect-square overflow-hidden rounded-2xl group"
        >
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src="/journal.png"
              alt="The Art of Layering"
              fill
              className="object-cover"
            />
          </motion.div>
          {/* Warm overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Floating badge */}
          <div className="absolute top-8 left-8">
            <span className="px-4 py-1.5 rounded-full glass-mist text-[9px] font-medium tracking-[0.2em] uppercase">
              Latest Entry
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex flex-col gap-10 lg:pl-12"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">The Journal</span>
              <div className="h-px flex-grow bg-foreground/5" />
              <span className="text-[10px] font-light text-foreground/30">May 2024</span>
            </div>
            <motion.h2 style={{ x: textX }} className="font-heading text-4xl sm:text-6xl">The Art of <br /> <span className="italic opacity-80">Layering.</span></motion.h2>
            <p className="max-w-md text-base font-light leading-relaxed text-foreground/60">
              Discover the curated rules of weightless composition. From metal mixing 
              to length hierarchy, learn how to build your personal artifact collection.
            </p>
          </div>

          <MagneticElement strength={0.15}>
            <Link href="/journal" className="group flex items-center gap-4 text-[10px] font-medium tracking-[0.2em] uppercase text-foreground w-fit">
              Read the Entry
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 transition-all duration-500 group-hover:bg-foreground group-hover:text-background group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(200,180,140,0.1)]">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          </MagneticElement>
        </motion.div>
      </div>
    </section>
  );
}
