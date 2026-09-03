"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ConsultationModal from "./ConsultationModal";

export default function FloatingCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Any modal open (global)
  const [internalModalOpen, setInternalModalOpen] = useState(false); // Modal opened by this CTA
  const [activeServiceContext, setActiveServiceContext] = useState("");
  const [currentSection, setCurrentSection] = useState("hero");
  const [isScrolling, setIsScrolling] = useState(false);
  const [showIntroTeaser, setShowIntroTeaser] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // 1. Session Storage Logic for 1-time teaser
  useEffect(() => {
    const hasSeenTeaser = sessionStorage.getItem("aiosen_teaser_shown");
    if (!hasSeenTeaser) {
      const showTimer = setTimeout(() => {
        setShowIntroTeaser(true);
        const hideTimer = setTimeout(() => {
          setShowIntroTeaser(false);
          sessionStorage.setItem("aiosen_teaser_shown", "true");
        }, 5000);
        return () => clearTimeout(hideTimer);
      }, 4500);
      return () => clearTimeout(showTimer);
    }
  }, []);

  // 2. Global Modal State Listener
  useEffect(() => {
    const handleModalState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsModalOpen(customEvent.detail.isOpen);
    };
    window.addEventListener("aiosen-modal-state", handleModalState);
    return () => window.removeEventListener("aiosen-modal-state", handleModalState);
  }, []);

  // 3. Service Context Listener
  useEffect(() => {
    const handleServiceSelected = (e: Event) => {
      const customEvent = e as CustomEvent<{ serviceTitle: string }>;
      setActiveServiceContext(customEvent.detail.serviceTitle);
    };
    window.addEventListener("aiosen-service-selected", handleServiceSelected);
    return () => window.removeEventListener("aiosen-service-selected", handleServiceSelected);
  }, []);

  // 4. Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // 5. Intersection Observer for Section Context
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute("data-section");
            if (section) setCurrentSection(section);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  // Determine CTA text based on context
  let ctaText = "Let's Talk";
  if (currentSection === "hero") ctaText = "Talk to Our Architects";
  else if (currentSection === "projects") ctaText = "Ask About a Project";
  else if (currentSection === "services") ctaText = activeServiceContext ? `Discuss ${activeServiceContext}` : "Discuss This Capability";
  else if (currentSection === "contact") ctaText = "Let's Talk";

  // Hide entirely if any modal is open or if we are in the contact section
  if (isModalOpen && !internalModalOpen) return null;
  if (currentSection === "contact") return null;

  // Render logic
  const isExpanded = showIntroTeaser || isHovered;
  
  return (
    <>
      <AnimatePresence>
        {!isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isScrolling ? 0.6 : 1, 
              y: 0,
              scale: isScrolling ? 0.95 : 1
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[90] flex flex-col items-end gap-3 pb-[env(safe-area-inset-bottom,0px)] pr-[env(safe-area-inset-right,0px)]"
            onMouseEnter={() => !isScrolling && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Intro Teaser Tooltip */}
            <AnimatePresence>
              {showIntroTeaser && !isHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                  className="bg-[#ECEEF4] border border-black/[0.08] px-5 py-3 rounded-xl shadow-2xl origin-bottom-right backdrop-blur-xl"
                >
                  <p className="font-label-sm text-xs font-bold text-[#0D0F14] uppercase tracking-widest leading-relaxed">
                    Got a vision? <br/>
                    <span className="text-[#3385FF] mt-1 inline-block">Talk to our architects ✦</span>
                  </p>
                  <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#ECEEF4] border-b border-r border-black/[0.08] rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <button
              onClick={() => {
                const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
                if (!isExpanded && isMobile) {
                  setIsHovered(true); // First tap on mobile expands it
                } else {
                  setInternalModalOpen(true);
                  setIsHovered(false);
                }
              }}
              aria-label="Start a conversation"
              className={`group flex items-center justify-end bg-[#0066FF] text-white hover:bg-[#0066FF] transition-all duration-300 ease-in-out overflow-hidden rounded-full border-2 border-[#0066FF]/30 focus:outline-none focus:ring-4 focus:ring-[#0066FF]/20
                ${isScrolling ? 'shadow-md' : 'shadow-[0_8px_30px_rgba(0,102,255,0.35)] hover:shadow-[0_12px_40px_rgba(0,102,255,0.5)]'}
              `}
              style={{
                width: isExpanded ? "auto" : "64px",
                height: "64px",
                paddingLeft: isExpanded ? "24px" : "0",
                paddingRight: isExpanded ? "24px" : "0"
              }}
            >
              <div className="flex items-center justify-center w-full min-w-[60px]">
                {!isExpanded && (
                  <span
                    className="material-symbols-outlined text-[24px] transition-transform duration-300 group-hover:scale-110"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    chat_bubble
                  </span>
                )}
                
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                      className="flex items-center gap-3 whitespace-nowrap overflow-hidden"
                    >
                      <span className="font-label-sm text-sm font-bold uppercase tracking-widest mt-0.5">
                        {ctaText}
                      </span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
            
            {/* Mobile Close Button (only visible when expanded on mobile) */}
            {isHovered && typeof window !== "undefined" && window.innerWidth < 768 && (
              <button 
                onClick={(e) => { e.stopPropagation(); setIsHovered(false); }}
                className="absolute -top-12 right-0 w-10 h-10 bg-white rounded-full shadow-lg border border-black/5 flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ConsultationModal 
        isOpen={internalModalOpen}
        onClose={() => setInternalModalOpen(false)}
        serviceTitle={activeServiceContext || "Software Engineering"} 
      />
    </>
  );
}
