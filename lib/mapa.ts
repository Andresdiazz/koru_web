import { sitio } from "@/content/sitio";

const { cid, lat, lng } = sitio.ubicacion.googleMaps;

/** Mapa embebido de Google (no requiere API key). Por dirección, que muestra pin y ficha. */
const direccionMapa = encodeURIComponent(`${sitio.ubicacion.direccion}, Valle del Cauca, Colombia`);
export const mapaEmbedUrl = `https://www.google.com/maps?q=${direccionMapa}&output=embed&hl=es`;

/** Abre Google Maps con la ruta hasta el pin exacto de KORU. */
export const comoLlegarUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

/** Perfil de Empresa en Google Maps (ficha con reseñas, fotos y horarios). */
export const perfilGoogleUrl = `https://maps.google.com/?cid=${cid}`;
