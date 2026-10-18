export const palettes = [
  {
    id: 'yellow', name: 'Yellow / Routing', shortName: 'Amarillo',
    accent: '#F4D83A', accentInk: '#191B1A', ink: '#191B1A', paper: '#F8F7F2',
    label: 'Nueva exploración', contrast: '12.14:1',
    thesis: 'Una señal clara entre sistemas, personas y acciones.',
    reason: 'Amarillo y carbón para conectar con tus marcas existentes y explorar una identidad tecnológica con más carácter.',
    tradeoff: 'El amarillo necesita una aplicación contenida y texto oscuro. La composición evita que se convierta en un lenguaje de transporte tradicional.',
  },
  {
    id: 'cobalt', name: 'Cobalt / Precision', shortName: 'Cobalto',
    accent: '#315CFD', accentInk: '#FFFFFF', ink: '#171B24', paper: '#F8F9FC',
    label: 'Mi recomendación', contrast: '5.15:1',
    thesis: 'Infraestructura tecnológica, información precisa y acciones claras.',
    reason: 'Es la dirección que mejor equilibra la ambición de IA con una presentación sobria para clientes empresariales.',
    tradeoff: 'El azul es frecuente en software B2B. La tipografía y nuestro lenguaje de flujos deben construir la diferencia.',
  },
  {
    id: 'petrol', name: 'Petrol / Infrastructure', shortName: 'Petróleo',
    accent: '#007F78', accentInk: '#FFFFFF', ink: '#172321', paper: '#F7FAF9',
    label: 'Más sobrio', contrast: '4.88:1',
    thesis: 'Coordinación operativa, continuidad y una infraestructura discreta.',
    reason: 'Un verde petróleo profundo conecta bien con una marca que quiere trabajar dentro de operaciones complejas.',
    tradeoff: 'Puede acercarse a fintech o sostenibilidad. El contenido debe mantener el foco en tecnología logística.',
  },
  {
    id: 'lime', name: 'Lime / Intelligence in motion', shortName: 'Lima',
    accent: '#C5EE9C', accentInk: '#13201B', ink: '#1F1F1F', paper: '#F9F9F9',
    label: 'La dirección actual', contrast: '12.87:1',
    thesis: 'Movimiento, agentes activos y una personalidad de startup más marcada.',
    reason: 'Conserva la propuesta inicial y concentra la energía visual en los nodos y las acciones, sobre una base monocromática.',
    tradeoff: 'Su tono claro exige texto oscuro. Conviene reservarlo para puntos de atención, no para grandes superficies.',
  },
  {
    id: 'orange', name: 'Signal / Operational energy', shortName: 'Naranja señal',
    accent: '#E97435', accentInk: '#171B19', ink: '#241D19', paper: '#FCF9F6',
    label: 'Más operativo', contrast: '5.81:1',
    thesis: 'Siguientes pasos, movimiento y atención a lo que necesita una acción.',
    reason: 'Es una dirección más expresiva para hablar de trabajo y coordinación en el mundo físico.',
    tradeoff: 'Tiene más cercanía visual con la logística tradicional y con otros referentes del sector. Usarlo con moderación.',
  },
] as const;

export type PaletteId = typeof palettes[number]['id'];
export const defaultPalette: PaletteId = 'lime';
export const designDirections = ['classic', 'kinetic'] as const;
export type DesignDirection = typeof designDirections[number];

// Only allow our reviewed tokens; never interpolate arbitrary query values into CSS.
export const paletteBootstrap = `(()=>{const q=new URLSearchParams(location.search);const allowed=${JSON.stringify(palettes.map(p => p.id))};let p=q.get('palette'),d=q.get('direction');try{if(!allowed.includes(p))p=sessionStorage.getItem('crossdock-palette');if(!['classic','kinetic'].includes(d))d=sessionStorage.getItem('crossdock-direction')}catch{}if(!allowed.includes(p))p='${defaultPalette}';if(!['classic','kinetic'].includes(d))d='classic';document.documentElement.dataset.palette=p;document.documentElement.dataset.direction=d;try{sessionStorage.setItem('crossdock-palette',p);sessionStorage.setItem('crossdock-direction',d)}catch{}})()`;
