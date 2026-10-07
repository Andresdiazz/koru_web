import type { Clase } from "@/types/content";

/**
 * Clases de KORU. El orden de este arreglo es el orden en que aparecen:
 * primero piscina, luego salón.
 */
export const clases: Clase[] = [
  {
    slug: "aqua-zumba",
    nombre: "Aqua Zumba",
    tipo: "piscina",
    descripcion: "Ritmo y baile dentro del agua.",
    formato: "Grupal guiada",
    imagen: { src: "/images/clase-aqua-zumba.jpg", alt: "Instructor dirigiendo una clase de Aqua Zumba desde el borde de la piscina" },
  },
  {
    slug: "hidrogym",
    nombre: "Hidrogym",
    tipo: "piscina",
    descripcion: "Acondicionamiento físico en el agua, de bajo impacto.",
    formato: "Grupal guiada",
    imagen: { src: "/images/clase-hidrogym.jpg", alt: "Clase de Hidrogym con mancuernas de agua en la piscina de KORU" },
  },
  {
    slug: "hidroterapia",
    nombre: "Hidroterapia",
    tipo: "piscina",
    descripcion: "Sesión terapéutica con especialista.",
    descripcionLarga:
      "Una sesión uno a uno en la piscina terapéutica, diseñada para tu cuerpo y tu momento. El agua sostiene tu peso, reduce el impacto y te permite moverte con libertad mientras un especialista guía cada ejercicio. Es el corazón de KORU: más de 10 años de experiencia de AQUA FIT en Cali.",
    formato: "Individual",
    destacada: true,
    imagen: { src: "/images/hidroterapia.jpg", alt: "Sesión de hidroterapia con aros de resistencia en la piscina terapéutica" },
  },
  {
    slug: "hidroterapia-a-domicilio",
    nombre: "Hidroterapia a domicilio",
    tipo: "piscina",
    descripcion: "La misma sesión, en la piscina del cliente.",
    formato: "Individual, pareja o grupal",
    soloEnDetalle: true,
    imagen: { src: "/images/hidroterapia-domicilio.jpg", alt: "Hidroterapeuta de KORU guiando una sesión en la piscina de una casa" },
  },
  {
    slug: "pilates",
    nombre: "Pilates",
    tipo: "salon",
    descripcion: "Fuerza, control y postura desde el centro del cuerpo.",
    formato: "Grupal",
    imagen: { src: "/images/clase-pilates.jpg", alt: "Clase de Pilates con balones en el salón de KORU" },
  },
  {
    slug: "yoga",
    nombre: "Yoga",
    tipo: "salon",
    descripcion: "Movimiento consciente, respiración y flexibilidad.",
    formato: "Grupal",
    imagen: { src: "/images/clase-yoga.jpg", alt: "Instructora acompañando una postura de yoga en el salón de KORU" },
  },
  {
    slug: "rumba",
    nombre: "Rumba",
    tipo: "salon",
    descripcion: "Ritmo, baile y cardio en un mismo espacio: la clase más social del club.",
    formato: "Grupal",
    imagen: { src: "/images/clase-rumba.jpg", alt: "Grupo bailando en una clase de Rumba en el salón de KORU" },
  },
  {
    slug: "cardio-step",
    nombre: "Cardio Step",
    tipo: "salon",
    descripcion: "Cardio de impacto controlado sobre step.",
    formato: "Grupal",
    imagen: { src: "/images/clase-cardio-step.jpg", alt: "Clase grupal de Cardio Step en el salón de KORU" },
  },
  {
    slug: "cardio-box",
    nombre: "Cardio Box",
    tipo: "salon",
    descripcion: "Ejercicio de alta intensidad con técnica de boxeo.",
    formato: "Grupal",
    imagen: { src: "/images/clase-cardio-box.jpg", alt: "Clase de Cardio Box con técnica de boxeo en el salón de KORU" },
  },
];

/** Textos de la página /experiencias-y-clases. */
export const paginaClases = {
  hero: {
    eyebrow: "Experiencias y clases",
    titulo: "Del agua al salón, siempre con intención.",
    texto: "Clases de piscina guiadas por especialistas, clases de salón en grupos pequeños y sesiones de hidroterapia uno a uno.",
    imagen: { src: "/images/piscina-escalones.jpg", alt: "Escalera de acceso a la piscina terapéutica de KORU" },
  },
  piscina: {
    eyebrow: "En el agua",
    titulo: "Piscina terapéutica, no recreacional.",
    texto: "Cada sesión en el agua la guía un especialista. El agua sostiene tu cuerpo y te deja moverte con libertad.",
  },
  hidroterapia: {
    eyebrow: "Servicio estrella",
    boton: "Agenda tu sesión",
    mensaje: "Hola KORU 🌿 Quiero agendar una sesión de hidroterapia.",
    mensajeDomicilio: "Hola KORU 🌿 Quiero información sobre hidroterapia a domicilio.",
  },
  salon: {
    eyebrow: "En el salón",
    titulo: "Movimiento en grupos pequeños.",
    texto: "Pilates, Yoga, Rumba, Cardio Step y Cardio Box con instructores que te conocen por tu nombre.",
  },
};
