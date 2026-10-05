import Image from "next/image";
import { LineByLine } from "@/components/motion/LineByLine";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { sitio } from "@/content/sitio";

/** 3 · La piscina: imagen a sangre con parallax y la frase línea por línea. */
export function PiscinaSection() {
  const { piscina } = sitio.home;
  return (
    <section className="relative isolate overflow-hidden bg-espresso text-marfil">
      <Parallax className="absolute inset-0 -z-20" intensidad={10}>
        <Image src={piscina.imagen.src} alt={piscina.imagen.alt} fill sizes="100vw" quality={60} className="object-cover" />
      </Parallax>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(44_26_14/0.92)_0%,rgb(44_26_14/0.7)_45%,rgb(44_26_14/0.25)_100%)] max-md:bg-[linear-gradient(180deg,rgb(44_26_14/0.72)_0%,rgb(44_26_14/0.9)_100%)]"
      />
      <Container className="flex min-h-[88svh] flex-col justify-center py-32 md:min-h-[92vh]">
        <Reveal>
          <Eyebrow oscuro className="mb-8">
            {piscina.eyebrow}
          </Eyebrow>
        </Reveal>
        <LineByLine
          as="blockquote"
          lineas={piscina.lineas}
          className="max-w-4xl font-display text-[2.4rem] leading-[1.12] font-light sm:text-5xl lg:text-[4.25rem]"
        />
        <Reveal delay={0.5} className="mt-12">
          <ButtonLink href="/experiencias-y-clases#piscina" variante="secundario-claro" tamano="lg">
            {piscina.boton}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
