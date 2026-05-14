"use client";

import { motion } from "framer-motion";
import { aerisEasing, defaultViewport } from "@/lib/animations";
import { Star } from "lucide-react";
import FloatingOrbs from "@/components/animations/FloatingOrbs";

const testimonials = [
  {
    text: "AERIS has redefined what modern jewelry means to me. Each piece feels like it was designed specifically for my ritual.",
    author: "Celeste R.",
    location: "Copenhagen",
    artifact: "The Orb Ring",
    rating: 5,
  },
  {
    text: "The Mist Pendant is the most intentional piece I own. It captures something I can't describe — like wearing light itself.",
    author: "Maya T.",
    location: "Brooklyn, NY",
    artifact: "Mist Pendant",
    rating: 5,
  },
  {
    text: "I've never experienced this level of material clarity. The Solis Bracelet is architecture on the wrist.",
    author: "Nora V.",
    location: "Berlin",
    artifact: "Solis Bracelet",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(209,214,204,0.1),transparent_60%)]" />
      <FloatingOrbs count={3} section="ambient" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 1.5, ease: aerisEasing }}
          className="flex flex-col items-center text-center gap-6 mb-24"
        >
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Voices</span>
          <h2 className="font-heading text-4xl sm:text-6xl text-shimmer">The Curation Circle</h2>
            <p className="max-w-md text-sm font-light text-foreground/40">
              Perspectives from those who&apos;ve embraced the ritual.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 1.2, delay: index * 0.15, ease: aerisEasing }}
              className="glass-mist rounded-3xl p-10 flex flex-col gap-8 justify-between hover-lift relative group"
            >
              {/* Subtle accent on hover */}
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,180,140,0.05),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-accent/60 text-accent/60" />
                ))}
              </div>

              <p className="text-sm font-light leading-relaxed text-foreground/70 italic relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-secondary/50 flex items-center justify-center text-[11px] font-semibold text-foreground/60 border border-foreground/5">
                    {t.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium tracking-wide">{t.author}</span>
                    <span className="text-[10px] font-light text-foreground/40">{t.location}</span>
                  </div>
                </div>
                <div className="h-px w-full bg-foreground/5 my-1" />
                <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-foreground/30">
                  Acquired: {t.artifact}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
