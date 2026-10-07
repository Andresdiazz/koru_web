"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Parallax del hero: al bajar, el fondo se desplaza más lento que el contenido
 * (hasta un 25 % de lo que se baja) y da sensación de profundidad.
 * El fondo es 15 % más alto que el hero para que nunca se vea el borde.
 * Sin movimiento si la persona pidió reducir el movimiento.
 */
export function HeroParallax({ children }: { children: ReactNode }) {
  const reducir = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200], { clamp: true });

  return (
    <m.div
      className="absolute inset-x-0 top-0 -bottom-[15%] -z-20 will-change-transform"
      style={reducir ? undefined : { y }}
    >
      {children}
    </m.div>
  );
}
