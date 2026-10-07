import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Section";
import { membresias } from "@/content/membresias";
import { sitio } from "@/content/sitio";
import { whatsappUrl } from "@/lib/whatsapp";
import { HeroVideo } from "./HeroVideo";

const existe = (ruta?: string) => !!ruta && existsSync(path.join(process.cwd(), "public", ruta));

/** 1 · Hero oscuro con la piscina (video si existe, si no imagen con zoom lento). */
export function HomeHero() {
  const { hero } = sitio.home;
  const hayVideo = existe(hero.video.mp4);
  const hayWebm = existe(hero.video.webm);
  const hayMovil = existe(hero.video.mp4Movil);

  return (
    <section className="relative isolate flex min-h-svh items-end overflow-hidden bg-espresso text-marfil">
      <div className="absolute inset-0 -z-20">
        <Image
          src={hero.imagen.src}
          alt={hero.imagen.alt}
          fill
          preload
          sizes="100vw"
          quality={60}
          className="animate-slow-zoom object-cover"
        />
        {hayVideo && (
          <HeroVideo
            mp4={hero.video.mp4}
            mp4Movil={hayMovil ? hero.video.mp4Movil : undefined}
            webm={hayWebm ? hero.video.webm : undefined}
          />
        )}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(44_26_14/0.6)_0%,rgb(44_26_14/0.3)_30%,rgb(44_26_14/0.5)_55%,rgb(44_26_14/0.93)_100%)]"
      />

      <Container className="pt-40 pb-24 md:pb-28">
        <div className="max-w-4xl">
          <h1 className="text-[3.25rem] leading-[1.02] sm:text-7xl lg:text-[6.5rem]">
            <span className="block animate-fade-up">{hero.titulo.split(". ")[0]}.</span>
            <span className="block animate-fade-up italic text-arena [animation-delay:180ms]">
              {hero.titulo.split(". ").slice(1).join(". ")}
            </span>
          </h1>
          <p className="mt-7 max-w-xl animate-fade-up text-lg text-marfil/85 [animation-delay:360ms] md:text-xl">
            {hero.texto}
          </p>
          <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:520ms] sm:flex-row">
            <ButtonLink
              href={whatsappUrl(membresias.primeraClase.mensajeWhatsApp)}
              tamano="lg"
              icono={<WhatsAppIcon className="h-5 w-5" />}
            >
              {hero.botonPrincipal}
            </ButtonLink>
            <ButtonLink href="#club" variante="secundario-claro" tamano="lg">
              {hero.botonSecundario}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <a
        href="#club"
        aria-label="Bajar a conocer el club"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6875rem] tracking-[0.3em] text-marfil/70 uppercase md:flex"
      >
        Desliza
        <span aria-hidden className="block h-12 w-px animate-scroll-cue bg-caramelo" />
      </a>
    </section>
  );
}
