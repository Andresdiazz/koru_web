import { sitio } from "@/content/sitio";

/** Enlace de WhatsApp con mensaje precargado. */
export function whatsappUrl(mensaje?: string) {
  const base = `https://wa.me/${sitio.contacto.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/** Mensaje precargado para una ruta: usa el prefijo más largo que coincida. */
export function mensajeParaRuta(pathname: string) {
  const mensajes = sitio.mensajesWhatsApp;
  const ruta = Object.keys(mensajes)
    .filter((prefijo) => prefijo === "/" ? pathname === "/" : pathname === prefijo || pathname.startsWith(`${prefijo}/`))
    .sort((a, b) => b.length - a.length)[0];
  return mensajes[ruta ?? "/contacto"] ?? mensajes["/"];
}
