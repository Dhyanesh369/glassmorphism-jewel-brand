"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
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
          <h1 className="font-heading text-6xl sm:text-8xl">Privacy Policy.</h1>
        </motion.div>

        <div className="flex flex-col gap-12 text-sm font-light leading-relaxed text-foreground/60">
          <section className="flex flex-col gap-4">
            <h2 className="text-foreground font-medium uppercase tracking-widest text-[10px]">1. Data Collection</h2>
            <p>
              We collect information that captures your unique ritual with AERIS. This includes 
              voluntary information provided during account creation and transaction data required 
              to facilitate the acquisition of your artifacts.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-foreground font-medium uppercase tracking-widest text-[10px]">2. Purpose of Use</h2>
            <p>
              Your data is utilized solely to enhance your curation experience. We do not sell 
              your information to third parties. Our focus is on maintaining a secure, minimalist 
              digital environment for your transactions.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-foreground font-medium uppercase tracking-widest text-[10px]">3. Security Artifacts</h2>
            <p>
              We employ architectural security measures to protect your material vision. 
              All financial transactions are processed through encrypted, industry-standard 
              gateways (Shopify).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
