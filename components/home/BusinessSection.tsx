import Image from "next/image";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sitio } from "@/content/sitio";

/** 7 · Puerta de entrada a KORU Business. */
export function BusinessSection() {
  const { business } = sitio.home;
  return (
    <Section tono="espresso" espiral="izquierda">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            <Parallax className="relative aspect-[4/5] rounded-[var(--radius-card)] sm:aspect-[5/4] lg:aspect-[4/5]" intensidad={6}>
              <Image src={business.imagen.src} alt={business.imagen.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" quality={60} className="object-cover" />
            </Parallax>
          </Reveal>
          <div>
            <SectionHeader eyebrow={business.eyebrow} titulo={business.titulo} texto={business.texto} oscuro />
            <Reveal delay={0.2} className="mt-10">
              <ButtonLink href="/business" tamano="lg">
                {business.boton}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
