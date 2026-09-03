import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ServicesShowcase from "@/components/ServicesShowcase";
import HowWeWork from "@/components/HowWeWork";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import FadeIn from "@/components/FadeIn";
import HeroAnimation from "@/components/HeroAnimation";
import HeroContent from "@/components/HeroContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* TopNavBar */}
      <Navbar />

      {/* Main Content Canvas */}
      <main className="flex-grow pt-20 pb-0">
        {/* Hero Section */}
        <FadeIn delay={100}>
          <div id="home" data-section="hero" role="region" aria-label="Hero">
            <section className="relative w-full min-h-[calc(100svh-80px)] flex items-center justify-center pb-20 border-b border-black/[0.05] bg-background overflow-hidden perspective-1000">
              {/* Grid pattern */}
              <div className="absolute inset-0 hero-grid pointer-events-none" />
              {/* Soft blue ambient for antigravity feel */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(15,82,186,0.06) 0%, transparent 60%)" }} />
              <HeroAnimation />
              {/* No dark vignette needed in light mode, just clean gradients */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 z-[5] pointer-events-none" />
              <HeroContent />
            </section>
          </div>
        </FadeIn>

        {/* Section 2: Projects */}
        <FadeIn delay={100}>
          <div id="projects" data-section="projects" role="region" aria-label="Case Studies">
            <ProjectsShowcase />
          </div>
        </FadeIn>
        
        {/* Section 3: Services / Capability Map */}
        <FadeIn delay={100}>
          <div id="services" data-section="services" role="region" aria-label="Services">
            <ServicesShowcase />
          </div>
        </FadeIn>

        {/* Section 4: How We Work */}
        <FadeIn delay={100}>
          <div id="process" data-section="how-we-work" role="region" aria-label="How We Work">
            <HowWeWork />
          </div>
        </FadeIn>



        {/* Section 6: Contact */}
        <FadeIn delay={100}>
          <div id="contact" data-section="contact" role="region" aria-label="Contact">
            <ContactSection />
          </div>
        </FadeIn>
      </main>

      <Footer />
    </>
  );
}
