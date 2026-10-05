# Fotos de relleno — reemplazar por fotos reales de KORU

Todas las imágenes de esta carpeta son **de relleno** (Unsplash, licencia gratuita). Cada archivo está nombrado según lo que debe ir ahí: para reemplazar una foto, sube la foto real **con el mismo nombre** y listo; no hay que tocar código.

Recomendaciones para las fotos reales:
- Formato JPG horizontal (3:2 o 16:9), mínimo 2000 px de ancho para las fotos grandes (`piscina-hero`, `piscina-parallax`, `business-hero`, `agua-dorada`) y 1400 px para el resto.
- Retratos de fundadores en vertical 4:5 (900 × 1125 px o más).
- Luz cálida, tonos madera y dorado. Evitar luz fría o azul intenso.
- Peso ideal por debajo de 500 KB (Next.js las optimiza, pero mientras más livianas mejor).

| Archivo | Qué debe mostrar | Crédito del relleno |
|---|---|---|
| `piscina-hero.jpg` | La piscina terapéutica, plano general, luz cálida | Antonio Araujo · Unsplash |
| `piscina-parallax.jpg` | La piscina desde otro ángulo, a lo largo | Antonio Araujo · Unsplash |
| `piscina-escalones.jpg` | Escalones / entrada a la piscina | Antonio Araujo · Unsplash |
| `piscina-ventanal.jpg` | Piscina con luz natural | Antonio Araujo · Unsplash |
| `hidroterapia.jpg` | Sesión individual de hidroterapia con especialista | Michael Oxendine · Unsplash |
| `hidroterapia-domicilio.jpg` | Sesión en piscina de una casa | Eric Nopanen · Unsplash |
| `clase-hidrogym.jpg` | Clase grupal de Hidrogym | Nelka · Unsplash |
| `clase-aqua-zumba.jpg` | Clase grupal de Aqua Zumba | Jed Villejo · Unsplash |
| `clase-pilates.jpg` | Clase de Pilates en el salón | Roxana Popovici · Unsplash |
| `salon-yoga.jpg` | Salón de yoga y Pilates vacío | Olga Pukhalskaya · Unsplash |
| `clase-yoga.jpg` | Clase de yoga | Maryjoy Caballero · Unsplash |
| `clase-rumba.jpg` | Clase de Rumba | Kaspars Eglitis · Unsplash |
| `clase-cardio-step.jpg` | Clase de Cardio Step | bruce mars · Unsplash |
| `clase-cardio-box.jpg` | Clase de Cardio Box | Jonathan Tomas · Unsplash |
| `sala-fisioterapia.jpg` | Sala de fisioterapia | Jaspinder Singh · Unsplash |
| `recepcion.jpg` | Recepción del club | Aalo Lens · Unsplash |
| `zona-social.jpg` | Zona social | Nereid Ndreu · Unsplash |
| `tienda-saisei.jpg` | Tienda SAISEI y productos | Shruti Mishra · Unsplash |
| `fachada.jpg` | Fachada de la sede El Ingenio | Siddharth Govindan · Unsplash |
| `sala-masajes.jpg` | Sala de masajes | Sherzod Gulomov · Unsplash |
| `masajes.jpg` | Masaje en curso | engin akyurt · Unsplash |
| `nutricion-saisei.jpg` | Nutrición SAISEI (snack o asesoría) | Ovidiu Creanga · Unsplash |
| `business-hero.jpg` | Equipo de empresa viviendo una experiencia en KORU | Parabol · Unsplash |
| `exp-conecta-tu-equipo.jpg` | Experiencia Conecta tu equipo | Abhayaranya Yoga Ashram · Unsplash |
| `exp-womens-wellness.jpg` | Experiencia Women's Wellness | Kaylee Garrett · Unsplash |
| `exp-mente-en-calma.jpg` | Experiencia Mente en Calma | Dillon Wanner · Unsplash |
| `exp-aqua-party.jpg` | Experiencia Aqua Party | Jed Villejo · Unsplash |
| `exp-team-connection-day.jpg` | Experiencia Team Connection Day | Marea Wellness · Unsplash |
| `exp-grupos-grandes.jpg` | Jornada empresarial con grupo grande | Eric Nopanen · Unsplash |
| `agua-dorada.jpg` | Textura de agua con luz dorada (fondo decorativo) | Abdalrhman Abdelbasst · Unsplash |
| `textura-madera.jpg` | Textura de madera cálida (fondo decorativo) | zai Dan · Unsplash |
| `fundador-andres.jpg` | Retrato de Andrés Díaz (vertical 4:5) | Andrew Lvov · Unsplash |
| `fundadora-sandra.jpg` | Retrato de Sandra (vertical 4:5) | Giorgio Trovato · Unsplash |

## Imágenes para compartir (Open Graph)

`og-koru.jpg` y `og-business.jpg` (1200 × 630) se generaron a partir de `piscina-hero.jpg` y `business-hero.jpg` con el logo en marfil. Cuando lleguen las fotos reales, hay que regenerarlas con las mismas medidas.

## Video

| Archivo | Qué debe mostrar |
|---|---|
| `/public/video/piscina-hero.mp4` | Loop silencioso de 8–15 s de la piscina, 1080p, H.264, **menos de 4 MB**. Mientras no exista, el hero muestra `piscina-hero.jpg` con zoom lento. |
| `/public/video/piscina-hero.webm` | Opcional: misma toma en WebM (VP9) para navegadores que lo prefieran. |

## Marca

`/public/brand/koru-logo.png` es el logo oficial. Las variantes `koru-logo-completo-*.png` y `koru-simbolo-*.png` (tostado, espresso, marfil) se generan a partir de él; si cambia el logo, hay que regenerarlas.
