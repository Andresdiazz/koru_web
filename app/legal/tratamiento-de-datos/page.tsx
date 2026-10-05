import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { AvisoPendiente, LegalPage } from "@/components/ui/LegalPage";
import { tratamientoDatos } from "@/content/legal";
import { sitio } from "@/content/sitio";

export const metadata: Metadata = metaPagina({
  titulo: tratamientoDatos.titulo,
  descripcion: "Política de tratamiento de datos personales de KORU conforme a la Ley 1581 de 2012.",
  ruta: "/legal/tratamiento-de-datos",
});

// TODO legal: KORU entrega el texto tras la revisión legal. Completar cada sección en /content/legal.ts.
export default function TratamientoDatosPage() {
  const doc: { titulo: string; subtitulo?: string; secciones: string[] } = tratamientoDatos;
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
