'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { siteConfig } from '@/lib/config';
import { demoInterests, sendDemoRequest, type DemoInterest } from '@/lib/demo-request';
import { Arrow } from './icons';

const copy = {
  en: {
    form: 'Book a demo',
    firstName: 'First name', firstNamePlaceholder: 'First name',
    lastName: 'Last name', lastNamePlaceholder: 'Last name',
    email: 'Work email', emailPlaceholder: 'you@company.com',
    company: 'Company', companyPlaceholder: 'Company name',
    phone: 'Phone number', phonePlaceholder: '+1 555 123 4567',
    interest: 'What would you like to improve?', interestPlaceholder: 'Select your main interest',
    interests: { tracking: 'Shipment tracking and visibility', exceptions: 'Exception management', documents: 'Documents and operational handoffs', other: 'Explore my operation with your team' },
    message: 'Tell us about your operation', optional: '(optional)', messagePlaceholder: 'Share a workflow or challenge you would like to discuss.',
    website: 'Website', availability: 'Local preview: form delivery is not connected yet.',
    sending: 'Sending…', submit: 'Book a demo',
    consent: 'By submitting, you ask us to contact you to arrange a CrossDock AI demo. Read our', privacy: 'Privacy Policy',
    firstNameRequired: 'Please enter your first name.', lastNameRequired: 'Please enter your last name.',
    emailRequired: 'Please enter your work email.', emailInvalid: 'Please enter a valid email address.',
    companyRequired: 'Please enter your company name.', interestRequired: 'Please select your main interest.',
    unavailable: 'Form delivery is not connected in this local preview. Your details have not been sent or saved.',
    blocked: 'We couldn’t submit this request. Please try again.', pending: 'Sending your demo request…',
    success: 'Demo request received. Our team will contact you to arrange a time.',
    error: 'We couldn’t confirm receipt. Your details are still here. Please try again in a moment.',
  },
  es: {
    form: 'Agendar una demo',
    firstName: 'Nombre', firstNamePlaceholder: 'Tu nombre',
    lastName: 'Apellido', lastNamePlaceholder: 'Tu apellido',
    email: 'Correo de trabajo', emailPlaceholder: 'tu@empresa.com',
    company: 'Empresa', companyPlaceholder: 'Nombre de tu empresa',
    phone: 'Teléfono', phonePlaceholder: '+57 300 123 4567',
    interest: '¿Qué te gustaría mejorar?', interestPlaceholder: 'Selecciona tu principal interés',
    interests: { tracking: 'Seguimiento y visibilidad de envíos', exceptions: 'Gestión de excepciones', documents: 'Documentos y coordinación operativa', other: 'Explorar mi operación con su equipo' },
    message: 'Cuéntanos sobre tu operación', optional: '(opcional)', messagePlaceholder: 'Comparte un flujo de trabajo o reto que te gustaría conversar.',
    website: 'Sitio web', availability: 'Vista previa local: el envío del formulario todavía no está conectado.',
    sending: 'Enviando…', submit: 'Agendar una demo',
    consent: 'Al enviar, solicitas que te contactemos para coordinar una demo de CrossDock AI. Consulta nuestra', privacy: 'Política de privacidad',
    firstNameRequired: 'Ingresa tu nombre.', lastNameRequired: 'Ingresa tu apellido.',
    emailRequired: 'Ingresa tu correo de trabajo.', emailInvalid: 'Ingresa una dirección de correo válida.',
    companyRequired: 'Ingresa el nombre de tu empresa.', interestRequired: 'Selecciona tu principal interés.',
    unavailable: 'El envío no está conectado en esta vista previa local. No se enviaron ni guardaron tus datos.',
    blocked: 'No pudimos enviar la solicitud. Inténtalo de nuevo.', pending: 'Enviando tu solicitud de demo…',
    success: 'Solicitud de demo recibida. Nuestro equipo te contactará para coordinar el horario.',
    error: 'No pudimos confirmar la recepción. Tus datos siguen en el formulario. Inténtalo de nuevo en un momento.',
  },
};

type MessageKey = 'firstNameRequired' | 'lastNameRequired' | 'emailRequired' | 'emailInvalid' | 'companyRequired' | 'interestRequired' | 'unavailable' | 'blocked' | 'pending' | 'success' | 'error';
type RequiredField = 'firstName' | 'lastName' | 'email' | 'company' | 'interest';

