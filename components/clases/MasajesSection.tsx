import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { masajes } from "@/content/masajes";
import { formatCOP } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Masajes. Controlado por `masajes.disponible`:
 * false → "Próximamente", sin precios, botón para recibir aviso por WhatsApp.
 * true  → lista con duración y precio, y botón para agendar.
 */
export function MasajesSection() {
  const disponible = masajes.disponible;
  return (
    <Section tono="arena" id="masajes" className="scroll-mt-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-tostado">
            <Image
              src={masajes.imagen.src}
              alt={masajes.imagen.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={60}
              className={disponible ? "object-cover" : "object-cover brightness-90 sepia-[0.2]"}
            />
            {!disponible && (
              <span className="eyebrow absolute top-5 left-5 rounded-full bg-espresso/80 px-4 py-2 text-arena backdrop-blur-sm">
                Próximamente
              </span>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow className="mb-5 text-tostado!">Recuperación</Eyebrow>
            <h2 className="text-[2.5rem] sm:text-5xl lg:text-6xl">{disponible ? masajes.titulo : masajes.tituloProximamente}</h2>
            <p className="mt-6 max-w-lg text-lg text-tostado">{disponible ? masajes.texto : masajes.textoProximamente}</p>

            {disponible && (
              <dl className="mt-8 divide-y divide-tostado/20 border-y border-tostado/20">
                {masajes.masajes.map((ms) => (
                  <div key={ms.nombre} className="flex items-baseline justify-between gap-4 py-4">
                    <dt>
                      <span className="font-display text-2xl">{ms.nombre}</span>
                      <span className="ml-2 text-sm text-tostado">{ms.duracionMin} min</span>
                    </dt>
                    <dd className="font-display text-2xl">{formatCOP(ms.precio)}</dd>
                  </div>
                ))}
              </dl>
            )}

            <ButtonLink
              href={whatsappUrl(disponible ? masajes.mensajeAgendar : masajes.mensajeAviso)}
              variante={disponible ? "primario" : "secundario"}
              tamano="lg"
              icono={<WhatsAppIcon className="h-5 w-5" />}
              className="mt-10 border-tostado!"
            >
              {disponible ? masajes.botonAgendar : masajes.botonAviso}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
