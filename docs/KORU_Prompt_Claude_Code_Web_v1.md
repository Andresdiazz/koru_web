# Prompt para Claude Code — Sitio web KORU · Fase 1
> v1 · 5 de octubre de 2026 · Pega todo este documento como primer mensaje en Claude Code, dentro de una carpeta vacía.

---

## Tu tarea

Vas a construir la **Fase 1 del sitio web de KORU**, un club de bienestar boutique en Cali, Colombia. El sitio tiene que **vender**: debe ser hermoso, cálido, premium y funcionar perfecto en el celular, porque casi todo el tráfico llega desde Instagram, TikTok y WhatsApp.

Trabaja así:

1. Lee todo este documento antes de escribir código.
2. Crea el archivo `CLAUDE.md` en la raíz con las secciones **Marca**, **Reglas de contenido**, **Stack** y **Estructura** de este documento, para que se mantengan en cada sesión.
3. Muéstrame un plan corto: estructura de carpetas, componentes y orden de construcción. Espera mi visto bueno antes de seguir.
4. Construye por etapas y avísame al terminar cada una para revisarla en el navegador: (a) base del proyecto + sistema de diseño, (b) home, (c) landing KORU Business + detalle de experiencias, (d) formulario, (e) pulido, animaciones, SEO y rendimiento.
5. Todos los textos están en español de Colombia. Respeta el copy de este documento; si algo falta, escribe en el mismo tono y márcalo con `// TODO copy` para que lo revisemos.

---

## Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- **Framer Motion** para animaciones
- **next/font** para Cormorant Garamond y DM Sans
- **next/image** para todas las imágenes
- Formulario con un Route Handler que envía correo con **Resend** (la API key va en `.env.local`; deja `.env.example`)
- Despliegue en **Vercel**. Todavía no hay dominio: el proyecto debe funcionar en la URL de Vercel y quedar listo para conectar uno después.
- Sin base de datos en esta fase.

**Todo el contenido editable vive en archivos de datos**, nunca dentro de los componentes: `/content/experiencias.ts`, `/content/membresias.ts`, `/content/clases.ts`, `/content/masajes.ts`, `/content/campana.ts`, `/content/sitio.ts`. Quien cambie un precio o el banner de campaña solo debe tocar esos archivos.

---

## Marca

**KORU** es una palabra maorí: la espiral del helecho que se despliega. Simboliza nueva vida, crecimiento, fuerza y paz. El club une **AQUA FIT** (la hidroterapia de Andrés Díaz, más de 10 años en Cali) y **SAISEI** (la nutrición de Sandra).

**Frase de marca:** *Aquí no entrenas. Renaces.*

**Posicionamiento:** no somos un gimnasio. Somos un club de bienestar donde la experiencia es el producto. El diferenciador es una **piscina terapéutica, no recreacional**: cada sesión en el agua la guía un especialista.

### Paleta (usa estos tokens; nunca colores fríos, neón ni blanco puro)

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

- **Cormorant Garamond** (Light 300 / Regular 400): títulos y frases grandes. Cuando aparezca la palabra KORU en display, usa mayúsculas con letter-spacing amplio (0.3–0.5em).
- **DM Sans** (Regular 400 / Medium 500): textos, botones, menús, formularios.

### Logo

Un círculo de trazo orgánico; arriba un sol sólido (SAISEI, el renacer) y adentro 3 a 5 líneas que fluyen y se cruzan (AQUA FIT, el agua en movimiento). Te dejo el PNG en `/public/brand/koru-logo.png`. Si no está, usa un placeholder y avísame. **Puedes recrear el símbolo en SVG para usarlo como motivo decorativo** (líneas de agua, espiral), pero no reemplaces el logo oficial.

---

## Dirección de diseño — esto es lo más importante

La referencia de sensación es un spa de lujo editorial: oscuro y cálido como madera y café, con luz dorada, mucho aire y fotografía grande. Nada de plantilla de gimnasio.

