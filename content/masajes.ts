import type { ConfigMasajes } from "@/types/content";

/**
 * Masajes.
 *
 * INTERRUPTOR: `disponible`
 *  - false → la sección dice "Próximamente", no muestra precios y el botón
 *            invita a escribir por WhatsApp para recibir aviso.
 *  - true  → aparecen los precios y el botón de agendar. También aparece la
 *            fila de masaje en la tabla de membresías.
 */
export const masajes: ConfigMasajes = {
  disponible: false,

  titulo: "Masajes",
  tituloProximamente: "Masajes — Próximamente",
  // TODO copy
  textoProximamente: "Estamos preparando la sala para que tu recuperación también sea una experiencia KORU.",
  // TODO copy
  texto: "Manos expertas para soltar, recuperar y volver a ti.",
  botonAviso: "Quiero que me avisen",
  mensajeAviso: "Hola, quiero que me avisen cuando abran los masajes en KORU 🌿",
  botonAgendar: "Agenda tu masaje",
  mensajeAgendar: "Hola KORU 🌿 Quiero agendar un masaje.",

  imagen: { src: "/images/masajes.jpg", alt: "Masaje con piedras calientes y flores sobre la espalda" },

  masajes: [
    { nombre: "Express", duracionMin: 30, precio: 70000 },
    { nombre: "Relajante", duracionMin: 60, precio: 120000 },
    { nombre: "Deportivo / recuperación", duracionMin: 60, precio: 130000 },
    { nombre: "Terapéutico", duracionMin: 60, precio: 140000 },
  ],
};
