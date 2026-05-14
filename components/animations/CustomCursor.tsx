"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const isHovering = useRef(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON";

      if (isInteractive) {
        isHovering.current = true;
        if (ringRef.current) {
          ringRef.current.style.width = "56px";
          ringRef.current.style.height = "56px";
          ringRef.current.style.borderColor = "rgba(45, 49, 54, 0.3)";
          ringRef.current.style.mixBlendMode = "difference";
        }
        if (dotRef.current) {
          dotRef.current.style.opacity = "0";
        }
      }
    };

    const handleMouseOut = () => {
      if (isHovering.current) {
        isHovering.current = false;
        if (ringRef.current) {
          ringRef.current.style.width = "36px";
          ringRef.current.style.height = "36px";
          ringRef.current.style.borderColor = "rgba(45, 49, 54, 0.15)";
          ringRef.current.style.mixBlendMode = "normal";
        }
        if (dotRef.current) {
          dotRef.current.style.opacity = "1";
        }
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Hide default cursor
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "custom-cursor-styles";
    style.textContent = `
      * { cursor: none !important; }
      @media (pointer: coarse) {
        * { cursor: auto !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.style.cursor = "";
      const el = document.getElementById("custom-cursor-styles");
      if (el) el.remove();
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Outer ring — springy, follows with delay */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          border: "1.5px solid rgba(45, 49, 54, 0.15)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, mix-blend-mode 0.3s ease",
        }}
      />
      {/* Inner dot — instant position */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          width: 5,
          height: 5,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          backgroundColor: "rgba(45, 49, 54, 0.6)",
          transition: "opacity 0.2s ease",
        }}
      />
    </>
  );
}
