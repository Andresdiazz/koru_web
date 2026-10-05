import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Section";
import { campana } from "@/content/campana";
import { beneficioVigente } from "@/lib/campana";

/**
 * Banner de campaña editable desde /content/campana.ts.
 * Se oculta con `activa: false`; el beneficio se oculta solo al pasar `fechaLimite`.
 */
export function CampaignBanner() {
  if (!campana.activa) return null;
  const vigente = beneficioVigente(campana);
  return (
    <section aria-labelledby="campana-titulo" className="bg-crema px-3 pb-24 sm:px-5 md:pb-32">
      <div className="relative isolate mx-auto max-w-[90rem] overflow-hidden rounded-[calc(var(--radius-card)*1.5)] bg-espresso text-marfil">
        <Image src="/images/agua-dorada.jpg" alt="" fill sizes="100vw" quality={60} className="-z-20 object-cover opacity-55" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(44_26_14/0.95)_0%,rgb(44_26_14/0.75)_55%,rgb(44_26_14/0.35)_100%)]" />
        <Container className="py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <h2 id="campana-titulo" className="koru-wordmark text-[2.6rem] leading-[1.05] tracking-[0.14em]! sm:text-6xl lg:text-7xl">
              {campana.titulo}
            </h2>
            <p className="mt-6 font-display text-2xl text-arena italic md:text-3xl">{campana.texto}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
            {vigente && (
              <p className="flex gap-4 rounded-2xl border border-caramelo/40 bg-espresso/50 p-6 backdrop-blur-sm">
                <Icon nombre="celebrar" className="h-7 w-7 shrink-0 text-caramelo" />
                <span>{campana.beneficio}</span>
              </p>
            )}
            <p className="flex gap-4 rounded-2xl border border-caramelo/40 bg-espresso/50 p-6 backdrop-blur-sm">
              <Icon nombre="reloj" className="h-7 w-7 shrink-0 text-caramelo" />
              <span>{campana.escasez}</span>
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <ButtonLink href="/business/reservar" tamano="lg">
              {campana.boton}
            </ButtonLink>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
