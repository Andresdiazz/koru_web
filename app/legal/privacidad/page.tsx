import type { Metadata } from "next";
import { DocumentoLegalView, fechaLegal } from "@/components/ui/DocumentoLegalView";
import { LegalPage } from "@/components/ui/LegalPage";
import { privacidad } from "@/content/legal";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  titulo: privacidad.titulo,
  descripcion: "Qué información recoge el sitio web de KORU, para qué la usa y cómo puedes ejercer tus derechos.",
  ruta: "/legal/privacidad",
});

export default function PrivacidadPage() {
  return (
    <LegalPage titulo={privacidad.titulo} subtitulo={`${privacidad.subtitulo} · Última actualización: ${fechaLegal(privacidad.actualizado)}`}>
      <DocumentoLegalView
        doc={privacidad}
        enlaceRelacionado={{ href: "/legal/tratamiento-de-datos", label: "Leer la política de tratamiento de datos personales" }}
      />
    </LegalPage>
  );
}
