import { sitio } from "@/content/sitio";

const consulta = encodeURIComponent(sitio.ubicacion.consultaMapa);

/** Mapa embebido de Google (no requiere API key). */
export const mapaEmbedUrl = `https://www.google.com/maps?q=${consulta}&output=embed&hl=es`;

/** Abre Google Maps con la ruta hasta KORU. */
export const comoLlegarUrl = `https://www.google.com/maps/dir/?api=1&destination=${consulta}`;
