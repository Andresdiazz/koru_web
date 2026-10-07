import { Counter } from "@/components/motion/Counter";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { sitio } from "@/content/sitio";

/** 2 · Somos un club de bienestar: tres pilares + cifras. */
export function ClubSection() {
  const { club } = sitio.home;
  return (
    <Section tono="crema" id="club" className="scroll-mt-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <SectionHeader eyebrow={club.eyebrow} titulo={club.titulo} />
          <p className="max-w-lg text-lg text-tostado lg:pb-2">{club.texto}</p>
        </div>

        <Stagger as="ul" className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3">
          {sitio.pilares.map((p) => (
            <StaggerItem
              as="li"
              key={p.titulo}
              className="group rounded-[var(--radius-card)] border border-arena bg-marfil p-8 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-caramelo/60 hover:shadow-(--shadow-card) md:p-10"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-caramelo/70 text-terracota transition-colors duration-500 group-hover:bg-terracota group-hover:text-marfil">
                <Icon nombre={p.icono} className="h-8 w-8" />
              </span>
              <h3 className="mt-8 text-3xl">{p.titulo}</h3>
              <p className="mt-3 text-tostado">{p.texto}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <WaveDivider className="mt-20 mb-14 md:mt-24" />

        <dl className="grid gap-10 text-center sm:grid-cols-3">
          {club.cifras.map((c) => (
            <div key={c.label}>
              <dt className="sr-only">{c.label}</dt>
              <dd className="font-sans text-5xl font-extralight tracking-tight text-terracota md:text-6xl">
                <Counter valor={c.valor} prefijo={c.prefijo} sufijo={c.sufijo} />
              </dd>
              <dd aria-hidden className="mx-auto mt-2 max-w-[16rem] text-sm text-tostado">
                {c.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
