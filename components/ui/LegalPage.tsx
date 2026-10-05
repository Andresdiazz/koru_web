import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Container, Section } from "./Section";

/** Plantilla de las páginas legales: encabezado bajo + columna de lectura. */
export function LegalPage({ titulo, subtitulo, children }: { titulo: string; subtitulo?: string; children: ReactNode }) {
  return (
    <>
      <PageHero alto="bajo" eyebrow="Legal" titulo={titulo} texto={subtitulo} />
      <Section tono="crema" className="pt-16 md:pt-20">
        <Container>
          <div className="mx-auto max-w-3xl text-[1.0625rem] leading-relaxed">{children}</div>
        </Container>
      </Section>
    </>
  );
}
