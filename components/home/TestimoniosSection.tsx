import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Testimonials } from "@/components/ui/Testimonials";
import { sitio } from "@/content/sitio";

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
      </Container>
    </Section>
  );
}
