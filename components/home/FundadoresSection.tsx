import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sitio } from "@/content/sitio";

/** 8 · Los fundadores. */
export function FundadoresSection() {
  const { fundadores } = sitio.home;
  return (
    <Section tono="marfil">
      <Container>
        <SectionHeader eyebrow={fundadores.eyebrow} titulo={fundadores.titulo} />
        <Stagger as="ul" className="mt-16 grid gap-12 sm:grid-cols-2 md:mt-20 lg:gap-20" intervalo={0.2}>
          {sitio.fundadores.map((f, i) => (
            <StaggerItem as="li" key={f.nombre} className={i === 1 ? "sm:mt-24" : undefined}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-arena">
                  <Image src={f.imagen.src} alt={f.imagen.alt} fill sizes="(min-width: 640px) 45vw, 100vw" quality={75} className="object-cover" />
                </div>
                <figcaption className="mt-8">
                  <p className="eyebrow text-terracota">{f.rol}</p>
                  <h3 className="mt-3 text-4xl">{f.nombre}</h3>
                  <p className="mt-4 max-w-md text-tostado">{f.bio}</p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
