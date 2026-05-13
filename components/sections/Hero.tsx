git"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background px-6 pt-32 pb-20 text-center sm:px-12 sm:pt-48">
      {/* Background Ambient Light */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[50%] w-[50%] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] -z-10 h-[50%] w-[50%] rounded-full bg-primary/5 blur-[120px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex max-w-5xl flex-col items-center gap-10"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/[0.02] px-4 py-1.5 text-xs font-medium tracking-wide text-primary/80 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            V1.0 is now live
            <ArrowRight className="h-3 w-3" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-balance text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-foreground sm:text-8xl lg:text-9xl"
        >
          Design that feels <br />
          <span className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
            truly weightless.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-xl text-lg font-normal leading-relaxed text-muted-foreground/80 sm:text-xl"
        >
          Elevate your digital presence with a template designed for speed,
          precision, and an uncompromising attention to detail.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6 sm:flex-row">
          <Button size="lg" className="h-14 rounded-full px-10 text-base font-medium shadow-xl shadow-primary/10 transition-all hover:scale-105 active:scale-95">
            Start Building
          </Button>
          <Button size="lg" variant="ghost" className="group h-14 rounded-full px-8 text-base font-medium">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative Floor */}
      <div className="absolute bottom-0 left-0 right-0 -z-20 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
