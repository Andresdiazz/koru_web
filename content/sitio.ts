import type {
  EnlaceNav,
  FlagsFase3,
  Fundador,
  Horario,
  ItemGaleria,
  Pilar,
  Testimonio,
} from "@/types/content";

/**
 * Datos generales del sitio: contacto, navegación, textos de marca,
 * fundadores, testimonios y galería.
 */
export const sitio = {
  nombre: "KORU",
  frase: "Aquí no entrenas. ¡Aquí renaces!",
  descripcion:
    "Un club de bienestar boutique en Cali con piscina terapéutica donde cada sesión la guía un especialista.",
  fraseCierre: "Haz de tu próximo encuentro una experiencia para recordar.",

  /**
   * URL pública. Prioridad: NEXT_PUBLIC_SITE_URL → URL de producción que asigna Vercel → localhost.
   * Cuando se conecte el dominio, basta con definir NEXT_PUBLIC_SITE_URL.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),

  contacto: {
    /** Número en formato internacional, solo dígitos (57 + celular). */
    whatsapp: "573103012510",
    whatsappVisible: "+57 310 301 2510",
    correo: "reservas@koruclub.co",
    /** Correo que recibe las solicitudes del formulario de KORU Business */
    correoReservas: "reservas@koruclub.co",
  },

  ubicacion: {
    sede: "Cali – El Ingenio",
    direccion: "Carrera 85A #15-59, El Ingenio, Cali",
    /** Solo calle y número, para los datos estructurados de Google */
    calle: "Carrera 85A #15-59",
    ciudad: "Cali",
    region: "Valle del Cauca",
    pais: "CO",
    /** Perfil de Empresa en Google: identificador (CID) y coordenadas del pin */
    googleMaps: { cid: "8273799209562172129", lat: 3.3820276, lng: -76.5297278 },
  },

  /**
   * Horarios. `dias`/`horas` se muestran en el sitio; `schema` alimenta los datos
   * estructurados para Google (días en inglés y horas en 24 h). Sin `schema` = no se publica.
   */
  horarios: [
    { dias: "Lunes a viernes", horas: "5:00 a. m. – 9:00 p. m.", schema: { dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], abre: "05:00", cierra: "21:00" } },
    { dias: "Sábados", horas: "7:00 a. m. – 2:00 p. m.", schema: { dias: ["Saturday"], abre: "07:00", cierra: "14:00" } },
    { dias: "Domingos y festivos", horas: "Solo experiencias con reserva" },
  ] satisfies Horario[],

  /** Redes sociales. Para agregar una red, añádela aquí y en el ícono del footer. */
  redes: {
    instagram: "https://www.instagram.com/koruclub.co/",
    tiktok: "https://www.tiktok.com/@koruclub.co",
  },

  navegacion: [
    { label: "Sobre KORU", href: "/#club" },
    { label: "Experiencias y clases", href: "/experiencias-y-clases" },
    { label: "Membresías", href: "/membresias" },
    { label: "KORU Business", href: "/business" },
    { label: "Contacto", href: "/contacto" },
  ] satisfies EnlaceNav[],

  legal: [
    { label: "Términos KORU Business", href: "/legal/terminos-business" },
    { label: "Política de privacidad", href: "/legal/privacidad" },
    { label: "Tratamiento de datos", href: "/legal/tratamiento-de-datos" },
  ] satisfies EnlaceNav[],

  /**
   * Mensaje precargado del botón flotante de WhatsApp según la página.
   * Se usa el prefijo de ruta más largo que coincida.
   */
  /** Mensaje del botón "Reserva ahora" del pie de página */
  mensajeReserva: "Hola KORU 🌿 Quiero hacer una reserva.",

  mensajesWhatsApp: {
    "/": "Hola KORU 🌿 Quiero agendar mi primera clase.",
    "/experiencias-y-clases": "Hola KORU 🌿 Quiero información sobre las clases.",
    "/membresias": "Hola KORU 🌿 Quiero conocer las membresías.",
    "/business": "Hola KORU 🌿 Quiero información sobre KORU Business para mi empresa.",
    "/business/reservar": "Hola KORU 🌿 Tengo una pregunta sobre la reserva de una experiencia para mi empresa.",
    "/contacto": "Hola KORU 🌿",
  } as Record<string, string>,

  /** Textos de las secciones del home, en orden de aparición. */
  home: {
    hero: {
      titulo: "Aquí no entrenas. ¡Aquí renaces!",
      texto:
        "Un club de bienestar boutique en Cali con piscina terapéutica donde cada sesión la guía un especialista.",
      botonPrincipal: "Agenda tu primera clase",
      botonSecundario: "Conoce el club",
      imagen: { src: "/images/piscina-hero.jpg", alt: "Piscina terapéutica de KORU con columnas, agua turquesa y luz cálida" },
      /** Video en loop. Si el archivo no existe en /public, se muestra solo la imagen. */
      video: { mp4: "/video/piscina-hero.mp4", mp4Movil: "/video/piscina-hero-movil.mp4", webm: "/video/piscina-hero.webm" },
    },
    club: {
      eyebrow: "Conocer KORU",
      titulo: "Somos un club de bienestar.",
      texto: "Aquí la experiencia es nuestro producto: agua, movimiento y nutrición guiados por especialistas, en clases semipersonalizadas y sin afanes.",
      /** Cifras que se cuentan al aparecer. */
      cifras: [
        { valor: 10, prefijo: "+", sufijo: "", label: "años de experiencia en hidroterapia" },
        { valor: 1, prefijo: "", sufijo: "", label: "piscina terapéutica, no recreacional" },
        { valor: 100, prefijo: "", sufijo: "%", label: "de las sesiones en el agua y grupales guiadas por especialistas" },
      ],
    },
    piscina: {
      eyebrow: "La piscina",
      lineas: ["“En el agua nadie queda por fuera:", "cada cuerpo encuentra", "su propio ritmo.”"],
      boton: "Ver clases de piscina",
      imagen: { src: "/images/piscina-parallax.jpg", alt: "Piscina de KORU con el logo de AQUA FIT en la pared de piedra y plantas" },
    },
    clases: {
      eyebrow: "Clases",
      titulo: "Del agua al salón.",
      texto: "Tu experiencia inicia en el agua, guiada por un especialista, y termina en el salón con clases semipersonalizadas. Elige cómo quieres moverte hoy.",
      boton: "Ver todas las clases",
    },
    membresias: {
      eyebrow: "Membresías",
      titulo: "Elige cómo vivir KORU.",
      boton: "Ver membresías",
    },
    business: {
      eyebrow: "KORU Business",
      titulo: "Tu equipo no necesita otro evento. Necesita una experiencia.",
      texto: "Experiencias privadas de bienestar para equipos de hasta 10 personas: agua, movimiento, conversación y alimentación saludable.",
      boton: "Conoce KORU Business",
      imagen: { src: "/images/exp-team-connection-day.jpg", alt: "Equipo haciendo Pilates Mat en el salón de KORU" },
    },
    fundadores: {
      eyebrow: "Los fundadores",
      titulo: "Dos especialistas, un mismo propósito.",
    },
    galeria: {
      eyebrow: "El club",
      titulo: "Un lugar pensado para volver a ti.",
    },
    testimonios: {
      eyebrow: "Lo que dicen de KORU",
      titulo: "Historias de socios.",
    },
    ubicacion: {
      eyebrow: "Ubicación",
      titulo: "Te esperamos en El Ingenio.",
      botonComoLlegar: "Cómo llegar",
      botonWhatsApp: "Escríbenos por WhatsApp",
    },
  },

  /** Textos de la página /contacto. */
  contactoPagina: {
    eyebrow: "Contacto",
    titulo: "Hablemos.",
    texto: "Escríbenos por WhatsApp para agendar tu primera clase, resolver dudas o planear una experiencia para tu equipo.",
  },

  pilares: [
    {
      icono: "agua",
      titulo: "Agua que sana",
      texto:
        "Piscina terapéutica, no recreacional. Hidroterapia, Hidrogym y Aqua Zumba siempre guiados por un especialista.",
    },
    {
      icono: "movimiento",
      titulo: "Movimiento con intención",
      texto: "Pilates, Yoga, Rumba, Cardio Step y Cardio Box en clases semipersonalizadas.",
    },
    {
      icono: "nutricion",
      titulo: "Nutrición SAISEI",
      texto: "Asesoría y suplementación para acompañar tu proceso.",
    },
  ] satisfies Pilar[],

  fundadores: [
    {
      nombre: "Andrés Díaz",
      rol: "Hidroterapeuta · Fundador de AQUA FIT",
      bio: "Más de 10 años de experiencia guiando personas en el agua. Cree que el movimiento sin dolor es el primer paso para volver a confiar en el cuerpo.",
      imagen: {
        src: "/images/fundador-andres.jpg",
        alt: "Andrés Díaz, hidroterapeuta y cofundador de KORU, junto a la piscina",
      },
    },
    {
      nombre: "Sandra Alvarez",
      rol: "Fundadora de SAISEI",
      bio: "Acompaña a cada socio desde la nutrición, con asesoría cercana y suplementación pensada para su proceso, no para una moda.",
      imagen: {
        src: "/images/fundadora-sandra.jpg",
        alt: "Sandra Alvarez, fundadora de SAISEI y cofundadora de KORU, frente al logo de SAISEI",
      },
    },
  ] satisfies Fundador[],

  /**
   * Testimonios del home (Fase 3: se podrán sumar reseñas de Google).
   * Solo se publican los que tienen `autorizado: true`: la persona aceptó que su
   * testimonio y su nombre aparezcan en la web (Ley 1581). Si ninguno está autorizado,
   * la sección se oculta.
   */
  testimonios: [
    {
      nombre: "Juana Valentina",
      detalle: "Viajó desde Bogotá",
      texto:
        "Viajé desde Bogotá a Cali solo para visitar KORU y hacer terapias en el agua. Mejoró mi mente, y me encontré con que KORU no solo hacía terapia física: aproveché y tomé clases de yoga y Pilates.",
      autorizado: true,
    },
    {
      nombre: "Diana H.",
      detalle: "Socia KORU",
      texto: "Me siento como otra persona. Mi ánimo es completamente diferente.",
      autorizado: true,
    },
    {
      nombre: "Cristina U.",
      detalle: "Clase de Hidromix",
      texto: "Fue una experiencia excelente. Valoro mucho la orientación profesional del profe.",
      autorizado: true,
    },
  ] satisfies Testimonio[],

  /** Testimonios de empresas para /business. Si está vacío, la sección se oculta. */
  testimoniosEmpresas: [] as Testimonio[],

  galeria: [
    { src: "/images/piscina-escalones.jpg", alt: "Escalera de acceso a la piscina terapéutica de KORU", formato: "grande" },
    { src: "/images/sala-fisioterapia.jpg", alt: "Sala de fisioterapia de KORU con camilla y equipos", formato: "normal" },
    { src: "/images/clase-pilates.jpg", alt: "Salón de yoga y Pilates de KORU durante una clase con balones", formato: "alto" },
    { src: "/images/recepcion.jpg", alt: "Recepción de KORU con los logos de SAISEI y AQUA FIT", formato: "ancho" },
    { src: "/images/zona-social.jpg", alt: "Zona social de KORU con mesas, plantas y letrero de neón", formato: "normal" },
    { src: "/images/tienda-saisei.jpg", alt: "Productos y suplementos de la tienda SAISEI", formato: "normal" },
    { src: "/images/fachada.jpg", alt: "Fachada blanca de la sede KORU en El Ingenio, con palmera", formato: "alto" },
    { src: "/images/sala-masajes.jpg", alt: "Sala de masajes de KORU con camilla, velas y luz cálida", formato: "normal" },
    { src: "/images/exp-team-connection-day.jpg", alt: "Equipo haciendo Pilates Mat en el salón de KORU", formato: "ancho" },
  ] satisfies ItemGaleria[],

  /** Preparado para la Fase 3. No activar todavía. */
  fase3: {
    iniciarSesion: false,
    idiomas: false,
    giftCards: false,
    tienda: false,
  } satisfies FlagsFase3,
};
