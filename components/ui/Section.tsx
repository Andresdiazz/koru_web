import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { KoruSpiral } from "./KoruSpiral";

export type Tono = "espresso" | "tostado" | "crema" | "marfil" | "arena";

const tonos: Record<Tono, string> = {
  espresso: "bg-espresso text-marfil",
  tostado: "bg-tostado text-marfil",
  crema: "bg-crema text-espresso",
  marfil: "bg-marfil text-espresso",
  arena: "bg-arena text-espresso",
};

export const esOscuro = (tono: Tono) => tono === "espresso" || tono === "tostado";

/**
 * Sección de página. Alterna tonos oscuros y claros para dar ritmo.
 * En tonos oscuros agrega la espiral koru como marca de agua (opacidad 5%).
 */
export function Section({
  tono = "crema",
  espiral,
  className,
  children,
  ...props
}: {
  tono?: Tono;
  /** Posición de la espiral de marca de agua. Solo en tonos oscuros. */
  espiral?: "izquierda" | "derecha" | false;
  children: ReactNode;
} & ComponentProps<"section">) {
  const conEspiral = esOscuro(tono) && espiral !== false;
  return (
    <section
      data-tono={tono}
      className={cn("relative isolate overflow-clip py-24 md:py-32", tonos[tono], className)}
      {...props}
    >
      {conEspiral && (
        <KoruSpiral
          aria-hidden
          className={cn(
            "pointer-events-none absolute -z-10 h-[46rem] w-[46rem] text-caramelo opacity-[0.05] md:h-[60rem] md:w-[60rem]",
            espiral === "izquierda" ? "-bottom-56 -left-72" : "-top-48 -right-72",
          )}
        />
      )}
      {children}
    </section>
  );
}

export function Container({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)} {...props}>
      {children}
    </div>
  );
}

/** Antetítulo en mayúsculas con línea fina. */
export function Eyebrow({ children, className, oscuro }: { children: ReactNode; className?: string; oscuro?: boolean }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", oscuro ? "text-caramelo" : "text-terracota", className)}>
      <span aria-hidden className={cn("h-px w-8", oscuro ? "bg-caramelo/70" : "bg-terracota/60")} />
      {children}
    </p>
  );
}
