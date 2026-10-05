import type { Metadata } from "next";
import { metaPagina } from "@/lib/seo";
import Image from "next/image";
import { LineByLine } from "@/components/motion/LineByLine";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Icon, WhatsAppIcon, type NombreIcono } from "@/components/ui/Icon";
import { KoruSpiral } from "@/components/ui/KoruSpiral";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { WaveDivider, WaveLine } from "@/components/ui/WaveDivider";
import { clases } from "@/content/clases";
import { masajes } from "@/content/masajes";
import { membresias } from "@/content/membresias";
import { experiencias } from "@/content/experiencias";
import { formatCOP, precioPorGrupo } from "@/lib/format";

/* Página interna de referencia (etapa a). No se indexa; se puede borrar al lanzar. */
export const metadata: Metadata = metaPagina({
  titulo: "Sistema de diseño",
  descripcion: "Referencia interna del sistema de diseño de KORU.",
  ruta: "/sistema-de-diseno",
  noIndex: true,
});

const paleta = [
  { token: "espresso", hex: "#2C1A0E", uso: "Fondos premium oscuros, texto principal", claro: false },
  { token: "tostado", hex: "#5C3317", uso: "Fondos secundarios oscuros", claro: false },
  { token: "terracota", hex: "#8B4A2B", uso: "Botones, acentos, enlaces", claro: false },
  { token: "caramelo", hex: "#C4813F", uso: "Detalles, íconos, hover, líneas finas", claro: true },
  { token: "arena", hex: "#E8C99A", uso: "Fondos de tarjetas, bordes suaves", claro: true },
  { token: "crema", hex: "#F5EDE0", uso: "Fondo principal claro", claro: true },
  { token: "marfil", hex: "#FAF5EF", uso: "Fondos claros alternos, texto sobre oscuro", claro: true },
];

const iconos: NombreIcono[] = [
  "agua", "movimiento", "nutricion", "conectar", "desconectar", "bienestar", "celebrar", "vivir-koru",
  "ubicacion", "reloj", "correo", "usuarios", "check", "flecha", "instagram", "tiktok", "facebook",
];

function Titulo({ eyebrow, children, oscuro }: { eyebrow: string; children: React.ReactNode; oscuro?: boolean }) {
  return (
    <div className="mb-12">
      <Eyebrow oscuro={oscuro} className="mb-4">{eyebrow}</Eyebrow>
      <h2 className="text-4xl md:text-5xl">{children}</h2>
    </div>
  );
}