- **Ritmo:** alterna secciones oscuras (espresso/tostado con texto marfil) y claras (crema/marfil con texto espresso). Márgenes generosos, mucho espacio negativo.
- **Fotografía protagonista:** imágenes grandes, a sangre, con bordes muy redondeados en las tarjetas (24px). La piscina siempre aparece arriba en el home.
- **El agua como lenguaje visual:** líneas onduladas finas en caramelo como separadores de sección, inspiradas en las líneas del logo. Un motivo sutil de espiral koru como marca de agua en fondos oscuros (opacidad 4–6%).
- **Movimiento que se siente premium, nunca circo:**
  - Hero con video en loop silencioso de la piscina (con imagen de póster como respaldo) y un leve zoom lento.
  - Aparición suave de los elementos al hacer scroll: fade + subida de 16–24px, escalonada.
  - Parallax leve en imágenes grandes.
  - Tarjetas que se elevan y aclaran la imagen al pasar el cursor; en celular, carrusel deslizable con snap.
  - Contadores o frases que aparecen línea por línea en los momentos clave.
  - Respeta `prefers-reduced-motion`: sin animaciones para quien lo pida.
- **Botones:** píldora terracota con texto marfil; secundarios con borde caramelo. Siempre visibles y fáciles de tocar (mínimo 48px de alto).
- **Botón flotante de WhatsApp** en todas las páginas, abajo a la derecha, con mensaje precargado según la página.
- **Rendimiento:** Lighthouse móvil ≥ 90 en rendimiento y accesibilidad. Imágenes optimizadas, video comprimido y con carga diferida bajo el hero.
- **Accesibilidad:** contraste AA, textos alternativos en todas las imágenes, navegación con teclado.

Mientras no haya fotos reales, usa imágenes de relleno cálidas y coherentes con la paleta, y nombra cada archivo según lo que debe ir ahí (`piscina-hero.jpg`, `salon-yoga.jpg`…). Lleva una lista `/public/images/README.md` de todas las fotos que hay que reemplazar.

---

## Reglas de contenido (no negociables)

1. **Nunca mencionar EMS ni electroestimulación.**
2. **Nunca prometer resultados médicos:** nada de "cura", "garantiza", "elimina el dolor".
3. **Nunca mostrar descuentos, preventas, "precio antes/ahora" ni "socios fundadores".** Los beneficios siempre son valor agregado (un obsequio, un video, una experiencia), nunca un precio rebajado.
4. **No mencionar coworking.**
5. **No nombrar competidores.**
6. **Masajes:** se muestran, pero dependen de un interruptor en `/content/masajes.ts` (`disponible: false` por ahora). Mientras esté en `false`, la sección dice **"Próximamente"**, no muestra precios y el botón invita a escribir por WhatsApp para recibir aviso. Cuando se cambie a `true`, aparecen los precios y el botón de agendar.
7. **Precios de membresías:** dependen de `mostrarPrecios` en `/content/membresias.ts` (`false` por ahora). Con `false` se muestran los beneficios y el botón "Agenda tu primera clase", sin cifras.
8. **Los precios de KORU Business sí se publican**, siempre como precio por grupo.
9. La palabra para el cliente es "socio"; el botón principal nunca dice "Comprar".

---

## Estructura del sitio (Fase 1)

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

**Menú:** Sobre KORU · Experiencias y clases · Membresías · KORU Business · Contacto. Arriba a la derecha: botón de WhatsApp. En celular, menú desplegable a pantalla completa en espresso con los enlaces en Cormorant grande.

Deja preparada (sin activar) la estructura para: iniciar sesión, idiomas, gift cards y tienda. Son de la Fase 3.

---

## Home — Conocer KORU

1. **Hero (oscuro, video de piscina).**
   - Título: **Aquí no entrenas. Renaces.**
   - Texto: Un club de bienestar boutique en Cali con una piscina terapéutica donde cada sesión la guía un especialista.
   - Botones: **AGENDA TU PRIMERA CLASE** (WhatsApp) · **CONOCE EL CLUB** (baja a la siguiente sección).
2. **No somos un gimnasio (claro).** Tres pilares con ícono de línea fina:
   - **Agua que sana** — Piscina terapéutica, no recreacional. Hidroterapia, Hidrogym y Aqua Zumba siempre guiados por un especialista.
   - **Movimiento con intención** — Pilates, Yoga, Rumba, Cardio Step y Cardio Box en grupos pequeños.
   - **Nutrición SAISEI** — Asesoría y suplementación para acompañar tu proceso.
