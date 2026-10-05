import type { Metadata } from "next";
import { DocumentoLegalView, fechaLegal } from "@/components/ui/DocumentoLegalView";
import { LegalPage } from "@/components/ui/LegalPage";
import { tratamientoDatos } from "@/content/legal";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  titulo: tratamientoDatos.titulo,
  descripcion: "Política de tratamiento de datos personales de KORU conforme a la Ley 1581 de 2012: finalidades, derechos y cómo presentar consultas y reclamos.",
  ruta: "/legal/tratamiento-de-datos",
});

export default function TratamientoDatosPage() {
  return (
    <LegalPage titulo={tratamientoDatos.titulo} subtitulo={`${tratamientoDatos.subtitulo} · Vigente desde: ${fechaLegal(tratamientoDatos.actualizado)}`}>
      <DocumentoLegalView
        doc={tratamientoDatos}
        enlaceRelacionado={{ href: "/legal/privacidad", label: "Leer la política de privacidad del sitio web" }}
      />
    </LegalPage>
  );
}
