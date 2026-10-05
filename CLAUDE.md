@AGENTS.md

# KORU — Sitio web (Fase 1)

Club de bienestar boutique en Cali, Colombia. El sitio tiene que **vender**: hermoso, cálido, premium y perfecto en celular (el tráfico llega desde Instagram, TikTok y WhatsApp). Todos los textos en español de Colombia. Si falta copy, escribir en el mismo tono y marcar con `// TODO copy`.

Especificación completa original: `docs/KORU_Prompt_Claude_Code_Web_v1.md`.

---

## Marca

**KORU** es una palabra maorí: la espiral del helecho que se despliega. Simboliza nueva vida, crecimiento, fuerza y paz. El club une **AQUA FIT** (la hidroterapia de Andrés Díaz, más de 10 años en Cali) y **SAISEI** (la nutrición de Sandra).

**Frase de marca:** *Aquí no entrenas. ¡Aquí renaces!*

**Posicionamiento:** no somos un gimnasio. Somos un club de bienestar donde la experiencia es el producto. El diferenciador es una **piscina terapéutica, no recreacional**: cada sesión en el agua la guía un especialista.

### Paleta (solo estos tokens; nunca colores fríos, neón ni blanco puro)

| Token | Hex | Uso |
|---|---|---|
| espresso | #2C1A0E | Fondos premium oscuros, texto principal |
| tostado | #5C3317 | Fondos secundarios oscuros |
| terracota | #8B4A2B | Botones, acentos, enlaces |
| caramelo | #C4813F | Detalles, íconos, hover, líneas finas |
| arena | #E8C99A | Fondos de tarjetas, bordes suaves |
| crema | #F5EDE0 | Fondo principal claro |
| marfil | #FAF5EF | Fondos claros alternos, texto sobre oscuro |

### Tipografía

- **Cormorant Garamond** (300 / 400): títulos y frases grandes. La palabra KORU en display va en mayúsculas con letter-spacing 0.3–0.5em.
- **DM Sans** (400 / 500): textos, botones, menús, formularios.

### Logo

Círculo de trazo orgánico; arriba un sol sólido (SAISEI, el renacer) y adentro 3 a 5 líneas que fluyen y se cruzan (AQUA FIT, el agua en movimiento). Archivo oficial: `/public/brand/koru-logo.png` (pendiente; usar placeholder mientras tanto). Se puede recrear el símbolo en SVG como motivo decorativo (líneas de agua, espiral), pero **nunca reemplazar el logo oficial**.

### Dirección de diseño

- Spa de lujo editorial: oscuro y cálido (madera, café), luz dorada, mucho aire, fotografía grande. Nada de plantilla de gimnasio.
- Alternar secciones oscuras (espresso/tostado + texto marfil) y claras (crema/marfil + texto espresso).
- Fotos grandes, a sangre; tarjetas con radio 24px. La piscina siempre arriba en el home.
- Separadores: líneas onduladas finas en caramelo. Espiral koru como marca de agua en fondos oscuros (opacidad 4–6%).
- Movimiento premium: hero con video en loop + zoom lento; fade + subida 16–24px escalonada; parallax leve; tarjetas que se elevan; carrusel con snap en celular; frases línea por línea. Respetar `prefers-reduced-motion`.
- Botones: píldora terracota con texto marfil; secundarios con borde caramelo. Mínimo 48px de alto.
- Botón flotante de WhatsApp en todas las páginas con mensaje precargado según la página.
- Lighthouse móvil ≥ 90 (rendimiento y accesibilidad). Contraste AA, alt en todas las imágenes, navegación con teclado.
- Fotos de relleno nombradas según su destino (`piscina-hero.jpg`, `salon-yoga.jpg`…) y listadas en `/public/images/README.md`.

---

## Reglas de contenido (no negociables)

1. **Nunca mencionar EMS ni electroestimulación.**
2. **Nunca prometer resultados médicos:** nada de "cura", "garantiza", "elimina el dolor".
3. **Nunca mostrar descuentos, preventas, "precio antes/ahora" ni "socios fundadores".** Los beneficios siempre son valor agregado (un obsequio, un video, una experiencia), nunca un precio rebajado.
4. **No mencionar coworking.**
5. **No nombrar competidores.**
6. **Masajes:** dependen de `disponible` en `/content/masajes.ts` (`false` por ahora). Con `false`: "Próximamente", sin precios, botón "Quiero que me avisen" por WhatsApp. Con `true`: precios y botón de agendar.
7. **Precios de membresías:** dependen de `mostrarPrecios` en `/content/membresias.ts` (`false` por ahora). Con `false`: beneficios y botón "Agenda tu primera clase", sin cifras.
8. **Los precios de KORU Business sí se publican**, siempre como precio por grupo.
9. La palabra para el cliente es "socio"; el botón principal nunca dice "Comprar".

---

## Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- **Framer Motion** para animaciones
- **next/font** para Cormorant Garamond y DM Sans
- **next/image** para todas las imágenes
- Formulario con Route Handler que envía correo con **Resend** (API key en `.env.local`; plantilla en `.env.example`)
- Despliegue en **Vercel**, funcionando en la URL de Vercel y listo para conectar dominio después.
- Sin base de datos en esta fase.

**Todo el contenido editable vive en `/content`, nunca dentro de los componentes:** `experiencias.ts`, `membresias.ts`, `clases.ts`, `masajes.ts`, `campana.ts`, `sitio.ts`. Cambiar un precio o el banner de campaña solo toca esos archivos.

---

## Estructura

```
/                       Home — Conocer KORU
/experiencias-y-clases  Clases de piscina, clases de salón, hidroterapia, masajes
/membresias             Revive · Flow · Aqua + primera clase
/business               Landing KORU Business
/business/[slug]        Detalle de cada experiencia
/business/reservar      Formulario de solicitud de reserva
/contacto               WhatsApp, correo, mapa, horarios
/legal/terminos-business
/legal/privacidad
/legal/tratamiento-de-datos
```

**Menú:** Sobre KORU · Experiencias y clases · Membresías · KORU Business · Contacto. Arriba a la derecha: botón de WhatsApp. En celular: menú a pantalla completa en espresso con enlaces en Cormorant grande.

Preparado pero sin activar (Fase 3): iniciar sesión, idiomas, gift cards y tienda.
