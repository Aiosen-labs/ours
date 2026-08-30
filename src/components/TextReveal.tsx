"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: { i: number; delay: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1], // Expo out for premium feel
      delay: custom.delay + custom.i * 0.15, // Base delay + stagger
    },
  }),
};

export default function TextReveal({
  lines,
  className = "",
  baseDelay = 0.1,
}: {
  lines: React.ReactNode[];
  className?: string;
  baseDelay?: number;
}) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          custom={{ i, delay: baseDelay }}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="inline-block w-full"
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}
