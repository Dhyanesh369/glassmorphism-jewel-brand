"use client";

import { motion } from "framer-motion";

const phrases = [
  "Modern Continuity",
  "✦",
  "Weightless Artifacts",
  "✦",
  "The Daily Ritual",
  "✦",
  "Material Clarity",
  "✦",
  "Ethereal Gold",
  "✦",
  "Morning Mist",
  "✦",
];

export default function Marquee() {
  const items = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <section className="overflow-hidden py-8 border-y border-foreground/5 bg-background relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        className="flex whitespace-nowrap gap-10"
      >
        {items.map((phrase, index) => (
          <span
            key={index}
            className={`text-xs tracking-[0.3em] uppercase font-light ${
              phrase === "✦"
                ? "text-accent/40 text-[8px]"
                : "text-foreground/15 hover:text-foreground/40 transition-colors duration-500"
            }`}
          >
            {phrase}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
