"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ProcessStage {
  id: string;
  number: string;
  title: string;
  description: string;
}

const processData: ProcessStage[] = [
  {
    id: "p1",
    number: "01",
    title: "UNDERSTAND",
    description: "Understand goals, constraints, users and business context."
  },
  {
    id: "p2",
    number: "02",
    title: "ARCHITECT",
    description: "Shape the right technical direction, architecture and priorities."
  },
  {
    id: "p3",
    number: "03",
    title: "BUILD",
    description: "Engineer, test and deliver the solution with clarity and discipline."
  },
  {
    id: "p4",
    number: "04",
    title: "EVOLVE",
    description: "Support, improve and scale the system as the business changes."
  }
];

export default function HowWeWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-background py-20 md:py-32 border-t border-black/[0.05] overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="px-margin-desktop max-w-[1400px] mx-auto"
      >
        {/* Heading Area */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="mb-20 md:mb-32 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-end"
        >
          <div>
            <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-bold block mb-4">
              HOW WE WORK
            </span>
            <h2 className="font-headline-lg text-[30px] md:text-[48px] text-on-background leading-[1.1] tracking-tight">
              Engineering <br />
              <span className="text-on-surface-variant italic font-light">principles in practice.</span>
            </h2>
          </div>
          <p className="font-body-md text-on-surface-variant text-base md:text-xl font-light leading-relaxed max-w-lg text-justify">
            From the first problem to long-term improvement, we stay focused on building technology that works in the real world.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[28px] left-0 w-full h-[1px] bg-black/[0.05] z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {processData.map((stage, index) => {
              const isHovered = hoveredIndex === index;
              const isPastHovered = hoveredIndex !== null && index <= hoveredIndex;
              
              return (
                <motion.div
                  key={stage.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative flex flex-col cursor-default"
                >
                  {/* Mobile Connecting Line */}
                  {index < processData.length - 1 && (
                    <div className="block md:hidden absolute left-[28px] top-[56px] bottom-[-48px] w-[1px] bg-black/[0.05] z-0"></div>
                  )}

                  <div className="flex items-center gap-6 md:block md:space-y-8 relative z-10">
                    
                    {/* Node */}
                    <div className="relative shrink-0">
                      <div className={`w-14 h-14 rounded-full bg-surface border transition-all duration-500
                        ${isHovered ? 'border-primary ring-4 ring-primary/15 shadow-sm' : 'border-outline-strong'}
                      `}>
                        <span className={`font-label-sm text-sm uppercase tracking-widest font-bold transition-colors duration-500 flex items-center justify-center h-full ${isHovered ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {stage.number}
                        </span>
                      </div>
                      
                      {/* Active line segment (Desktop) */}
                      <div 
                        className={`hidden md:block absolute top-1/2 left-[56px] right-[-32px] h-[1px] -translate-y-1/2 bg-primary transition-all duration-700 transform origin-left
                          ${isPastHovered && index < processData.length - 1 ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                        `}
                      ></div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className={`font-headline-lg-mobile text-xl font-semibold transition-colors duration-500 mb-3
                        ${isHovered ? 'text-on-background' : 'text-on-surface-variant'}
                      `}>
                        {stage.title}
                      </h3>
                      <p className="font-body-md text-on-surface-variant/80 text-base font-light leading-relaxed max-w-[260px] text-justify">
                        {stage.description}
                      </p>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
