"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-40 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col gap-6 mb-24"
        >
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Legal</span>
          <h1 className="font-heading text-6xl sm:text-8xl">Terms of Service.</h1>
        </motion.div>

        <div className="flex flex-col gap-12 text-sm font-light leading-relaxed text-foreground/60">
          <section className="flex flex-col gap-4">
            <h2 className="text-foreground font-medium uppercase tracking-widest text-[10px]">1. The Agreement</h2>
            <p>
              By entering the AERIS digital Atelier, you agree to the terms of our modern ritual. 
              These terms govern the acquisition and use of our weightless artifacts.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-foreground font-medium uppercase tracking-widest text-[10px]">2. Artifact Acquisition</h2>
            <p>
              All pieces are subject to availability. We reserve the right to limit the quantity 
               of artifacts acquired per curation to ensure material integrity for all our clients.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-foreground font-medium uppercase tracking-widest text-[10px]">3. Intellectual Vision</h2>
            <p>
              The designs, narrative, and visual identity of AERIS are the intellectual property 
              of the studio. Unauthorized reproduction of our artifacts or digital content 
              is prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
