'use client';
import { useState } from 'react';
import { Arrow, Icon, Mark } from './icons';

const copy = {
  en: {
    label: 'Illustrative workflow: existing tools connect through CrossDock AI agents to operational actions', flow: 'OPERATIONAL FLOW / 01', preview: 'Illustrative workflow', tools: 'YOUR EXISTING TOOLS', email: 'Email', layer: 'THE INTELLIGENCE LAYER', agents: 'CrossDock AI agents', example: 'EXAMPLE', choose: 'Choose illustrative workflow', show: 'Show example:', caption: 'Illustrative workflow with sample data. Your demo is tailored to your operation.',
    examples: [
      { name: 'Shipment update', icon: 'location', input: 'Location update received', context: 'Shipment context reviewed', action: 'Customer update prepared', detail: 'Keep the next person in the loop.' },
      { name: 'Exception', icon: 'alert', input: 'Pickup timing changed', context: 'Affected parties identified', action: 'Next step ready for review', detail: 'Bring the right context to a decision.' },
      { name: 'Document', icon: 'file', input: 'Delivery document received', context: 'Shipment details organized', action: 'Record prepared for review', detail: 'Move information into the next step.' },
    ],
  },
  es: {
    label: 'Flujo ilustrativo: las herramientas actuales se conectan con agentes de CrossDock AI para coordinar acciones operativas', flow: 'FLUJO OPERATIVO / 01', preview: 'Flujo ilustrativo', tools: 'TUS HERRAMIENTAS ACTUALES', email: 'Correo', layer: 'LA CAPA DE INTELIGENCIA', agents: 'Agentes de CrossDock AI', example: 'EJEMPLO', choose: 'Elegir un ejemplo de flujo', show: 'Mostrar ejemplo:', caption: 'Flujo ilustrativo con datos de ejemplo. Tu demo se adapta a tu operación.',
    examples: [
      { name: 'Actualización de envío', icon: 'location', input: 'Ubicación actualizada recibida', context: 'Contexto del envío revisado', action: 'Actualización al cliente preparada', detail: 'Mantén informada a la siguiente persona.' },
      { name: 'Excepción', icon: 'alert', input: 'Cambio en la hora de recogida', context: 'Partes afectadas identificadas', action: 'Siguiente paso listo para revisión', detail: 'Decide con el contexto adecuado.' },
      { name: 'Documento', icon: 'file', input: 'Documento de entrega recibido', context: 'Datos del envío organizados', action: 'Registro preparado para revisión', detail: 'Lleva la información al siguiente paso.' },
    ],
  },
};

export function OperationsVisual({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const [active, setActive] = useState(0);
  const text = copy[locale];
  const examples = text.examples;
  const current = examples[active];
  return <figure className="operations-visual" aria-label={text.label}>
    <div className="visual-topline"><span className="mono">{text.flow}</span><span className="concept-pill">{text.preview}</span></div>
    <div className="visual-grid" aria-hidden="true" />
    <div className="source-label mono">{text.tools}</div>
    <div className="sources">{[['mail',text.email],['message','WhatsApp'],['location','GPS'],['system','TMS'],['grid','ERP']].map(([icon,label]) => <div className="source" key={label}><Icon name={icon} /><span>{label}</span></div>)}</div>
    <div className="flow-connectors" aria-hidden="true"><svg viewBox="0 0 500 90" preserveAspectRatio="none"><path d="M45 0v24q0 12 12 12h181q12 0 12 12v42M148 0v24q0 12 12 12h78M250 0v90M352 0v24q0 12-12 12h-78M455 0v24q0 12-12 12H262" /></svg><span className="flow-dot" /></div>
    <div className="agent-node"><div className="agent-symbol"><Mark /></div><div><span className="mono">{text.layer}</span><strong>{text.agents}</strong></div><span className="agent-status" aria-hidden="true" /></div>
    <div className="node-line" aria-hidden="true"><Arrow /></div>
    <div className="action-window" aria-live="polite" aria-atomic="true">
      <div className="action-head"><Icon name={current.icon} /><span>{current.name}</span><span className="mono">{text.example}</span></div>
      <ol className="action-steps"><li><span className="step-marker"><Icon name="check" /></span>{current.input}</li><li><span className="step-marker"><Icon name="check" /></span>{current.context}</li><li><span className="step-marker step-marker-active"><Arrow /></span><strong>{current.action}</strong></li></ol>
    </div>
    <div className="visual-bottom"><span>{current.detail}</span><div className="scenario-controls" role="group" aria-label={text.choose}>{examples.map((e,i) => <button key={e.name} onClick={() => setActive(i)} aria-pressed={active===i} aria-label={`${text.show} ${e.name.toLowerCase()}`}>{String(i+1).padStart(2,'0')}</button>)}</div></div>
    <figcaption>{text.caption}</figcaption>
  </figure>;
}
