'use client';
import { useState, type CSSProperties } from 'react';
import { palettes, type DesignDirection } from '@/lib/palettes';
import { Arrow, Mark } from './icons';

export function PaletteExplorer() {
  const [direction,setDirection] = useState<DesignDirection>('kinetic');
  return <>
    <div className="direction-picker"><div><span className="mono">DOS DIRECCIONES VISUALES</span><p>Compara la misma paleta con una composición editorial o con capas y rutas en movimiento.</p></div><div role="group" aria-label="Estilo para comparar"><button type="button" aria-pressed={direction==='classic'} onClick={()=>setDirection('classic')}>Editorial <span>La primera versión</span></button><button type="button" aria-pressed={direction==='kinetic'} onClick={()=>setDirection('kinetic')}>Routing <span>Más profundidad y movimiento</span></button></div></div>
    <div className="palette-grid">{palettes.map((p,i) => <article className="palette-card" key={p.id} data-featured={p.id==='yellow'} data-preview-direction={direction} style={{'--sample-accent':p.accent,'--sample-accent-ink':p.accentInk,'--sample-ink':p.ink,'--sample-paper':p.paper} as CSSProperties}>
      <div className="palette-card-title"><span className="mono">0{i+1} / {p.shortName.toUpperCase()}</span><span className={`palette-label ${p.id==='yellow'?'new-exploration':''}`}>{p.label}</span></div>
      <div className="palette-preview" aria-label={`Ejemplo visual de ${p.shortName}, estilo ${direction==='kinetic'?'Routing':'Editorial'}`}>
        <div className="palette-mini-nav"><span><Mark />cross-dock.ai</span><i /><i /><b /></div>
        <div className="palette-mini-body"><div><span className="mono">INTELLIGENCE IN MOTION</span><h2>The AI<br />operations layer<br />for logistics.</h2><div className="palette-mini-text" /><div className="palette-mini-text shorter" /><span className="palette-mini-cta">Book a demo <Arrow /></span></div><div className="palette-mini-flow"><div className="palette-mini-inputs"><i /><i /><i /></div><div className="palette-mini-wire" /><div className="palette-mini-agent"><Mark /><span>AI agents</span></div><div className="palette-mini-wire" /><div className="palette-mini-action"><i /><span>Operational action</span></div></div></div>
        <div className="palette-mini-footer"><span /><i /><i /><i /></div>
      </div>
      <div className="palette-details"><h2>{p.name}</h2><p className="palette-thesis">{p.thesis}</p><p>{p.reason}</p><div className="palette-swatches" aria-label="Colores de la paleta"><span><i style={{background:p.paper}} />{p.paper}</span><span><i style={{background:p.ink}} />{p.ink}</span><span><i style={{background:p.accent}} />{p.accent}</span></div><p className="palette-tradeoff">{p.tradeoff}</p><div className="palette-preview-links"><a className="palette-button" href={`/es/?palette=${p.id}&direction=${direction}`}>Ver en español <Arrow /></a><a href={`/?palette=${p.id}&direction=${direction}`} lang="en" className="text-link">Preview in English <Arrow /></a></div><p className="palette-contrast mono">TEXTO SOBRE ACENTO: {p.contrast} · {p.accentInk}</p></div>
    </article>)}</div>
  </>;
}
