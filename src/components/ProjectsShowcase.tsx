"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import CaseStudyModal from "./CaseStudyModal";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

export default function ProjectsShowcase() {
  const [[activeIndex, direction], setPage] = useState([0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const activeProject = projects[activeIndex];
  const images = activeProject.images && activeProject.images.length > 0 ? activeProject.images : [activeProject.imageUrl];

  const paginate = (newDirection: number, index: number) => {
    setPage([index, newDirection]);
    setCurrentImageIndex(0); // Reset image index when switching projects
    // Scroll the rail card into view
    if (railRef.current) {
      const cards = railRef.current.querySelectorAll<HTMLButtonElement>("button");
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  const goPrev = () => {
    if (activeIndex === 0) return;
    paginate(-1, activeIndex - 1);
  };

  const goNext = () => {
    if (activeIndex === projects.length - 1) return;
    paginate(1, activeIndex + 1);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.97,
    }),
    center: { zIndex: 1, x: 0, y: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.97,
    }),
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
      id="projects"
      className="px-margin-desktop max-w-[1400px] mx-auto pt-20 md:pt-32 pb-10 md:pb-16 border-t border-black/[0.05] bg-background"
    >
      {/* 1. Section Heading */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
        }}
        className="mb-12 md:mb-20 flex flex-col items-center text-center"
      >
        <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-bold block mb-4">
          SELECTED ENGINEERING
        </span>
        {/* Responsive heading — prevents overflow on mobile */}
        <h2 className="font-headline-lg text-[32px] sm:text-[42px] md:text-[52px] text-on-background mb-4 md:mb-6 tracking-tighter font-medium leading-[1.1]">
          Systems we&apos;ve{" "}
          <span className="italic font-light text-on-surface-variant">engineered</span>{" "}
          to explore what&apos;s possible.
        </h2>
        <p className="font-body-md text-on-surface-variant max-w-2xl text-base md:text-xl font-light px-2 text-justify">
          A selection of systems we&apos;ve designed and engineered to explore ideas, tackle technical
          challenges, and demonstrate how we build.
        </p>
      </motion.div>

      {/* 2. Active Project Showcase */}
      <div className="relative mb-10 md:mb-16 min-h-[320px] md:min-h-[500px]">
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
              scale: { duration: 0.4, ease: "easeOut" },
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center group"
          >
            {/* Project Visual */}
            <div className="lg:col-span-7 relative group perspective-1000">
              <div 
                className="relative aspect-[16/9] md:aspect-[4/3] w-full rounded-2xl overflow-hidden glass-panel transition-transform duration-700 ease-out hover:rotate-x-1 hover:-translate-y-1 bg-white"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-black/5 z-10 mix-blend-overlay" />
                <AnimatePresence initial={false} mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={images[currentImageIndex] || FALLBACK_IMAGE}
                    alt={activeProject.title}
                    className="w-full h-full object-contain transition-transform duration-1000"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                  />
                </AnimatePresence>
                
                {/* Image Nav Arrows (Internal to the project) */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                      }}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-white z-20 focus:outline-none shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px] sm:text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-white z-20 focus:outline-none shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px] sm:text-[20px]">arrow_forward_ios</span>
                    </button>
                    
                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${
                            idx === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="lg:col-span-5 space-y-5 md:space-y-8">
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-black/[0.03] text-on-surface-variant border border-black/[0.08] font-label-sm text-[10px] uppercase tracking-widest font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-headline-lg text-3xl md:text-[44px] text-on-background leading-[1.1] tracking-tight">
                {activeProject.title}
              </h3>

              <p className="font-body-md text-on-surface-variant text-base md:text-lg font-light leading-relaxed text-justify">
                {activeProject.description}
              </p>

              <div className="pt-2 md:pt-4 flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center gap-3 bg-transparent border-none p-0 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full border border-outline-strong flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </div>
                  <span className="font-label-sm text-xs font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
                    View Case Study
                  </span>
                </button>
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-outline-strong text-on-surface-variant hover:border-primary hover:text-primary transition-all duration-300 font-label-sm text-[10px] uppercase tracking-widest font-bold"
                  >
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    Live Site
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Project Navigation Rail */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
        }}
        className="border-t border-black/[0.05] pt-6 md:pt-8"
      >
        {/* Rail header with counter + arrow buttons */}
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <span className="font-label-sm text-xs md:text-sm font-semibold tracking-widest text-on-surface-variant">
            PROJECT RAIL
          </span>

          <div className="flex items-center gap-3">
            <span className="font-label-sm text-xs md:text-sm tracking-widest text-on-surface-variant">
              {String(activeIndex + 1).padStart(2, "0")} &mdash; {String(projects.length).padStart(2, "0")}
            </span>
            {/* Arrow buttons */}
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={goPrev}
                disabled={activeIndex === 0}
                aria-label="Previous project"
                className="w-9 h-9 rounded-full border border-outline-strong text-on-surface-variant flex items-center justify-center transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-outline-strong disabled:hover:text-current"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back_ios</span>
              </button>
              <button
                onClick={goNext}
                disabled={activeIndex === projects.length - 1}
                aria-label="Next project"
                className="w-9 h-9 rounded-full border border-outline-strong text-on-surface-variant flex items-center justify-center transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-outline-strong disabled:hover:text-current"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_forward_ios</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable rail */}
        <div
          ref={railRef}
          className="overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 project-rail-scroll"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`.project-rail-scroll::-webkit-scrollbar { display: none; }`}</style>
          <div className="flex gap-3 md:gap-4 min-w-max">
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
                  className={`flex items-center gap-3 md:gap-4 w-[240px] md:w-[300px] lg:w-[320px] text-left p-3 md:p-4 rounded-xl border transition-all duration-300 snap-start
                    ${isActive
                      ? "border-primary/25 bg-primary/5 shadow-sm scale-[1.02]"
                      : "border-black/[0.05] bg-black/[0.02] hover:border-black/[0.08] hover:bg-black/[0.02] opacity-50 hover:opacity-100"
                    }`}
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-lg overflow-hidden bg-white border border-black/5 relative">
                    <img
                      src={project.imageUrl || FALLBACK_IMAGE}
                      alt={project.title}
                      className="w-full h-full object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                    />
                  </div>

                  {/* Rail Info */}
                  <div className="flex flex-col gap-0.5 md:gap-1 overflow-hidden">
                    <span className={`font-label-sm text-[10px] uppercase font-bold tracking-widest ${isActive ? "text-primary" : "text-on-surface-variant"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-headline-lg-mobile text-xs md:text-sm font-semibold text-on-background truncate">
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

      {/* 4. Modal Overlay */}
      <CaseStudyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={activeProject} 
      />
    </motion.section>
  );
}


// Fallback images if the ones above 404
