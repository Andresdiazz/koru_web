"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { membresias } from "@/content/membresias";
import { formatCOP } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";

const CLAVE = "koru-primera-clase-cerrado";

/**
 * Recordatorio flotante de "Tu primera clase": aparece al bajar del hero, se esconde
 * mientras se ve la sección #primera-clase o el pie de página, y se puede cerrar
 * (queda cerrado durante la visita).
 */
export function PrimeraClaseFlotante() {
  const pc = membresias.primeraClase;
  // Lectura inicial del almacenamiento (en el servidor no existe; ahí no se muestra nada de todas formas)
  const [cerrado, setCerrado] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(CLAVE) === "1";
    } catch {
      return false;
    }
  });
  const [pasoHero, setPasoHero] = useState(false);
  const [tapado, setTapado] = useState(false);

  useEffect(() => {
    const onScroll = () => setPasoHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Se esconde mientras la sección de primera clase o el pie de página están en pantalla
    const visibles = new Set<Element>();
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          // La sección de primera clase cuenta solo si se ve al menos un 25 %; el pie, apenas asoma
          const umbral = e.target.tagName === "FOOTER" ? 0 : 0.25;
          if (e.isIntersecting && e.intersectionRatio >= umbral) visibles.add(e.target);
          else visibles.delete(e.target);
        }
        setTapado(visibles.size > 0);
      },
      { threshold: [0, 0.25, 0.5] },
    );
    document.querySelectorAll("#primera-clase, footer").forEach((el) => obs.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const cerrar = () => {
    setCerrado(true);
    try {
      sessionStorage.setItem(CLAVE, "1");
    } catch {
      // ignorar
    }
  };

  const visible = !cerrado && pasoHero && !tapado;

  return (
    <AnimatePresence>
      {visible && (
        <m.aside
          aria-label="Tu primera clase"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-30 flex max-w-[calc(100vw-6rem)] items-center gap-3 rounded-full bg-espresso py-2 pr-2 pl-5 text-marfil shadow-[0_12px_32px_-8px_rgb(44_26_14/0.55)] ring-1 ring-caramelo/40 sm:left-6 sm:bottom-6 sm:gap-4"
        >
          <p className="min-w-0 leading-tight">
            <span className="block text-[0.625rem] tracking-[0.1em] whitespace-nowrap text-arena uppercase sm:text-[0.6875rem] sm:tracking-[0.16em]">{pc.titulo}</span>
            <span className="block truncate text-sm">
              <strong className="font-display text-lg font-normal">{formatCOP(pc.precio)}</strong>
              <span className="text-marfil/80 max-sm:hidden"> · {pc.condicion}</span>
            </span>
          </p>
          <a
            href={whatsappUrl(pc.mensajeWhatsApp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 shrink-0 items-center rounded-full bg-terracota px-3.5 text-xs sm:px-4 font-medium tracking-[0.12em] text-marfil uppercase transition-colors hover:bg-tostado"
          >
            Agendar
          </a>
          <button
            type="button"
            onClick={cerrar}
            className="-ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-marfil/70 hover:bg-marfil/10 hover:text-marfil"
          >
            <Icon nombre="cerrar" className="h-4 w-4" />
            <span className="sr-only">Cerrar recordatorio de primera clase</span>
          </button>
        </m.aside>
      )}
    </AnimatePresence>
  );
}
