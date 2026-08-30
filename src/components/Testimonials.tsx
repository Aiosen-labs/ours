"use client";

import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  context?: string;
}

const testimonialsData: Testimonial[] = [];

export default function Testimonials() {
  const hasTestimonials = testimonialsData && testimonialsData.length > 0;

  return (
    <section className="bg-white py-20 md:py-32 border-t border-black/5 overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="px-margin-desktop max-w-[1400px] mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Section Heading */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="md:col-span-4 lg:col-span-3 flex flex-col"
          >
            <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-bold block mb-4">
              PERSPECTIVES
            </span>
            <h2 className="font-headline-lg text-[32px] md:text-[40px] text-on-surface leading-[1.1] tracking-tight">
              What others say.
            </h2>
          </motion.div>

          {/* Testimonial List (Editorial Layout) */}
          {hasTestimonials ? (
            <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {testimonialsData.map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="flex flex-col"
                >
                  <span className="material-symbols-outlined text-[32px] text-primary/30 mb-6">format_quote</span>
                  <p className="font-body-md text-on-surface text-xl md:text-2xl font-light leading-relaxed mb-8 flex-grow">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="pt-8 border-t border-black/5">
                    <h4 className="font-headline-lg-mobile text-lg font-semibold text-on-surface">
                      {testimonial.author}
                    </h4>
                    <div className="flex flex-col mt-1">
                      <span className="font-body-md text-on-surface-variant text-sm">
                        {testimonial.role}, {testimonial.company}
                      </span>
                      {testimonial.context && (
                        <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-bold mt-3 block">
                          {testimonial.context}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="md:col-span-8 lg:col-span-9 flex items-center"
            >
              <p className="font-body-md text-on-surface-variant text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                Client perspectives will appear here as we build long-term partnerships.
              </p>
            </motion.div>
          )}

        </div>
      </motion.div>
    </section>
  );
}
