"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background pt-40 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col gap-6 mb-24 max-w-4xl"
        >
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Responsible Vision</span>
          <h1 className="font-heading text-6xl sm:text-8xl leading-[1.1]">
            Enduring beauty requires <br /> <span className="italic opacity-70">Material Integrity.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-24 lg:grid-cols-2 mb-32">
          <div className="flex flex-col gap-12 justify-center">
            <h2 className="font-heading text-4xl">Circular Permanence</h2>
            <p className="text-sm font-light leading-relaxed text-foreground/60 max-w-md">
              We believe in creating artifacts that never leave the ritual. Our 
              approach to sustainability is built on the pillars of recycled 
              precious metals, ethical sourcing, and architectural durability.
            </p>
            <div className="flex flex-col gap-6 border-l border-foreground/10 pl-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase">100% Recycled Gold</span>
                <p className="text-xs font-light text-foreground/40">Reducing the need for raw extraction.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Ethical Stones</span>
                <p className="text-xs font-light text-foreground/40">Conflict-free and traceably sourced.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Minimal Waste</span>
                <p className="text-xs font-light text-foreground/40">Zero-plastic editorial packaging.</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image src="/gold.png" alt="Recycled 14k Gold Artifacts" fill className="object-cover opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
