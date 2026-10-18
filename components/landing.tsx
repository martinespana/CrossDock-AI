import type { ReactNode } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Arrow, Icon, Mark } from '@/components/icons';
import { OperationsVisual } from '@/components/operations-visual';
import { demoPath } from '@/lib/i18n';

type Locale = 'en' | 'es';
type DemoType = 'tracking' | 'exception' | 'document';

const content = {
  en: {
    heroEyebrow: 'INTELLIGENCE IN MOTION',
    heroDescription: 'AI agents that coordinate the work between your teams, systems, and partners.',
    bookDemo: 'Book a demo',
    explore: 'Explore How It Works',
    heroFineprint: 'Logistics expertise. Applied intelligence. Global perspective.',
    foundation: ['Built around your operation.', 'Not another system to replace it.'],
    team: 'YOUR TEAM',
    foundationNote: ['A new layer of intelligence.', 'The tools you already trust.'],
    problemLabel: 'THE WORK BETWEEN THE SYSTEMS',
    problemHeading: ['Freight moves.', 'The coordination never stops.'],
    problemIntro: ['A shipment moves through systems.', 'The work still falls between them.'],
    problems: [
      { num: '01', icon: 'message', title: 'Updates scattered everywhere.', body: 'A status in an email. A location in a message. Your team has to connect the dots.' },
      { num: '02', icon: 'alert', title: 'Exceptions that keep coming.', body: 'A missed pickup. A missing document. Every issue starts another chain of calls and follow-ups.' },
      { num: '03', icon: 'file', title: 'The same information. Again.', body: 'Shipment details get copied, documents get checked, and records get reconciled by hand.' },
    ],
    approachLabel: 'ONE OPERATIONAL LAYER',
    approachHeading: ['Your systems.', 'Working as one.'],
    approachIntro: ['Designed to connect the tools you use,', 'understand the context, and move work forward.'],
    mapDescription: 'Email, WhatsApp, GPS, TMS and ERP connect to CrossDock AI agents, which help prepare updates, follow-ups, documents and next steps. People review decisions where needed.',
    informationIn: 'INFORMATION IN',
    email: 'Email',
    humanJudgment: 'AI AGENTS + HUMAN JUDGMENT',
    actions: 'OPERATIONAL ACTIONS',
    outputs: ['Updates', 'Follow-ups', 'Documents', 'Next steps'],
    steps: [
      { number: '01', title: 'Connect', description: 'Bring information together from the tools and channels your teams already use.' },
      { number: '02', title: 'Orchestrate', description: 'Interpret context, identify priorities, and determine what needs attention next.' },
      { number: '03', title: 'Execute', description: 'Help carry out routine tasks and coordinate actions, with human review where needed.' },
    ],
    approachCaption: 'Workflows configured around your tools, processes, and operational priorities.',
    useCasesLabel: 'BUILT FOR YOUR OPERATION',
    useCasesHeading: ['Less chasing.', 'More moving.'],
    useCasesIntro: ['Three workflows that keep your operation moving.', 'Built around the work that slows teams down.'],
    cases: [
      { type: 'tracking' as const, title: 'Track & Trace', description: 'Gather shipment updates and keep the right people informed, with less manual follow-up.', number: '01' },
      { type: 'exception' as const, title: 'Exception Management', description: 'Surface operational issues, bring context together, and coordinate the next steps.', number: '02' },
      { type: 'document' as const, title: 'Documentation & Workflows', description: 'Turn shipment documents into organized information and clearer administrative processes.', number: '03' },
    ],
    applicationArea: 'OPERATIONAL WORKFLOW',
    casesCaption: 'Illustrative workflows with sample data. Your demo focuses on your operation.',
    operatorsLabel: 'BUILT FROM THE INSIDE',
    operatorsHeading: ['Logistics', 'experience.', 'Operational', 'intelligence.'],
    operatorsTitle: ['Built by logistics operators,', 'for logistics operators.'],
    operatorsStory: 'Our founders have run freight transportation and e-commerce fulfillment businesses in Colombia. We know the missing updates, document handoffs, and daily exceptions firsthand.',
    operatorsStoryEnd: 'That operational experience is at the core of CrossDock AI: technology grounded in the work your team does every day.',
    operatorTags: ['FREIGHT TRANSPORTATION', 'E-COMMERCE FULFILLMENT'],
    operatorOrigin: 'OPERATIONAL ROOTS IN COLOMBIA. A GLOBAL PERSPECTIVE.',
    ctaLabel: 'SEE CROSSDOCK AI IN ACTION',
    ctaHeading: ['CrossDock AI.', 'In your', 'operation.'],
    ctaDescription: 'Book a demo tailored to your workflows. See how CrossDock AI connects information and coordinates the work across your operation.',
    demoNote: ['A demo focused on your workflows', 'and your team’s priorities.'],
    demoPreviewHeading: 'See what changes in your day-to-day operation.',
    demoPreviewItems: ['Shipment updates, connected.', 'Exceptions, with the right context.', 'Documents that move work forward.'],
    demoNextStep: 'Tell us about your team. We’ll coordinate a personalized walkthrough.',
  },
  es: {
    heroEyebrow: 'INTELIGENCIA EN MOVIMIENTO',
    heroDescription: 'Agentes de IA que coordinan el trabajo entre tus equipos, sistemas y aliados.',
    bookDemo: 'Agendar una demo',
    explore: 'Descubre cómo funciona',
    heroFineprint: 'Experiencia logística. Inteligencia aplicada. Visión global.',
    foundation: ['Diseñado alrededor de tu operación.', 'Sin reemplazar tus sistemas.'],
    team: 'TU EQUIPO',
    foundationNote: ['Una nueva capa de inteligencia.', 'Las herramientas en las que ya confías.'],
    problemLabel: 'EL TRABAJO ENTRE LOS SISTEMAS',
    problemHeading: ['La carga se mueve.', 'La coordinación no se detiene.'],
    problemIntro: ['Un envío pasa por varios sistemas.', 'El trabajo sigue quedando entre ellos.'],
    problems: [
      { num: '01', icon: 'message', title: 'Novedades por todos lados.', body: 'Un estado en un correo. Una ubicación en un mensaje. Tu equipo tiene que conectar la información.' },
      { num: '02', icon: 'alert', title: 'Novedades que no dan espera.', body: 'Una recogida que no se realizó. Un documento que falta. Cada imprevisto abre otra cadena de llamadas y seguimientos.' },
      { num: '03', icon: 'file', title: 'La misma información. Otra vez.', body: 'Los datos del envío se copian, los documentos se revisan y los registros se concilian a mano.' },
    ],
    approachLabel: 'UNA SOLA CAPA OPERATIVA',
    approachHeading: ['Tus sistemas.', 'Trabajando como uno.'],
    approachIntro: ['Diseñado para conectar tus herramientas,', 'entender el contexto y hacer avanzar el trabajo.'],
    mapDescription: 'El correo, WhatsApp, GPS, TMS y ERP se conectan con los agentes de CrossDock AI, que ayudan a preparar actualizaciones, seguimientos, documentos y próximos pasos. Las personas revisan las decisiones cuando hace falta.',
    informationIn: 'ENTRADA DE INFORMACIÓN',
    email: 'Correo',
    humanJudgment: 'AGENTES DE IA + CRITERIO HUMANO',
    actions: 'ACCIONES OPERATIVAS',
    outputs: ['Actualizaciones', 'Seguimientos', 'Documentos', 'Próximos pasos'],
    steps: [
      { number: '01', title: 'Conectar', description: 'Reunir la información de las herramientas y los canales que tus equipos ya utilizan.' },
      { number: '02', title: 'Orquestar', description: 'Interpretar el contexto, identificar prioridades y determinar qué necesita atención.' },
      { number: '03', title: 'Ejecutar', description: 'Ayudar a realizar tareas rutinarias y coordinar acciones, con revisión humana cuando se necesite.' },
    ],
    approachCaption: 'Flujos configurados alrededor de tus herramientas, procesos y prioridades operativas.',
    useCasesLabel: 'PARA TU OPERACIÓN',
    useCasesHeading: ['Menos coordinación manual.', 'Más movimiento.'],
    useCasesIntro: ['Tres flujos que mantienen tu operación en movimiento.', 'Enfocados en el trabajo que frena a los equipos.'],
    cases: [
      { type: 'tracking' as const, title: 'Seguimiento de envíos', description: 'Reunir las actualizaciones de cada envío y mantener informadas a las personas indicadas, con menos seguimiento manual.', number: '01' },
      { type: 'exception' as const, title: 'Gestión de novedades', description: 'Detectar imprevistos operativos, reunir el contexto y coordinar los próximos pasos.', number: '02' },
      { type: 'document' as const, title: 'Documentación y procesos', description: 'Convertir los documentos de los envíos en información organizada y procesos administrativos más claros.', number: '03' },
    ],
    applicationArea: 'FLUJO OPERATIVO',
    casesCaption: 'Flujos ilustrativos con datos de ejemplo. Tu demo se enfoca en tu operación.',
    operatorsLabel: 'NACE DE LA OPERACIÓN',
    operatorsHeading: ['Experiencia', 'logística.', 'Inteligencia', 'operativa.'],
    operatorsTitle: ['Creado por operadores logísticos,', 'para operadores logísticos.'],
    operatorsStory: 'Nuestros fundadores han dirigido empresas de transporte de carga y de preparación y despacho de pedidos de comercio electrónico en Colombia. Conocemos de primera mano las actualizaciones que no llegan, el intercambio de documentos y los imprevistos del día a día.',
    operatorsStoryEnd: 'Esa experiencia operativa está en el centro de CrossDock AI: tecnología conectada con el trabajo que tu equipo realiza cada día.',
    operatorTags: ['TRANSPORTE DE CARGA', 'LOGÍSTICA DE E-COMMERCE'],
    operatorOrigin: 'RAÍCES OPERATIVAS EN COLOMBIA. VISIÓN GLOBAL.',
    ctaLabel: 'CONOCE CROSSDOCK AI EN ACCIÓN',
    ctaHeading: ['CrossDock AI.', 'En tu', 'operación.'],
    ctaDescription: 'Agenda una demo enfocada en tus procesos. Conoce cómo CrossDock AI conecta la información y coordina el trabajo de tu operación.',
    demoNote: ['Una demo enfocada en tus procesos', 'y las prioridades de tu equipo.'],
    demoPreviewHeading: 'Conoce qué cambia en tu día a día.',
    demoPreviewItems: ['Actualizaciones de envíos, conectadas.', 'Novedades con el contexto adecuado.', 'Documentos que hacen avanzar el trabajo.'],
    demoNextStep: 'Cuéntanos sobre tu equipo. Coordinaremos una demostración personalizada.',
  },
};

