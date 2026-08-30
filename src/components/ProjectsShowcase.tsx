"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects, Project } from "@/data/projects";

// Fallback images if the ones above 404
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

export default function ProjectsShowcase() {
  const [[activeIndex, direction], setPage] = useState([0, 0]);

  const activeProject = projects[activeIndex];

  const paginate = (newDirection: number, index: number) => {
    setPage([index, newDirection]);
  };

  // Variants for direction-aware animation
  const variants = {
    enter: (direction: number) => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      return {
        x: isMobile ? 0 : (direction > 0 ? 30 : -30),
        y: isMobile ? 10 : 0,
        opacity: 0,
        scale: isMobile ? 1 : 0.97
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      return {
        zIndex: 0,
        x: isMobile ? 0 : (direction < 0 ? 30 : -30),
        y: isMobile ? -10 : 0,
        opacity: 0,
        scale: isMobile ? 1 : 0.97
      };
    }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
      }}
      id="projects" 
      className="px-margin-desktop max-w-[1400px] mx-auto pt-20 md:pt-32 pb-10 md:pb-16 border-t border-black/5"
    >
      
      {/* 1. Section Heading */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="mb-20 flex flex-col items-center text-center"
      >
        <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-bold block mb-4">
          SELECTED ENGINEERING
        </span>
        <h2 className="font-headline-lg text-[48px] md:text-[56px] text-on-surface mb-6 tracking-tighter font-medium">
          Systems we&apos;ve <span className="italic font-light text-on-surface-variant">engineered</span> to explore what&apos;s possible.
        </h2>
        <p className="font-body-md text-on-surface-variant max-w-2xl text-xl font-light">
          A selection of systems we&apos;ve designed and engineered to explore ideas, tackle technical challenges, and demonstrate how we build.
        </p>
      </motion.div>

      {/* 2. Active Project Showcase */}
      <div className="relative mb-16 min-h-[500px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.4, ease: "easeOut" }
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center group"
          >
            
            {/* Project Visual */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100 border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-shadow duration-700">
                <div className="absolute inset-0 bg-black/5 z-10 mix-blend-overlay"></div>
                <img
                  src={activeProject.imageUrl || FALLBACK_IMAGE}
                  alt={activeProject.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                />
              </div>
            </div>
            
            {/* Project Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex flex-wrap gap-3">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-gray-100 text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="font-headline-lg text-4xl md:text-[48px] text-on-surface leading-[1.1] tracking-tight">
                {activeProject.title}
              </h3>
              
              <p className="font-body-md text-on-surface-variant text-lg font-light leading-relaxed">
                {activeProject.description}
              </p>
              
              <div className="pt-4">
                <Link href={`/case-studies/${activeProject.id}`} className="group inline-flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </div>
                  <span className="font-label-sm text-xs font-bold uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors">
                    View Case Study
                  </span>
                </Link>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Project Navigation Rail */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="border-t border-black/5 pt-8"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-label-sm text-sm font-semibold tracking-widest text-on-surface-variant">
            PROJECT RAIL
          </span>
          <span className="font-label-sm text-sm tracking-widest text-on-surface">
            {String(activeIndex + 1).padStart(2, '0')} &mdash; {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Horizontally scrollable container (hidden scrollbar) */}
        <div className="overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:mx-0 md:px-0 project-rail-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>{`
            .project-rail-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          <div className="flex gap-4 min-w-max">
            {projects.map((project, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={project.id}
                  onClick={() => {
                    if (index === activeIndex) return;
                    const dir = index > activeIndex ? 1 : -1;
                    paginate(dir, index);
                  }}
                  className={`flex items-center gap-4 w-[280px] md:w-[320px] text-left p-4 rounded-xl border transition-all duration-400 snap-start
                    ${isActive 
                      ? "border-primary/30 bg-primary/[0.03] shadow-sm shadow-primary/5 scale-[1.02]" 
                      : "border-black/5 bg-white hover:border-black/15 hover:bg-gray-50 opacity-60 hover:opacity-100"
                    }
                  `}
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-black/5 relative">
                    <img 
                      src={project.imageUrl || FALLBACK_IMAGE} 
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-105' : 'scale-100'}`}
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                    />
                  </div>
                  
                  {/* Rail Info */}
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <span className={`font-label-sm text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-headline-lg-mobile text-sm font-semibold text-on-surface truncate">
                      {project.title}
                    </h4>
                    <span className="font-label-sm text-[9px] uppercase text-on-surface-variant tracking-wider truncate">
                      {project.tags.join(" • ")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

    </motion.section>
  );
}
