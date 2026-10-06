import type {
  Experiencia,
  FormatoGrupoGrande,
  Necesidad,
  RazonKoru,
  ServicioAnual,
} from "@/types/content";

/**
 * KORU Business: experiencias privadas, grupos grandes y bienestar todo el año.
 * Los precios de KORU Business SÍ se publican, siempre por grupo.
 */

export const business = {
  hero: {
    titulo: "Tu equipo no necesita otro evento. Necesita una experiencia.",
    texto: "Bienestar, conexión y crecimiento en una experiencia 360°.",
    boton: "Descubre más",
    imagen: { src: "/images/business-hero.jpg", alt: "Equipo de trabajo sentado en mats en el salón de KORU durante una experiencia de bienestar" },
  },
  preguntaNecesidad: "¿Qué quieres regalarle a tu equipo?",
  tituloExperiencias: "Experiencias que van más allá de un evento.",
  subtituloExperiencias: "Diseñadas para conectar, cuidar, celebrar y crecer juntos.",
  capacidadTexto: "Hasta 10 personas",
  botonExperiencia: "Conocer experiencia",
  botonReservar: "Reservar esta experiencia",
  botonHablar: "Hablar con KORU",
  serviciosAdicionales:
    "Decoración, fotografía profesional, transporte u otros servicios, con costo adicional informado antes.",
  condicionesResumen: [
    "La reserva se confirma con el pago del 50% del valor total.",
    "El valor es por grupo y no cambia si asisten menos participantes.",
    "Cambios de fecha con mínimo 72 horas de anticipación, sujetos a disponibilidad.",
    "La propuesta económica tiene una vigencia de 15 días calendario.",
  ],
  /** Textos del formulario /business/reservar */
  reserva: {
    eyebrow: "KORU Business",
    titulo: "Reserva tu experiencia",
    texto: "Cuéntanos sobre tu equipo y te enviamos una propuesta con disponibilidad. No hay pagos en línea: la reserva se confirma después, con el 50% del valor.",
    pasosComoFunciona: [
      { titulo: "Envías tu solicitud", texto: "Toma menos de dos minutos." },
      { titulo: "Recibes la propuesta", texto: "En máximo 2 días hábiles, con fechas y detalles." },
      { titulo: "Confirmas tu fecha", texto: "Con el pago del 50% del valor total." },
    ],
    avisoGrupoGrande:
      "Las experiencias privadas son para máximo 10 personas. Para tu grupo te recomendamos la Jornada KORU Empresarial o la Experiencia Fin de Año.",
    botonEnviar: "Enviar solicitud",
    gracias: {
      titulo: "¡Gracias, {nombre}!",
      texto: "Recibimos tu solicitud y te enviamos una confirmación a {correo}. En máximo 2 días hábiles te contactamos con la propuesta.",
      botonWhatsApp: "Enviar resumen por WhatsApp",
      botonVolver: "Volver a KORU Business",
    },
  },
  cierre: {
    titulo: "Haz de tu próximo encuentro una experiencia para recordar.",
    texto: "Cuéntanos qué necesita tu equipo y te enviamos una propuesta a la medida.",
    botonReservar: "Reserva tu fecha",
    botonWhatsApp: "Escríbenos por WhatsApp",
  },
};

export const necesidades: Necesidad[] = [
  {
    id: "conectar",
    label: "Conectar",
    descripcion: "Fortalecer vínculos y crear nuevas formas de conectar.",
    experiencia: "conecta-tu-equipo",
  },
  {
    id: "desconectar",
    label: "Desconectar",
    descripcion: "Bajar el ritmo, liberar la mente y volver a lo esencial.",
    experiencia: "mente-en-calma",
  },
  {
    id: "bienestar",
    label: "Bienestar",
    descripcion: "Regalar una pausa para cuidar, respirar y recargar.",
    experiencia: "womens-wellness",
  },
  {
    id: "celebrar",
    label: "Celebrar",
    descripcion: "Reconocer lo logrado y celebrar juntos.",
    experiencia: "aqua-party",
  },
  {
    id: "vivir-koru",
    label: "Vivir KORU",
    descripcion: "Una experiencia 360° para conectar, cuidar y disfrutar.",
    experiencia: "team-connection-day",
  },
];

