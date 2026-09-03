import type { Metadata } from "next";
import "./globals.css";
import FloatingCTA from "@/components/FloatingCTA";

export const metadata: Metadata = {
  metadataBase: new URL('https://aiosenlabs.vercel.app'),
  title: {
    default: "Aiosenlabs | Custom Software, AI & Cloud Solutions",
    template: "%s | Aiosenlabs"
  },
  description: "Aiosenlabs is a global software agency providing end-to-end solutions for micro, small, and high enterprises. From scratch to hosting and maintenance, we specialize in custom software, e-commerce, AI, and SEO optimization.",
  keywords: [
    "Aiosen", "Aiosenlabs", "Aiosen Labs", "software company", "software agency",
    "custom software development", "full stack development", "global software agency",
    "e-commerce solutions", "SEO optimization", "cloud infrastructure", 
    "AI intelligent systems", "end-to-end software solutions", "enterprise software"
  ],
  authors: [{ name: "Muthu Krishnan A" }, { name: "Mani Maran S" }],
  creator: "Aiosenlabs",
  publisher: "Aiosenlabs",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Aiosenlabs | Custom Software, AI & Cloud Solutions",
    description: "Global software agency providing end-to-end solutions. From scratch to hosting, we engineer technology to evolve.",
    url: 'https://aiosenlabs.vercel.app',
    siteName: 'Aiosenlabs',
    images: [
      {
        url: '/icon.png',
        width: 800,
        height: 600,
        alt: 'Aiosenlabs Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aiosenlabs | Custom Software, AI & Cloud Solutions',
    description: 'Global software agency providing end-to-end solutions. From scratch to hosting, we engineer technology to evolve.',
    images: ['/icon.png'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://aiosenlabs.vercel.app/#organization",
    "name": "Aiosenlabs",
    "url": "https://aiosenlabs.vercel.app",
    "logo": "https://aiosenlabs.vercel.app/icon.png",
    "founders": [
      {
        "@type": "Person",
        "name": "Muthu Krishnan A"
      },
      {
        "@type": "Person",
        "name": "Mani Maran S"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-72006-70847",
      "contactType": "customer service",
      "email": "aiosenlabs@gmail.com",
      "availableLanguage": "English"
    },
    "description": "Aiosenlabs is a global software agency providing end-to-end solutions for micro, small, and high enterprises. From scratch to hosting and maintenance, we specialize in custom software, e-commerce, AI, and SEO optimization."
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-body-md text-body-md">
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
