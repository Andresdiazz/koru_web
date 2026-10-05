import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { porQueKoru } from "@/content/experiencias";

/** Por qué KORU: cinco razones numeradas. */
export function PorQueKoru() {
  return (
    <Section tono="tostado" espiral="izquierda">
      <Container>
        <SectionHeader eyebrow="Por qué KORU" titulo="Un club entero para tu equipo." oscuro />
        <Stagger as="ol" className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-5 lg:gap-x-8">
          {porQueKoru.map((r, i) => (
            <StaggerItem as="li" key={r.titulo} className="border-t border-caramelo/40 pt-6">
              <span className="font-display text-5xl font-light text-caramelo">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-2xl leading-tight">{r.titulo}</h3>
              <p className="mt-3 text-sm text-marfil/80">{r.texto}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