export const experiencias: Experiencia[] = [
  {
    slug: "conecta-tu-equipo",
    necesidad: "conectar",
    nombre: "Conecta tu equipo fuera de la oficina",
    nombreCorto: "Conecta tu equipo",
    frase: "Una pausa fuera de la oficina para volver a conectar.",
    paraQuien: "Equipos comerciales, líderes y áreas pequeñas.",
    incluye: [
      "Dinámica de conexión",
      "Sesión de Hidrogym",
      "Reto por equipos",
      "Espacio de conversación",
      "Cierre con respiración guiada de 10 minutos",
      "Snack saludable: pinchos de frutas con cobertura de chocolate, o parfait de yogur griego, queso cottage, frutas y granola",
    ],
    duracion: "Media jornada (4 horas aprox.)",
    capacidad: 10,
    modalidades: [{ id: "unica", nombre: "Experiencia completa", precio: 1200000 }],
    imagen: { src: "/images/exp-conecta-tu-equipo.jpg", alt: "Equipo conversando en los sillones de la zona social de KORU" },
  },
  {
    slug: "womens-wellness",
    necesidad: "bienestar",
    nombre: "KORU Women's Wellness",
    nombreCorto: "Women's Wellness",
    frase: "Una experiencia para reconocerse, conectar y cuidar de sí mismas.",
    paraQuien: "Equipos femeninos.",
    incluye: [
      "Espacio privado en KORU",
      "Yoga y movimiento consciente",
      "Dinámica “Me reconozco” (participación voluntaria)",
      "Sesión acuática grupal a elección: Hidrogym, Aqua Zumba o Hidromix",
      "Mini taller de bienestar de 45 minutos",
      "Dinámica “Una mujer que admiro y quiero agradecer”",
      "Charla de 15 minutos sobre suplementación con SAISEI",
      "Bebida saludable y snack: barra de granola, palitos de zanahoria horneados con hummus, bocadillos de pan integral, pollo o atún, pinchos de pollo o carne",
      "Fotografías del evento",
    ],
    duracion: "6 horas aprox.",
    capacidad: 10,
    modalidades: [
      { id: "esencial", nombre: "Esencial", precio: 1200000 },
      {
        id: "profesional-invitada",
        nombre: "Con profesional invitada",
        precio: 1800000,
        descripcion: "Profesional invitada (nutrición, psicología o salud) y obsequio SAISEI para cada participante.",
      },
    ],
    imagen: { src: "/images/exp-womens-wellness.jpg", alt: "Grupo de mujeres en una sesión de yoga y meditación en el salón de KORU" },
  },
  {
    slug: "mente-en-calma",
    necesidad: "desconectar",
    nombre: "KORU Mente en Calma",
    nombreCorto: "Mente en Calma",
    frase: "Una pausa para bajar el ruido y volver a ti.",
    paraQuien: "Equipos con alta carga que necesitan bienestar emocional.",
    incluye: [
      "Presentación y conversación sobre las tensiones del día a día",
      "Yoga a ciegas: respiración, meditación guiada, movimiento consciente y relajación con música",
      "Experiencia acuática guiada por especialista",
      "Dinámica “Lo que quiero soltar” y mandalas",
      "Infusión caliente en un espacio de silencio",
      "Material impreso",
      "Almuerzo saludable",
    ],
    duracion: "7 horas aprox.",
    capacidad: 10,
    modalidades: [
      { id: "equipo-koru", nombre: "Guiada por el equipo KORU", precio: 1500000 },
      {
        id: "profesional",
        nombre: "Guiada por profesional especializado",
        precio: 1800000,
        descripcion: "Acompañamiento de una psicóloga o coach de vida.",
      },
    ],
    imagen: { src: "/images/exp-mente-en-calma.jpg", alt: "Grupo sentado en círculo durante una dinámica de calma y conversación" },
  },
  {
    slug: "aqua-party",
    necesidad: "celebrar",
    nombre: "KORU Aqua Party Corporativa",
    nombreCorto: "Aqua Party",
    frase: "Tu equipo merece celebrar diferente.",
    paraQuien: "Cumpleaños de empresa, cierre de semestre o de año, celebración de metas.",
    incluye: [
      "Decoración temática",
      "Aqua Zumba, Hidromix y juegos en piscina",
      "Rumba dirigida",
      "Competencias amistosas",
      "Reconocimientos y detalle individual",
      "Experiencia de relajación",
      "Bebida y snack saludable",
      "Fotografía",
    ],
    duracion: "7 horas aprox.",
    capacidad: 10,
    modalidades: [
      { id: "base", nombre: "Base", precio: 1200000 },
      { id: "almuerzo", nombre: "Con almuerzo saludable", precio: 1800000 },
    ],
    botonPrincipal: "Quiero celebrar en KORU",
    imagen: { src: "/images/exp-aqua-party.jpg", alt: "Celebración corporativa en la piscina de KORU con globos dorados y Aqua Zumba" },
  },
  {
    slug: "team-connection-day",
    necesidad: "vivir-koru",
    nombre: "KORU Team Connection Day",
    nombreCorto: "Team Connection Day",
    frase: "Horas de bienestar para desconectarse juntos.",
    paraQuien: "Equipos que quieren salir de la rutina y fortalecer su conexión.",
    incluye: [
      "Actividad para romper el hielo",
      "Yoga y movilidad",
      "Pilates Mat",
      "Experiencia acuática guiada",
      "Relajación",
      "Snack saludable",
    ],
    duracion: "6 horas aprox.",
    capacidad: 10,
    modalidades: [{ id: "unica", nombre: "Experiencia completa", precio: 1200000 }],
    imagen: { src: "/images/exp-team-connection-day.jpg", alt: "Equipo haciendo Pilates Mat en el salón de KORU" },
  },
];

