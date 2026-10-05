import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { BienestarAnual } from "@/components/business/BienestarAnual";
import { CampaignBanner } from "@/components/business/CampaignBanner";
import { CierreBusiness } from "@/components/business/CierreBusiness";
import { ExperienceCard } from "@/components/business/ExperienceCard";
import { GruposGrandes } from "@/components/business/GruposGrandes";
import { NeedSelector } from "@/components/business/NeedSelector";
import { PorQueKoru } from "@/components/business/PorQueKoru";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Testimonials } from "@/components/ui/Testimonials";
import { business, experiencias, necesidades } from "@/content/experiencias";
import { sitio } from "@/content/sitio";

export const metadata: Metadata = metaPagina({
  titulo: "KORU Business · Experiencias de bienestar para empresas en Cali",
  descripcion:
    "Experiencias privadas de bienestar para equipos de hasta 10 personas en una piscina terapéutica en Cali. Conectar, desconectar, celebrar y crecer juntos.",
  ruta: "/business",
  imagen: { url: "/images/og-business.jpg", width: 1200, height: 630, alt: "KORU Business" },
  absoluto: true,
});

/** Se regenera cada hora para que el beneficio de campaña se oculte solo al vencer. */
export const revalidate = 3600;

export default function BusinessPage() {
  return (
    <>
      <PageHero
        alto="pantalla"
        eyebrow="KORU Business"
        titulo={business.hero.titulo}
        texto={<p className="font-display text-2xl italic text-arena md:text-3xl">{business.hero.texto}</p>}
        imagen={business.hero.imagen}
      >
        <ButtonLink href="#necesidades" tamano="lg" icono={<Icon nombre="flecha-abajo" className="h-5 w-5" />}>
          {business.hero.boton}
        </ButtonLink>
      </PageHero>

      <Section tono="crema" id="necesidades" className="scroll-mt-16">
        <Container>
          <SectionHeader eyebrow="Experiencias a la medida" titulo={business.preguntaNecesidad} centrado className="mb-14 md:mb-16" />
          <NeedSelector
            necesidades={necesidades}
            experiencias={experiencias.map(({ slug, nombre, frase }) => ({ slug, nombre, frase }))}
            boton={business.botonExperiencia}
          />
        </Container>
      </Section>

      <CampaignBanner />

      <Section tono="marfil" id="experiencias" className="scroll-mt-16">
        <Container>
          <SectionHeader eyebrow="Experiencias privadas · Hasta 10 personas" titulo={business.tituloExperiencias} texto={business.subtituloExperiencias} />
          <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {experiencias.map((e) => (
              <StaggerItem as="li" key={e.slug}>
                <ExperienceCard experiencia={e} />
              </StaggerItem>
            ))}
            <StaggerItem as="li" className="flex flex-col justify-center rounded-[var(--radius-card)] border border-dashed border-caramelo p-8 md:p-10">
              <p className="font-display text-3xl leading-tight">¿Son más de 10 personas?</p>
              <p className="mt-3 text-tostado">Conoce la Jornada KORU Empresarial y la Experiencia Fin de Año.</p>
              <ButtonLink href="#grupos-grandes" variante="secundario" className="mt-8 self-start">
                Ver grupos grandes
              </ButtonLink>
            </StaggerItem>
          </Stagger>
        </Container>
      </Section>

      <GruposGrandes />
      <BienestarAnual />
      <PorQueKoru />

      {sitio.testimoniosEmpresas.length > 0 && (
        <Section tono="crema">
          <Container>
            <SectionHeader eyebrow="Empresas que vivieron KORU" titulo="Lo que dicen los equipos." className="mb-14" />
            <Testimonials items={sitio.testimoniosEmpresas} />
          </Container>
        </Section>
      )}

      <CierreBusiness />
    </>
  );
}
