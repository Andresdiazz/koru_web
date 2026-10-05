import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";
import { MapaUbicacion } from "@/components/ui/MapaUbicacion";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sitio } from "@/content/sitio";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = metaPagina({
  titulo: "Contacto",
  descripcion: "Escríbenos por WhatsApp, por correo o visítanos en KORU, El Ingenio, Cali.",
  ruta: "/contacto",
});

export default function ContactoPage() {
  const canales = [
    {
      titulo: "WhatsApp",
      detalle: sitio.contacto.whatsappVisible,
      nota: "La forma más rápida de agendar tu primera clase.",
      href: whatsappUrl(sitio.mensajesWhatsApp["/contacto"]),
      icono: <WhatsAppIcon className="h-7 w-7" />,
      externo: true,
    },
    {
      titulo: "Correo",
      detalle: sitio.contacto.correo,
      nota: "Para propuestas, alianzas y prensa.",
      href: `mailto:${sitio.contacto.correo}`,
      icono: <Icon nombre="correo" className="h-7 w-7" />,
      externo: true,
    },
    {
      titulo: "Instagram",
      detalle: "Síguenos",
      nota: "Horarios, novedades y momentos del club.",
      href: sitio.redes.instagram,
      icono: <Icon nombre="instagram" className="h-7 w-7" />,
      externo: true,
    },
    {
      titulo: "KORU Business",
      detalle: "Solicita tu reserva",
      nota: "Experiencias de bienestar para tu equipo.",
      href: "/business/reservar",
      icono: <Icon nombre="usuarios" className="h-7 w-7" />,
      externo: false,
    },
  ];

  return (
    <>
      <PageHero alto="bajo" eyebrow={sitio.contactoPagina.eyebrow} titulo={sitio.contactoPagina.titulo} texto={sitio.contactoPagina.texto} />

      <Section tono="crema" className="pt-16 md:pt-20">
        <Container>
          <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {canales.map((c) => {
              const contenido = (
                <>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-caramelo/70 text-terracota transition-colors duration-500 group-hover:bg-terracota group-hover:text-marfil">
                    {c.icono}
                  </span>
                  <span className="mt-8 block font-display text-3xl">{c.titulo}</span>
                  <span className="mt-1 block font-medium break-words">{c.detalle}</span>
                  <span className="mt-3 block text-sm text-tostado">{c.nota}</span>
                </>
              );
              const clase =
                "group block h-full rounded-[var(--radius-card)] border border-arena bg-marfil p-8 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-caramelo/60 hover:shadow-(--shadow-card)";
              return (
                <StaggerItem as="li" key={c.titulo}>
                  {c.externo ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={clase}>
                      {contenido}
                    </a>
                  ) : (
                    <Link href={c.href} className={clase}>
                      {contenido}
                    </Link>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      <Section tono="marfil">
        <Container>
          <SectionHeader eyebrow={sitio.home.ubicacion.eyebrow} titulo={sitio.home.ubicacion.titulo} className="mb-12 md:mb-16" />
          <MapaUbicacion />
        </Container>
      </Section>
    </>
  );
}
