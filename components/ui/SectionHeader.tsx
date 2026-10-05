import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Section";

/** Antetítulo + título + texto de una sección, con aparición suave. */
export function SectionHeader({
  eyebrow,
  titulo,
  texto,
  oscuro,
  centrado,
  className,
  children,
}: {
  eyebrow?: string;
  titulo: ReactNode;
  texto?: ReactNode;
  oscuro?: boolean;
  centrado?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className={cn("max-w-3xl", centrado && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow oscuro={oscuro} className={cn("mb-5", centrado && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="text-[2.5rem] sm:text-5xl lg:text-6xl">{titulo}</h2>
      {texto && (
        <p className={cn("mt-6 max-w-2xl text-lg", oscuro ? "text-marfil/80" : "text-tostado", centrado && "mx-auto")}>{texto}</p>
      )}
      {children}
    </Reveal>
  );
}
