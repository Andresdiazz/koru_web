import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/Section";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { business } from "@/content/experiencias";
import { sitio } from "@/content/sitio";
import { whatsappUrl } from "@/lib/whatsapp";

/** Cierre de KORU Business: reservar o escribir por WhatsApp. */
export function CierreBusiness() {
  return (
    <Section tono="arena" className="text-center">
      <Container>
        <Reveal className="mx-auto max-w-3xl">
          <WaveDivider className="mb-10 text-terracota" />
          <h2 className="text-[2.5rem] sm:text-5xl lg:text-6xl">{business.cierre.titulo}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-tostado">{business.cierre.texto}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/business/reservar" tamano="lg">
              {business.cierre.botonReservar}
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl(sitio.mensajesWhatsApp["/business"])}
              variante="secundario"
              tamano="lg"
              icono={<WhatsAppIcon className="h-5 w-5" />}
            >
              {business.cierre.botonWhatsApp}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
