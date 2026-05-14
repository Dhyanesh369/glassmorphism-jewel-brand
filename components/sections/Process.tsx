"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUpVariant, defaultViewport } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "The Vision",
    description: "Every artifact begins as a dialogue between architectural geometry and the fluid movement of light."
  },
  {
    number: "02",
    title: "Material Integrity",
    description: "We source only 100% recycled 14k gold and 925 sterling silver, ensuring material permanence with minimal footprint."
  },
  {
    number: "03",
    title: "The Ritual",
    description: "Hand-hammered textures and meticulous polishing create a unique material fingerprint for every wearer."
  }
];

export default function Process() {
  return (
    <section className="section-padding bg-secondary/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="flex flex-col gap-16">
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="flex flex-col gap-6"
            >
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Craftsmanship</span>
              <h2 className="font-heading text-5xl sm:text-7xl leading-[1.1]">The Material <br /> <span className="italic opacity-70">Ethos.</span></h2>
            </motion.div>

            <div className="flex flex-col gap-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="flex gap-8 group"
                >
                  <span className="font-heading text-xl opacity-20 group-hover:opacity-100 transition-opacity duration-500">{step.number}</span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-heading text-2xl tracking-wide">{step.title}</h3>
                    <p className="text-sm font-light text-foreground/40 max-w-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 1.5 }}
            className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-2xl"
          >
            <Image
              src="/ritual.png"
              alt="Craftsmanship Process"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
