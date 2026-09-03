"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  return (
    <footer className="bg-background border-t border-black/[0.05] w-full py-20 text-on-background">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 px-margin-desktop max-w-[1400px] mx-auto">
        <div className="col-span-1 md:col-span-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-white p-2 rounded-lg">
              <Image
                alt="AIOSENLABS Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCujJT6cDmJdh2iv9oRJQB0vuSeZEgzNiSmznv9H35yjmOlPorZcpLL74YKYkcgZFzu7u-xjnK7pzXaetKCq3uNsfqOx9i4YY9573vq4APm_sWi3s0YkOv5WtkX0a40COyLiPr-uO6-BDfpQuCZztEI1sxGSFJ8lV8AzDphUE9aLREZNbuy1MBzgVG3BdPFOpgjOmnrbk6u26xoRGVpQzsgtTia52ZrN9kPbtGASmk15pK_1j3aKCSbvfsdWE_Fnbcj8w"
                width={100}
                height={32}
                unoptimized
              />
            </div>
            <span className="font-headline-lg text-[26px] font-bold text-on-background tracking-tight">
              AIOSENLABS
            </span>
          </div>
          <p className="font-body-md text-on-surface-variant font-light max-w-sm mb-4">
            Built with intention. Engineered to evolve.
          </p>
          <div className="flex flex-col gap-2 mb-10 text-sm text-on-surface-variant">
            <a href="mailto:aiosenlabs@gmail.com" className="hover:text-primary transition-colors duration-300">aiosenlabs@gmail.com</a>
            <a href="https://wa.me/917200670847" className="hover:text-primary transition-colors duration-300">WhatsApp: +91 72006 70847</a>
          </div>
          <p className="font-label-sm text-xs text-on-surface-variant/70 tracking-wider">
            © 2026 Aiosenlabs. All rights reserved.
          </p>
        </div>
        <nav aria-label="Legal" className="col-span-1 md:col-span-3 flex flex-col items-start gap-6 font-label-sm text-xs uppercase tracking-widest font-semibold">
          <button onClick={(e) => handleScroll(e, "services")} className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-left">Privacy Policy</button>
          <button onClick={(e) => handleScroll(e, "services")} className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-left">Terms of Service</button>
          <button onClick={(e) => handleScroll(e, "services")} className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-left">Security</button>
          <button onClick={(e) => handleScroll(e, "services")} className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-left">Compliance</button>
        </nav>
        <nav aria-label="Company" className="col-span-1 md:col-span-3 flex flex-col items-start gap-6 font-label-sm text-xs uppercase tracking-widest font-semibold">
          <button onClick={(e) => handleScroll(e, "process")} className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-left">Careers</button>
          <button onClick={(e) => handleScroll(e, "projects")} className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-left">Engineering Blog</button>
          <button onClick={(e) => handleScroll(e, "projects")} className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-left">Open Source</button>
          <button onClick={(e) => handleScroll(e, "contact")} className="text-primary hover:text-on-background transition-colors duration-300 text-left">Contact Us</button>
        </nav>
      </div>
    </footer>
  );
}