3. **La piscina (oscuro, imagen a sangre con parallax).** Frase grande: *"En el agua nadie queda por fuera: quien no corre, flota; quien tiene una lesión, se mueve sin dolor."* Botón: VER CLASES DE PISCINA.
4. **Clases (claro).** Carrusel de tarjetas: primero piscina (Aqua Zumba, Hidrogym, Hidroterapia), luego salón (Pilates, Yoga, Rumba, Cardio Step, Cardio Box). Datos en `/content/clases.ts`.
5. **Tu primera clase (arena).** "Elige una clase del horario y vívela como socio por un día. **$50.000, abonables a tu primera mensualidad** si te unes en los siguientes 30 días." Botón: AGENDA TU PRIMERA CLASE.
6. **Membresías (claro).** Las tres tarjetas, con Flow destacada como la más elegida. Botón: VER MEMBRESÍAS.
7. **KORU Business (oscuro).** "Tu equipo no necesita otro evento. Necesita una experiencia." Botón: CONOCE KORU BUSINESS.
8. **Los fundadores (claro).** Andrés Díaz (hidroterapeuta, más de 10 años en Cali) y Sandra (fundadora de SAISEI). Foto y dos líneas de cada uno. `// TODO copy`.
9. **Galería (oscuro).** Mosaico asimétrico, no cuadrícula de catálogo: piscina, sala de fisioterapia, salón de yoga y Pilates, recepción, zona social, tienda SAISEI, fachada, sala de masajes, experiencias empresariales. Lightbox al tocar.
10. **Lo que dicen de KORU.** Testimonios cargados desde `/content/sitio.ts` (deja 3 de ejemplo marcados como TODO). Preparado para conectar Google Reviews en la Fase 3.
11. **Ubicación** con mapa de Google embebido, botón "Cómo llegar" y WhatsApp. Sede: Cali – El Ingenio.
12. **Pie de página:** "KORU — Haz de tu próximo encuentro una experiencia para recordar." Horarios, ubicación, WhatsApp, correo, redes, navegación, enlaces legales y botón RESERVA AHORA.

---

## Experiencias y clases

| Clase | Descripción | Formato |
|---|---|---|
| Aqua Zumba | Ritmo y baile dentro del agua | Grupal guiada |
| Hidrogym | Acondicionamiento físico en el agua, de bajo impacto | Grupal guiada |
| Hidroterapia | Sesión terapéutica individual con especialista | Individual |
| Hidroterapia a domicilio | La misma sesión, en la piscina del cliente | Individual, pareja o grupal |
| Pilates | Fuerza, control y postura desde el centro del cuerpo | Grupal |
| Yoga | Movimiento consciente, respiración y flexibilidad | Grupal |
| Rumba | Ritmo, baile y cardio en grupo: la clase más social del club | Grupal |
| Cardio Step | Cardio de impacto controlado sobre step | Grupal |
| Cardio Box | Cardio de alta intensidad con técnica de boxeo | Grupal |

La Hidroterapia es el servicio estrella: dale más espacio que a las demás.

### Masajes (`/content/masajes.ts`, `disponible: false`)

| Masaje | Duración | Precio |
|---|---|---|
| Express | 30 min | $70.000 |
| Relajante | 60 min | $120.000 |
| Deportivo / recuperación | 60 min | $130.000 |
| Terapéutico | 60 min | $140.000 |

Mientras `disponible` sea `false`: título "Masajes — Próximamente", una línea de texto y el botón "Quiero que me avisen" (WhatsApp con el mensaje "Hola, quiero que me avisen cuando abran los masajes en KORU 🌿").

---

## Membresías (`/content/membresias.ts`, `mostrarPrecios: false`)

