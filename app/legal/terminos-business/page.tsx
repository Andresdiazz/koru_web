import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";
import { terminosBusiness } from "@/content/legal";

export const metadata: Metadata = metaPagina({
  titulo: "Términos y condiciones KORU Business",
  descripcion: "Condiciones de reserva, cambios, cancelaciones y participación en las experiencias corporativas de KORU.",
  ruta: "/legal/terminos-business",
});

const fecha = new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeZone: "America/Bogota" });

export default function TerminosBusinessPage() {
  return (
    <LegalPage
      titulo={terminosBusiness.titulo}
      subtitulo={`Última actualización: ${fecha.format(new Date(`${terminosBusiness.actualizado}T12:00:00-05:00`))}`}
    >
      <ol className="space-y-10">
        {terminosBusiness.clausulas.map((c, i) => (
          <li key={c.titulo} id={`clausula-${i + 1}`} className="grid scroll-mt-28 gap-3 sm:grid-cols-[3.5rem_1fr]">
            <span aria-hidden className="font-display text-4xl leading-none font-light text-terracota">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-3xl">
                <span className="sr-only">{i + 1}. </span>
                {c.titulo}
              </h2>
              <p className="mt-3 text-tostado">{c.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </LegalPage>
  );
}
