"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultationModal from "./ConsultationModal";

export interface ServiceData {
  id: string;
  number: string;
  title: string;
  label: string;
  shortDescription: string;
  detailedDescription: string;
  capabilities: string[];
  idealFor?: string;
}

const servicesConfig: ServiceData[] = [
  {
    id: "s1",
    number: "01",
    title: "Digital Products & Web Experiences",
    label: "Digital Products",
    shortDescription: "We design and build digital experiences that represent your business, engage your customers, and evolve with your goals.",
    detailedDescription: "For businesses that need a strong digital presence or customer-facing digital experience. We build digital experiences around your goals rather than providing generic templates.",
    capabilities: [
      "Business & company websites",
      "CMS-powered platforms",
      "E-commerce",
      "Customer-facing applications",
      "Custom web experiences",
      "Mobile applications"
    ],
    idealFor: "Businesses launching, improving or expanding their digital presence."
  },
  {
    id: "s2",
    number: "02",
    title: "Custom Business Systems",
    label: "Business Systems",
    shortDescription: "We build software around the way your business actually works—from focused internal tools to complex operational platforms.",
    detailedDescription: "For businesses that need software built around their actual workflows and operations. We do not force businesses into predefined templates; instead, systems are designed around your exact operational needs, users, and future growth.",
    capabilities: [
      "ERP & CRM systems",
      "Internal tools & workflows",
      "Operations platforms",
      "Management systems",
      "System integrations & APIs",
      "AI integration & automation"
    ],
    idealFor: "Organisations needing bespoke software to run, scale, or automate their core operations."
  },
  {
    id: "s3",
    number: "03",
    title: "Product Engineering",
    label: "Product Engineering",
    shortDescription: "From an early idea to a working product, we turn concepts into reliable software designed to grow.",
    detailedDescription: "For founders, businesses, or teams with an idea for a new software product. We guide the engineering process from product discovery and architecture to iteration and scaling.",
    capabilities: [
      "Product discovery & architecture",
      "MVP development",
      "SaaS products",
      "Web & mobile applications",
      "Backend & API development",
      "AI integration"
    ],
    idealFor: "Startups, founders, or enterprise teams launching new digital products."
  },
  {
    id: "s4",
    number: "04",
    title: "Software Modernization & Support",
    label: "Modernization & Support",
    shortDescription: "We improve, modernize, and extend existing software without losing sight of the business it already supports.",
    detailedDescription: "For businesses that already have software but find it outdated, problematic, slow, or difficult to maintain. We help modernize technology stacks, improve architecture, and develop new features safely.",
    capabilities: [
      "Legacy software modernization",
      "Technology-stack migration",
      "Architecture & UI/UX improvements",
      "Performance & security upgrades",
      "Bug fixing & re-engineering",
      "New feature development"
    ],
    idealFor: "Companies with existing systems that need technical rescue, modernization, or structural improvement."
  },
  {
    id: "s5",
    number: "05",
    title: "Technology Consulting & Ongoing Support",
    label: "Consulting & Support",
    shortDescription: "We provide practical technical guidance and ongoing support to help your systems stay reliable, maintainable, and ready for what's next.",
    detailedDescription: "For businesses that need technical guidance or a long-term technology partner. We offer both strategic consulting and hands-on maintenance to keep systems running smoothly.",
    capabilities: [
      "Technology strategy & selection",
      "Architecture & engineering guidance",
      "Technical assessments",
      "Software maintenance",
      "Security & dependency updates",
      "Continuous system evolution"
    ],
    idealFor: "Businesses seeking a dependable technology partner for long-term advice and maintenance."
  }
];

