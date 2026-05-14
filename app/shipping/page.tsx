"use client";

import { motion } from "framer-motion";

export default function ShippingPage() {
  const sections = [
    {
      title: "Complimentary Ritual",
      description: "We believe in seamless acquisition. AERIS provides complimentary global shipping on all artifacts, ensuring your curation arrives with material clarity."
    },
    {
      title: "Material Transit",
      description: "Artifacts are dispatched within 48 hours of your ritual. Tracking is provided via encrypted digital channels to ensure secure transit of your vision."
    },
    {
      title: "Returns & Exchanges",
      description: "We offer a 14-day window for returns or exchanges. The artifact must remain in its original, unworn state, preserving its material integrity."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-40 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col gap-6 mb-24"
        >
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Concierge</span>
          <h1 className="font-heading text-6xl sm:text-8xl">Shipping.</h1>
        </motion.div>

        <div className="flex flex-col gap-16">
          {sections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.1 }}
              className="flex flex-col gap-4 border-l border-foreground/5 pl-8"
            >
              <h2 className="text-foreground font-medium uppercase tracking-widest text-[10px]">{section.title}</h2>
              <p className="text-sm font-light leading-relaxed text-foreground/60 max-w-lg">
                {section.description}
              </p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
