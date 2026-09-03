import type { Metadata } from "next";
import "./globals.css";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata: Metadata = {
  metadataBase: new URL('https://aiosenlabs.vercel.app'),
  title: {
    default: "Aiosenlabs | Custom Software Development, AI & Cloud Solutions Agency",
    template: "%s | Aiosenlabs"
  },
  description: "Aiosenlabs is a global software agency founded by Muthu Krishnan A & Mani Maran S. We provide end-to-end custom software development, e-commerce solutions, AI integration, cloud infrastructure, and SEO optimization for micro, small, and enterprise businesses worldwide. From scratch to hosting and annual maintenance.",
  keywords: [
    // Brand
    "Aiosen", "Aiosenlabs", "Aiosen Labs", "aiosenlabs.vercel.app",
    // Core services
    "custom software development", "custom software development company",
    "full stack development", "full stack development agency",
    "software development agency", "software agency", "software company",
    "global software agency", "end-to-end software solutions",
    // Digital products
    "web application development", "mobile app development",
    "e-commerce development", "e-commerce solutions", "online store development",
    "business website development", "company website design",
    // Business systems
    "custom ERP development", "custom CRM development",
    "enterprise software development", "enterprise software solutions",
    "business automation software", "internal tools development",
    // Product engineering
    "MVP development", "SaaS development", "startup software development",
    "product engineering", "software product development",
    // Modernization
    "legacy software modernization", "software maintenance and support",
    "technology stack migration", "software re-engineering",
    // AI & Cloud
    "AI integration services", "AI software solutions",
    "cloud infrastructure setup", "cloud solutions",
    // SEO & consulting
    "SEO optimization services", "technology consulting",
    "software architecture consulting", "IT consulting services",
    // Location-agnostic intent
    "hire software developers", "outsource software development",
    "remote software development team", "dedicated development team"
  ],
  authors: [{ name: "Muthu Krishnan A" }, { name: "Mani Maran S" }],
  creator: "Aiosenlabs",
  publisher: "Aiosenlabs",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Aiosenlabs | Custom Software Development, AI & Cloud Solutions Agency",
    description: "Global software agency providing end-to-end custom software, e-commerce, AI, and cloud solutions. Founded by Muthu Krishnan A & Mani Maran S. From scratch to hosting, we engineer technology to evolve.",
    url: 'https://aiosenlabs.vercel.app',
    siteName: 'Aiosenlabs',
    images: [
      {
        url: '/Aiosen_logo.png',
        width: 800,
        height: 600,
        alt: 'Aiosenlabs - Custom Software Development Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aiosenlabs | Custom Software Development, AI & Cloud Solutions',
    description: 'Global software agency. Custom software, e-commerce, AI integration, cloud infrastructure. From scratch to hosting and annual maintenance.',
    images: ['/Aiosen_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'theme-color': '#0F52BA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://aiosenlabs.vercel.app/#organization",
    "name": "Aiosenlabs",
    "alternateName": ["Aiosen Labs", "Aiosen"],
    "url": "https://aiosenlabs.vercel.app",
    "logo": "https://aiosenlabs.vercel.app/Aiosen_logo.png",
    "founders": [
      { "@type": "Person", "name": "Muthu Krishnan A", "jobTitle": "Founder" },
      { "@type": "Person", "name": "Mani Maran S", "jobTitle": "Co-Founder" }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-72006-70847",
      "contactType": "customer service",
      "email": "aiosenlabs@gmail.com",
      "availableLanguage": "English"
    },
    "areaServed": "Worldwide",
    "description": "Aiosenlabs is a global software agency providing end-to-end custom software development, e-commerce solutions, AI integration, cloud infrastructure, and SEO optimization for businesses of all sizes. Founded by Muthu Krishnan A and Mani Maran S."
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://aiosenlabs.vercel.app/#website",
    "url": "https://aiosenlabs.vercel.app",
    "name": "Aiosenlabs",
    "description": "Custom Software Development, AI & Cloud Solutions Agency",
    "publisher": { "@id": "https://aiosenlabs.vercel.app/#organization" }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Aiosenlabs",
    "url": "https://aiosenlabs.vercel.app",
    "telephone": "+91-72006-70847",
    "email": "aiosenlabs@gmail.com",
    "description": "End-to-end custom software development, e-commerce, AI integration, cloud infrastructure, and annual maintenance for businesses worldwide.",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Products & Web Experiences" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Business Systems" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Product Engineering" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Software Modernization & Support" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technology Consulting & Ongoing Support" } }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-body-md text-body-md">
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
