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

  const flecha = (visible: boolean) =>
    cn(
      "absolute top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full shadow-(--shadow-card-hover) backdrop-blur-sm transition-[opacity,transform,background-color] duration-300 md:flex",
      oscuro ? "bg-espresso/80 text-marfil ring-1 ring-caramelo/50 hover:bg-espresso" : "bg-marfil/90 text-espresso ring-1 ring-arena hover:bg-marfil",
      visible ? "opacity-100" : "pointer-events-none opacity-0",
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
      {/* Flechas sobre las fotos, a media altura: no las tapa el botón flotante de WhatsApp */}
      <button
        type="button"
        className={cn(flecha(puedeAtras), "left-4 hover:-translate-x-0.5 lg:left-8")}
        onClick={() => mover(-1)}
        aria-hidden={!puedeAtras}
        tabIndex={puedeAtras ? 0 : -1}
      >
        <Icon nombre="flecha" className="h-5 w-5 rotate-180" />
        <span className="sr-only">Anterior</span>
      </button>
      <button
        type="button"
        className={cn(flecha(puedeAdelante), "right-4 hover:translate-x-0.5 lg:right-8")}
        onClick={() => mover(1)}
        aria-hidden={!puedeAdelante}
        tabIndex={puedeAdelante ? 0 : -1}
      >
        <Icon nombre="flecha" className="h-5 w-5" />
        <span className="sr-only">Siguiente</span>
      </button>
    </div>
  );
}
