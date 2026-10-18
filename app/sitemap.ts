import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${siteConfig.origin}/`, es: `${siteConfig.origin}/es/` };
  const demoLanguages = { en: `${siteConfig.origin}/demo/`, es: `${siteConfig.origin}/es/demo/` };
  return [
    { url: `${siteConfig.origin}/`, changeFrequency: 'monthly', priority: 1, alternates: { languages } },
    { url: `${siteConfig.origin}/es/`, changeFrequency: 'monthly', priority: 1, alternates: { languages } },
    { url: `${siteConfig.origin}/demo/`, changeFrequency: 'monthly', priority: 0.8, alternates: { languages: demoLanguages } },
    { url: `${siteConfig.origin}/es/demo/`, changeFrequency: 'monthly', priority: 0.8, alternates: { languages: demoLanguages } },
  ];
}
