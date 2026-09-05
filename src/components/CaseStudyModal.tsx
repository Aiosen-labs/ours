"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Project } from "@/data/projects";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export default function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const images = project.images && project.images.length > 0 ? project.images : [project.imageUrl];

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, project.id]);

  useEffect(() => {
    // Notify global components (like FloatingCTA) when modal state changes
    const event = new CustomEvent("aiosen-modal-state", {
      detail: { isOpen }
    });
    window.dispatchEvent(event);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "0px";
      previouslyFocusedElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.98, 
      y: 10,
      transition: { duration: 0.2 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4 md:p-6 lg:p-12 overscroll-none">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh] max-w-5xl bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden outline-none"
          >
            {/* Header (Sticky / Floating on Mobile) */}
            <div className="flex items-center justify-between sm:p-6 sm:border-b border-black/5 bg-white z-10 shrink-0">
              <span className="hidden sm:block font-label-sm text-xs font-bold uppercase tracking-widest text-primary">
                Case Study
              </span>
              <div className="hidden sm:flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-200 font-label-sm text-[10px] uppercase tracking-widest font-bold"
                  >
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    Visit Live Site
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Close modal"
                >
                  <span className="material-symbols-outlined text-[20px] text-on-surface">close</span>
                </button>
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:hidden w-10 h-10 rounded-full bg-white/60 backdrop-blur-md hover:bg-black/10 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary z-50"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px] text-on-surface">close</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto overflow-x-hidden flex-grow px-5 pb-5 pt-16 sm:px-8 sm:pb-8 sm:pt-6 md:px-12 md:pb-12 md:pt-6 overscroll-contain">
              
              {/* Top Meta */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-gray-100 text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <h2 id="modal-title" className="font-headline-lg text-3xl sm:text-4xl md:text-5xl text-on-surface leading-[1.1] tracking-tight mb-6">
                {project.title}
              </h2>
              
              <p className="font-body-md text-on-surface-variant text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10 max-w-3xl text-justify">
                {project.description}
              </p>

              {/* Image Carousel */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-white border border-black/5 mb-12 group">
                <AnimatePresence initial={false} mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                {/* Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-white focus:outline-none shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px] sm:text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-white focus:outline-none shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px] sm:text-[20px]">arrow_forward_ios</span>
                    </button>
                    
                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Deep Dive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                
                {/* Left Col */}
                <div className="space-y-10">
                  {project.problem && (
                    <div>
                      <h3 className="font-label-sm text-xs font-bold uppercase tracking-widest text-on-surface mb-3">The Challenge</h3>
                      <p className="font-body-md text-on-surface-variant text-sm sm:text-base leading-relaxed text-justify">
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {project.architecture && (
                    <div>
                      <h3 className="font-label-sm text-xs font-bold uppercase tracking-widest text-on-surface mb-3">Our Approach</h3>
                      <p className="font-body-md text-on-surface-variant text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-justify">
                        {project.architecture}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Col */}
                <div className="space-y-10">
                  {project.capabilities && project.capabilities.length > 0 && (
                    <div>
                      <h3 className="font-label-sm text-xs font-bold uppercase tracking-widest text-on-surface mb-4">Key Capabilities</h3>
                      <ul className="space-y-3">
                        {project.capabilities.map((cap, i) => (
                          <li key={i} className="flex gap-3 items-start font-body-md text-on-surface-variant text-sm sm:text-base">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">check</span>
                            <span className="leading-tight">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.outcome && (
                    <div>
                      <h3 className="font-label-sm text-xs font-bold uppercase tracking-widest text-on-surface mb-3">Outcome</h3>
                      <div className="p-5 rounded-2xl bg-primary/[0.03] border border-primary/10">
                        <p className="font-body-md text-on-surface text-sm sm:text-base leading-relaxed italic">
                          &ldquo;{project.outcome}&rdquo;
                        </p>
                      </div>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-200 font-label-sm text-[10px] uppercase tracking-widest font-bold shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                          Visit Live Site
                        </a>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
