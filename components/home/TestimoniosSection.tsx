import { Icon } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Testimonials } from "@/components/ui/Testimonials";
import { sitio } from "@/content/sitio";
import { perfilGoogleUrl } from "@/lib/mapa";

/** 10 · Lo que dicen de KORU (se oculta si no hay testimonios). */
export function TestimoniosSection() {
  const { testimonios } = sitio.home;
  const publicados = sitio.testimonios.filter((t) => t.autorizado);
  if (publicados.length === 0) return null;
  return (
    <Section tono="crema">
      <Container>
        <SectionHeader
          eyebrow={testimonios.eyebrow}
          titulo={testimonios.titulo}
          centrado={publicados.length === 1}
          className="mb-14 md:mb-16"
        />
        <Testimonials items={publicados} />
        <p className="mt-10 text-center">
          <a
            href={perfilGoogleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 text-sm font-medium tracking-[0.08em] text-terracota underline-offset-4 hover:underline"
          >
            Ver más reseñas en Google
            <Icon nombre="flecha" className="h-4 w-4" />
          </a>
        </p>
      </Container>
    </Section>
  );
}
