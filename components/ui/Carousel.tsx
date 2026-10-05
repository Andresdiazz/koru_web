"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/**
 * Carrusel deslizable con snap. En celular se desliza con el dedo;
 * en escritorio muestra flechas. Los hijos deben ser elementos <li>.
 */
export function Carousel({
  children,
  etiqueta,
  className,
  oscuro,
}: {
  children: ReactNode;
  /** Nombre accesible del carrusel */
  etiqueta: string;
  className?: string;
  oscuro?: boolean;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [puedeAtras, setPuedeAtras] = useState(false);
  const [puedeAdelante, setPuedeAdelante] = useState(true);

  const actualizar = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setPuedeAtras(el.scrollLeft > 8);
    setPuedeAdelante(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    actualizar();
    const el = ref.current;
    el?.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
    return () => {
      el?.removeEventListener("scroll", actualizar);
      window.removeEventListener("resize", actualizar);
    };
  }, [actualizar]);

  const mover = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const item = el.querySelector("li");
    const paso = item ? item.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * paso, behavior: "smooth" });
  };

  const flecha = cn(
    "inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors disabled:opacity-30",
    oscuro ? "border-caramelo/60 text-marfil hover:bg-caramelo/20" : "border-caramelo text-espresso hover:bg-caramelo/15",
  );

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={ref}
        aria-label={etiqueta}
        tabIndex={0}
        className="snap-carousel py-4 md:gap-5 md:px-[max(2rem,calc((100vw-80rem)/2+3rem))] md:[scroll-padding-inline:max(2rem,calc((100vw-80rem)/2+3rem))]"
      >
        {children}
      </ul>
      <div className="mx-auto mt-6 hidden max-w-7xl justify-end gap-3 px-12 md:flex">
        <button type="button" className={flecha} onClick={() => mover(-1)} disabled={!puedeAtras}>
          <Icon nombre="flecha" className="h-5 w-5 rotate-180" />
          <span className="sr-only">Anterior</span>
        </button>
        <button type="button" className={flecha} onClick={() => mover(1)} disabled={!puedeAdelante}>
          <Icon nombre="flecha" className="h-5 w-5" />
          <span className="sr-only">Siguiente</span>
        </button>
      </div>
    </div>
  );
}
