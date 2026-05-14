"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { defaultViewport, aerisEasing } from "@/lib/animations";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const controls = animate(0, target, {
            duration: 2,
            ease: aerisEasing as any,
            onUpdate: (value) => setCount(Math.round(value)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light tabular-nums">
      {count}{suffix}
    </span>
  );
}

const stats = [
  { value: 100, suffix: "%", label: "Recycled Metals", description: "Every artifact crafted from responsibly sourced materials" },
  { value: 2024, suffix: "", label: "Est.", description: "The year the ethereal vision began" },
  { value: 47, suffix: "+", label: "Countries", description: "Global shipping to curators worldwide" },
  { value: 4, suffix: "", label: "Collections", description: "Distinct mood curations for every ritual" },
];

export default function BrandStats() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(200,180,140,0.04),transparent_60%)]" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 1, delay: index * 0.1, ease: aerisEasing }}
              className="flex flex-col gap-3 text-center items-center"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-foreground/40">{stat.label}</span>
              <p className="text-[11px] font-light text-foreground/30 max-w-[180px] leading-relaxed hidden sm:block">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