/* ───────────── Grupos de más de 10 (precio por persona) ───────────── */

export const gruposGrandes = {
  titulo: "¿Son más de 10?",
  texto: "Para grupos grandes diseñamos una jornada completa a la medida de tu empresa.",
  imagen: { src: "/images/exp-grupos-grandes.jpg", alt: "Grupo grande de una empresa reunido en la zona social de KORU" },
  formatos: [
    { formato: "Jornada KORU Empresarial", participantes: "11 – 14", minimo: 11, maximo: 14, duracion: "Según propuesta", precioPersona: 185000 },
    { formato: "Jornada KORU Empresarial", participantes: "15 – 20", minimo: 15, maximo: 20, duracion: "Según propuesta", precioPersona: 170000 },
    { formato: "Experiencia Fin de Año KORU", participantes: "15 – 19", minimo: 15, maximo: 19, duracion: "4 horas", precioPersona: 245000 },
    { formato: "Experiencia Fin de Año KORU", participantes: "20 – 30", minimo: 20, maximo: 30, duracion: "4 horas", precioPersona: 225000 },
  ] satisfies FormatoGrupoGrande[],
  finDeAnoIncluye:
    "La Experiencia Fin de Año incluye todo lo de la Jornada, más bebida de bienvenida y ambientación, cierre de año guiado por Andrés, kit SAISEI para cada participante y video editado.",
};

/* ───────────── Bienestar todo el año ───────────── */

export const bienestarTodoElAno = {
  titulo: "Bienestar todo el año",
  texto: "Más allá de un día especial: acompañamos a tu empresa con programas continuos.",
  servicios: [
    {
      id: "diagnostico",
      nombre: "Diagnóstico de Bienestar Laboral",
      detalle: "Sesión de 45 minutos con Talento Humano o SST.",
      precios: [],
      notaPrecio: "Sin costo",
    },
    {
      id: "pausas-activas",
      nombre: "Pausas Activas KORU en su empresa",
      detalle: "45 minutos, hasta 25 personas, con informe de asistencia.",
      precios: [
        { label: "Sesión", precio: 380000 },
        { label: "Pack 4 sesiones", precio: 1320000 },
        { label: "Pack 12 sesiones", precio: 3600000 },
      ],
    },
    {
      id: "charla",
      nombre: "Charla de bienestar en su empresa",
      detalle: "60 minutos, hasta 40 personas.",
      precios: [{ label: "Charla", precio: 450000 }],
    },
    {
      id: "plan-corporativo",
      nombre: "Plan Bienestar Corporativo",
      detalle: "Membresías para colaboradores desde 5 personas, contrato mínimo de 6 meses.",
      precios: [],
      notaPrecio: "Condiciones en propuesta formal",
    },
    {
      id: "tiquetera",
      nombre: "Tiquetera Corporativa",
      detalle: "Ingresos al club para tus colaboradores. Vigencia de 6 meses.",
      precios: [
        { label: "50 ingresos", precio: 2200000 },
        { label: "100 ingresos", precio: 4000000 },
      ],
    },
    {
      id: "hidroterapia-directivos",
      nombre: "Hidroterapia a domicilio para directivos",
      detalle: "Sesiones individuales en la piscina de tu elección.",
      precios: [],
      notaPrecio: "Cotización a la medida",
    },
  ] satisfies ServicioAnual[],
};

/* ───────────── Por qué KORU ───────────── */

export const porQueKoru: RazonKoru[] = [
  { titulo: "Piscina terapéutica", texto: "No recreacional: cada actividad en el agua la guía un especialista." },
  { titulo: "Dos especialistas al frente", texto: "Andrés Díaz en hidroterapia y Sandra Alvarez en nutrición SAISEI." },
  { titulo: "Privada y limitada", texto: "Recibimos un grupo a la vez. El club es solo para tu equipo." },
  { titulo: "Experiencia 360°", texto: "Agua, movimiento, conversación y alimentación en un mismo día." },
  { titulo: "Personalizable", texto: "Ajustamos actividades, tiempos y detalles a lo que necesita tu equipo." },
];

/* ───────────── Utilidades de consulta ───────────── */

export function getExperiencia(slug: string) {
  return experiencias.find((e) => e.slug === slug);
}

export function precioDesde(experiencia: Experiencia) {
  return Math.min(...experiencia.modalidades.map((m) => m.precio));
}
