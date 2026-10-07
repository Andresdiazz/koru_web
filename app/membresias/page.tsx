import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { ComparisonTable } from "@/components/membresias/ComparisonTable";
import { MembershipCard } from "@/components/membresias/MembershipCard";
import { SinCuotaChip } from "@/components/membresias/SinCuotaChip";
import { PrimeraClaseSection } from "@/components/home/PrimeraClaseSection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { membresias } from "@/content/membresias";

export const metadata: Metadata = metaPagina({
  titulo: "Membresías",
  descripcion: "Revive, Flow y Aqua: tres formas de vivir KORU, el club de bienestar con piscina terapéutica en Cali. Sin cuota de inscripción.",
  ruta: "/membresias",
});

export default function MembresiasPage() {
  return (
    <>
      <PageHero eyebrow={membresias.eyebrow} titulo={membresias.tituloPagina} texto={membresias.intro} imagen={membresias.imagen}>
        <SinCuotaChip oscuro />
      </PageHero>

      <Section tono="crema" aria-labelledby="titulo-planes">
        <Container>
          <h2 id="titulo-planes" className="sr-only">
            Planes de membresía
          </h2>
          <Stagger as="ul" className="grid gap-8 lg:grid-cols-3 lg:items-center lg:gap-6">
            {membresias.planes.map((plan) => (
              <StaggerItem as="li" key={plan.id} className={plan.destacada ? "max-lg:order-first" : undefined}>
                <MembershipCard plan={plan} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tono="marfil">
        <Container>
          <SectionHeader eyebrow="Detalle" titulo={membresias.tituloComparativa} className="mb-12 md:mb-16" />
          <Reveal>
            <ComparisonTable />
          </Reveal>
        </Container>
      </Section>

      <PrimeraClaseSection />
    </>
  );
}
