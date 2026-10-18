import type { Metadata } from 'next';
import { Arrow, Mark } from '@/components/icons';
import { PaletteExplorer } from '@/components/palette-explorer';

export const metadata: Metadata = {
  title: 'CrossDock AI — Exploración de color',
  description: 'Cinco paletas y dos estilos para revisar la identidad de CrossDock AI, con una nueva propuesta amarilla.',
  alternates: { canonical: '/brand/' },
  robots: { index: false, follow: false },
};

export default function Brand() {
  return <main id="main" className="brand-lab">
    <header className="brand-lab-header container"><a href="/es/" className="wordmark"><Mark />cross-dock.ai</a><div className="brand-header-actions"><a href="/review/CrossDock-review.html" download="CrossDock-review.html" className="text-link">Descargar para socios <Arrow /></a><a href="/es/" className="text-link">Volver al sitio <Arrow /></a></div></header>
    <div className="container brand-lab-content"><div className="brand-lab-intro"><p className="mono">EXPLORACIÓN DE MARCA / COLORES PROVISIONALES</p><h1>Una marca<br />en movimiento.</h1><p>Cinco paletas. Dos direcciones visuales. Una nueva propuesta amarilla que conecta con tus marcas y lleva la idea de coordinación a una composición con más profundidad.</p></div>
    <div className="brand-recommendation"><span className="mono">NUEVA DIRECCIÓN</span><p><strong>Amarillo + carbón, con capas y rutas.</strong> Un lenguaje gráfico propio para expresar movimiento entre sistemas, sin convertir la marca en una transportadora tradicional. El amarillo exacto sigue abierto a los colores de tus marcas.</p></div>
    <PaletteExplorer />
    <section className="partner-review-note"><div><span className="mono">PARA REVISAR EN EQUIPO</span><h2>Mismo criterio.<br />Opiniones más útiles.</h2></div><div><p>Pide a cada socio que elija una paleta y un estilo, y que diga qué conservaría y qué cambiaría. El archivo de revisión incluye los dos idiomas y las opciones de esta página.</p><a href="/review/CrossDock-review.html" download="CrossDock-review.html" className="button">Descargar revisión para compartir <Arrow /></a><p className="review-download-hint">Descargar, enviar y abrir en un navegador de escritorio. No necesita servidor ni instalación. La elección se comparte pegando la opinión en su grupo.</p></div></section>
    <footer className="brand-lab-footer"><p>Todos los tonos y estilos son propuestas. Las vistas completas mantienen la elección al cambiar de idioma durante esta sesión.</p><p>Contraste calculado para cada combinación de texto y acento; referencia de <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" target="_blank" rel="noopener noreferrer">WCAG 2.2</a>. Las asociaciones de marca son una recomendación de diseño, no una garantía de percepción o conversión.</p></footer>
    </div>
  </main>;
}
