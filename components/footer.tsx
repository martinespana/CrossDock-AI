import { siteConfig } from '@/lib/config';
import { Mark } from './icons';

const copy = {
  en: { built: 'Built by logistics operators.', ahead: 'Technology for your operation.', navigation: 'Footer navigation', contact: 'Contact', privacy: 'Privacy Policy', signature: 'LOGISTICS EXPERIENCE. OPERATIONAL INTELLIGENCE.' },
  es: { built: 'Creado por operadores logísticos.', ahead: 'Tecnología para tu operación.', navigation: 'Navegación del pie de página', contact: 'Contacto', privacy: 'Política de privacidad', signature: 'EXPERIENCIA LOGÍSTICA. INTELIGENCIA OPERATIVA.' },
};

export function Footer({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const text = copy[locale];
  const home = locale === 'es' ? '/es/' : '/';
  return <footer className="site-footer"><div className="container"><div className="footer-main"><div><a href={home} className="wordmark"><Mark />cross-dock.ai</a><p>{text.built}<br />{text.ahead}</p></div><nav aria-label={text.navigation}><a href={`${home}demo/`}>{text.contact}</a>{siteConfig.linkedin ? <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a> : null}<a href={`${home}privacy/`}>{text.privacy}</a></nav></div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} CrossDock AI.</span><span className="mono">{text.signature}</span><span>cross-dock.ai</span></div></div></footer>;
}
