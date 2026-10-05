"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { precioPorGrupo } from "@/lib/format";
import type { Experiencia } from "@/types/content";

/**
 * Selector visual de modalidad + precio por grupo (se anima al cambiar)
 * + botones de reserva y WhatsApp con la experiencia y modalidad elegidas.
 */
export function ReservaPanel({
  experiencia,
  whatsappBase,
  botonReservar,
  botonHablar,
}: {
  experiencia: Experiencia;
  /** URL base de WhatsApp (https://wa.me/57…) */
  whatsappBase: string;
  botonReservar: string;
  botonHablar: string;
}) {
  const [modalidadId, setModalidadId] = useState(experiencia.modalidades[0].id);
  const modalidad = experiencia.modalidades.find((mo) => mo.id === modalidadId) ?? experiencia.modalidades[0];
  const precio = precioPorGrupo(modalidad.precio, experiencia.capacidad);
  const varias = experiencia.modalidades.length > 1;

  const mensaje = `Hola KORU 🌿 Quiero información sobre la experiencia ${experiencia.nombre}${varias ? ` (${modalidad.nombre})` : ""} para mi equipo.`;
  const reservarHref = `/business/reservar?experiencia=${experiencia.slug}&modalidad=${modalidad.id}`;

  return (
    <div className="rounded-[var(--radius-card)] bg-espresso p-7 text-marfil shadow-(--shadow-card-hover) md:p-9">
      {varias ? (
        <fieldset>
          <legend className="eyebrow mb-4 text-caramelo">Elige la modalidad</legend>
          <div className="space-y-3">
            {experiencia.modalidades.map((mo) => {
              const activa = mo.id === modalidad.id;
              return (
                <label
                  key={mo.id}
                  className={cn(
                    "flex cursor-pointer gap-4 rounded-2xl border p-5 transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-caramelo",
                    activa ? "border-caramelo bg-tostado" : "border-marfil/15 hover:border-caramelo/60",
                  )}
                >
                  <input
                    type="radio"
                    name="modalidad"
                    value={mo.id}
                    checked={activa}
                    onChange={() => setModalidadId(mo.id)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                      activa ? "border-caramelo" : "border-marfil/40",
                    )}
                  >
                    {activa && <span className="h-2.5 w-2.5 rounded-full bg-caramelo" />}
                  </span>
                  <span>
                    <span className="block font-medium">{mo.nombre}</span>
                    {mo.descripcion && <span className="mt-1 block text-sm text-marfil/75">{mo.descripcion}</span>}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <p className="eyebrow text-caramelo">Precio de la experiencia</p>
      )}

      <div className={cn("overflow-hidden", varias && "mt-8 border-t border-caramelo/25 pt-8", !varias && "mt-4")} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={modalidad.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-5xl font-light md:text-[3.5rem]">{precio.grupo.replace(" por grupo", "")}</p>
            <p className="mt-1 text-arena">por grupo</p>
            <p className="mt-3 text-sm text-marfil/75">{precio.equivalencia}</p>
          </m.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Link href={reservarHref} className={buttonClasses({ tamano: "lg", className: "w-full" })}>
          <span>{botonReservar}</span>
          <Icon nombre="flecha" className="h-4 w-4" />
        </Link>
        <a
          href={`${whatsappBase}?text=${encodeURIComponent(mensaje)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ variante: "secundario-claro", tamano: "lg", className: "w-full" })}
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span>{botonHablar}</span>
        </a>
      </div>
    </div>
  );
}
