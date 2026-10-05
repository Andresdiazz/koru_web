import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Clases compartidas para inputs, selects y textareas del formulario. */
export const claseInput = (error?: boolean) =>
  cn(
    "w-full rounded-2xl border bg-marfil px-5 text-base text-espresso transition-[border-color,box-shadow] duration-300 placeholder:text-tostado/50",
    "focus:border-terracota focus:shadow-[0_0_0_4px_rgb(196_129_63/0.2)] focus:outline-none",
    error ? "border-terracota bg-arena/20" : "border-arena hover:border-caramelo",
  );

/** Etiqueta + control + ayuda + error, con los atributos de accesibilidad conectados. */
export function Campo({
  id,
  label,
  error,
  ayuda,
  opcional,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  ayuda?: ReactNode;
  opcional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium">
        {label}
        {opcional && <span className="text-xs font-normal text-tostado">Opcional</span>}
      </label>
      {children}
      {ayuda && !error && (
        <p id={`${id}-ayuda`} className="mt-2 text-sm text-tostado">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-start gap-2 text-sm text-terracota">
          <span aria-hidden className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-terracota text-[0.625rem] font-bold text-marfil">
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
}

/** aria-* para un control según su estado. */
export const ariaCampo = (id: string, error?: string, ayuda?: boolean) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : ayuda ? `${id}-ayuda` : undefined,
});
