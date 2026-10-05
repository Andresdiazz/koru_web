import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceCard } from "@/components/business/ExperienceCard";
import { ReservaPanel } from "@/components/business/ReservaPanel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { business, experiencias, getExperiencia, necesidades } from "@/content/experiencias";
import { metaPagina } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return experiencias.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = getExperiencia(slug);
  if (!e) return {};
  return metaPagina({
    titulo: `${e.nombre} · KORU Business`,
    descripcion: `${e.frase} ${e.paraQuien} Hasta ${e.capacidad} personas · ${e.duracion}.`,
    ruta: `/business/${e.slug}`,
    imagen: { url: e.imagen.src, alt: e.imagen.alt },
    absoluto: true,
  });
}

function Dato({ icono, label, valor }: { icono: "reloj" | "usuarios"; label: string; valor: string }) {
  return (
    <div className="rounded-2xl bg-marfil p-5 ring-1 ring-arena">
      <dt className="flex items-center gap-3 text-xs tracking-[0.14em] text-tostado uppercase">
        <Icon nombre={icono} className="h-6 w-6 shrink-0 text-terracota" />
        {label}
      </dt>
      <dd className="mt-2 pl-9 font-display text-2xl leading-tight">{valor}</dd>
    </div>
  );
}

export default async function ExperienciaPage({ params }: Props) {
  const { slug } = await params;
  const e = getExperiencia(slug);
  if (!e) notFound();

  const necesidad = necesidades.find((n) => n.id === e.necesidad);
  const otras = experiencias.filter((x) => x.slug !== e.slug);
  // Dos sugerencias que rotan según la posición de la experiencia actual
  const indice = experiencias.findIndex((x) => x.slug === e.slug);
  const sugeridas = [otras[indice % otras.length], otras[(indice + 1) % otras.length]];

  return (
    <>
      <PageHero
        alto="medio"
        eyebrow={`KORU Business · ${necesidad?.label ?? ""}`}
        titulo={e.nombre}
        texto={<p className="font-display text-2xl italic text-arena md:text-3xl">{e.frase}</p>}
        imagen={e.imagen}
      />

      <Section tono="crema" className="pt-16 md:pt-20">
        <Container>
          <nav aria-label="Ruta" className="mb-12 text-sm text-tostado">
            <Link href="/business" className="hover:text-terracota">KORU Business</Link>
            <span aria-hidden className="mx-2">/</span>
            <span aria-current="page">{e.nombreCorto}</span>
          </nav>

          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div className="space-y-14">
              <Reveal>
                <Eyebrow className="mb-4">Para quién es</Eyebrow>
                <p className="font-display text-3xl leading-snug md:text-4xl">{e.paraQuien}</p>
              </Reveal>

              <div>
                <Reveal>
                  <Eyebrow className="mb-6">Qué incluye</Eyebrow>
                </Reveal>
                <Stagger as="ul" className="divide-y divide-arena border-y border-arena" intervalo={0.06}>
                  {e.incluye.map((item) => (
                    <StaggerItem as="li" key={item} className="flex gap-4 py-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-caramelo/70 text-terracota">
                        <Icon nombre="check" className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <span className="text-[1.0625rem]">{item}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <Reveal>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <Dato icono="reloj" label="Duración" valor={e.duracion} />
                  <Dato icono="usuarios" label="Capacidad" valor={`Hasta ${e.capacidad} personas`} />
                </dl>
              </Reveal>

              <Reveal className="space-y-8">
                <div>
                  <Eyebrow className="mb-3">Servicios adicionales</Eyebrow>
                  <p className="text-tostado">{business.serviciosAdicionales}</p>
                </div>
                <div>
                  <Eyebrow className="mb-3">Condiciones</Eyebrow>
                  <ul className="space-y-2 text-tostado">
                    {business.condicionesResumen.map((c) => (
                      <li key={c} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-caramelo" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Link href="/legal/terminos-business" className="mt-4 inline-flex min-h-12 items-center gap-2 text-sm font-medium text-terracota underline-offset-4 hover:underline">
                    Ver términos y condiciones completos
                    <Icon nombre="flecha" className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <ReservaPanel
                  experiencia={e}
                  whatsappBase={whatsappUrl()}
                  botonReservar={e.botonPrincipal ?? business.botonReservar}
                  botonHablar={business.botonHablar}
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tono="marfil">
        <Container>
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow className="mb-4">Sigue explorando</Eyebrow>
              <h2 className="text-4xl md:text-5xl">También te puede interesar</h2>
            </div>
            <Link href="/business#experiencias" className="inline-flex min-h-12 items-center gap-2 text-sm font-medium text-terracota hover:underline">
              Ver todas las experiencias <Icon nombre="flecha" className="h-4 w-4" />
            </Link>
          </Reveal>
          <Stagger as="ul" className="grid gap-6 md:grid-cols-2">
            {sugeridas.map((s) => (
              <StaggerItem as="li" key={s.slug}>
                <ExperienceCard experiencia={s} sizes="(min-width: 768px) 50vw, 100vw" />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
