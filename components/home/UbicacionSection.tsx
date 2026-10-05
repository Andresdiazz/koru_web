import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MapaUbicacion } from "@/components/ui/MapaUbicacion";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { sitio } from "@/content/sitio";

/** 11 · Ubicación con mapa embebido. */
export function UbicacionSection() {
  const { ubicacion } = sitio.home;
  return (
    <Section tono="marfil">
      <WaveDivider className="-mt-8 mb-16 md:-mt-12" />
      <Container>
        <SectionHeader eyebrow={ubicacion.eyebrow} titulo={ubicacion.titulo} className="mb-12 md:mb-16" />
        <MapaUbicacion />
      </Container>
    </Section>
  );
}
