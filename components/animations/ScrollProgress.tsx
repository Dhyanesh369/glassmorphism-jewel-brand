"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-foreground/10 z-[100] origin-left"
      style={{ scaleX }}
    >
      <div className="absolute right-0 top-0 h-full w-[100px] bg-gradient-to-r from-transparent to-accent/30" />
    </motion.div>
  );
}