export function LeadForm({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const text = copy[locale];
  const home = locale === 'es' ? '/es/' : '/';
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  const [state, setState] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [messageKey, setMessageKey] = useState<MessageKey | ''>('');
  const [invalidField, setInvalidField] = useState<RequiredField | null>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'pending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const requiredFields: [RequiredField, MessageKey][] = [
      ['firstName', 'firstNameRequired'], ['lastName', 'lastNameRequired'],
      ['email', 'emailRequired'], ['company', 'companyRequired'], ['interest', 'interestRequired'],
    ];
    for (const [name, error] of requiredFields) {
      if (!String(data.get(name) ?? '').trim()) {
        setState('error'); setMessageKey(error); setInvalidField(name);
        (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null)?.focus();
        return;
      }
    }
    if ((form.elements.namedItem('email') as HTMLInputElement).validity.typeMismatch) {
      setState('error'); setMessageKey('emailInvalid'); setInvalidField('email');
      (form.elements.namedItem('email') as HTMLInputElement).focus();
      return;
    }
    const interest = String(data.get('interest') ?? '');
    if (!demoInterests.includes(interest as DemoInterest)) {
      setState('error'); setMessageKey('interestRequired'); setInvalidField('interest');
      (form.elements.namedItem('interest') as HTMLSelectElement).focus();
      return;
    }
    setInvalidField(null);
    if (!siteConfig.leadEndpoint) {
      setState('error'); setMessageKey('unavailable'); statusRef.current?.focus();
      return;
    }
    if (data.get('website')) {
      setState('error'); setMessageKey('blocked'); statusRef.current?.focus();
      return;
    }
    setState('pending'); setMessageKey('pending');
    try {
      await sendDemoRequest(siteConfig.leadEndpoint, {
        firstName: String(data.get('firstName') ?? '').trim(),
        lastName: String(data.get('lastName') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        company: String(data.get('company') ?? '').trim(),
        phone: String(data.get('phone') ?? '').trim(),
        interest: interest as DemoInterest,
        message: String(data.get('message') ?? '').trim(),
        locale,
      });
      setState('success'); setMessageKey('success'); form.reset();
    } catch {
      setState('error'); setMessageKey('error');
    }
    statusRef.current?.focus();
  }

  function fieldFeedback(name: RequiredField) {
    return {
      'aria-invalid': invalidField === name || undefined,
      'aria-describedby': invalidField === name ? 'lead-form-status' : undefined,
    };
  }

  return <form method="post" noValidate onSubmit={submit} className="lead-form" aria-label={text.form} aria-busy={state === 'pending'}>
    <fieldset disabled={!ready || state === 'pending'}>
      <div className="form-row">
        <div className="field"><label htmlFor="firstName">{text.firstName}</label><input id="firstName" name="firstName" autoComplete="given-name" required maxLength={100} placeholder={text.firstNamePlaceholder} {...fieldFeedback('firstName')} /></div>
        <div className="field"><label htmlFor="lastName">{text.lastName}</label><input id="lastName" name="lastName" autoComplete="family-name" required maxLength={100} placeholder={text.lastNamePlaceholder} {...fieldFeedback('lastName')} /></div>
      </div>
      <div className="field"><label htmlFor="email">{text.email}</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder={text.emailPlaceholder} {...fieldFeedback('email')} /></div>
      <div className="form-row">
        <div className="field"><label htmlFor="company">{text.company}</label><input id="company" name="company" autoComplete="organization" required maxLength={150} placeholder={text.companyPlaceholder} {...fieldFeedback('company')} /></div>
        <div className="field"><label htmlFor="phone">{text.phone} <span>{text.optional}</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={50} placeholder={text.phonePlaceholder} /></div>
      </div>
      <div className="field"><label htmlFor="interest">{text.interest}</label><select id="interest" name="interest" required defaultValue="" {...fieldFeedback('interest')}><option value="" disabled>{text.interestPlaceholder}</option>{demoInterests.map(interest => <option key={interest} value={interest}>{text.interests[interest]}</option>)}</select></div>
      <div className="field"><label htmlFor="message">{text.message} <span>{text.optional}</span></label><textarea id="message" name="message" rows={3} maxLength={2000} placeholder={text.messagePlaceholder} /></div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">{text.website}</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      {!siteConfig.leadEndpoint && <p className="form-availability">{text.availability}</p>}
      <button className="button button-accent" type="submit" disabled={state === 'pending'}>{state === 'pending' ? text.sending : text.submit}<Arrow /></button>
    </fieldset>
    <p id="lead-form-status" className={`form-status ${state}`} role="status" aria-live="polite" tabIndex={-1} ref={statusRef}>{messageKey ? text[messageKey] : ''}</p>
    <p className="form-privacy">{text.consent} <a href={`${home}privacy/`}>{text.privacy}</a>.</p>
  </form>;
}
