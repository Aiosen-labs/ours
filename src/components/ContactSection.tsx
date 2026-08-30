"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "+1234567890"; // Mock number

const serviceOptions = [
  "Software Engineering",
  "Cloud & Infrastructure",
  "AI & Intelligent Systems",
  "Cybersecurity",
  "Data & Analytics",
  "General Inquiry"
];

interface ContactSectionProps {
  initialServiceContext?: string;
}

export default function ContactSection({ initialServiceContext = "" }: ContactSectionProps) {
  const [selectedService, setSelectedService] = useState(initialServiceContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
        setName("");
        setEmail("");
        setMessage("");
        setSelectedService("");
      }, 5000);
    }, 1200);
  };

  const handleWhatsAppRedirect = () => {
    let waText = "Hi Aiosen Team,\n\nI'd like to discuss a project.";
    if (selectedService) {
      waText = `Hi Aiosen Team,\n\nI'm interested in your ${selectedService} services and would like to discuss my requirements.`;
    }
    const encodedMessage = encodeURIComponent(waText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="bg-[#1A1A1A] py-20 md:py-32 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="px-margin-desktop max-w-[1400px] mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Copy & Contact Options */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="w-12 h-1 bg-primary mb-8 rounded-full"></div>
            <h2 className="font-headline-lg text-4xl md:text-[56px] text-white leading-[1.1] tracking-tight mb-6">
              Let&apos;s build something <span className="text-primary italic font-light">dependable.</span>
            </h2>
            <p className="font-body-md text-gray-400 text-xl font-light leading-relaxed mb-12 max-w-md">
              Tell us what you&apos;re trying to build, improve, or solve. We&apos;ll figure out the right next step together.
            </p>

            <div className="flex flex-col gap-6">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-gray-500 font-bold block">
                Quick Conversation
              </span>
              <button 
                onClick={handleWhatsAppRedirect}
                className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group w-full max-w-md"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="block font-headline-lg-mobile text-sm font-semibold text-white">Continue to WhatsApp</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">arrow_forward</span>
              </button>
            </div>
          </motion.div>

          {/* Right: Inquiry Form */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="lg:col-span-7"
          >
            <div className="bg-[#222222] border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-[32px]">check_circle</span>
                    </div>
                    <h3 className="font-headline-lg-mobile text-2xl text-white mb-3">Request Received</h3>
                    <p className="font-body-md text-gray-400">Thank you. An Aiosen architect will be in touch shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleEmailSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="font-label-sm text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                          Name (Optional)
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="font-label-sm text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                          Email <span className="text-primary">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-service" className="font-label-sm text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                        What can we help with? (Optional)
                      </label>
                      <div className="relative">
                        <select
                          id="contact-service"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#222222] text-gray-400">Select a capability</option>
                          {serviceOptions.map(opt => (
                            <option key={opt} value={opt} className="bg-[#222222] text-white">{opt}</option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="font-label-sm text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full min-h-[140px] px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white font-body-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <p className="font-body-md text-[11px] text-gray-500">
                        Your email is used only to send your enquiry to Aiosen.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-[#1A1A1A] font-label-sm text-sm uppercase tracking-widest font-bold px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-3 shadow-md shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                        ) : (
                          <span className="material-symbols-outlined text-sm">send</span>
                        )}
                        Send Request
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