const demoContent = {
  en: {
    trackingLabel: 'Illustrative shipment update workflow',
    shipment: 'SHIPMENT / SAMPLE 024',
    pickup: 'PICKUP',
    transit: 'IN TRANSIT',
    delivery: 'DELIVERY',
    updateReceived: 'Location update received',
    customerUpdate: 'Customer update prepared for review',
    exceptionLabel: 'Illustrative exception coordination workflow',
    exception: 'EXCEPTION / SAMPLE 012',
    timingChanged: 'Pickup timing changed',
    scheduleContext: 'Schedule context needs a review',
    reviewTag: 'REVIEW',
    affectedParties: 'Affected parties identified',
    nextStep: 'Next step ready for review',
    documentLabel: 'Illustrative delivery document workflow',
    document: 'DOCUMENT / SAMPLE POD',
    proofOfDelivery: 'PROOF OF DELIVERY',
    received: 'Received',
    organizedRecord: 'ORGANIZED RECORD',
    shipmentId: 'Shipment ID',
    documentField: 'Document',
    nextStepField: 'Next step',
    review: 'Review',
    prepared: 'Information prepared for review',
  },
  es: {
    trackingLabel: 'Ejemplo de flujo de actualización de un envío',
    shipment: 'ENVÍO / EJEMPLO 024',
    pickup: 'RECOGIDA',
    transit: 'EN TRÁNSITO',
    delivery: 'ENTREGA',
    updateReceived: 'Ubicación actualizada',
    customerUpdate: 'Aviso al cliente listo para revisión',
    exceptionLabel: 'Ejemplo de flujo de coordinación de una novedad',
    exception: 'NOVEDAD / EJEMPLO 012',
    timingChanged: 'Cambio en la hora de recogida',
    scheduleContext: 'El horario requiere una revisión',
    reviewTag: 'REVISAR',
    affectedParties: 'Partes involucradas identificadas',
    nextStep: 'Próximo paso listo para revisión',
    documentLabel: 'Ejemplo de flujo de documentación de una entrega',
    document: 'DOCUMENTO / EJEMPLO POD',
    proofOfDelivery: 'COMPROBANTE DE ENTREGA',
    received: 'Recibido',
    organizedRecord: 'REGISTRO ORGANIZADO',
    shipmentId: 'ID del envío',
    documentField: 'Documento',
    nextStepField: 'Próximo paso',
    review: 'Revisar',
    prepared: 'Información lista para revisión',
  },
};

