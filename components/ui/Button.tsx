import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variante = "primario" | "secundario" | "secundario-claro" | "texto";
type Tamano = "md" | "lg";

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full font-sans text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-(--ease-koru) select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variantes: Record<Variante, string> = {
  /* Píldora terracota con texto marfil */
  primario: "bg-terracota text-marfil hover:bg-tostado hover:shadow-[0_10px_30px_-10px_rgb(139_74_43/0.6)]",
  /* Secundario con borde caramelo (sobre fondos claros) */
  secundario: "border border-caramelo text-espresso hover:bg-caramelo/15",
  /* Secundario con borde caramelo (sobre fondos oscuros) */
  "secundario-claro": "border border-caramelo text-marfil hover:bg-caramelo/20",
  texto: "min-h-0 px-0! py-1 text-terracota underline-offset-8 hover:underline",
};

const tamanos: Record<Tamano, string> = {
  md: "px-7 py-3",
  lg: "px-9 py-4 text-sm",
};

type Comunes = {
  variante?: Variante;
  tamano?: Tamano;
  icono?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function buttonClasses({ variante = "primario", tamano = "md", className }: Omit<Comunes, "children" | "icono">) {
  return cn(base, variantes[variante], tamanos[tamano], className);
}

/** Botón que navega (interno o externo). Los enlaces externos abren en otra pestaña. */
export function ButtonLink({
  href,
  variante,
  tamano,
  icono,
  className,
  children,
  externo,
  ...props
}: Comunes & Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string; externo?: boolean }) {
  const esExterno = externo ?? /^https?:\/\//.test(href);
  const contenido = (
    <>
      {icono}
      <span>{children}</span>
    </>
  );
  if (esExterno) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variante, tamano, className })}>
        {contenido}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses({ variante, tamano, className })} {...props}>
      {contenido}
    </Link>
  );
}

export function Button({
  variante,
  tamano,
  icono,
  className,
  children,
  type = "button",
  ...props
}: Comunes & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={buttonClasses({ variante, tamano, className })} {...props}>
      {icono}
      <span>{children}</span>
    </button>
  );
}
