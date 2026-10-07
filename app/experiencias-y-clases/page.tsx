import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import Image from "next/image";
import { MasajesSection } from "@/components/clases/MasajesSection";
import { PrimeraClaseSection } from "@/components/home/PrimeraClaseSection";
import { PrimeraClaseFlotante } from "@/components/ui/PrimeraClaseFlotante";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { clases, paginaClases } from "@/content/clases";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Clase } from "@/types/content";

export const metadata: Metadata = metaPagina({
  titulo: "Experiencias y clases",
  descripcion:
    "Hidroterapia, Hidrogym y Aqua Zumba guiados por especialistas en una piscina terapéutica, y clases de Pilates, Yoga, Rumba, Cardio Step y Cardio Box en Cali.",
  ruta: "/experiencias-y-clases",
});

function TarjetaClase({ clase, mensaje }: { clase: Clase; mensaje?: string }) {
  return (
    <PhotoCard
      imagen={clase.imagen}
      titulo={clase.nombre}
      texto={clase.descripcion}
      etiqueta={clase.formato}
      proporcion="aspect-[4/5]"
      pie={
        mensaje ? (
          <a href={whatsappUrl(mensaje)} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex min-h-12 items-center gap-2 text-xs font-medium tracking-[0.14em] text-arena uppercase hover:text-marfil">
            <WhatsAppIcon className="h-4 w-4" /> Pedir información
          </a>
        ) : undefined
      }
    />
  );
}

export default function ExperienciasYClasesPage() {
  const { hero, piscina, hidroterapia, salon } = paginaClases;
  const estrella = clases.find((c) => c.destacada)!;
  const dePiscina = clases.filter((c) => c.tipo === "piscina" && !c.destacada);
  const deSalon = clases.filter((c) => c.tipo === "salon");

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} titulo={hero.titulo} texto={hero.texto} imagen={hero.imagen} />

      {/* Piscina */}
      <Section tono="crema" id="piscina" className="scroll-mt-16">
        <Container>
          <SectionHeader eyebrow={piscina.eyebrow} titulo={piscina.titulo} texto={piscina.texto} />

          {/* Hidroterapia: el servicio estrella, con más espacio */}
          <article id={estrella.slug} className="mt-16 grid scroll-mt-28 items-stretch gap-0 overflow-hidden rounded-[var(--radius-card)] bg-espresso text-marfil shadow-(--shadow-card-hover) md:mt-20 lg:grid-cols-2">
            <Parallax className="relative min-h-[22rem] lg:min-h-[34rem]" intensidad={6}>
              <Image src={estrella.imagen.src} alt={estrella.imagen.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" quality={75} className="object-cover" />
            </Parallax>
            <Reveal className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <Eyebrow oscuro className="mb-5">★ {hidroterapia.eyebrow}</Eyebrow>
              <h3 className="text-5xl md:text-6xl">{estrella.nombre}</h3>
              <p className="mt-4 font-display text-2xl text-arena italic">{estrella.descripcion}</p>
              <p className="mt-6 text-marfil/85">{estrella.descripcionLarga}</p>
              <p className="mt-6 flex items-center gap-3 text-sm text-marfil/75">
                <Icon nombre="usuarios" className="h-5 w-5 text-caramelo" /> {estrella.formato}
              </p>
              <ButtonLink href={whatsappUrl(hidroterapia.mensaje)} tamano="lg" icono={<WhatsAppIcon className="h-5 w-5" />} className="mt-10 self-start">
                {hidroterapia.boton}
              </ButtonLink>
            </Reveal>
          </article>

          <Stagger as="ul" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dePiscina.map((c) => (
              <StaggerItem as="li" key={c.slug} id={c.slug} className="scroll-mt-28">
                <TarjetaClase clase={c} mensaje={c.soloEnDetalle ? hidroterapia.mensajeDomicilio : undefined} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Salón */}
      <Section tono="espresso" espiral="derecha" id="salon" className="scroll-mt-16">
        <Container>
          <SectionHeader eyebrow={salon.eyebrow} titulo={salon.titulo} texto={salon.texto} oscuro />
          <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {deSalon.map((c, i) => (
              <StaggerItem as="li" key={c.slug} id={c.slug} className={i === 0 ? "scroll-mt-28 lg:row-span-2" : "scroll-mt-28"}>
                <PhotoCard
                  imagen={c.imagen}
                  titulo={c.nombre}
                  texto={c.descripcion}
                  etiqueta={c.formato}
                  proporcion={i === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full" : "aspect-[4/5] lg:aspect-[5/4]"}
                  className={i === 0 ? "lg:h-full [&>div]:lg:h-full" : undefined}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <MasajesSection />
      <PrimeraClaseSection />
      <PrimeraClaseFlotante />
    </>
  );
}
