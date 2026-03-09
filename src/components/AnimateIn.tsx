"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  blur?: boolean;
  scale?: boolean;
  once?: boolean;
}

export default function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.8,
  className,
  blur = false,
  scale = false,
  once = true,
}: AnimateInProps) {
  const offsets = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        filter: blur ? "blur(8px)" : "blur(0px)",
        scale: scale ? 0.95 : 1,
        ...offsets[direction],
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
