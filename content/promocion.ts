import type { Promocion } from "@/types/content";

/**
 * Ventana emergente de promoción (estilo "consigue tu cupón").
 *
 * Para una campaña nueva:
 *  1. Cambia `id` (por ejemplo "fin-de-ano-2026"): así vuelve a aparecer a todos.
 *  2. Cambia textos, `imagen`, `etiqueta` y, si quieres, `desde` / `hasta`.
 *  3. `activa: false` la apaga por completo.
 *
 * Reglas de contenido: el beneficio es siempre valor agregado (una clase, un obsequio,
 * una experiencia), nunca un descuento ni un "precio antes / ahora".
 */
export const promocion: Promocion = {
  activa: true,
  id: "primera-clase-2026",

  eyebrow: "Tu primera clase",
  titulo: "Vive KORU por un día",
  texto: "Elige una clase y vívela como socio: el agua, el salón y el acompañamiento de nuestros especialistas.",
  beneficio: "Tu primera clase por $25.000",
  condiciones: "Abonables a tu primera mensualidad si te unes en los siguientes 30 días.",
  imagen: { src: "/images/clase-aqua-zumba.jpg", alt: "Clase de Aqua Zumba en la piscina de KORU" },

  boton: "Quiero mi clase",
  noGracias: "No, gracias",
  pestana: "Tu primera clase",

  mostrarEn: ["/", "/experiencias-y-clases", "/membresias", "/contacto"],
  retrasoSegundos: 3,
  scrollPorcentaje: 15,
  diasEntreApariciones: 3,

  pedirCorreo: true,
  etiqueta: "promo-primera-clase",
  autorizacion: "Autorizo a KORU a contactarme por WhatsApp y correo sobre esta y otras promociones, y a tratar mis datos según la",

  gracias: {
    titulo: "¡Listo, {nombre}!",
    texto: "Te escribiremos por WhatsApp para agendar tu clase. Si prefieres, escríbenos tú ahora mismo.",
    boton: "Agendar por WhatsApp",
  },
  mensajeWhatsApp: "Hola KORU 🌿 Soy {nombre}. Quiero agendar mi primera clase de $25.000.",
};
