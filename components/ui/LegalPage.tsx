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

/** Aviso de texto pendiente de revisión legal. */
export function AvisoPendiente({ correo }: { correo: string }) {
  return (
    <div role="note" className="mb-12 rounded-[var(--radius-card)] border border-caramelo bg-arena/40 p-6 md:p-8">
      <p className="font-display text-2xl">Texto en revisión legal</p>
      <p className="mt-2 text-tostado">
        Estamos terminando la revisión de esta política. Mientras tanto, si tienes cualquier pregunta sobre tus datos, escríbenos a{" "}
        <a href={`mailto:${correo}`} className="text-terracota underline underline-offset-4">
          {correo}
        </a>
        .
      </p>
    </div>
  );
}
