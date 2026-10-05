"use client";

import { m, useReducedMotion } from "framer-motion";
import { createElement } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Frase que aparece línea por línea (momentos clave).
 * Cada elemento de `lineas` es una línea visual.
 */
export function LineByLine({
  lineas,
  as = "p",
  className,
  lineaClassName,
  intervalo = 0.18,
}: {
  lineas: string[];
  as?: "p" | "h1" | "h2" | "h3" | "blockquote";
  className?: string;
  lineaClassName?: string;
  intervalo?: number;
}) {
  const reducir = useReducedMotion();
  const contenido = lineas.map((linea, i) =>
    reducir ? (
      <span key={i} className={`block ${lineaClassName ?? ""}`}>
        {linea}
      </span>
    ) : (
      <span key={i} className="block overflow-hidden pb-[0.08em]">
        <m.span
          className={`block ${lineaClassName ?? ""}`}
          variants={{
            oculto: { y: "105%", opacity: 0 },
            visible: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: EASE } },
          }}
        >
          {linea}
        </m.span>
      </span>
    ),
  );

  if (reducir) return createElement(as, { className }, contenido);

  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={{ oculto: {}, visible: { transition: { staggerChildren: intervalo } } }}
    >
      {contenido}
    </Comp>
  );
}
