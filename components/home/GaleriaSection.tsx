import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sitio } from "@/content/sitio";
import { Gallery } from "./Gallery";

/** 9 · Galería en mosaico asimétrico. */
export function GaleriaSection() {
  const { galeria } = sitio.home;
  return (
    <Section tono="espresso" espiral="derecha">
      <Container>
        <SectionHeader eyebrow={galeria.eyebrow} titulo={galeria.titulo} oscuro className="mb-14 md:mb-16" />
        <Gallery items={sitio.galeria} />
      </Container>
    </Section>
  );
}
