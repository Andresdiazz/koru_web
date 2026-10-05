"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Experiencia, Necesidad } from "@/types/content";
import Link from "next/link";

/**
 * "¿Qué quieres regalarle a tu equipo?": cinco botones con ícono en círculo.
 * Al tocar uno se despliega su descripción y el botón para conocer la experiencia.
 */
export function NeedSelector({
  necesidades,
  experiencias,
  boton,
}: {
  necesidades: Necesidad[];
  experiencias: Pick<Experiencia, "slug" | "nombre" | "frase">[];
  boton: string;
}) {
  const [activa, setActiva] = useState<Necesidad["id"] | null>(null);
  const necesidad = necesidades.find((n) => n.id === activa);
  const experiencia = necesidad && experiencias.find((e) => e.slug === necesidad.experiencia);

  return (
    <div>
      <ul className="flex flex-wrap justify-center gap-3 md:flex-nowrap md:gap-4">
        {necesidades.map((n, i) => {
          const seleccionada = n.id === activa;
          return (
            <li
              key={n.id}
              className={cn(
                "basis-[calc(50%-0.375rem)] sm:basis-[calc(33.333%-0.5rem)] md:flex-1 md:basis-0",
                i === necesidades.length - 1 && "max-sm:basis-full",
              )}
            >
              <button
                type="button"
                onClick={() => setActiva(seleccionada ? null : n.id)}
                aria-expanded={seleccionada}
                aria-controls="detalle-necesidad"
                className={cn(
                  "group flex h-full w-full flex-col items-center gap-4 rounded-[var(--radius-card)] border px-4 py-7 text-center transition-[background-color,border-color,color,transform] duration-500 hover:-translate-y-1",
                  seleccionada
                    ? "border-terracota bg-terracota text-marfil"
                    : "border-arena bg-marfil hover:border-caramelo",
                )}
              >
                <span
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full border transition-colors duration-500",
                    seleccionada ? "border-marfil/60 text-marfil" : "border-caramelo/70 text-terracota",
                  )}
                >
                  <Icon nombre={n.id} className="h-8 w-8" />
                </span>
                <span className="font-display text-2xl">{n.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div id="detalle-necesidad" aria-live="polite" className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          {necesidad && experiencia ? (
            <m.div
              key={necesidad.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 rounded-[var(--radius-card)] bg-espresso p-8 text-marfil md:flex-row md:items-center md:justify-between md:p-10"
            >
              <div>
                <p className="font-display text-3xl md:text-4xl">{necesidad.descripcion}</p>
                <p className="mt-3 text-marfil/80">
                  <span className="text-arena">{experiencia.nombre}</span> · {experiencia.frase}
                </p>
              </div>
              <Link href={`/business/${experiencia.slug}`} className={buttonClasses({ className: "shrink-0" })}>
                <span>{boton}</span>
                <Icon nombre="flecha" className="h-4 w-4" />
              </Link>
            </m.div>
          ) : (
            <m.p
              key="pista"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 text-center text-sm text-tostado"
            >
              Toca una intención para descubrir la experiencia que la hace realidad.
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
