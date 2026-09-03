"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Services", id: "services" },
  { name: "Case Studies", id: "projects" },
  { name: "Company", id: "process" }
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // entry.target.id will be "home", "projects", "services", "process", "contact", etc.
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("div[id]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    
    // Check if we are on the homepage
    if (window.location.pathname === '/') {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we are on a different page (e.g., case study), just navigate to /#id
      window.location.href = `/#${targetId}`;
    }
  };

  return (
    <>
      <nav className="bg-background fixed top-0 w-full z-50 border-b border-black/[0.06] transition-all">
        <div className="flex justify-between items-center px-4 md:px-margin-desktop max-w-[1400px] mx-auto h-20">
          <button onClick={(e) => handleScroll(e, "home")} className="flex items-center gap-3 md:gap-4 z-50 relative">
            <Image
              alt="AIOSENLABS Logo"
              className="h-8 md:h-10 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz3UZIih-xYWzEJRh1qGr7F7pIB37AXsd3e4k8lyIe-fVaoeHoZc8lYmxURA4g8dDgZjSFHoQExVSMIlkAP9UJqTrSm4spqQ67MUgCZNmaBAg9JeAuvnXB2IMxci4I3UeDVzF29OdFYLs7QjrU4ESPVYXQ9jBC51PlKv-FrOvSM0f4oU1Rk-K41APZ_zdrCcxZd6HXcRqXygw5FAgRqCZ1f-EG4d7fCcJyrJIOrgtLiAFKsrAfE5FbDh5s2MyZrtwg1Q"
              width={100}
              height={40}
              unoptimized
            />
            <span className="font-display-lg text-[22px] md:text-[24px] font-bold text-on-background tracking-tight">
              AIOSENLABS
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-1 items-center font-body-md text-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button 
                  key={link.name}
                  onClick={(e) => handleScroll(e, link.id)}
                  className={`transition-all px-4 py-2 rounded-md active:scale-95 duration-200 font-medium ${
                    isActive
                      ? 'text-on-background bg-surface border border-outline shadow-sm'
                      : 'text-on-surface-variant hover:text-on-background hover:bg-black/[0.03]'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={(e) => handleScroll(e, "contact")} className="btn-primary font-label-sm text-[11px] px-6 py-3 rounded-md font-semibold uppercase tracking-[0.1em] shadow-sm hover:shadow-md transition-all">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden z-50 relative flex items-center">
            <button 
              onClick={toggleMenu}
              className="w-11 h-11 flex items-center justify-center bg-transparent border-none focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 justify-center items-center w-6 h-6">
                <span className={`block w-6 h-0.5 bg-on-background transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-on-background transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-on-background transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="flex flex-col gap-2 mt-8">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    onClick={(e) => handleScroll(e, link.id)}
                    className={`text-left text-3xl font-bold transition-colors py-3 border-b border-black/[0.05] ${
                      isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-background'
                    }`}
                  >
                    <span className="font-headline-lg-mobile text-3xl font-medium tracking-tight">
                      {link.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            
            <div className="mt-12 flex flex-col gap-4">
              <button 
                onClick={(e) => handleScroll(e, "contact")}
                className="block w-full btn-primary font-label-sm text-xs px-6 py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-[#0066FF]/20 hover:shadow-[#0066FF]/40 transition-all text-center"
              >
                Get Started
              </button>
              <p className="text-center font-label-sm text-[10px] uppercase tracking-widest text-[#9BA3B8] mt-4">
                © 2026 Aiosenlabs. All rights reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
