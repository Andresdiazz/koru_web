import Image from "next/image";
import Link from "next/link";
import { responsable } from "@/content/legal";
import { sitio } from "@/content/sitio";
import { whatsappUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";
import { KoruSpiral } from "@/components/ui/KoruSpiral";
import { Container } from "@/components/ui/Section";
import { WaveLine } from "@/components/ui/WaveDivider";

const nombresRedes = { instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook" } as const;
const redes = (Object.entries(sitio.redes) as [keyof typeof nombresRedes, string][]).map(([icono, href]) => ({
  icono,
  href,
  nombre: nombresRedes[icono],
}));

function Columna({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 font-sans text-caramelo">{titulo}</h2>
      {children}
    </div>
  );
}

export function Footer() {
  const anio = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden bg-espresso pt-20 pb-28 text-marfil md:pt-28 md:pb-12">
      <KoruSpiral aria-hidden className="pointer-events-none absolute -top-56 -right-64 -z-10 h-[56rem] w-[56rem] text-caramelo opacity-[0.05]" />

      <Container>
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Image src="/brand/koru-logo-completo-marfil.png" alt="KORU" width={120} height={138} className="mb-10 h-28 w-auto" />
            <p className="font-display text-[2rem] leading-[1.12] font-light sm:text-4xl md:text-5xl">
              <span className="koru-wordmark text-[0.7em]">KORU</span>
              <span className="mx-3 text-caramelo">—</span>
              {sitio.fraseCierre}
            </p>
          </div>
          <ButtonLink href={whatsappUrl(sitio.mensajeReserva)} tamano="lg" icono={<WhatsAppIcon className="h-5 w-5" />}>
            Reserva ahora
          </ButtonLink>
        </div>

        <WaveLine className="my-14 opacity-60 md:my-16" />

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <Columna titulo="Horarios">
            <ul className="space-y-3 text-sm text-marfil/85">
              {sitio.horarios.map((h) => (
                <li key={h.dias}>
                  <span className="block text-marfil">{h.dias}</span>
                  {h.horas}
                </li>
              ))}
            </ul>
          </Columna>

          <Columna titulo="Visítanos">
            <address className="space-y-4 text-sm not-italic text-marfil/85">
              <p className="flex gap-3">
                <Icon nombre="ubicacion" className="mt-0.5 h-5 w-5 shrink-0 text-caramelo" />
                <span>
                  <span className="block text-marfil">{sitio.ubicacion.sede}</span>
                  {sitio.ubicacion.direccion}
                </span>
              </p>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-arena">
                <WhatsAppIcon className="h-5 w-5 shrink-0 text-caramelo" />
                {sitio.contacto.whatsappVisible}
              </a>
              <a href={`mailto:${sitio.contacto.correo}`} className="flex items-center gap-3 hover:text-arena">
                <Icon nombre="correo" className="h-5 w-5 shrink-0 text-caramelo" />
                {sitio.contacto.correo}
              </a>
            </address>
            <ul className="mt-6 flex gap-2">
              {redes.map((r) => (
                <li key={r.nombre}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-caramelo/40 transition-colors hover:border-caramelo hover:bg-caramelo/15"
                  >
                    <Icon nombre={r.icono} className="h-5 w-5" />
                    <span className="sr-only">{r.nombre}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Columna>

          <Columna titulo="Explora">
            <nav aria-label="Pie de página">
              <ul className="space-y-3 text-sm">
                {sitio.navegacion.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-marfil/85 hover:text-arena">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Columna>

          <Columna titulo="Legal">
            <ul className="space-y-3 text-sm">
              {sitio.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-marfil/85 hover:text-arena">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Columna>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-caramelo/20 pt-8 text-xs text-marfil/70 sm:flex-row sm:justify-between">
          <p>
            © {anio} KORU · {responsable.razonSocial} · NIT {responsable.nit} · Cali, Colombia
          </p>
          <p className="text-sm italic">{sitio.frase}</p>
        </div>
      </Container>
    </footer>
  );
}
