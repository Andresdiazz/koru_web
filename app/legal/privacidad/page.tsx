import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { AvisoPendiente, LegalPage } from "@/components/ui/LegalPage";
import { privacidad } from "@/content/legal";
import { sitio } from "@/content/sitio";

export const metadata: Metadata = metaPagina({
  titulo: privacidad.titulo,
  descripcion: "Política de privacidad del sitio web de KORU.",
  ruta: "/legal/privacidad",
});

// TODO legal: KORU entrega el texto tras la revisión legal. Completar cada sección en /content/legal.ts.
export default function PrivacidadPage() {
  const doc: { titulo: string; subtitulo?: string; secciones: string[] } = privacidad;
  return (
    <LegalPage titulo={doc.titulo} subtitulo={doc.subtitulo}>
      <AvisoPendiente correo={sitio.contacto.correo} />
      <ol className="space-y-8">
        {doc.secciones.map((s, i) => (
          <li key={s}>
            <h2 className="text-3xl">
              {i + 1}. {s}
            </h2>
            <p className="mt-3 text-tostado/70 italic">Contenido pendiente de revisión legal.</p>
          </li>
        ))}
      </ol>
    </LegalPage>
  );
}
