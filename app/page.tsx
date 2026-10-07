import type { Metadata } from "next";
import { BusinessSection } from "@/components/home/BusinessSection";
import { ClasesSection } from "@/components/home/ClasesSection";
import { ClubSection } from "@/components/home/ClubSection";
import { FundadoresSection } from "@/components/home/FundadoresSection";
import { GaleriaSection } from "@/components/home/GaleriaSection";
import { HomeHero } from "@/components/home/HomeHero";
import { MembresiasSection } from "@/components/home/MembresiasSection";
import { PiscinaSection } from "@/components/home/PiscinaSection";
import { PrimeraClaseSection } from "@/components/home/PrimeraClaseSection";
import { TestimoniosSection } from "@/components/home/TestimoniosSection";
import { UbicacionSection } from "@/components/home/UbicacionSection";
import { PrimeraClaseFlotante } from "@/components/ui/PrimeraClaseFlotante";
import { sitio } from "@/content/sitio";
import { metaPagina } from "@/lib/seo";

export const metadata: Metadata = metaPagina({
  titulo: "KORU · Club de bienestar con piscina terapéutica en Cali",
  descripcion: sitio.descripcion,
  ruta: "/",
  absoluto: true,
});

/** Home — Conocer KORU. El pie de página (sección 12) vive en el layout. */
export default function Home() {
  return (
    <>
      <HomeHero />
      <ClubSection />
      <PiscinaSection />
      <ClasesSection />
      <PrimeraClaseSection />
      <MembresiasSection />
      <BusinessSection />
      <FundadoresSection />
      <GaleriaSection />
      <TestimoniosSection />
      <UbicacionSection />
      <PrimeraClaseFlotante />
    </>
  );
}
