import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/Section";
import { WaveLine } from "@/components/ui/WaveDivider";
import { membresias } from "@/content/membresias";
import { formatCOP } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";

/** 5 · Tu primera clase (fondo arena). Se reutiliza en /membresias. */
export function PrimeraClaseSection() {
  const pc = membresias.primeraClase;
  return (
    <Section tono="arena" className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3 text-tostado">
              <span aria-hidden className="h-px w-8 bg-tostado/60" />
              {pc.titulo}
            </p>
            <h2 className="text-[2.5rem] sm:text-5xl lg:text-6xl">{pc.texto}</h2>
          </Reveal>
          <Reveal delay={0.15} className="rounded-[var(--radius-card)] bg-crema p-6 shadow-(--shadow-card) sm:p-8 md:p-10">
            <p className="font-display text-6xl font-light text-terracota md:text-7xl">{formatCOP(pc.precio)}</p>
            <p className="mt-3 text-lg">
              <strong className="font-medium">{pc.condicion}</strong> {pc.plazo}
            </p>
            <WaveLine className="my-8" />
            <ButtonLink
              href={whatsappUrl(pc.mensajeWhatsApp)}
              icono={<WhatsAppIcon className="h-5 w-5" />}
              className="w-full"
            >
              {pc.boton}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
