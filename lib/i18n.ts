import type { Metadata } from 'next';
import { siteConfig } from './config';
export type Locale = 'en' | 'es';
export const homePath = (locale: Locale) => locale === 'es' ? '/es/' : '/';
export const privacyPath = (locale: Locale) => locale === 'es' ? '/es/privacy/' : '/privacy/';
export const demoPath = (locale: Locale) => locale === 'es' ? '/es/demo/' : '/demo/';
export function localizedMetadata(locale: Locale, page: boolean | 'demo' = false): Metadata {
  const privacy = page === true;
  const demo = page === 'demo';
  const es = locale === 'es';
  const routeFor = privacy ? privacyPath : demo ? demoPath : homePath;
  const path = routeFor(locale);
  const title = privacy ? (es ? 'Política de privacidad' : 'Privacy Policy') : demo ? (es ? 'Agendar una demo — CrossDock AI' : 'Book a demo — CrossDock AI') : (es ? 'CrossDock AI — La capa de IA para tu operación logística' : 'CrossDock AI — The AI Operations Layer for Logistics');
  const description = privacy ? (es ? 'Borrador editable del aviso de privacidad de CrossDock AI.' : 'Editable draft privacy notice for CrossDock AI.') : demo ? (es ? 'Conoce CrossDock AI en una demo personalizada para tu operación. Explora seguimiento de envíos, gestión de novedades y documentación con nuestro equipo.' : 'See CrossDock AI in a demo tailored to your operation. Explore shipment tracking, exception management, and documentation with our team.') : (es ? 'Agentes de IA que coordinan el trabajo entre equipos, sistemas y aliados logísticos. Creado por operadores logísticos.' : siteConfig.description);
  return {
    metadataBase: new URL(siteConfig.origin), title, description,
    alternates: { canonical: path, languages: { en: routeFor('en'), es: routeFor('es'), 'x-default': routeFor('en') } },
    openGraph: { type: 'website', locale: es ? 'es_CO' : 'en_US', alternateLocale: es ? 'en_US' : 'es_CO', url: path, siteName: 'CrossDock AI', title, description, images: [{ url: es ? '/og-es.png' : '/og.png', width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [es ? '/og-es.png' : '/og.png'] },
    robots: { index: !privacy, follow: true }, icons: { icon: '/icon.svg' },
  };
}
