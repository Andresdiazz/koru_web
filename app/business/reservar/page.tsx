import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import { Suspense } from "react";
import { ReservaForm } from "@/components/reserva/ReservaForm";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { business } from "@/content/experiencias";
import { sitio } from "@/content/sitio";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = metaPagina({
  titulo: "Reserva tu experiencia · KORU Business",
  descripcion: "Solicita la reserva de una experiencia de bienestar KORU para tu equipo. Te enviamos la propuesta con disponibilidad.",
  ruta: "/business/reservar",
  imagen: { url: "/images/og-business.jpg", width: 1200, height: 630, alt: "KORU Business" },
  absoluto: true,
});

function CargandoFormulario() {
  return (
    <div aria-hidden className="space-y-6">
      <div className="h-1 rounded-full bg-arena" />
      <div className="h-12 w-2/3 rounded-2xl bg-arena/50" />
      <div className="h-14 rounded-2xl bg-arena/40" />
      <div className="h-14 w-48 rounded-2xl bg-arena/40" />
      <div className="h-14 w-64 rounded-2xl bg-arena/40" />
    </div>
  );
}

export default function ReservarPage() {
  const { reserva } = business;
  return (
    <>
      <PageHero alto="bajo" eyebrow={reserva.eyebrow} titulo={reserva.titulo} texto={reserva.texto} />
      <Section tono="crema" className="pt-14 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
            <Suspense fallback={<CargandoFormulario />}>
              <ReservaForm />
            </Suspense>

            <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Cómo funciona la reserva">
              <Reveal className="rounded-[var(--radius-card)] bg-marfil p-7 ring-1 ring-arena md:p-9">
                <h2 className="text-3xl">Cómo funciona</h2>
                <ol className="mt-6 space-y-6">
                  {reserva.pasosComoFunciona.map((p, i) => (
                    <li key={p.titulo} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-caramelo font-display text-lg text-terracota">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium">{p.titulo}</p>
                        <p className="text-sm text-tostado">{p.texto}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 border-t border-arena pt-6">
                  <p className="text-sm text-tostado">¿Prefieres hablar con alguien?</p>
                  <ButtonLink
                    href={whatsappUrl(sitio.mensajesWhatsApp["/business/reservar"])}
                    variante="secundario"
                    icono={<WhatsAppIcon className="h-4 w-4" />}
                    className="mt-4 w-full"
                  >
                    Escríbenos por WhatsApp
                  </ButtonLink>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