function SectionLabel({ number, children, light = false }: { number: string; children: ReactNode; light?: boolean }) {
  return <p className={`section-label mono ${light ? 'label-light' : ''}`}><span>{number}</span>{children}</p>;
}

function MiniDemo({ type, locale }: { type: DemoType; locale: Locale }) {
  const text = demoContent[locale];

  if (type === 'tracking') {
    return (
      <div className="mini-demo tracking-demo" aria-label={text.trackingLabel}>
        <div className="mini-top mono"><span>{text.shipment}</span><span className="demo-dot" /></div>
        <div className="tracking-route"><span className="route-stop" /><span className="route-line" /><span className="route-truck"><Icon name="location" /></span><span className="route-line route-line-dashed" /><span className="route-stop hollow" /></div>
        <div className="route-labels mono"><span>{text.pickup}</span><span>{text.transit}</span><span>{text.delivery}</span></div>
        <div className="mini-note"><Icon name="message" /><div><strong>{text.updateReceived}</strong><span>{text.customerUpdate}</span></div><Icon name="check" /></div>
      </div>
    );
  }

  if (type === 'exception') {
    return (
      <div className="mini-demo exception-demo" aria-label={text.exceptionLabel}>
        <div className="mini-top mono"><span>{text.exception}</span><span className="demo-dot" /></div>
        <div className="exception-item"><span className="exception-icon"><Icon name="clock" /></span><div><strong>{text.timingChanged}</strong><span>{text.scheduleContext}</span></div><span className="tiny-tag mono">{text.reviewTag}</span></div>
        <div className="exception-branch" aria-hidden="true" />
        <div className="exception-next"><Icon name="check" /><span>{text.affectedParties}</span></div>
        <div className="exception-next"><Arrow /><span>{text.nextStep}</span></div>
      </div>
    );
  }

  return (
    <div className="mini-demo document-demo" aria-label={text.documentLabel}>
      <div className="mini-top mono"><span>{text.document}</span><span className="demo-dot" /></div>
      <div className="doc-process"><div className="paper"><Icon name="file" /><span>{text.proofOfDelivery}</span><i /><i /><i /><span className="signature">{text.received}</span></div><Arrow /><div className="extracted"><span className="mono">{text.organizedRecord}</span><div>{text.shipmentId}<b>CD–024</b></div><div>{text.documentField}<b>POD</b></div><div>{text.nextStepField}<b>{text.review}</b></div></div></div>
      <div className="document-bottom"><Icon name="check" />{text.prepared}</div>
    </div>
  );
}

