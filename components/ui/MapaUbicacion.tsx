import { ButtonLink } from "@/components/ui/Button";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";
import { sitio } from "@/content/sitio";
import { comoLlegarUrl, mapaEmbedUrl } from "@/lib/mapa";
import { whatsappUrl } from "@/lib/whatsapp";

/** Dirección, horarios, botones y mapa. Se usa en el home y en /contacto. */
export function MapaUbicacion() {
  const { ubicacion } = sitio.home;
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <div className="flex flex-col">
        <div className="space-y-8">
          <div className="flex gap-4">
            <Icon nombre="ubicacion" className="mt-1 h-6 w-6 shrink-0 text-terracota" />
            <div>
              <h3 className="font-display text-2xl">{sitio.ubicacion.sede}</h3>
              <p className="mt-1 text-tostado">{sitio.ubicacion.direccion}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Icon nombre="reloj" className="mt-1 h-6 w-6 shrink-0 text-terracota" />
            <div>
              <h3 className="font-display text-2xl">Horarios</h3>
              <ul>
                {sitio.horarios.map((h) => (
                  <li key={h.dias} className="mt-1 text-tostado">
                    <span className="text-espresso">{h.dias}:</span> {h.horas}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <ButtonLink href={comoLlegarUrl} icono={<Icon nombre="ubicacion" className="h-5 w-5" />}>
            {ubicacion.botonComoLlegar}
          </ButtonLink>
          <ButtonLink href={whatsappUrl(sitio.mensajesWhatsApp["/contacto"])} variante="secundario" icono={<WhatsAppIcon className="h-5 w-5" />}>
            {ubicacion.botonWhatsApp}
          </ButtonLink>
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-arena shadow-(--shadow-card) lg:aspect-auto lg:min-h-[26rem]">
        <iframe
          title={`Mapa de KORU, ${sitio.ubicacion.sede}`}
          src={mapaEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 sepia-[0.25] saturate-[0.85]"
        />
      </div>
    </div>
  );
}
