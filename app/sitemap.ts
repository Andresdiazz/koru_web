import type { MetadataRoute } from "next";
import { experiencias } from "@/content/experiencias";
import { sitio } from "@/content/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const rutas: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "weekly"],
    ["/experiencias-y-clases", 0.9, "monthly"],
    ["/membresias", 0.9, "monthly"],
    ["/business", 0.9, "weekly"],
    ["/business/reservar", 0.7, "monthly"],
    ["/contacto", 0.6, "yearly"],
    ["/legal/terminos-business", 0.3, "yearly"],
    ["/legal/privacidad", 0.2, "yearly"],
    ["/legal/tratamiento-de-datos", 0.2, "yearly"],
    ...experiencias.map((e) => [`/business/${e.slug}`, 0.8, "monthly"] as [string, number, "monthly"]),
  ];
  return rutas.map(([ruta, priority, changeFrequency]) => ({
    url: `${sitio.url}${ruta}`,
    lastModified: ahora,
    changeFrequency,
    priority,
  }));
}
