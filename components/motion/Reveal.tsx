"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  oculto: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay } }),
};

type Etiqueta = "div" | "li" | "ul" | "ol" | "p" | "span" | "article" | "header" | "figure";

/** Aparición suave al hacer scroll: fade + subida de 20px. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Etiqueta;
}) {
  const reducir = useReducedMotion();
  const Comp = m[as];
  if (reducir) {
    const Plano = as;
    return <Plano className={className}>{children}</Plano>;
  }
  return (
    <Comp
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={item}
      custom={delay}
    >
      {children}
    </Comp>
  );
}

/** Contenedor que revela a sus hijos <StaggerItem> de forma escalonada. */
export function Stagger({
  children,
  className,
  as = "div",
  intervalo = 0.12,
}: {
  children: ReactNode;
  className?: string;
  as?: Etiqueta;
  intervalo?: number;
}) {
  const reducir = useReducedMotion();
  if (reducir) {
    const Plano = as;
    return <Plano className={className}>{children}</Plano>;
  }
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ oculto: {}, visible: { transition: { staggerChildren: intervalo } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: Etiqueta;
  id?: string;
}) {
  const reducir = useReducedMotion();
  if (reducir) {
    const Plano = as;
    return (
      <Plano id={id} className={className}>
        {children}
      </Plano>
    );
  }
  const Comp = m[as];
  return (
    <Comp id={id} className={className} variants={item}>
      {children}
    </Comp>
  );
}
