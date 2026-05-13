"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6"
    >
      <nav className="flex items-center gap-8 rounded-full border border-primary/5 bg-white/40 px-8 py-3 backdrop-blur-xl dark:bg-black/40">
        <Link href="/" className="text-lg font-semibold tracking-tighter text-primary">
          ANTIGRAVITY
        </Link>
        
        <div className="hidden items-center gap-8 sm:flex">
          <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="#templates" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Templates
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Pricing
          </Link>
        </div>

        <div className="h-4 w-px bg-primary/10" />

        <Button size="sm" className="rounded-full px-5 font-medium">
          Get Started
        </Button>
      </nav>
    </motion.header>
  );
}
