# CrossDock AI

Landing de `cross-dock.ai`, en inglés y español. Next.js, TypeScript y Tailwind CSS, con componentes reutilizables y exportación estática. El wordmark y el acento de marca son provisionales. El producto ya opera; el contenido destaca la experiencia logística del equipo y propone agendar una demo.

## Vista previa local

El código se guarda en [martinespana/CrossDock-AI](https://github.com/martinespana/CrossDock-AI). La web se revisa en local; el despliegue y la conexión del dominio se configuran por separado.

Con Node.js y pnpm 11.25.0 disponibles, abre una terminal en esta carpeta y ejecuta:

```sh
pnpm install
pnpm dev
```

Abre [http://127.0.0.1:3000](http://127.0.0.1:3000). El servidor escucha solamente en la computadora local. Para detenerlo, pulsa `Ctrl+C` en la terminal.

Comprobaciones de código y compilación:

```sh
pnpm typecheck
pnpm build
```

La compilación genera el sitio estático en `out/` y verifica las páginas y los recursos antes de considerarse correcta. La revisión para socios es un paso separado: después de compilar, ejecuta `pnpm run review`. El modo de desarrollo permite revisar cambios sin volver a compilar manualmente.

## Configuración pública

Copia `.env.example` a `.env.local` si necesitas modificar la configuración. Las variables con prefijo `NEXT_PUBLIC_` se incluyen en el código que descarga el navegador: no deben contener contraseñas, tokens privados ni claves de API. Reinicia el servidor de desarrollo después de cambiarlas y vuelve a compilar para cambiar una exportación estática.

- `NEXT_PUBLIC_SITE_URL`: origen utilizado para canonical, Open Graph, sitemap y robots. Valor previsto: `https://cross-dock.ai`. No publica el sitio ni conecta el dominio.
- `NEXT_PUBLIC_LEAD_ENDPOINT`: URL pública de Formspree o de un servicio propio que recibe solicitudes de demo. Vacía por defecto; esta vista local todavía no envía contactos.
- `NEXT_PUBLIC_LINKEDIN_URL`: URL HTTPS del perfil de LinkedIn confirmado. Vacía por defecto; el enlace solo se muestra si hay una dirección válida de `linkedin.com`.

## Solicitudes de demo por correo

Los botones «Agendar una demo» / «Book a demo» abren `/es/demo/` y `/demo/`. La página presenta una demostración personalizada, los flujos que se pueden explorar y un formulario comercial. Mantiene el idioma, la paleta y la dirección visual elegidos. El cliente completa nombre, apellido, correo de trabajo, empresa y flujo de interés; teléfono y mensaje son opcionales. El receptor guarda la solicitud y puede notificar al correo del equipo comercial. El formulario solicita una demo; no reserva un horario de calendario.

La conexión está preparada, pero todavía no hay una cuenta receptora vinculada a la web. El destinatario se configura y verifica de forma privada dentro de Formspree; escribirlo en el código de la web no activa las notificaciones. Sin endpoint, la vista local lo indica y no transmite ni guarda los campos.

### Opción sencilla: Formspree

1. Crear un formulario en la cuenta de Formspree de la empresa.
2. Configurar y verificar el correo que recibirá sus notificaciones.
3. Copiar el endpoint del formulario (con formato `https://formspree.io/f/ID_REAL`) a `NEXT_PUBLIC_LEAD_ENDPOINT` en `.env.local` o en las variables del alojamiento.
4. Volver a compilar. El receptor se incluye en la exportación estática al compilar.
5. Hacer una prueba autorizada y comprobar la solicitud en Formspree y en el buzón de destino.

Para esos endpoints, la web envía `FormData`, solicita respuesta JSON y acepta el `2xx` que confirma recepción según el contrato AJAX de Formspree. El asunto distingue las solicitudes de demo de CrossDock AI, y los datos incluyen el idioma del cliente. La confirmación de recepción no garantiza la entrega de la notificación al buzón: comprobar destinatario, spam y panel del servicio.

Documentación oficial: [formularios HTML](https://formspree.io/html/) y [envío AJAX](https://formspree.io/blog/formspree-ajax/).

### Alternativa: receptor propio

Un receptor propio debe aceptar un `POST` con `Content-Type: application/json` y este cuerpo:

```json
{
  "firstName": "Sample",
  "lastName": "Operator",
  "fullName": "Sample Operator",
  "email": "operator@example.com",
  "company": "Example Logistics",
  "phone": "",
  "interest": "tracking",
  "message": "An optional description of the operation.",
  "locale": "es",
  "source": "crossdock-demo"
}
```

Para un receptor propio, el navegador considera el envío confirmado únicamente cuando recibe un código HTTP `2xx` con un cuerpo JSON que contiene:

```json
{ "accepted": true }
```

Un `204` vacío, HTML o una respuesta sin `accepted: true` no se consideran confirmación. El servicio debe devolverla solo después de haber recibido el lead de forma duradera. La solicitud del navegador tiene un tiempo límite de 15 segundos; si la confirmación falla, conserva los campos para permitir otro intento. El receptor debe gestionar posibles reintentos sin crear contactos duplicados.

Si el receptor está en otro origen, debe responder correctamente al preflight CORS y permitir el origen de la web, `POST` y `Content-Type`. Para pruebas en local, el origen es `http://127.0.0.1:3000` salvo que se elija otro puerto.

La validación del navegador y el campo trampa antispam son ayudas de interfaz. El receptor debe validar longitudes y campos, limitar solicitudes y gestionar el almacenamiento y acceso a datos. Los valores de interés son `tracking`, `exceptions`, `documents` y `other`; las etiquetas se traducen en pantalla. Cualquier secreto pertenece al servidor receptor, nunca a una variable pública. El transporte está en `lib/demo-request.ts`; `scripts/check-demo-receiver.mjs` comprueba el contrato en memoria sin enviar contactos.

## Edición

- Contenido y estructura en ambos idiomas: `components/landing.tsx`.
- Documento e idioma HTML: `components/document-shell.tsx`; metadatos localizados: `lib/i18n.ts`; layouts por idioma en `app/(english)/` y `app/(spanish)/`.
- Diseño, tamaños responsive y acento provisional: `app/globals.css`. Cambia el token `--accent` para explorar otra dirección cromática; comprueba de nuevo legibilidad y contraste.
- Flujo conceptual interactivo: `components/operations-visual.tsx`.
- Formulario y estados: `components/lead-form.tsx`.
- Página dedicada de demo en ambos idiomas: `components/demo-page.tsx`; composición y formulario en `app/demo.css`.
- Datos de configuración: `lib/config.ts`.
- Borrador editable de privacidad en ambos idiomas: `components/privacy-content.tsx`.
- Paletas provisionales: `lib/palettes.ts` y tokens en `app/globals.css`.

Los diagramas muestran flujos ilustrativos con datos de ejemplo. Las demos se enfocan en la operación de cada cliente. El contenido presenta una compañía operativa con experiencia logística, sin inventar años de trayectoria, clientes, resultados ni certificaciones.

## Privacidad y pendientes de lanzamiento

La página `/privacy/` es un borrador explícito, excluido de indexación. Debe completarse y revisarse antes de habilitar la recepción de datos: responsable legal, contacto de privacidad, jurisdicción, plazos de conservación, proveedores, lugar de tratamiento y derechos aplicables.

Esta versión no incorpora analítica, publicidad ni almacenamiento de leads en el navegador. Un servicio de hosting o un receptor futuro puede generar sus propios registros técnicos; sus prácticas deben incluirse en la política final. No hay un perfil de LinkedIn confirmado ni se ha simulado uno.

## Publicación en Hostinger

El proyecto tiene `output: 'export'` y conserva la carpeta interna predeterminada de Next.js, `.next`. La exportación estática final se genera en `out/`; no necesita un proceso de servidor de aplicación. En Hostinger utiliza el repositorio de GitHub, rama `main`, raíz `./`, Node `22.x`, gestor `pnpm`, comando `pnpm run build` y directorio de salida `out`. Selecciona el preajuste `Other` / `Otro` para publicar los archivos estáticos sin aplicar una adaptación de Next.js para servidor. No se requiere archivo de entrada de servidor.

La compilación de publicación no genera el archivo offline de revisión para socios. Ese archivo se crea de forma opcional con `pnpm run review` después de compilar. No configures `distDir` ni `NEXT_BUILD_DIR` para cambiar la exportación. Si falta `out/index.html`, el verificador muestra únicamente el modo y la carpeta de los manifiestos de compilación, junto con los nombres de configuraciones encontrados, sin imprimir variables de entorno.

Configura las variables públicas antes de compilar. Mantén el endpoint vacío hasta que el servicio receptor y la política de privacidad estén listos. Después podrán conectarse el repositorio y el dominio `cross-dock.ai` como pasos separados. Esta documentación no realiza esas acciones.

## Revisión de aceptación

Antes de aprobar una versión, revisar:

1. Honestidad: los ejemplos se reconocen como ilustrativos y no hay métricas, clientes, testimonios, certificaciones ni integraciones inventadas.
2. Formulario: no anuncia éxito sin confirmación real del servicio; los errores preservan los campos y el estado es anunciado a tecnologías de asistencia.
3. Accesibilidad: navegación por teclado, foco visible, enlace para saltar al contenido, etiquetas de campos, menú móvil y contraste del acento.
4. Privacidad: sin endpoint durante esta preview; aviso de borrador visible y enlace de LinkedIn pendiente hasta su confirmación.
5. Responsive: leer y navegar el sitio, usar el flujo conceptual y completar los campos en móvil y escritorio, sin desbordamientos horizontales ni contenido recortado.

La revisión visual y funcional de la preview local es la que confirma estos puntos; esta lista no equivale a una auditoría de accesibilidad o a una validación legal.


## Inglés, español y comparación de color

- Inglés: http://127.0.0.1:3000/
- Español: http://127.0.0.1:3000/es/
- Demo: http://127.0.0.1:3000/demo/ y http://127.0.0.1:3000/es/demo/
- Comparar las cinco paletas: http://127.0.0.1:3000/brand/
- Privacidad: /privacy/ y /es/privacy/. Ambos son borradores fuera de indexación.

El selector EN/ES conserva la página equivalente, la sección y la selección de paleta. Cada versión se genera con su atributo `lang`, metadatos, canonical y enlaces de idioma alternativo. Los textos de validación del formulario también están traducidos.

Las paletas son propuestas para revisar, no una identidad aprobada. La opción inicial sigue siendo lima. Cobalto es la recomendación para comparar primero; petróleo y naranja son alternativas. El parámetro `?palette=cobalt` (también `petrol`, `lime` u `orange`) aplica la selección. La elección se guarda únicamente en `sessionStorage` y no se transmite. La página /brand/ es una herramienta de revisión marcada noindex. No se publica nada por visitarla.

La vista local sirve la exportación compilada de la carpeta del proyecto. Para reflejar cambios en esa vista estática, vuelve a compilar; `pnpm dev` ofrece recarga durante el desarrollo.

## Revisión con socios: amarillo y dirección Routing

La quinta paleta es amarillo #F4D83A con carbón #191B1A y base #F8F7F2. Es una propuesta para aproximarse a las marcas existentes, no una equivalencia con sus colores oficiales. Texto carbón sobre el amarillo tiene contraste aproximado 12.14:1.

La nueva dirección visual se activa con `?palette=yellow&direction=kinetic`. La dirección inicial se conserva con `direction=classic`. En /brand/ pueden compararse ambos estilos y las cinco paletas; cambiar entre EN/ES conserva las elecciones. El estilo se implementa en `app/kinetic.css`, separado de la composición original.

El exportador `scripts/create-review.mjs` se ejecuta con `pnpm run review` después de compilar. Convierte las páginas compiladas en un único HTML autocontenido para revisión offline, con CSS y fuente incrustados. El paquete para socios está en outputs. Cada revisor puede copiar su opinión y compartirla por su cuenta; no hay un backend de votos ni un envío automático de mensajes.

La dirección 127.0.0.1 solo funciona en la computadora que ejecuta la vista previa. Para compartir mediante enlace se requiere alojar una versión y definir quién tendrá acceso. Esta fase conserva la revisión local y no publica ni conecta el dominio.
