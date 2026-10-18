import { Header } from './header';
import { Footer } from './footer';
import { homePath, type Locale } from '@/lib/i18n';

const content = {
  en: {
    back: 'Back to CrossDock', label: 'PRIVACY / EDITABLE DRAFT', title: 'Privacy Policy',
    draft: 'Draft for review. This notice requires legal review and completion before the site collects personal information. Last updated October 17, 2026.',
    sections: [
      ['About this website', 'CrossDock AI provides AI agents for logistics operations. This notice describes the intended handling of information submitted through this website’s demo and contact form.'],
      ['Information you choose to share', 'The demo form asks for your first and last name, work email address, company, and workflow of interest. You can optionally add a phone number and a message. Please do not include sensitive personal information, confidential shipment records, or information about other people.', 'When the form’s receiving service is not enabled, it does not transmit or save your form entries. A request is confirmed only after the receiving service acknowledges receipt.'],
      ['How information is intended to be used', 'Information will be used to respond to your inquiry, understand operational needs, and arrange a product demo. It is not intended for unrelated advertising.'],
      ['Service providers and technical data', 'The site’s hosting provider may process technical information, such as network addresses and request logs, to serve and protect the website. This version does not add analytics, advertising trackers, or nonessential cookies.', 'The color preview stores only your selected palette and visual style in this browser’s session storage. That preference is not sent to CrossDock and can be cleared by closing the browser session.', 'Before collection begins, this notice must identify the receiving service, relevant providers, where information is processed, and any applicable international transfer arrangements.'],
      ['Retention and your choices', 'Before collecting requests, CrossDock AI must define and publish an appropriate retention period and a verified contact method for access, correction, deletion, and other applicable privacy requests.'],
      ['Details to complete before enabling this form', 'The operator’s legal name, address, privacy contact, applicable jurisdiction, lawful basis where required, retention rules, service providers, and available rights must be confirmed. This draft does not claim compliance with a specific privacy law.'],
    ],
    contact: 'Contact and changes', contactStart: 'For general interest in CrossDock AI, see the ', contactLink: 'contact section', contactEnd: '. A dedicated privacy contact will be added before collection begins. Updates to this notice will appear on this page.',
  },
  es: {
    back: 'Volver a CrossDock', label: 'PRIVACIDAD / BORRADOR EDITABLE', title: 'Política de privacidad',
    draft: 'Borrador para revisión. Este aviso debe completarse y pasar por revisión legal antes de que el sitio recopile datos personales. Última actualización: 17 de octubre de 2026.',
    sections: [
      ['Sobre este sitio', 'CrossDock AI ofrece agentes de IA para operaciones logísticas. Este aviso describe el tratamiento previsto de los datos que se envíen a través del formulario de demo y contacto de este sitio.'],
      ['Datos que decides compartir', 'El formulario de demo solicita tu nombre y apellido, correo de trabajo, empresa y flujo de interés. Puedes añadir un teléfono y un mensaje de forma opcional. No incluyas datos personales sensibles, información confidencial de envíos ni datos de otras personas.', 'Mientras el servicio receptor del formulario no esté habilitado, tus respuestas no se transmiten ni se guardan. Una solicitud solo se confirma cuando el servicio receptor acusa recibo.'],
      ['Uso previsto de los datos', 'Los datos se usarán para responder tu consulta, comprender necesidades operativas y coordinar una demostración del producto. No se prevé su uso para publicidad ajena a estos fines.'],
      ['Proveedores y datos técnicos', 'El proveedor de alojamiento puede procesar información técnica, como direcciones de red y registros de solicitudes, para servir y proteger el sitio. Esta versión no incorpora herramientas de analítica, rastreadores publicitarios ni cookies no esenciales.', 'La vista previa de colores guarda únicamente la paleta y el estilo elegidos en el almacenamiento de sesión de este navegador. Esa preferencia no se envía a CrossDock y puede eliminarse al cerrar la sesión del navegador.', 'Antes de empezar la recopilación, este aviso debe identificar al servicio receptor, los proveedores relevantes, los lugares de tratamiento y las condiciones aplicables a transferencias internacionales.'],
      ['Conservación y tus opciones', 'Antes de recopilar solicitudes, CrossDock AI debe definir y publicar un plazo de conservación adecuado y un canal de contacto verificado para solicitudes de acceso, corrección, eliminación y otros derechos aplicables.'],
      ['Información por completar antes de habilitar este formulario', 'Se deben confirmar la razón social y dirección del responsable, el contacto de privacidad, la jurisdicción aplicable, la base jurídica cuando corresponda, las reglas de conservación, los proveedores y los derechos disponibles. Este borrador no declara cumplimiento de una ley de privacidad específica.'],
    ],
    contact: 'Contacto y cambios', contactStart: 'Si te interesa CrossDock AI, visita la ', contactLink: 'sección de contacto', contactEnd: '. Antes de empezar la recopilación se añadirá un contacto específico de privacidad. Las actualizaciones de este aviso aparecerán en esta página.',
  },
};

export function PrivacyContent({ locale }: { locale: Locale }) {
  const c = content[locale];
  return <><Header locale={locale} /><main id="main" className="container privacy-page"><a href={homePath(locale)} className="text-link">← {c.back}</a><p className="section-label mono">{c.label}</p><h1>{c.title}</h1><div className="privacy-draft">{c.draft}</div>{c.sections.map(([title,...paragraphs]) => <section key={title}><h2>{title}</h2>{paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}<section><h2>{c.contact}</h2><p>{c.contactStart}<a href={`${homePath(locale)}demo/`}>{c.contactLink}</a>{c.contactEnd}</p></section></main><Footer locale={locale} /></>;
}
