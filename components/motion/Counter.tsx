"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Número que cuenta desde 0 cuando aparece en pantalla. */
export function Counter({ valor, prefijo = "", sufijo = "" }: { valor: number; prefijo?: string; sufijo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reducir = useReducedMotion();
  const [actual, setActual] = useState(reducir ? valor : 0);

  useEffect(() => {
    if (!visible || reducir) return;
    const controles = animate(0, valor, {
      duration: valor > 20 ? 2 : 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setActual(Math.round(v)),
    });
    return () => controles.stop();
  }, [visible, reducir, valor]);

  return (
    <span ref={ref} className="tabular-nums">
      {/* Lectores de pantalla siempre leen el valor final */}
      <span aria-hidden>
        {prefijo}
        {reducir ? valor : actual}
        {sufijo}
      </span>
      <span className="sr-only">
        {prefijo}
        {valor}
        {sufijo}
      </span>
    </span>
  );
}
