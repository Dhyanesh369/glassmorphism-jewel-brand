"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUpVariant, defaultViewport } from "@/lib/animations";
import { useRef } from "react";

export default function Narrative() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="relative section-padding flex flex-col items-center justify-center bg-secondary/30 overflow-hidden">
      {/* Decorative floating ring */}
      <motion.div
        style={{ rotate }}
        className="absolute top-20 right-[10%] w-40 h-40 rounded-full border border-foreground/[0.03] pointer-events-none hidden lg:block"
      />
      <motion.div
        style={{ rotate }}
        className="absolute bottom-32 left-[8%] w-24 h-24 rounded-full border border-accent/10 pointer-events-none hidden lg:block"
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(209,214,204,0.08),transparent_70%)] pointer-events-none" />

      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="max-w-3xl px-6 text-center relative z-10"
      >
        <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40 mb-8 block">The Narrative</span>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.2] mb-12">
          Jewelry is the <span className="italic opacity-70">Physical Anchor</span> for our Digital Visions.
        </h2>
        <p className="text-base sm:text-lg font-light leading-relaxed tracking-wide text-foreground/60 mb-12">
          At AERIS, we believe in the dialogue between the permanent and the fluid. 
          Our artifacts are designed to settle into your daily ritual, offering a 
          moment of material clarity in an increasingly ethereal world.
        </p>

        {/* Animated divider line */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}
