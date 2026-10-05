"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Parallax leve para imágenes grandes. El contenido se desplaza ±`intensidad`%
 * mientras la sección cruza la pantalla. Sin movimiento si se pide reduced-motion.
 * Si pasas `className`, incluye el posicionamiento (p. ej. "absolute inset-0").
 */
export function Parallax({
  children,
  className,
  intensidad = 8,
}: {
  children: ReactNode;
  className?: string;
  intensidad?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensidad}%`, `${intensidad}%`]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className ?? "relative")}>
      <m.div
        className="absolute inset-x-0 will-change-transform"
        style={reducir ? { top: 0, bottom: 0 } : { y, top: `-${intensidad}%`, bottom: `-${intensidad}%` }}
      >
        {children}
      </m.div>
    </div>
  );
}