| | Revive | Flow ★ | Aqua |
|---|---|---|---|
| Precio mensual (oculto por ahora) | $280.000 | $480.000 | $780.000 |
| Clases de salón | Ilimitadas | Ilimitadas | Ilimitadas |
| Clases acuáticas grupales | 2 al mes | 8 al mes | Ilimitadas |
| Acondicionamiento acuático personalizado | — | 2 al mes | Ilimitado |
| Hidroterapia individual | — | — | 2 al mes |
| Masaje incluido (cuando estén disponibles) | — | 1 relajante al mes | 1 a elección al mes |
| Descuento en SAISEI | 10% | 15% | 20% |
| Sala de fisioterapia | — | Sí | Sí |
| Evaluación física | Inicial | Trimestral | Trimestral + prioridad de reservas |
| Sesiones de invitado | — | — | 2 al mes |

Sin cuota de inscripción. Debajo de las tarjetas, el bloque de **Tu primera clase** ($50.000, abonable a la primera mensualidad). La fila de masaje solo aparece si `masajes.disponible` es `true`.

---

## Landing KORU Business (`/business`)

1. **Hero (oscuro).** Título: **Tu equipo no necesita otro evento. Necesita una experiencia.** Texto: *Bienestar, conexión y crecimiento en una experiencia 360°.* Botón: DESCUBRE MÁS.
2. **¿Qué quieres regalarle a tu equipo?** Cinco botones con ícono en círculo. Al tocar uno, se despliega su descripción y el botón CONOCER EXPERIENCIA:
   - **Conectar** — Fortalecer vínculos y crear nuevas formas de conectar. → Conecta tu equipo
   - **Desconectar** — Bajar el ritmo, liberar la mente y volver a lo esencial. → Mente en Calma
   - **Bienestar** — Regalar una pausa para cuidar, respirar y recargar. → Women's Wellness
   - **Celebrar** — Reconocer lo logrado y celebrar juntos. → Aqua Party
   - **Vivir KORU** — Una experiencia 360° para conectar, cuidar y disfrutar. → Team Connection Day
3. **Banner de campaña (`/content/campana.ts`, editable).**
   - Título: **CIERRA EL AÑO DIFERENTE**
   - Texto: Este año, regala bienestar. Regala conexión. Regala una experiencia.
   - Beneficio: Las experiencias confirmadas antes del 31 de octubre incluyen el video editado de la experiencia.
   - Escasez: Un solo club, una sola piscina: recibimos un grupo a la vez. Fechas limitadas entre el 14 de noviembre y el 19 de diciembre.
   - Botón: RESERVA TU FECHA
   - Campos: `activa`, `titulo`, `texto`, `beneficio`, `fechaLimite`, `escasez`, `boton`. **Sin campos de precio.** Si `fechaLimite` ya pasó, oculta el beneficio automáticamente.
4. **Experiencias que van más allá de un evento.** *Diseñadas para conectar, cuidar, celebrar y crecer juntos.* Tarjetas con foto, nombre, frase, duración, "Hasta 10 personas" y "Desde $X por grupo". Botón: CONOCER EXPERIENCIA.
5. **¿Son más de 10?** Jornada KORU Empresarial y Experiencia Fin de Año (tabla abajo).
6. **Bienestar todo el año.** Diagnóstico gratuito, Pausas Activas, Charla, Plan Bienestar Corporativo y Tiquetera Corporativa.
7. **Por qué KORU.** Piscina terapéutica · dos especialistas al frente · privada y limitada · 360° · personalizable.
8. **Testimonios de empresas** (sección preparada; se oculta si está vacía).
9. **Cierre:** CTA a reservar y a WhatsApp.

### Experiencias privadas (`/content/experiencias.ts`) — hasta 10 personas, precio por grupo

El precio es por grupo y no cambia si asisten menos. Muéstralo así: **"$1.200.000 por grupo · equivale a $120.000 por persona con 10 participantes"**.

**1. Conecta tu equipo fuera de la oficina** · slug `conecta-tu-equipo` · necesidad: Conectar
- Frase: Una pausa fuera de la oficina para volver a conectar.
- Para quién: equipos comerciales, líderes y áreas pequeñas.
- Incluye: dinámica de conexión · sesión de Hidrogym · reto por equipos · espacio de conversación · cierre con respiración guiada de 10 minutos · snack saludable (pinchos de frutas con cobertura de chocolate, o parfait de yogur griego, queso cottage, frutas y granola).
- Duración: media jornada (4 horas aprox.)
- Precio: $1.200.000

