import localFont from 'next/font/local';
import type { Locale } from '@/lib/i18n';
import { paletteBootstrap } from '@/lib/palettes';
import '@/app/globals.css';
import '@/app/kinetic.css';
import '@/app/demo.css';

const geist = localFont({ src: '../public/fonts/geist-latin.woff2', variable: '--font-geist', display: 'swap', weight: '100 900' });
export function DocumentShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <html lang={locale} className={geist.variable} suppressHydrationWarning><body><script dangerouslySetInnerHTML={{__html: paletteBootstrap}} /><a className="skip-link" href="#main">{locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>{children}</body></html>;
}
