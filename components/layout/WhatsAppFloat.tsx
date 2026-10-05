"use client";

import { m } from "framer-motion";
import { usePathname } from "next/navigation";
import { getExperiencia } from "@/content/experiencias";
import { mensajeParaRuta, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icon";

/** Mensaje según la página; en el detalle de una experiencia incluye su nombre. */
function mensaje(pathname: string) {
  const detalle = pathname.match(/^\/business\/([^/]+)$/);
  const experiencia = detalle ? getExperiencia(detalle[1]) : undefined;
  if (experiencia) return `Hola KORU 🌿 Quiero información sobre la experiencia ${experiencia.nombre} para mi equipo.`;
  return mensajeParaRuta(pathname);
}

/** Botón flotante de WhatsApp, abajo a la derecha, en todas las páginas. */
export function WhatsAppFloat() {
  const pathname = usePathname();
  return (
    <m.a
      href={whatsappUrl(mensaje(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex h-14 items-center gap-0 rounded-full bg-terracota pr-4 pl-4 text-marfil shadow-[0_12px_32px_-8px_rgb(44_26_14/0.55)] ring-1 ring-caramelo/40 transition-[background-color,gap,padding] duration-500 hover:gap-2.5 hover:bg-tostado hover:pr-6 sm:right-6 sm:bottom-6"
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-[max-width] duration-500 group-hover:max-w-40 group-focus-visible:max-w-40">
        Escríbenos
      </span>
    </m.a>
  );
}
