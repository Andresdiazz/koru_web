import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MembershipCard } from "@/components/membresias/MembershipCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { membresias } from "@/content/membresias";
import { sitio } from "@/content/sitio";

/** 6 · Las tres membresías, con Flow destacada. */
export function MembresiasSection() {
  const { membresias: textos } = sitio.home;
  return (
    <Section tono="crema">
      <Container>
        <SectionHeader eyebrow={textos.eyebrow} titulo={textos.titulo} texto={membresias.intro} centrado />
        <Stagger as="ul" className="mt-16 grid gap-8 md:mt-20 lg:grid-cols-3 lg:items-center lg:gap-6">
          {membresias.planes.map((plan) => (
            <StaggerItem as="li" key={plan.id} className={plan.destacada ? "max-lg:order-first" : undefined}>
              <MembershipCard plan={plan} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-14 flex flex-col items-center gap-4 text-center md:mt-20">
          <p className="text-sm text-tostado">{membresias.notaInscripcion}</p>
          <ButtonLink href="/membresias" variante="secundario" tamano="lg">
            {textos.boton}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