export function Landing({ locale }: { locale: Locale }) {
  const text = content[locale];

  return (
    <>
      <Header locale={locale} />
      <main id="main" lang={locale}>
        <section className="hero container" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <div className="hero-eyebrow mono"><span />{text.heroEyebrow}</div>
            <h1 id="hero-heading" className={locale === 'es' ? 'hero-heading-es' : undefined}>
              {locale === 'es' ? <>La capa de IA<br />para tu operación<br />logística</> : <>The AI<br />operations layer<br />for logistics</>}<span className="accent-period">.</span>
            </h1>
            <p className="hero-description">{text.heroDescription}</p>
            <div className="hero-actions"><a className="button" href={demoPath(locale)}>{text.bookDemo}<Arrow /></a><a className="text-link" href="#approach">{text.explore}<Arrow /></a></div>
            <div className="hero-fineprint"><span className="status-dot" />{text.heroFineprint}</div>
          </div>
          <OperationsVisual locale={locale} />
        </section>

        <div className="foundation-strip"><div className="container foundation-inner"><p>{text.foundation[0]}<br /><strong>{text.foundation[1]}</strong></p><div className="system-list mono"><span>TMS</span><i>+</i><span>ERP</span><i>+</i><span>WMS</span><i>+</i><span>{text.team}</span></div><span className="foundation-note">{text.foundationNote[0]}<br />{text.foundationNote[1]}</span></div></div>

        <section className="problem-section section-pad container" aria-labelledby="problem-heading">
          <SectionLabel number="01">{text.problemLabel}</SectionLabel>
          <div className="section-heading-row"><h2 id="problem-heading">{text.problemHeading[0]}<br /><span className="muted-heading">{text.problemHeading[1]}</span></h2><p>{text.problemIntro[0]}<br />{text.problemIntro[1]}</p></div>
          <div className="problem-grid">{text.problems.map(problem => <article className="problem-block" key={problem.num}><div className="problem-block-top"><Icon name={problem.icon} /><span className="mono">/{problem.num}</span></div><h3>{problem.title}</h3><p>{problem.body}</p></article>)}</div>
        </section>

        <section className="approach-section section-pad" id="approach" aria-labelledby="approach-heading"><div className="container">
          <SectionLabel number="02">{text.approachLabel}</SectionLabel>
          <div className="section-heading-row"><h2 id="approach-heading">{text.approachHeading[0]}<br />{text.approachHeading[1]}</h2><p>{text.approachIntro[0]}<br />{text.approachIntro[1]}</p></div>
          <div className="approach-map" role="img" aria-label={text.mapDescription}>
            <div className="map-side"><span className="mono map-label">{text.informationIn}</span><div className="map-chips"><span>{text.email}</span><span>WhatsApp</span><span>GPS</span><span>TMS</span><span>ERP</span></div></div>
            <div className="map-line" aria-hidden="true"><Arrow /></div>
            <div className="map-core"><Mark /><strong>cross-dock.ai</strong><span className="mono">{text.humanJudgment}</span></div>
            <div className="map-line" aria-hidden="true"><Arrow /></div>
            <div className="map-side map-output"><span className="mono map-label">{text.actions}</span><div className="map-chips">{text.outputs.map(output => <span key={output}>{output}</span>)}</div></div>
          </div>
          <div className="approach-steps">{text.steps.map(step => <article key={step.number}><span className="mono">{step.number} /</span><h3>{step.title}<Arrow /></h3><p>{step.description}</p></article>)}</div>
          <p className="concept-caption">{text.approachCaption}</p>
        </div></section>

        <section className="use-cases-section section-pad container" id="use-cases" aria-labelledby="use-cases-heading">
          <SectionLabel number="03">{text.useCasesLabel}</SectionLabel>
          <div className="section-heading-row"><h2 id="use-cases-heading">{text.useCasesHeading[0]}<br />{text.useCasesHeading[1]}</h2><p>{text.useCasesIntro[0]}<br />{text.useCasesIntro[1]}</p></div>
          <div className="use-case-grid">{text.cases.map(useCase => <article className="use-case" key={useCase.type}><MiniDemo type={useCase.type} locale={locale} /><div className="use-case-copy"><span className="mono">{useCase.number} / {text.applicationArea}</span><h3>{useCase.title}</h3><p>{useCase.description}</p></div></article>)}</div>
          <p className="concept-caption">{text.casesCaption}</p>
        </section>

        <section className="operators-section" id="operators" aria-labelledby="operators-heading"><div className="container operators-inner">
          <div className="operators-copy"><SectionLabel number="04" light>{text.operatorsLabel}</SectionLabel><h2 id="operators-heading">{text.operatorsHeading[0]}<br />{text.operatorsHeading[1]}<br /><span>{text.operatorsHeading[2]}<br />{text.operatorsHeading[3]}</span></h2></div>
          <div className="operators-story"><div className="operator-glyph" aria-hidden="true"><div /><div /><div /><div /><Mark /></div><h3>{text.operatorsTitle[0]}<br />{text.operatorsTitle[1]}</h3><p>{text.operatorsStory}</p><p>{text.operatorsStoryEnd}</p><div className="operator-tags mono">{text.operatorTags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="operator-origin mono"><span />{text.operatorOrigin}</span></div>
        </div></section>

        <section className="cta-section section-pad container" id="demo" aria-labelledby="cta-heading"><div className="cta-copy"><SectionLabel number="05">{text.ctaLabel}</SectionLabel><h2 id="cta-heading">{text.ctaHeading[0]}<br />{text.ctaHeading[1]}<br />{text.ctaHeading[2]}</h2><p>{text.ctaDescription}</p><div className="demo-note"><span className="status-dot" /><span>{text.demoNote[0]}<br />{text.demoNote[1]}</span></div></div><div className="demo-invitation"><Mark /><h3>{text.demoPreviewHeading}</h3><ul>{text.demoPreviewItems.map(item=><li key={item}><Icon name="check" />{item}</li>)}</ul><a className="button button-accent" href={demoPath(locale)}>{text.bookDemo}<Arrow /></a><p>{text.demoNextStep}</p></div></section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
