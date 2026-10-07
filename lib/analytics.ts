/**
 * Eventos de medición (GA4 y píxel de Meta). Si las herramientas no están
 * cargadas (variables de entorno vacías), no hace nada.
 */

type Gtag = (comando: "event", nombre: string, parametros?: Record<string, unknown>) => void;
type Fbq = (comando: "track" | "trackCustom", nombre: string, parametros?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

/** Eventos que se marcan como conversión en GA4 / Google Ads. */
export type EventoKoru =
  | "whatsapp_click" // clic en cualquier botón o enlace de WhatsApp
  | "generate_lead" // solicitud de KORU Business enviada con éxito
  | "como_llegar_click" // clic en "Cómo llegar"
  | "perfil_google_click" // clic para ver el perfil y las reseñas en Google
  | "email_click" // clic en un correo
  | "promo_abierta"; // se abrió la ventana de promoción (sola o desde la pestaña)

/** Equivalencia con los eventos estándar del píxel de Meta. */
const eventoMeta: Partial<Record<EventoKoru, string>> = {
  whatsapp_click: "Contact",
  generate_lead: "Lead",
  como_llegar_click: "FindLocation",
};

export function track(evento: EventoKoru, parametros: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", evento, parametros);
    const meta = eventoMeta[evento];
    if (meta) window.fbq?.("track", meta, parametros);
  } catch {
    // La medición nunca debe romper la página
  }
}

/** Clasifica un enlace según su destino. */
export function eventoDeEnlace(href: string): EventoKoru | null {
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp_click";
  if (href.startsWith("https://www.google.com/maps/dir/")) return "como_llegar_click";
  if (/^https:\/\/maps\.google\.com\/\?cid=/.test(href)) return "perfil_google_click";
  if (href.startsWith("mailto:")) return "email_click";
  return null;
}
