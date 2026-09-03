"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

export default function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -60]);
  const opacity = useTransform(scrollY, [300, 800], [1, 0]);

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative z-10 px-margin-desktop max-w-[1020px] mx-auto flex flex-col items-center text-center space-y-10"
    >


      {/* Headline — bold, white, no gradient nonsense */}
      <TextReveal
        baseDelay={0.9}
        className="font-display-lg-mobile text-[40px] sm:text-5xl md:font-display-lg md:text-[88px] text-on-background tracking-[-0.04em] leading-[1.05] flex flex-col items-center w-full"
        lines={[
          <span key="1" style={{ fontWeight: 700, color: "var(--color-on-background)" }}>
            We Build the Systems
          </span>,
          <span
            key="2"
            className="flex flex-row flex-wrap items-center justify-center gap-2 md:gap-3"
            style={{ fontWeight: 700 }}
          >
            <span style={{ color: "var(--color-on-background)" }}>Behind</span>
            <span className="relative inline-block" style={{ color: "var(--color-primary)" }}>
              What&apos;s Next.
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-primary"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.9 }}
              />
            </span>
          </span>,
        ]}
      />

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
        className="font-body-md text-sm sm:text-base md:text-[19px] leading-relaxed font-light px-2 md:px-0 max-w-[600px] text-on-surface-variant text-justify"
      >
        From new digital products to complex business systems, we design, build, and support technology that is made to evolve.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.9 }}
        className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 pt-2 w-full max-w-[90%] md:max-w-lg mx-auto"
      >
        <MagneticButton strength={0.2} disabledOnMobile>
          <button
            onClick={(e) => handleScroll(e, "contact")}
            className="w-full md:w-auto justify-center btn-primary font-label-sm text-xs px-9 py-4 rounded-lg font-semibold uppercase tracking-[0.1em] flex items-center gap-3 group transition-all duration-250 min-h-[52px]"
          >
            Start a Conversation
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-200">
              arrow_forward
            </span>
          </button>
        </MagneticButton>

        <MagneticButton strength={0.2} disabledOnMobile>
          <button
            onClick={(e) => handleScroll(e, "services")}
            className="w-full md:w-auto justify-center border font-label-sm text-xs px-9 py-4 rounded-lg font-semibold uppercase tracking-[0.1em] flex items-center gap-3 group min-h-[52px] transition-all duration-250 hover:bg-black/[0.04] bg-white border-black/10 text-on-surface-variant shadow-sm hover:shadow-md"
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-on-background)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--color-on-surface-variant)"; }}
          >
            Explore Services
            <span className="material-symbols-outlined text-[16px] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-250">
              east
            </span>
          </button>
        </MagneticButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-label-sm text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--color-outline-strong)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8"
          style={{ background: "linear-gradient(to bottom, var(--color-outline-strong), transparent)" }}
        />
      </motion.div>
    </motion.div>
  );
}
