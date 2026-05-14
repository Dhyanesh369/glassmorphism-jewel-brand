"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-40 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col gap-6 mb-24 max-w-4xl"
        >
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Our Narrative</span>
          <h1 className="font-heading text-6xl sm:text-8xl leading-[1.1]">
            We build artifacts for the <span className="italic opacity-70">Modern Ritual.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-24 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src="/about.png"
              alt="AERIS Studio"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex flex-col gap-12 lg:pl-12"
          >
            <div className="flex flex-col gap-8">
              <h2 className="font-heading text-4xl">The Vision</h2>
              <p className="text-lg font-light leading-relaxed text-foreground/60 italic">
                "Jewelry is not a decoration; it is a physical anchor in an ethereal world."
              </p>
              <p className="text-sm font-light leading-relaxed text-foreground/40">
                AERIS was founded in 2024 as a dialogue between the permanent and the fluid. 
                Our studio operates at the intersection of minimalist architectural vision 
                and modern self-expression. Every artifact we craft is designed to settle 
                into your daily life, offering a moment of material clarity.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <h2 className="font-heading text-4xl">Material Integrity</h2>
              <p className="text-sm font-light leading-relaxed text-foreground/40">
                We prioritize weightless composition. Our materials—sterling silver, 
                14k gold, and ethically sourced stones—are chosen for their ability to 
                hold light and endure the passage of time. We believe in high-luminance 
                craftsmanship that respects both the wearer and the source.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground">925 Silver</span>
                  <span className="text-[10px] font-light text-foreground/30">Frosted & Polished</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground">14k Gold</span>
                  <span className="text-[10px] font-light text-foreground/30">Recycled & Pure</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Narrative Quote */}
        <section className="section-padding flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="max-w-2xl"
          >
            <h3 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-12 opacity-80">
              Artifacts of <br /> <span className="italic">Enduring Beauty.</span>
            </h3>
            <div className="h-px w-24 bg-foreground/20 mx-auto" />
          </motion.div>
        </section>
      </div>
    </div>
  );
}
