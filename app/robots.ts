import type { MetadataRoute } from "next";
import { sitio } from "@/content/sitio";

export default function robots(): MetadataRoute.Robots {
  // En los despliegues de vista previa de Vercel no se indexa nada.
  const esProduccion = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return {
    rules: esProduccion ? { userAgent: "*", allow: "/", disallow: ["/api/", "/sistema-de-diseno"] } : { userAgent: "*", disallow: "/" },
    sitemap: `${sitio.url}/sitemap.xml`,
  };
}