export default function ServicesShowcase() {
  const [[activeIndex, direction], setPage] = useState([0, 0]);
  const [modalOpen, setModalOpen] = useState(false);

  const activeService = servicesConfig[activeIndex];

  useEffect(() => {
    const event = new CustomEvent("aiosen-service-selected", {
      detail: { serviceTitle: activeService.title }
    });
    window.dispatchEvent(event);
  }, [activeService.title]);

  const handleSelectService = (index: number) => {
    if (index === activeIndex) return;
    const dir = index > activeIndex ? 1 : -1;
    setPage([index, dir]);
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 20 : -20,
      opacity: 0,
    })
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <section id="services" className="bg-[#FAF9F6] pt-10 md:pt-16 pb-20 md:pb-32 border-t border-black/5">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="px-margin-desktop max-w-[1400px] mx-auto"
        >
          {/* Heading */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="mb-16 md:mb-24"
          >
            <h2 className="font-headline-lg text-4xl md:text-[56px] text-on-surface leading-[1.1] tracking-tight max-w-3xl mb-4 md:mb-6">
              Technology built around <br className="hidden md:block" />
              how your business works.
            </h2>
            <p className="font-body-md text-on-surface-variant text-xl font-light leading-relaxed max-w-2xl">
              From building new digital products to improving the systems you already rely on, we help businesses create dependable technology that evolves with their needs.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Left Column: Service Navigation */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="lg:w-1/3 flex flex-col gap-2 shrink-0 lg:sticky lg:top-32 self-start"
            >
              {servicesConfig.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleSelectService(index)}
                    className={`group flex items-center text-left py-4 px-6 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/5' 
                        : 'hover:bg-black/[0.02] border border-transparent'
                      }`}
                  >
                    <span className={`font-label-sm text-[10px] uppercase font-bold tracking-widest w-12 shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                      {service.number}
                    </span>
                    <div className="flex flex-col">
                      <span className={`font-headline-lg-mobile text-lg font-semibold transition-colors ${isActive ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                        {service.title}
                      </span>
                      <span className={`font-label-sm text-[9px] uppercase tracking-wider transition-colors ${isActive ? 'text-on-surface-variant' : 'text-black/30'}`}>
                        {service.label}
                      </span>
                    </div>
                    {/* Active Indicator Arrow */}
                    <div className={`ml-auto shrink-0 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 text-primary' : 'opacity-0 -translate-x-2 text-on-surface-variant'}`}>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward_ios
                      </span>
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {/* Right Column: Active Service Panel (Editorial Layout) */}
            <div className="lg:w-2/3 relative min-h-[500px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 }
                  }}
                  className="bg-white rounded-3xl p-6 md:p-14 lg:p-16 border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.04)] h-full flex flex-col justify-between"
                >
                  <div className="max-w-3xl">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-bold block mb-4">
                      {activeService.number} — {activeService.label}
                    </span>
                    <h3 className="font-headline-lg text-3xl md:text-[48px] text-on-surface leading-[1.1] tracking-tight mb-8">
                      {activeService.title}
                    </h3>
                    <p className="font-body-md text-on-surface text-xl md:text-2xl font-medium leading-relaxed mb-6">
                      {activeService.shortDescription}
                    </p>
                    <p className="font-body-md text-on-surface-variant text-lg md:text-xl font-light leading-relaxed mb-10">
                      {activeService.detailedDescription}
                    </p>

                    {/* Capabilities */}
                    {activeService.capabilities && activeService.capabilities.length > 0 && (
                      <div className="mb-10">
                        <h4 className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-5">What We Can Help With</h4>
                        <motion.ul 
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
                          }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6"
                        >
                          {activeService.capabilities.map((cap, i) => (
                            <motion.li key={i} variants={listItemVariants} className="flex gap-3 items-start font-body-md text-on-surface text-sm md:text-base">
                              <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">check</span>
                              <span className="leading-tight">{cap}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    )}

                    {/* Ideal For */}
                    {activeService.idealFor && (
                      <div className="mb-10 p-6 bg-black/[0.02] rounded-xl border border-black/5">
                        <h4 className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">Ideal For</h4>
                        <p className="font-body-md text-on-surface text-base md:text-lg font-light leading-relaxed">
                          {activeService.idealFor}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 border-t border-black/5 mt-auto">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="bg-dark-surface text-white hover:bg-primary font-label-sm text-xs px-8 py-5 rounded-xl transition-colors duration-300 uppercase tracking-widest font-bold shadow-md flex items-center justify-center gap-3 w-full sm:w-auto group"
                    >
                      Discuss this service
                      <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </section>

      {/* WhatsApp / Email Consultation Modal */}
      <ConsultationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        serviceTitle={activeService.title}
      />
    </>
  );
}
