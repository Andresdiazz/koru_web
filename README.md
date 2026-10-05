# KORU · Sitio web (Fase 1)

Sitio del club de bienestar KORU (Cali). Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + Framer Motion. Formulario de KORU Business con envío de correos por Resend. Sin base de datos.

---

## Cómo correrlo en tu computador

Necesitas Node.js 20 o superior.

```bash
npm install
cp .env.example .env.local   # y completa los valores (ver más abajo)
npm run dev                  # http://localhost:3000
```

Otros comandos:

| Comando | Para qué |
|---|---|
| `npm run build` | Compila para producción (lo mismo que hace Vercel). |
| `npm run start` | Sirve la versión compilada. |
| `npm run lint` | Revisa el código. |

---

## Cómo editar el contenido

**Todo el contenido vive en la carpeta `/content`.** Para cambiar un precio, un texto o una foto no hay que tocar los componentes.

| Archivo | Qué contiene |
|---|---|
| `content/sitio.ts` | Datos de contacto (WhatsApp, correos, dirección, horarios, redes), menú, textos del home, fundadores, testimonios, galería y mensajes de WhatsApp por página. |
| `content/clases.ts` | Clases de piscina y de salón, y los textos de `/experiencias-y-clases`. |
| `content/masajes.ts` | Masajes, precios e **interruptor `disponible`**. |
| `content/membresias.ts` | Planes Revive, Flow y Aqua, beneficios, "Tu primera clase" e **interruptor `mostrarPrecios`**. |
| `content/experiencias.ts` | KORU Business: experiencias, modalidades y precios por grupo, grupos de más de 10, bienestar todo el año, "Por qué KORU" y textos del formulario. |
| `content/campana.ts` | **Banner de campaña** de KORU Business. |
| `content/legal.ts` | Términos KORU Business y la estructura de las políticas de privacidad y tratamiento de datos. |

Reglas rápidas:
- Los precios se escriben como número, sin puntos ni signo: `1200000`. El sitio los muestra como `$1.200.000`.
- Los textos que todavía faltan están marcados con `// TODO copy` (y los legales con `TODO legal`). Busca `TODO` para verlos todos.
- Respeta las reglas de contenido de `CLAUDE.md`: sin descuentos, preventas ni "precio antes/ahora"; sin promesas médicas; el cliente es "socio".

### Ejemplo: cambiar un precio

En `content/experiencias.ts`, busca la experiencia y cambia `precio` en su modalidad:

```ts
modalidades: [{ id: "unica", nombre: "Experiencia completa", precio: 1300000 }],
```

El cambio aparece en la tarjeta, en el detalle (con el cálculo "equivale a $X por persona"), en el formulario y en los correos.

---

## Banner de campaña (KORU Business)

Archivo: `content/campana.ts`

```ts
export const campana = {
  activa: true,                       // false = el banner desaparece
  titulo: "Cierra el año diferente",
  texto: "Este año, regala bienestar…",
  beneficio: "Las experiencias confirmadas antes del 31 de octubre incluyen…",
  fechaLimite: "2026-10-31",          // AAAA-MM-DD
  escasez: "Un solo club, una sola piscina…",
  boton: "Reserva tu fecha",
};
```

- **Pasada la `fechaLimite`, el beneficio se oculta solo** (hora de Colombia). La página `/business` se regenera cada hora, así que no hay que volver a desplegar.
- El banner no tiene campos de precio a propósito: los beneficios siempre son valor agregado.
- Para una campaña nueva, cambia los textos y la fecha y pon `activa: true`.

---

## Interruptores

### Masajes: `content/masajes.ts`

```ts
disponible: false,
```

- `false`: la sección dice **"Masajes — Próximamente"**, no muestra precios y el botón "Quiero que me avisen" abre WhatsApp.
- `true`: aparecen los precios, el botón de agendar y la fila "Masaje incluido" en la tabla de membresías.

### Precios de membresías: `content/membresias.ts`

```ts
mostrarPrecios: false,
```

- `false`: las tarjetas y la tabla muestran solo beneficios y el botón "Agenda tu primera clase".
- `true`: aparece el precio mensual de cada plan.

### Funciones de la Fase 3: `content/sitio.ts` → `fase3`

`iniciarSesion`, `idiomas`, `giftCards` y `tienda` están en `false`. Quedaron preparadas, pero no se activan en esta fase.

---

## Fotos y video

