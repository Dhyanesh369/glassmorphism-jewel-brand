"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { cinematicBackground, fadeUpVariant } from "@/lib/animations";
import FloatingOrbs from "@/components/animations/FloatingOrbs";
import MagneticElement from "@/components/animations/MagneticElement";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
      {/* Parallax Background Image */}
      <motion.div 
        variants={cinematicBackground}
        initial="hidden"
        animate="visible"
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero.png"
          alt="AERIS Editorial Jewelry"
          fill
          className="object-cover"
          priority
        />
        {/* Multi-layer Mist Overlays for depth - lightened to show product */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--background)_100%)]" />
      </motion.div>

      {/* Ambient Floating Orbs */}
      <FloatingOrbs count={6} section="hero" />

      {/* Animated gradient accent */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(600px circle at 30% 40%, rgba(200,180,140,0.06), transparent 70%)",
            "radial-gradient(600px circle at 70% 60%, rgba(209,214,204,0.08), transparent 70%)",
            "radial-gradient(600px circle at 40% 50%, rgba(200,180,140,0.06), transparent 70%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-[1] pointer-events-none"
      />

      <motion.div
        style={{ y: textY, opacity }}
        className="container relative z-10 mx-auto px-6 text-center"
      >
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-12"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ delay: 1, duration: 1.5 }}
              className="text-[10px] font-medium uppercase text-foreground/40"
            >
              Est. 2024 — The Ethereal Edit
            </motion.span>
            
            <h1 className="text-balance font-heading text-7xl font-light tracking-tight leading-[1] text-foreground text-shimmer sm:text-8xl lg:text-[10rem]">
              Modern <br />
              <span className="italic opacity-80">Continuity.</span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="max-w-xl text-balance text-sm font-light leading-relaxed tracking-wide text-foreground/60 sm:text-base"
          >
            Weightless artifacts for the daily ritual.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-6 pt-4 sm:flex-row sm:gap-8"
          >
            <MagneticElement strength={0.2}>
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="h-16 w-full rounded-full border border-foreground/10 bg-foreground px-12 text-[10px] font-medium tracking-[0.2em] uppercase text-background transition-all hover:bg-transparent hover:text-foreground hover:shadow-[0_0_40px_rgba(200,180,140,0.15)] active:scale-95 sm:w-auto">
                  The Atelier
                </Button>
              </Link>
            </MagneticElement>
            <MagneticElement strength={0.3}>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('collections');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="group text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/60 transition-colors hover:text-foreground cursor-pointer"
              >
                Explore the Edit
                <span className="block h-px w-0 bg-foreground transition-all duration-500 group-hover:w-full" />
              </button>
            </MagneticElement>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 overflow-hidden z-10">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[8px] font-medium tracking-[0.3em] uppercase text-foreground/20">Scroll</span>
          <motion.div 
            className="h-12 w-px bg-gradient-to-b from-foreground/20 to-transparent"
            animate={{ scaleY: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
}
