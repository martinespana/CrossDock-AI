import type { Locale } from '@/lib/i18n';
import { homePath, privacyPath } from '@/lib/i18n';
import { siteConfig } from '@/lib/config';
import { Header } from './header';
import { Arrow, Icon, Mark } from './icons';

const copy = {
  en: {
    eyebrow: 'A DEMO BUILT AROUND YOUR OPERATION',
    heading: ['Your operation.', 'One step ahead.'],
    description: 'See how CrossDock AI connects the work between your logistics teams, systems, and partners.',
    explore: 'WHAT WE CAN EXPLORE TOGETHER',
    benefits: [
      { title: 'Shipment tracking', description: 'Keep updates, conversations, and next steps connected.', icon: 'location' },
      { title: 'Operational exceptions', description: 'Bring context to the issues that need your team’s attention.', icon: 'alert' },
      { title: 'Documents and closeout', description: 'Move the paperwork forward alongside the operation.', icon: 'file' },
    ],
    operator: 'Built by logistics operators.',
    operatorDetail: 'Experience in the field. Intelligence in the workflow.',
    formEyebrow: 'LET’S TALK LOGISTICS',
    formHeading: 'Book a demo',
    formDescription: 'Choose an available date and time, then confirm your demo with our team.',
    calendarTitle: 'Book your CrossDock AI demo in Google Calendar',
    openCalendar: 'Open booking calendar',
    newTab: 'opens in a new tab',
    calendarNote: 'Select your time zone in the calendar. Your booking is complete when Google Calendar confirms it.',
    privacy: 'Privacy Policy',
    back: 'Explore CrossDock AI',
    rights: 'All rights reserved.',
  },
  es: {
    eyebrow: 'UNA DEMO A LA MEDIDA DE TU OPERACIÓN',
    heading: ['Tu operación,', 'un paso adelante.'],
    description: 'Conoce cómo CrossDock AI conecta el trabajo entre tus equipos, sistemas y aliados logísticos.',
    explore: 'LO QUE PODEMOS EXPLORAR JUNTOS',
    benefits: [
      { title: 'Seguimiento de embarques', description: 'Conecta actualizaciones, conversaciones y próximos pasos.', icon: 'location' },
      { title: 'Excepciones operativas', description: 'Dale contexto a lo que necesita la atención de tu equipo.', icon: 'alert' },
      { title: 'Documentos y cierre', description: 'Haz que los documentos avancen junto con la operación.', icon: 'file' },
    ],
    operator: 'Creado por operadores logísticos.',
    operatorDetail: 'Experiencia en el terreno. Inteligencia en cada flujo.',
    formEyebrow: 'HABLEMOS DE TU OPERACIÓN',
    formHeading: 'Agendar una demo',
    formDescription: 'Elige una fecha y hora disponibles y confirma tu demo con nuestro equipo.',
    calendarTitle: 'Agenda tu demo de CrossDock AI en Google Calendar',
    openCalendar: 'Abrir calendario de reservas',
    newTab: 'abre en una pestaña nueva',
    calendarNote: 'Selecciona tu zona horaria en el calendario. Tu reserva queda lista cuando Google Calendar la confirma.',
    privacy: 'Política de privacidad',
    back: 'Explorar CrossDock AI',
    rights: 'Todos los derechos reservados.',
  },
};

export function DemoPage({ locale = 'en' }: { locale?: Locale }) {
  const text = copy[locale];
  const bookingUrl = new URL(siteConfig.demoBookingUrl);
  bookingUrl.searchParams.set('hl', locale);
  const embedUrl = new URL(bookingUrl);
  embedUrl.searchParams.set('gv', 'true');
  return <>
    <Header locale={locale} variant="demo" />
    <main id="main" className="demo-page" aria-labelledby="demo-heading">
      <div className="demo-atmosphere" aria-hidden="true">
        <Mark className="demo-watermark" />
        <svg className="demo-route-art" viewBox="0 0 920 920" fill="none">
          <path className="demo-route-underlay" d="M-70 778h277c71 0 128-57 128-128V476c0-71 57-128 128-128h133c71 0 128-57 128-128V-60" />
          <path className="demo-route-line" d="M-70 778h277c71 0 128-57 128-128V476c0-71 57-128 128-128h133c71 0 128-57 128-128V-60" />
          <circle cx="335" cy="590" r="7" />
          <circle cx="594" cy="348" r="7" />
        </svg>
      </div>
      <div className="container demo-layout demo-booking-layout">
        <section className="demo-pitch" aria-labelledby="demo-heading">
          <p className="demo-eyebrow mono"><span aria-hidden="true" />{text.eyebrow}</p>
          <h1 id="demo-heading">{text.heading[0]}<br /><span>{text.heading[1]}</span></h1>
          <p className="demo-description">{text.description}</p>
          <div className="demo-benefits">
            <p className="demo-benefits-label mono">{text.explore}</p>
            <ul>
              {text.benefits.map((benefit) => <li key={benefit.icon}>
                <span className="demo-benefit-icon"><Icon name={benefit.icon} /></span>
                <div><h2>{benefit.title}</h2><p>{benefit.description}</p></div>
              </li>)}
            </ul>
          </div>
          <div className="demo-operator">
            <Mark />
            <div><p>{text.operator}</p><span>{text.operatorDetail}</span></div>
          </div>
        </section>
        <section className="demo-form-card demo-booking-card" aria-labelledby="demo-form-heading">
          <p className="demo-form-eyebrow mono">{text.formEyebrow}</p>
          <h2 id="demo-form-heading">{text.formHeading}</h2>
          <p className="demo-form-description">{text.formDescription}</p>
          <a className="button button-accent demo-booking-link" href={bookingUrl.toString()} target="_blank" rel="noopener noreferrer" aria-label={`${text.openCalendar} (${text.newTab})`}>{text.openCalendar}<Arrow /></a>
          <iframe className="demo-booking-frame" src={embedUrl.toString()} title={text.calendarTitle} loading="lazy" />
          <p className="demo-booking-note">{text.calendarNote}</p>
        </section>
      </div>
      <footer className="container demo-footer">
        <p>© {new Date().getFullYear()} CrossDock AI. {text.rights}</p>
        <nav aria-label={locale === 'es' ? 'Enlaces de la página' : 'Page links'}>
          <a href={homePath(locale)}>{text.back}</a>
          <a href={privacyPath(locale)}>{text.privacy}</a>
        </nav>
      </footer>
    </main>
  </>;
}
