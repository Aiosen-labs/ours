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
      <main className="flex-grow pt-28 pb-0">
        {/* Hero Section */}
        <FadeIn delay={100}>
          <div id="home" data-section="hero">
            <section className="relative w-full min-h-[90vh] flex items-center justify-center -mt-28 pt-28 pb-20 border-b border-white/10">
              <HeroAnimation />
              {/* Gradient overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 z-[5]"></div>
              <HeroContent />
            </section>
          </div>
        </FadeIn>

        {/* Section 2: Projects */}
        <FadeIn delay={100}>
          <div id="projects" data-section="projects">
            <ProjectsShowcase />
          </div>
        </FadeIn>
        
        {/* Section 3: Services / Capability Map */}
        <FadeIn delay={100}>
          <div id="services" data-section="services">
            <ServicesShowcase />
          </div>
        </FadeIn>

        {/* Section 4: How We Work */}
        <FadeIn delay={100}>
          <div id="process" data-section="how-we-work">
            <HowWeWork />
          </div>
        </FadeIn>

        {/* Section 5: Testimonials */}
        <FadeIn delay={100}>
          <div id="testimonials">
            <Testimonials />
          </div>
        </FadeIn>

        {/* Section 6: Contact */}
        <FadeIn delay={100}>
          <div id="contact" data-section="contact">
            <ContactSection />
          </div>
        </FadeIn>
      </main>

      <Footer />
    </>
  );
}
