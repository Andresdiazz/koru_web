"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { sitio } from "@/content/sitio";
import { cn } from "@/lib/cn";
import { mensajeParaRuta, whatsappUrl } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";
import { KoruSpiral } from "@/components/ui/KoruSpiral";
import { esActivo } from "@/lib/nav";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Menú de pantalla completa en espresso con enlaces en Cormorant grande. */
export function MobileMenu({
  abierto,
  onCerrar,
  pathname,
}: {
  abierto: boolean;
  onCerrar: () => void;
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const anterior = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
      // Mantiene el foco dentro del menú
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const primero = focusables[0];
        const ultimo = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      anterior?.focus();
    };
  }, [abierto, onCerrar]);

  return (
    <AnimatePresence>
      {abierto && (
        <m.div
          ref={panelRef}
          id="menu-movil"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-espresso text-marfil xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <KoruSpiral aria-hidden className="pointer-events-none absolute -right-40 -bottom-40 h-[34rem] w-[34rem] text-caramelo opacity-[0.06]" />

          <div className="flex h-18 items-center justify-between px-5 sm:px-8">
            <span className="koru-wordmark text-xl">KORU</span>
            <button
              ref={cerrarRef}
              type="button"
              onClick={onCerrar}
              className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full hover:bg-marfil/10"
            >
              <Icon nombre="cerrar" className="h-7 w-7" />
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>

          <nav aria-label="Menú móvil" className="flex flex-1 flex-col justify-center px-5 py-10 sm:px-8">
            <m.ul
              className="space-y-1"
              initial="oculto"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            >
              {sitio.navegacion.map((item) => {
                const activo = esActivo(item.href, pathname);
                return (
                  <m.li
                    key={item.href}
                    variants={{
                      oculto: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onCerrar}
                      aria-current={activo ? "page" : undefined}
                      className={cn(
                        "flex items-baseline gap-4 py-2 font-display text-[2.4rem] leading-tight font-light transition-colors sm:text-5xl",
                        activo ? "text-arena" : "hover:text-arena",
                      )}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                );
              })}
            </m.ul>
          </nav>

          <m.div
            className="space-y-6 border-t border-caramelo/20 px-5 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.6 } }}
          >
            <a
              href={whatsappUrl(mensajeParaRuta(pathname))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variante: "primario", tamano: "lg", className: "w-full" })}
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>Escríbenos por WhatsApp</span>
            </a>
            <p className="text-sm text-arena/80">{sitio.ubicacion.sede}</p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
