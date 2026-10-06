import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { gruposGrandes } from "@/content/experiencias";
import { formatCOP } from "@/lib/format";

/** ¿Son más de 10? Jornada KORU Empresarial y Experiencia Fin de Año (precio por persona). */
export function GruposGrandes() {
  const formatos = [...new Set(gruposGrandes.formatos.map((f) => f.formato))];
  return (
    <Section tono="espresso" espiral="derecha" id="grupos-grandes">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeader eyebrow="Grupos grandes" titulo={gruposGrandes.titulo} texto={gruposGrandes.texto} oscuro />
            <Reveal delay={0.1} className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={gruposGrandes.imagen.src} alt={gruposGrandes.imagen.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" quality={75} className="object-cover" />
            </Reveal>
          </div>
          <div className="space-y-6">
            {formatos.map((nombre, i) => {
              const filas = gruposGrandes.formatos.filter((f) => f.formato === nombre);
              return (
                <Reveal key={nombre} delay={i * 0.12} className="rounded-[var(--radius-card)] bg-tostado/70 p-7 ring-1 ring-caramelo/25 md:p-9">
                  <h3 className="text-3xl md:text-4xl">{nombre}</h3>
                  <p className="mt-1 text-sm text-marfil/75">Duración: {filas[0].duracion}</p>
                  <table className="mt-6 w-full text-left">
                    <caption className="sr-only">Precios de {nombre} por número de participantes</caption>
                    <thead>
                      <tr className="text-xs tracking-[0.14em] text-arena uppercase">
                        <th scope="col" className="pb-3 font-medium">Participantes</th>
                        <th scope="col" className="pb-3 text-right font-medium">Precio por persona</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filas.map((f) => (
                        <tr key={f.participantes} className="border-t border-caramelo/25">
                          <td className="py-4">{f.participantes} personas</td>
                          <td className="py-4 text-right font-display text-2xl">{formatCOP(f.precioPersona)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Reveal>
              );
            })}
            <Reveal delay={0.25}>
              <p className="text-marfil/80">{gruposGrandes.finDeAnoIncluye}</p>
              <ButtonLink href="/business/reservar?experiencia=jornada-empresarial" variante="secundario-claro" className="mt-8">
                Solicitar propuesta
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
