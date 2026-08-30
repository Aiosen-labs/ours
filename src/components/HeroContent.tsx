"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

export default function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 800], [0, -50]);
  const opacity = useTransform(scrollY, [300, 800], [1, 0]);

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      ref={ref}
      style={{ y, opacity }}
      className="relative z-10 px-margin-desktop max-w-[850px] mx-auto flex flex-col items-center text-center space-y-12"
    >
      {/* 1. Badge Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
        className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-[0_0_20px_rgba(197,160,89,0.08)]"
      >
        <span className="w-2 h-2 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(197,160,89,0.3)] shrink-0"></span>
        <span className="font-label-sm text-[8px] sm:text-[10px] text-gray-300 uppercase tracking-[0.15em] font-bold text-center leading-tight">
          SOFTWARE ENGINEERING • TECHNOLOGY CONSULTING
        </span>
      </motion.div>

      {/* 2. Staggered Headline Reveal */}
      <TextReveal
        baseDelay={1.3}
        className="font-display-lg-mobile text-[38px] sm:text-5xl md:font-display-lg md:text-[88px] text-white tracking-tight leading-[1.1] flex flex-col items-center w-full"
        lines={[
          <span key="1">We Build the Systems</span>,
          <span key="2" className="inline-flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mt-2 md:mt-0">
            Behind{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container relative inline-block pl-1 md:pl-2">
              What&apos;s Next.
              <div className="absolute -bottom-1 left-1 md:left-2 w-[calc(100%-4px)] md:w-[calc(100%-8px)] h-[3px] bg-primary/20 rounded-full">
                <div className="absolute inset-0 bg-primary/40 rounded-full animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_12px_rgba(197,160,89,0.3)]"></div>
              </div>
            </span>
          </span>,
        ]}
      />

      {/* 3. Subtext Entrance */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
        className="font-body-md text-sm sm:text-base md:text-[20px] text-gray-400 max-w-2xl leading-relaxed font-light px-2 md:px-0"
      >
        From new digital products to complex business systems, we design, build, and support technology that is made to evolve.
      </motion.p>

      {/* 4. CTA Entrance with Magnetic Hover */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.1 }}
        className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 pt-6 md:pt-10 w-full max-w-[90%] md:max-w-2xl mx-auto"
      >
        <MagneticButton strength={0.2} disabledOnMobile>
          <button onClick={(e) => handleScroll(e, "contact")} className="w-full md:w-auto justify-center btn-primary font-label-sm text-xs md:text-label-sm px-6 md:px-10 py-4 md:py-4 rounded-full uppercase tracking-widest font-bold flex items-center gap-3 group transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,160,89,0.25)] hover:bg-primary-container min-h-[48px]">
            Start a Conversation
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </MagneticButton>

        <MagneticButton strength={0.2} disabledOnMobile>
          <button onClick={(e) => handleScroll(e, "services")} className="w-full md:w-auto justify-center bg-white/5 backdrop-blur-sm border border-white/10 text-gray-200 hover:bg-white/10 hover:text-white shadow-sm font-label-sm text-xs md:text-label-sm px-6 md:px-10 py-4 md:py-4 rounded-full transition-all duration-300 uppercase tracking-widest flex items-center gap-3 group min-h-[48px]">
            Explore Capabilities
            <span className="material-symbols-outlined text-[18px] md:opacity-0 md:-ml-4 md:group-hover:opacity-100 md:group-hover:ml-0 transition-all duration-300">
              east
            </span>
          </button>
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
}
