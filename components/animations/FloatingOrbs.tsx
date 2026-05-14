"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function FloatingOrbs({ count = 5, section = "hero" }: { count?: number; section?: string }) {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    const colors =
      section === "hero"
        ? [
            "rgba(209, 214, 204, 0.15)", // sage
            "rgba(240, 242, 245, 0.2)",  // mist
            "rgba(200, 180, 140, 0.08)", // warm gold
          ]
        : [
            "rgba(209, 214, 204, 0.08)",
            "rgba(240, 242, 245, 0.12)",
            "rgba(200, 180, 140, 0.05)",
          ];

    const generated: Orb[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 120 + Math.random() * 300,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 5,
      color: colors[i % colors.length],
    }));
    if (orbs.length === 0) {
      setOrbs(generated);
    }
  }, [count, section, orbs.length]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
