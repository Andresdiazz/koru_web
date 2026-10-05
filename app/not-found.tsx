import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { sitio } from "@/content/sitio";
import { whatsappUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <PageHero
      alto="pantalla"
      eyebrow="Página no encontrada"
      titulo="Esta corriente no lleva a ningún lado."
      texto="La página que buscas no existe o cambió de lugar. Vuelve al inicio o escríbenos y te ayudamos."
    >
      <ButtonLink href="/" tamano="lg">
        Volver al inicio
      </ButtonLink>
      <ButtonLink href={whatsappUrl(sitio.mensajesWhatsApp["/contacto"])} variante="secundario-claro" tamano="lg" icono={<WhatsAppIcon className="h-5 w-5" />}>
        Escríbenos
      </ButtonLink>
    </PageHero>
  );
}
