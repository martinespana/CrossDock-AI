'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Arrow, Mark } from './icons';

const copy = {
  en: { home: 'CrossDock AI home', back: 'Back to website', navigation: 'Main navigation', approach: 'Our approach', useCases: 'Use cases', why: 'Why CrossDock', demo: 'Book a demo', close: 'Close navigation', open: 'Open navigation', mobile: 'Mobile navigation', language: 'Choose language' },
  es: { home: 'Inicio de CrossDock AI', back: 'Volver al sitio', navigation: 'Navegación principal', approach: 'Nuestro enfoque', useCases: 'Casos de uso', why: 'Por qué CrossDock', demo: 'Agendar una demo', close: 'Cerrar navegación', open: 'Abrir navegación', mobile: 'Navegación móvil', language: 'Elegir idioma' },
};

export function Header({ locale = 'en', variant = 'default' }: { locale?: 'en' | 'es'; variant?: 'default' | 'demo' }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const text = copy[locale];
  const home = locale === 'es' ? '/es/' : '/';
  const localPath = pathname?.replace(/^\/es(?=\/|$)/, '');
  const isPrivacy = localPath?.startsWith('/privacy');
  const isDemo = localPath?.startsWith('/demo');
  const english = isPrivacy ? '/privacy/' : isDemo ? '/demo/' : '/';
  const spanish = isPrivacy ? '/es/privacy/' : isDemo ? '/es/demo/' : '/es/';
  return <header className={`site-header${variant === 'demo' ? ' demo-header' : ''}`}>
    <div className="container header-inner">
      <a className="wordmark" href={home} aria-label={text.home}><Mark />cross-dock.ai</a>
      {variant === 'default' ? <><nav aria-label={text.navigation} className="desktop-nav"><a href={`${home}#approach`}>{text.approach}</a><a href={`${home}#use-cases`}>{text.useCases}</a><a href={`${home}#operators`}>{text.why}</a></nav>
      <a className="button button-small header-cta" href={`${home}demo/`}>{text.demo} <Arrow /></a></> : <a className="demo-back-link" href={home}>{text.back}<Arrow /></a>}
      <nav className="language-switch" aria-label={text.language}>
        <a href={english} hrefLang="en" lang="en" aria-label="English" aria-current={locale === 'en' ? 'page' : undefined} onClick={(event) => { event.currentTarget.href = `${english}${window.location.search}${window.location.hash}`; }}>EN</a>
        <span aria-hidden="true">/</span>
        <a href={spanish} hrefLang="es" lang="es" aria-label="Español" aria-current={locale === 'es' ? 'page' : undefined} onClick={(event) => { event.currentTarget.href = `${spanish}${window.location.search}${window.location.hash}`; }}>ES</a>
      </nav>
      {variant === 'default' && <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? text.close : text.open} onClick={() => setOpen(!open)}>{open ? <span aria-hidden="true">×</span> : <span aria-hidden="true">☰</span>}</button>}
    </div>
    {variant === 'default' && open && <nav id="mobile-nav" className="mobile-nav" aria-label={text.mobile} onClick={() => setOpen(false)}><a href={`${home}#approach`}>{text.approach}</a><a href={`${home}#use-cases`}>{text.useCases}</a><a href={`${home}#operators`}>{text.why}</a><a href={`${home}demo/`}>{text.demo} <Arrow /></a></nav>}
  </header>;
}