**2. KORU Women's Wellness** · slug `womens-wellness` · necesidad: Bienestar
- Frase: Una experiencia para reconocerse, conectar y cuidar de sí mismas.
- Para quién: equipos femeninos.
- Incluye: espacio privado en KORU · yoga y movimiento consciente · dinámica "Me reconozco" (participación voluntaria) · sesión acuática grupal a elección (Hidrogym, Aqua Zumba o Hidromix) · mini taller de bienestar de 45 minutos · dinámica "Una mujer que admiro y quiero agradecer" · charla de 15 minutos sobre suplementación con SAISEI · bebida saludable y snack (barra de granola, palitos de zanahoria horneados con hummus, bocadillos de pan integral, pollo o atún, pinchos de pollo o carne) · fotografías del evento.
- Duración: 6 horas aprox.
- Modalidades: Esencial $1.200.000 · Con profesional invitada (nutrición, psicología o salud) y obsequio SAISEI para cada participante $1.800.000

**3. KORU Mente en Calma** · slug `mente-en-calma` · necesidad: Desconectar
- Frase: Una pausa para bajar el ruido y volver a ti.
- Para quién: equipos con alta carga que necesitan bienestar emocional.
- Incluye: presentación y conversación sobre las tensiones del día a día · yoga a ciegas (respiración, meditación guiada, movimiento consciente y relajación con música) · experiencia acuática guiada por especialista · dinámica "Lo que quiero soltar" y mandalas · infusión caliente en un espacio de silencio · material impreso · almuerzo saludable.
- Duración: 7 horas aprox.
- Modalidades: Guiada por el equipo KORU $1.500.000 · Guiada por profesional especializado (psicóloga o coach de vida) $1.800.000

**4. KORU Aqua Party Corporativa** · slug `aqua-party` · necesidad: Celebrar
- Frase: Tu equipo merece celebrar diferente.
- Para quién: cumpleaños de empresa, cierre de semestre o de año, celebración de metas.
- Incluye: decoración temática · Aqua Zumba, Hidromix y juegos en piscina · rumba dirigida · competencias amistosas · reconocimientos y detalle individual · experiencia de relajación · bebida y snack saludable · fotografía.
- Duración: 7 horas aprox.
- Modalidades: Base $1.200.000 · Con almuerzo saludable $1.800.000
- Botón principal: **QUIERO CELEBRAR EN KORU**

**5. KORU Team Connection Day** · slug `team-connection-day` · necesidad: Vivir KORU
- Frase: Horas de bienestar para desconectarse juntos.
- Para quién: equipos que quieren salir de la rutina y fortalecer su conexión.
- Incluye: actividad para romper el hielo · yoga y movilidad · Pilates Mat · experiencia acuática guiada · relajación · snack saludable.
- Duración: 6 horas aprox.
- Precio: $1.200.000

### Grupos de más de 10 — precio por persona

| Formato | Participantes | Duración | Precio por persona |
|---|---|---|---|
| Jornada KORU Empresarial | 11 – 14 | Según propuesta | $185.000 |
| Jornada KORU Empresarial | 15 – 20 | Según propuesta | $170.000 |
| Experiencia Fin de Año KORU | 15 – 19 | 4 horas | $245.000 |
| Experiencia Fin de Año KORU | 20 – 30 | 4 horas | $225.000 |

La Experiencia Fin de Año incluye todo lo de la Jornada, más bebida de bienvenida y ambientación, cierre de año guiado por Andrés, kit SAISEI para cada participante y video editado.

### Bienestar todo el año

- **Diagnóstico de Bienestar Laboral — sin costo:** sesión de 45 minutos con Talento Humano o SST.
- **Pausas Activas KORU en su empresa:** 45 minutos, hasta 25 personas, con informe de asistencia. Sesión $380.000 · pack 4 $1.320.000 · pack 12 $3.600.000.
- **Charla de bienestar en su empresa:** 60 minutos, hasta 40 personas: $450.000.
- **Plan Bienestar Corporativo:** membresías para colaboradores desde 5 personas, contrato mínimo de 6 meses. **Sin precio en la web:** "Condiciones en propuesta formal".
- **Tiquetera Corporativa:** 50 ingresos $2.200.000 · 100 ingresos $4.000.000 · vigencia 6 meses.
- **Hidroterapia a domicilio para directivos:** cotización a la medida.

