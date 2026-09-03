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

// ── Shared service detail content ──────────────────────────────────────────────
function ServiceDetail({
  service,
  onDiscuss,
}: {
  service: ServiceData;
  onDiscuss: () => void;
}) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-bold block mb-3">
          {service.number} — {service.label}
        </span>
        <h3 className="font-headline-lg text-2xl md:text-[36px] lg:text-[44px] text-on-background leading-[1.1] tracking-tight mb-5">
          {service.title}
        </h3>
        <p className="font-body-md text-on-background text-base md:text-xl font-medium leading-relaxed mb-4 text-justify">
          {service.shortDescription}
        </p>
        <p className="font-body-md text-on-surface-variant text-sm md:text-lg font-light leading-relaxed mb-7 text-justify">
          {service.detailedDescription}
        </p>

        {service.capabilities && service.capabilities.length > 0 && (
          <div className="mb-7">
            <h4 className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-4">
              What We Can Help With
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
              {service.capabilities.map((cap, i) => (
                <li key={i} className="flex gap-2.5 items-start font-body-md text-on-background text-sm">
                  <span className="material-symbols-outlined text-primary text-[16px] mt-0.5 shrink-0">check</span>
                  <span className="leading-tight">{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {service.idealFor && (
          <div className="mb-7 p-4 md:p-6 bg-black/[0.02] rounded-xl border border-black/[0.05]">
            <h4 className="font-label-sm text-[10px] uppercase tracking-widest text-[#7A8199] font-bold mb-2">
              Ideal For
            </h4>
            <p className="font-body-md text-[#2D3244] text-sm md:text-base font-light leading-relaxed text-justify">
              {service.idealFor}
            </p>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-black/5 mt-2">
        <button
          onClick={onDiscuss}
          className="bg-surface border border-outline-strong text-on-background hover:bg-primary hover:border-primary hover:text-white font-label-sm text-xs px-6 py-4 rounded-xl transition-all duration-300 uppercase tracking-widest font-bold shadow-sm flex items-center justify-center gap-3 w-full sm:w-auto group hover:shadow-[0_4px_16px_rgba(15,82,186,0.3)]"
        >
          Discuss this service
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

export default function ServicesShowcase() {
  // Desktop: active panel index
  const [[activeIndex, direction], setPage] = useState([0, 0]);
  // Mobile: which accordion item is open (null = all closed)
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState(servicesConfig[0]);

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

  const handleDiscuss = (service: ServiceData) => {
    setModalService(service);
    setModalOpen(true);
  };

  const variants = {
    enter: (direction: number) => ({ y: direction > 0 ? 20 : -20, opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, y: direction < 0 ? 20 : -20, opacity: 0 }),
  };

  return (
    <>
      <section id="services" className="bg-background pt-10 md:pt-16 pb-20 md:pb-32 border-t border-black/[0.05]">
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
            className="mb-10 md:mb-24"
          >
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-bold block mb-4">Our Services</span>
            <h2 className="font-headline-lg text-[26px] sm:text-3xl md:text-[52px] text-on-background leading-[1.1] tracking-tight max-w-3xl mb-3 md:mb-6">
              Technology built around <br className="hidden md:block" />
              how your business works.
            </h2>
            <p className="font-body-md text-on-surface-variant text-base md:text-xl font-light leading-relaxed max-w-2xl text-justify">
              From building new digital products to improving the systems you already rely on, we help businesses create dependable technology that evolves with their needs.
            </p>
          </motion.div>

          {/* ── MOBILE / TABLET: Accordion ── */}
          <div className="flex flex-col gap-2 lg:hidden">
            {servicesConfig.map((service, index) => {
              const isOpen = openAccordion === index;
              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
                    isOpen
                      ? "border-primary/20 bg-surface shadow-[0_8px_30px_rgba(15,82,186,0.06)]"
                      : "border-black/[0.05] bg-black/[0.02]"
                  }`}
                >
                  {/* Accordion Header / Toggle */}
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-label-sm text-[10px] uppercase font-bold tracking-widest w-8 shrink-0 ${isOpen ? "text-[#3385FF]" : "text-[#7A8199]"}`}>
                        {service.number}
                      </span>
                      <span className={`font-headline-lg-mobile text-base font-semibold transition-colors ${isOpen ? "text-[#0D0F14]" : "text-[#5A6072]"}`}>
                        {service.title}
                      </span>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`material-symbols-outlined text-[20px] shrink-0 ml-3 transition-colors ${isOpen ? "text-[#3385FF]" : "text-[#7A8199]"}`}
                    >
                      expand_more
                    </motion.span>
                  </button>

                  {/* Accordion Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 border-t border-black/[0.05] pt-5">
                          <ServiceDetail
                            service={service}
                            onDiscuss={() => handleDiscuss(service)}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* ── DESKTOP: Sticky left nav + animated right panel ── */}
          <div className="hidden lg:flex flex-row gap-24">
            {/* Left Column: Service Navigation */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="w-1/3 flex flex-col gap-2 shrink-0 lg:sticky lg:top-32 self-start"
            >
              {servicesConfig.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleSelectService(index)}
                    className={`group flex items-center text-left py-4 px-6 rounded-xl transition-all duration-300
                      ${isActive
                        ? "bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-primary/15"
                        : "hover:bg-black/[0.02] border border-transparent"
                      }`}
                  >
                    <span className={`font-label-sm text-[10px] uppercase font-bold tracking-widest w-12 shrink-0 transition-colors ${isActive ? "text-primary" : "text-on-surface-variant group-hover:text-on-background"}`}>
                      {service.number}
                    </span>
                    <div className="flex flex-col">
                      <span className={`font-headline-lg-mobile text-lg font-semibold transition-colors ${isActive ? "text-on-background" : "text-on-surface-variant group-hover:text-on-background"}`}>
                        {service.title}
                      </span>
                      <span className={`font-label-sm text-[9px] uppercase tracking-wider transition-colors ${isActive ? "text-on-surface-variant" : "text-on-surface-variant/70"}`}>
                        {service.label}
                      </span>
                    </div>
                    <div className={`ml-auto shrink-0 transition-all duration-300 ${isActive ? "opacity-100 translate-x-0 text-primary" : "opacity-0 -translate-x-2 text-on-surface-variant"}`}>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward_ios</span>
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {/* Right Column: Active Service Panel */}
            <div className="w-2/3 relative min-h-[500px]">
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
                  className="glass-panel rounded-3xl p-14 lg:p-16 h-full transition-transform duration-700 ease-out hover:rotate-x-1 hover:-translate-y-1"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ServiceDetail
                    service={activeService}
                    onDiscuss={() => handleDiscuss(activeService)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceTitle={modalService.title}
      />
    </>
  );
}