- Todas las fotos están en `public/images/`. Hoy son de relleno (Unsplash).
- **Para reemplazar una foto, sube la real con el mismo nombre de archivo.** La lista completa, con lo que debe mostrar cada una, está en [`public/images/README.md`](public/images/README.md).
- **Video del hero:** sube `public/video/piscina-hero.mp4` (loop de 8 a 15 s, menos de 4 MB). El sitio lo detecta solo al compilar. Mientras no exista, el hero usa la foto con zoom lento.
- Logo oficial: `public/brand/koru-logo.png`. Si cambia, hay que regenerar las variantes de color de `public/brand/` y el favicon (`app/icon.png`, `app/apple-icon.png`).
- Imágenes para compartir en redes (Open Graph): `public/images/og-koru.jpg` y `og-business.jpg` (1200 × 630).

---

## Formulario de reserva (KORU Business)

`/business/reservar` envía la solicitud a `app/api/reserva/route.ts`, que:
1. Valida los datos con el mismo esquema que el formulario (`lib/reserva.ts`).
2. Descarta spam con un campo trampa (honeypot), un tiempo mínimo de llenado y un límite de 5 envíos cada 10 minutos por IP.
3. Envía con Resend un correo a KORU (`contacto.correoReservas` en `content/sitio.ts`) y una confirmación al cliente.

Si en desarrollo no hay llave de Resend, el envío se simula y el correo aparece en la consola. En producción sin llave, el formulario muestra un error amable con el botón de WhatsApp.

Las plantillas de los correos están en `lib/email/plantillas.ts`.

---

## Variables de entorno

Copia `.env.example` como `.env.local` (local) y configúralas también en Vercel → *Settings → Environment Variables*.

| Variable | Obligatoria | Para qué |
|---|---|---|
| `RESEND_API_KEY` | Sí (para el formulario) | Llave de [Resend](https://resend.com). |
| `RESEND_FROM` | Sí (para el formulario) | Remitente verificado en Resend, p. ej. `KORU <reservas@su-dominio.com>`. Sin dominio verificado, Resend solo deja enviar al correo de la cuenta. |
| `NEXT_PUBLIC_SITE_URL` | Recomendada | URL pública sin barra final. Se usa en el sitemap, la URL canónica, Open Graph y los correos. Si está vacía se usa la URL de producción que Vercel asigna al proyecto. |
| `NEXT_PUBLIC_GA_ID` | No | ID de Google Analytics 4 (`G-XXXX`). Vacía = no se carga. |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | ID del píxel de Meta. Vacía = no se carga. |

---

## Desplegar en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En [vercel.com/new](https://vercel.com/new) importa el repositorio. Vercel detecta Next.js solo; no hay que cambiar nada de la configuración de compilación.
3. Agrega las variables de entorno de la tabla anterior.
4. Clic en **Deploy**. El sitio queda en `https://<proyecto>.vercel.app`.
5. Cada vez que hagas *push* a la rama principal, Vercel publica de nuevo. Las ramas y los *pull requests* generan vistas previas que no se indexan en Google.

### Conectar el dominio (cuando lo tengan)

1. En Vercel → *Settings → Domains*, agrega el dominio (p. ej. `koru.com.co`) y sigue las instrucciones de DNS.
2. Cambia `NEXT_PUBLIC_SITE_URL` al dominio nuevo y vuelve a desplegar.
3. En Resend, verifica el dominio y actualiza `RESEND_FROM` a una dirección del dominio.
4. Actualiza `contacto.correo` y `contacto.correoReservas` en `content/sitio.ts`.

---

## Antes de lanzar (pendientes)

- [ ] Razón social y NIT en `content/legal.ts` (`responsable`), y revisión de las políticas por un abogado.
- [ ] Autorización de las personas de los testimonios: en `content/sitio.ts` solo se publican los que tienen `autorizado: true`.
- [ ] Fotos reales y video del hero (`public/images/README.md`).
- [ ] Llave de Resend con el dominio `koruclub.co` verificado y prueba real de punta a punta del formulario.

### Testimonios

Cada testimonio en `content/sitio.ts` tiene un campo `autorizado`. Ponlo en `true` solo cuando la persona haya aceptado que su testimonio y su nombre aparezcan en la web. Si no hay ninguno autorizado, la sección se oculta sola; con uno solo se muestra como cita destacada.

---

## Estructura

```
app/                  Rutas (páginas, API, sitemap, robots, íconos)
components/
  ui/                 Botones, secciones, tarjetas, carrusel, íconos, ondas, espiral
  motion/             Animaciones (aparición, parallax, línea por línea, contadores)
  layout/             Header, menú móvil, footer, WhatsApp flotante, analítica
  home/ business/ clases/ membresias/ reserva/   Secciones de cada página
content/              TODO el contenido editable
lib/                  Utilidades (formato de precios, WhatsApp, SEO, reserva, correos)
types/                Tipos del contenido
public/               Logo, fotos y video
```
