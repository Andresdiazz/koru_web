import Link from "next/link";
import type { DocumentoLegal } from "@/content/legal";

const fecha = new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeZone: "America/Bogota" });

export const fechaLegal = (iso: string) => fecha.format(new Date(`${iso}T12:00:00-05:00`));

/** Renderiza una política: secciones numeradas con párrafos y listas. */
export function DocumentoLegalView({ doc, enlaceRelacionado }: { doc: DocumentoLegal; enlaceRelacionado?: { href: string; label: string } }) {
  return (
    <>
      <ol className="space-y-12">
        {doc.secciones.map((s, i) => (
          <li key={s.titulo} id={`seccion-${i + 1}`} className="grid scroll-mt-28 gap-3 sm:grid-cols-[3.5rem_1fr]">
            <span aria-hidden className="font-display text-4xl leading-none font-light text-terracota">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 space-y-4 text-tostado">
              <h2 className="text-3xl text-espresso">
                <span className="sr-only">{i + 1}. </span>
                {s.titulo}
              </h2>
              {s.parrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.lista && (
                <ul className="space-y-2">
                  {s.lista.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-caramelo" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.cierre?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </li>
        ))}
      </ol>
      {enlaceRelacionado && (
        <p className="mt-14 border-t border-arena pt-8">
          <Link href={enlaceRelacionado.href} className="inline-flex min-h-12 items-center font-medium text-terracota underline underline-offset-4">
            {enlaceRelacionado.label}
          </Link>
        </p>
      )}
    </>
  );
}