### Detalle de experiencia (`/business/[slug]`)

Orden: foto o video grande → nombre → frase → para quién es → qué incluye (lista con íconos finos) → duración → capacidad (hasta 10) → precio por grupo y modalidades (selector visual entre modalidades, con el precio actualizándose con animación) → servicios adicionales ("decoración, fotografía profesional, transporte u otros, con costo adicional informado antes") → condiciones resumidas con enlace a los términos completos → botones **RESERVAR ESTA EXPERIENCIA** (lleva al formulario con la experiencia y la modalidad ya elegidas) y **HABLAR CON KORU** (WhatsApp con el nombre de la experiencia en el mensaje). Al final, "También te puede interesar" con dos experiencias más.

---

## Formulario de solicitud (`/business/reservar`)

No hay pago en línea en esta fase. El formulario envía la solicitud y KORU responde con la propuesta.

| Campo | Tipo | Obligatorio |
|---|---|---|
| Experiencia y modalidad | Lista (prellenada si viene de una tarjeta) | Sí |
| Empresa | Texto | Sí |
| Nombre del responsable | Texto | Sí |
| Cargo | Texto | Sí |
| Correo | Correo | Sí |
| WhatsApp | Teléfono (+57) | Sí |
| Número estimado de participantes | Número; si es mayor de 10, muestra un aviso y sugiere Jornada o Fin de Año | Sí |
| Fechas tentativas | Hasta tres fechas | Sí |
| Restricciones alimentarias o alergias | Texto | No |
| Comentarios | Texto | No |
| Autorización de tratamiento de datos (Ley 1581) | Casilla con enlace a la política | Sí |
| Autorización de comunicaciones comerciales | Casilla separada | No |

- Formulario en pasos (2 o 3 pantallas) con barra de progreso, validación en vivo y mensajes amables.
- Al enviar: correo a KORU con todos los datos (Resend), correo de confirmación al cliente y pantalla de agradecimiento con un botón que abre WhatsApp con un resumen precargado.
- Protección básica contra spam (honeypot y límite de envíos).
- El correo de destino y el número de WhatsApp van en `/content/sitio.ts` como `TODO` hasta que te los pase.

---

## Términos y condiciones (`/legal/terminos-business`)

Usa este texto tal cual:

