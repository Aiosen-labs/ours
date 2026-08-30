"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { createPortal } from "react-dom";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
}

const WHATSAPP_NUMBER = "+1234567890"; // Mock number

type Step = "choice" | "whatsapp" | "email";

export default function ConsultationModal({ isOpen, onClose, serviceTitle }: ConsultationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [step, setStep] = useState<Step>("choice");

  useEffect(() => {
    // Notify global components (like FloatingCTA) when modal state changes
    const event = new CustomEvent("aiosen-modal-state", {
      detail: { isOpen }
    });
    window.dispatchEvent(event);
  }, [isOpen]);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Email form state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate templates based on service title
  const whatsappTemplate = `Hi Aiosen Team,\n\nI'm interested in your ${serviceTitle} services and would like to discuss my requirements.\n\nLooking forward to connecting.`;
  const emailTemplate = `Hi Aiosen Team,\n\nI'm interested in your ${serviceTitle} services and would like to discuss my requirements.\n\n[Add details here]`;

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep("choice");
      setIsEditing(false);
      setEmail("");
      setName("");
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen, serviceTitle]);

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

  const handleWhatsAppSelect = () => {
    setMessage(whatsappTemplate);
    setStep("whatsapp");
  };

  const handleEmailSelect = () => {
    setMessage(emailTemplate);
    setStep("email");
  };

  const handleWhatsAppContinue = () => {
    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1200);
  };

  const slideVariants: Variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    })
  };

  // 1 for forward (choice -> whatsapp/email), -1 for back
  const [direction, setDirection] = useState(1);

  const goBack = () => {
    setDirection(-1);
    setStep("choice");
  };

  const renderChoice = () => (
    <motion.div
      key="choice"
      custom={direction}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 md:p-10 flex flex-col items-center text-center"
    >
      <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-bold block mb-4">
        START A CONVERSATION
      </span>
      <h2 id="consultation-title" className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-8">
        How would you like to connect regarding <span className="text-primary italic font-light whitespace-nowrap">{serviceTitle}</span>?
      </h2>

      <div className="flex flex-col w-full max-w-sm gap-4">
        <button
          onClick={() => { setDirection(1); handleWhatsAppSelect(); }}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-black/10 bg-white hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all group"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </div>
            <div>
              <span className="block font-headline-lg-mobile text-sm font-semibold text-on-surface">WhatsApp</span>
              <span className="block font-body-md text-xs text-on-surface-variant font-light">Quick conversation</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-black/20 group-hover:text-[#25D366] transition-colors">arrow_forward</span>
        </button>

        <button
          onClick={() => { setDirection(1); handleEmailSelect(); }}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-black/10 bg-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <div>
              <span className="block font-headline-lg-mobile text-sm font-semibold text-on-surface">Email</span>
              <span className="block font-body-md text-xs text-on-surface-variant font-light">Send detailed requirements</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-black/20 group-hover:text-blue-500 transition-colors">arrow_forward</span>
        </button>
      </div>
    </motion.div>
  );

  const renderWhatsApp = () => (
    <motion.div
      key="whatsapp"
      custom={direction}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 md:p-8 flex flex-col h-full"
    >
      <div className="flex items-center gap-4 mb-6">
        <button onClick={goBack} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="font-headline-lg-mobile text-xl text-on-surface">WhatsApp</span>
          <span className="block font-body-md text-xs text-on-surface-variant">You can review your message before continuing.</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 px-1 overscroll-contain" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <style>{`.flex-1::-webkit-scrollbar { display: none; }`}</style>
        
        <div className="relative">
          <div className="flex justify-between items-end mb-2">
            <label htmlFor="wa-message" className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
              Message
            </label>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="text-primary font-label-sm text-xs uppercase tracking-widest font-bold hover:underline"
              >
                Edit Message
              </button>
            )}
          </div>
          
          {isEditing ? (
            <textarea
              id="wa-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-[160px] p-4 rounded-xl border border-primary/30 bg-primary/5 text-on-surface font-body-md text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              autoFocus
            />
          ) : (
            <div 
              className="w-full min-h-[160px] p-4 rounded-xl border border-black/10 bg-gray-50 text-on-surface font-body-md text-base whitespace-pre-wrap cursor-text"
              onClick={() => setIsEditing(true)}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleWhatsAppContinue}
        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-label-sm text-sm uppercase tracking-widest font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-3 shadow-md shrink-0"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        Continue to WhatsApp
      </button>
    </motion.div>
  );

  const renderEmail = () => (
    <motion.form
      key="email"
      custom={direction}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onSubmit={handleEmailSubmit}
      className="p-6 md:p-8 flex flex-col h-full"
    >
      <div className="flex items-center gap-4 mb-6">
        <button type="button" onClick={goBack} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <span className="font-headline-lg-mobile text-xl text-on-surface">Email Enquiry</span>
          <span className="block font-body-md text-xs text-on-surface-variant">Send detailed requirements to Aiosen.</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 px-1 space-y-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h3 className="font-headline-lg-mobile text-xl text-on-surface mb-2">Message Sent</h3>
            <p className="font-body-md text-on-surface-variant">Thank you. An Aiosen architect will be in touch shortly.</p>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <label htmlFor="email" className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Email address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="name" className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Name (Optional)</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-1 pt-2">
              <label htmlFor="email-message" className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Message</label>
              <textarea
                id="email-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[140px] px-4 py-3 rounded-lg border border-black/10 bg-white text-on-surface font-body-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <p className="font-body-md text-[11px] text-on-surface-variant/80 text-center pt-2">
              Your email is used only to send your enquiry to Aiosen.
            </p>
          </>
        )}
      </div>

      {!isSuccess && (
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-dark-surface hover:bg-primary text-white font-label-sm text-sm uppercase tracking-widest font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-3 shadow-md shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-sm">send</span>
          )}
          Send to Aiosen
        </button>
      )}
    </motion.form>
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end md:justify-center p-0 md:p-6 lg:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full md:w-[480px] h-[90dvh] md:h-[600px] bg-[#FAF9F6] rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden outline-none border border-black/5"
          >
            {/* Global Close Button */}
            <div className="absolute top-0 right-0 p-4 z-20 pointer-events-none">
              <button
                onClick={onClose}
                type="button"
                aria-label="Close modal"
                className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-white/80 backdrop-blur-md text-on-surface hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {step === "choice" && renderChoice()}
                {step === "whatsapp" && renderWhatsApp()}
                {step === "email" && renderEmail()}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