export default function SistemaDeDiseno() {
  const ejemploGrupo = precioPorGrupo(experiencias[0].modalidades[0].precio, experiencias[0].capacidad);
  return (
    <>
      <PageHero
        alto="bajo"
        eyebrow="Etapa A · Referencia interna"
        titulo={<>Sistema de diseño <span className="koru-wordmark text-[0.75em]">KORU</span></>}
        texto="Tokens, tipografía, botones, tarjetas, motivos de agua y movimiento. Todo lo que sigue se construye con estas piezas."
      />

      {/* Logo */}
      <Section tono="crema">
        <Container>
          <Titulo eyebrow="Marca">Logo oficial y variantes</Titulo>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="flex aspect-square items-center justify-center rounded-[var(--radius-card)] bg-marfil p-10">
              <Image src="/brand/koru-logo-completo-tostado.png" alt="Logo KORU en tostado" width={615} height={718} className="h-full w-auto" />
            </div>
            <div className="flex aspect-square items-center justify-center rounded-[var(--radius-card)] bg-espresso p-10">
              <Image src="/brand/koru-logo-completo-marfil.png" alt="Logo KORU en marfil" width={615} height={718} className="h-full w-auto" />
            </div>
            <div className="flex aspect-square items-center justify-center rounded-[var(--radius-card)] bg-arena p-10">
              <Image src="/brand/koru-simbolo-espresso.png" alt="Símbolo KORU en espresso" width={615} height={600} className="h-3/4 w-auto" />
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-tostado">
            Variantes generadas a partir de <code>/public/brand/koru-logo.png</code>. La espiral y las ondas de abajo son motivos decorativos, no reemplazan el logo.
          </p>
        </Container>
      </Section>

      {/* Paleta */}
      <Section tono="marfil">
        <Container>
          <Titulo eyebrow="Color">Paleta cálida</Titulo>
          <Stagger as="ul" className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {paleta.map((c) => (
              <StaggerItem as="li" key={c.token}>
                <div
                  className={`flex aspect-[3/4] flex-col justify-end rounded-[var(--radius-card)] p-4 ring-1 ring-espresso/10 ${c.claro ? "text-espresso" : "text-marfil"}`}
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="font-display text-2xl">{c.token}</span>
                  <span className="text-xs opacity-80">{c.hex}</span>
                </div>
                <p className="mt-2 text-xs text-tostado">{c.uso}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Tipografía */}
      <Section tono="espresso" espiral="derecha">
        <Container>
          <Titulo eyebrow="Tipografía" oscuro>Cormorant Garamond + DM Sans</Titulo>
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="koru-wordmark text-6xl font-light md:text-7xl">KORU</p>
              <p className="font-display text-5xl font-light md:text-6xl">Aquí no entrenas. Renaces.</p>
              <p className="font-display text-3xl italic text-arena">En el agua nadie queda por fuera.</p>
              <p className="eyebrow text-caramelo">Cormorant Light 300 · Regular 400</p>
            </div>
            <div className="space-y-5 text-marfil/85">
              <p className="text-xl">DM Sans para textos, botones, menús y formularios. Clara y cálida, con mucho aire entre líneas.</p>
              <p>
                Un club de bienestar boutique en Cali con una piscina terapéutica donde cada sesión la guía un especialista.
                Texto de párrafo en 16px con interlineado 1.65 para lectura cómoda en celular.
              </p>
              <p className="eyebrow text-caramelo">DM Sans Regular 400 · Medium 500</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Botones */}
      <Section tono="crema">
        <Container>
          <Titulo eyebrow="Acciones">Botones (mínimo 48px de alto)</Titulo>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="#">Agenda tu primera clase</ButtonLink>
            <ButtonLink href="#" variante="secundario">Conoce el club</ButtonLink>
            <Button tamano="lg" icono={<WhatsAppIcon className="h-5 w-5" />}>Hablar con KORU</Button>
            <ButtonLink href="#" variante="texto">Ver membresías →</ButtonLink>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-[var(--radius-card)] bg-tostado p-8">
            <ButtonLink href="#">Reserva tu fecha</ButtonLink>
            <ButtonLink href="#" variante="secundario-claro">Conoce KORU Business</ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Motivos */}
      <Section tono="tostado" espiral="izquierda">
        <Container>
          <Titulo eyebrow="Agua como lenguaje" oscuro>Ondas y espiral</Titulo>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-10">
              <WaveDivider />
              <WaveDivider lineas={2} />
              <WaveLine />
              <p className="text-sm text-marfil/80">Separadores en caramelo inspirados en las líneas de agua del logo.</p>
            </div>
            <div className="relative flex aspect-square items-center justify-center rounded-[var(--radius-card)] bg-espresso">
              <KoruSpiral className="h-3/4 w-3/4 text-caramelo" strokeWidth={1.2} />
              <p className="absolute bottom-4 left-4 text-xs text-marfil/70">Espiral koru · como marca de agua va al 5%</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Íconos */}
      <Section tono="marfil">
        <Container>
          <Titulo eyebrow="Íconos">Línea fina</Titulo>
          <ul className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-9">
            {iconos.map((n) => (
              <li key={n} className="flex flex-col items-center gap-2 rounded-2xl bg-crema p-4 text-terracota">
                <span className="flex h-14 w-14 items-center justify-center rounded-full ring-1 ring-caramelo/60">
                  <Icon nombre={n} className="h-7 w-7" />
                </span>
                <span className="text-[0.6875rem] text-tostado">{n}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Tarjetas + carrusel */}
      <Section tono="crema" className="md:pb-24">
        <Container>
          <Titulo eyebrow="Tarjetas">Fotografía protagonista, bordes de 24px</Titulo>
        </Container>
        <Carousel etiqueta="Clases de KORU">
          {clases.filter((c) => !c.soloEnDetalle).map((c) => (
            <li key={c.slug} className="w-[78vw] sm:w-[22rem]">
              <PhotoCard imagen={c.imagen} titulo={c.nombre} texto={c.descripcion} etiqueta={c.tipo === "piscina" ? "Piscina" : "Salón"} />
            </li>
          ))}
        </Carousel>
      </Section>

      {/* Parallax + línea por línea */}
      <section className="relative isolate overflow-hidden bg-espresso text-marfil">
        <Parallax className="absolute inset-0 -z-10" intensidad={10}>
          <Image src="/images/piscina-parallax.jpg" alt="" fill sizes="100vw" quality={60} className="object-cover opacity-35" />
        </Parallax>
        <Container className="py-40 md:py-56">
          <LineByLine
            as="blockquote"
            className="max-w-4xl font-display text-4xl leading-[1.15] font-light md:text-6xl"
            lineas={["“En el agua nadie queda por fuera:", "quien no corre, flota;", "quien tiene una lesión, se mueve sin dolor.”"]}
          />
        </Container>
      </section>

      {/* Interruptores */}
      <Section tono="arena">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-tostado!">Interruptores de contenido</Eyebrow>
            <h2 className="mb-10 text-4xl md:text-5xl">Estado actual en /content</h2>
          </Reveal>
          <dl className="grid gap-4 sm:grid-cols-3">
            {[
              ["masajes.disponible", String(masajes.disponible), masajes.disponible ? "Se muestran precios" : "“Próximamente”, sin precios"],
              ["membresias.mostrarPrecios", String(membresias.mostrarPrecios), membresias.mostrarPrecios ? "Se muestran cifras" : "Solo beneficios, sin cifras"],
              ["Precio KORU Business", ejemploGrupo.grupo, ejemploGrupo.equivalencia],
            ].map(([k, v, d]) => (
              <Reveal key={k} className="rounded-[var(--radius-card)] bg-crema p-6">
                <dt className="text-xs font-medium text-tostado">{k}</dt>
                <dd className="mt-2 font-display text-3xl">{v}</dd>
                <dd className="mt-1 text-sm text-tostado">{d}</dd>
              </Reveal>
            ))}
          </dl>
          <p className="mt-6 text-sm text-tostado">Primera clase: {formatCOP(membresias.primeraClase.precio)}</p>
        </Container>
      </Section>
    </>
  );
}
