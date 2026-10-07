import type { Metadata } from "next";
import { perfilGoogleUrl } from "@/lib/mapa";
import { sitio } from "@/content/sitio";

const OG_POR_DEFECTO = { url: "/images/og-koru.jpg", width: 1200, height: 630, alt: "KORU · Club de bienestar con piscina terapéutica en Cali" };

/**
 * Metadatos completos de una página. Next reemplaza (no mezcla) el objeto openGraph
 * de cada segmento, así que cada página arma el suyo completo con esta función.
 */
export function metaPagina({
  titulo,
  descripcion,
  ruta,
  imagen,
  absoluto,
  noIndex,
}: {
  titulo: string;
  descripcion: string;
  ruta: string;
  imagen?: { url: string; alt: string; width?: number; height?: number };
  /** true = el título no lleva " · KORU" al final */
  absoluto?: boolean;
  noIndex?: boolean;
}): Metadata {
  const tituloCompleto = absoluto ? titulo : `${titulo} · KORU`;
  return {
    title: absoluto ? { absolute: titulo } : titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: "KORU",
      url: ruta,
      title: tituloCompleto,
      description: descripcion,
      images: [imagen ?? OG_POR_DEFECTO],
    },
    twitter: { card: "summary_large_image", title: tituloCompleto, description: descripcion },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * Datos estructurados (schema.org) del club: HealthClub, que es un tipo de LocalBusiness.
 * La dirección, el teléfono y los horarios salen de /content/sitio.ts.
 */
export function jsonLdClub() {
  const url = sitio.url;
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "@id": `${url}/#club`,
    name: "KORU",
    alternateName: "KORU · Club de bienestar",
    description: sitio.descripcion,
    slogan: sitio.frase,
    url,
    image: `${url}/images/og-koru.jpg`,
    logo: `${url}/brand/koru-logo.png`,
    telephone: `+${sitio.contacto.whatsapp}`,
    email: sitio.contacto.correo,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: sitio.ubicacion.calle,
      addressLocality: sitio.ubicacion.ciudad,
      addressRegion: sitio.ubicacion.region,
      addressCountry: sitio.ubicacion.pais,
    },
    areaServed: { "@type": "City", name: "Cali" },
    geo: { "@type": "GeoCoordinates", latitude: sitio.ubicacion.googleMaps.lat, longitude: sitio.ubicacion.googleMaps.lng },
    hasMap: perfilGoogleUrl,
    openingHoursSpecification: sitio.horarios
      .filter((h) => h.schema)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.schema!.dias.map((d) => `https://schema.org/${d}`),
        opens: h.schema!.abre,
        closes: h.schema!.cierra,
      })),
    sameAs: [perfilGoogleUrl, ...Object.values(sitio.redes).filter((r) => !/\.com\/?$/.test(r))],
    amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "Piscina terapéutica", value: true }],
  };
}

/** Script JSON-LD seguro (escapa "<" para evitar inyección). */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