1. **Reservas.** Las experiencias corporativas de KORU se realizan solo con reserva previa y están sujetas a disponibilidad de fecha y horario. La reserva se confirma con el pago del 50% del valor total. El saldo se paga antes o el día de la experiencia, según lo acordado con la empresa.
2. **Capacidad.** Las experiencias privadas tienen una capacidad máxima de 10 participantes, salvo que KORU acuerde previamente una capacidad diferente. Para grupos mayores aplican los formatos Jornada KORU Empresarial y Experiencia Fin de Año. El valor corresponde al grupo contratado y no cambia si asisten menos participantes.
3. **Cambios de fecha.** La empresa puede solicitar un cambio de fecha con mínimo 72 horas de anticipación, sujeto a disponibilidad. Los cambios solicitados con menos anticipación pueden generar un cargo o la pérdida del anticipo, según los costos ya asumidos para el evento.
4. **Cancelaciones.** Si la empresa cancela con mínimo 72 horas de anticipación, el anticipo se conserva para reprogramar la experiencia en una nueva fecha, sujeta a disponibilidad. En cancelaciones con menos de 72 horas, el anticipo no es reembolsable, porque cubre la reserva del espacio, los profesionales, el personal y los recursos de la experiencia.
5. **Puntualidad.** La experiencia comienza a la hora acordada. Si el grupo llega tarde, la actividad termina a la hora establecida para no afectar las reservas siguientes. El tiempo perdido por retrasos no genera descuento ni devolución.
6. **Actividades acuáticas.** Las actividades en piscina se realizan siguiendo las instrucciones del personal de KORU. Cada participante debe informar con anticipación cualquier condición física o restricción que afecte su participación. KORU puede adaptar o sustituir una actividad por razones de seguridad, condiciones de la piscina, clima u otras circunstancias operativas.
7. **Salud y participación.** Cada participante es responsable de conocer sus condiciones y limitaciones para realizar actividad física. Las experiencias KORU son de bienestar, recreación y actividad física, y no sustituyen la atención médica, psicológica, fisioterapéutica ni nutricional. Cuando una experiencia incluye un profesional especializado, este actúa dentro del alcance de su formación y competencia profesional.
8. **Alimentación.** Cuando la experiencia incluye bebidas o alimentos, la empresa debe informar con anticipación las alergias o restricciones alimentarias de los participantes. Las alternativas están sujetas a disponibilidad.
9. **Pertenencias.** KORU recomienda no llevar objetos de valor innecesarios. Cada participante es responsable de sus pertenencias durante la experiencia.
10. **Fotografías y video.** Cuando KORU tome fotografías o video para registro o comunicación, solicitará la autorización de cada participante. Si la empresa necesita fotografías para uso interno o externo, debe informarlo con anticipación.
11. **Comportamiento.** Todos los participantes deben mantener un trato respetuoso con el personal, las instalaciones y las demás personas presentes en KORU. KORU puede solicitar el retiro de una persona cuyo comportamiento sea agresivo, irrespetuoso o ponga en riesgo la seguridad del grupo.
12. **Modificación de actividades.** KORU puede modificar el orden, la duración o el contenido de una actividad por razones operativas, de seguridad, de clima o de disponibilidad de profesionales, manteniendo siempre el objetivo y el valor de la experiencia contratada.
13. **Servicios adicionales.** Cualquier servicio no incluido en la propuesta inicial (alimentación especial, decoración, fotografía profesional, profesionales invitados, productos, transporte u otros) tiene un costo adicional, informado y aprobado previamente.
14. **Vigencia de la propuesta.** Las condiciones económicas tienen una vigencia de 15 días calendario, salvo que el contrato indique otra cosa. Los precios pueden variar según la fecha, el número de participantes, los servicios incluidos y los requerimientos especiales de la empresa.
15. **Tratamiento de datos personales.** Los datos de la empresa y de los participantes se tratan conforme a la Ley 1581 de 2012 y a la política de tratamiento de datos de KORU, únicamente para gestionar la reserva y la experiencia, y para comunicaciones comerciales cuando exista autorización expresa.
16. **Aceptación.** La confirmación de la reserva implica que la empresa conoce y acepta estos términos y condiciones y las características de la experiencia contratada.

Las páginas de privacidad y tratamiento de datos quedan con estructura y un aviso `// TODO legal`: el texto lo entrega KORU tras la revisión legal.

---

## SEO y analítica

- Metadatos en español por página, Open Graph con imagen de la piscina, favicon con el símbolo.
- Datos estructurados `LocalBusiness` / `HealthClub` con dirección y horarios como TODO.
- Títulos sugeridos: "KORU · Club de bienestar con piscina terapéutica en Cali" y "KORU Business · Experiencias de bienestar para empresas en Cali".
- Deja listo el lugar para el píxel de Meta y Google Analytics (variables de entorno, desactivados si están vacías).

---

## Criterios de aceptación de la Fase 1

- [ ] Todo el contenido editable vive en `/content` y cambiar un precio no requiere tocar componentes.
- [ ] Masajes en "Próximamente" y precios de membresía ocultos, ambos controlados por interruptores.
- [ ] Ninguna mención a EMS, coworking, descuentos o preventas en todo el sitio.
- [ ] Formulario probado de punta a punta: llega el correo a KORU, llega la confirmación al cliente y se abre WhatsApp.
- [ ] Revisado en 375px, 768px y 1440px de ancho, sin scroll horizontal.
- [ ] Lighthouse móvil ≥ 90 en rendimiento y accesibilidad.
- [ ] `README.md` explica cómo editar contenido, cómo cambiar el banner de campaña, cómo activar masajes y precios de membresías, y cómo desplegar en Vercel.
- [ ] `/public/images/README.md` lista todas las fotos de relleno que hay que reemplazar.
