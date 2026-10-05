import { ButtonLink } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Icon } from "@/components/ui/Icon";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { clases } from "@/content/clases";
import { sitio } from "@/content/sitio";
import { cn } from "@/lib/cn";

/** 4 · Carrusel de clases: primero piscina, luego salón. */
export function ClasesSection() {
  const { clases: textos } = sitio.home;
  const lista = clases.filter((c) => !c.soloEnDetalle);
  return (
    <Section tono="marfil" className="pb-20 md:pb-24">
      <Container className="mb-10 flex flex-col gap-8 md:mb-12 md:flex-row md:items-end md:justify-between">
        <SectionHeader eyebrow={textos.eyebrow} titulo={textos.titulo} texto={textos.texto} />
        <ButtonLink href="/experiencias-y-clases" variante="secundario" className="shrink-0 self-start md:self-auto">
          {textos.boton}
        </ButtonLink>
      </Container>
      <Carousel etiqueta="Clases de KORU">
        {lista.map((c) => (
          <li key={c.slug} className={cn(c.destacada ? "w-[86vw] sm:w-[30rem]" : "w-[76vw] sm:w-[21rem]")}>
            <PhotoCard
              href={`/experiencias-y-clases#${c.slug}`}
              imagen={c.imagen}
              titulo={c.nombre}
              texto={c.descripcion}
              etiqueta={c.destacada ? "Servicio estrella" : c.tipo === "piscina" ? "Piscina" : "Salón"}
              proporcion={c.destacada ? "aspect-[4/5] sm:aspect-[6/5.33]" : "aspect-[4/5]"}
              sizes={c.destacada ? "(min-width: 640px) 30rem, 86vw" : "(min-width: 640px) 21rem, 76vw"}
              pie={
                <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-arena uppercase">
                  {c.formato}
                  <Icon nombre="flecha" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              }
            />
          </li>
        ))}
      </Carousel>
    </Section>
  );
}
