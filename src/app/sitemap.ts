import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://aiosenlabs.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Since this is currently a single-page scrolling application, 
    // the root URL is the primary focus. If additional pages are added,
    // they should be appended to this array.
  ];
}
