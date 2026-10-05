import { cn } from "@/lib/cn";

/**
 * Separador de sección: líneas onduladas finas en caramelo,
 * inspiradas en las líneas de agua del logo (se cruzan suavemente).
 */
export function WaveDivider({ className, lineas = 3 }: { className?: string; lineas?: 2 | 3 }) {
  return (
    <div aria-hidden className={cn("flex justify-center text-caramelo", className)}>
      <svg viewBox="0 0 240 28" fill="none" className="h-7 w-48 md:w-60" focusable="false">
        <path d="M2 14 C 32 2, 58 2, 88 13 S 148 26, 178 14 S 222 4, 238 10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M2 19 C 36 9, 64 10, 94 18 S 152 25, 184 15 S 226 9, 238 15" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
        {lineas === 3 && (
          <path d="M18 8 C 48 18, 80 20, 112 10 S 170 2, 204 12 S 232 20, 238 19" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
        )}
      </svg>
    </div>
  );
}

/**
 * Separador a todo el ancho: líneas finas a los lados y, al centro, el motivo de agua
 * en su proporción real (la onda no se estira con el ancho de la pantalla).
 */
export function WaveLine({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-5 text-caramelo", className)}>
      <span className="h-px flex-1 bg-current opacity-35" />
      <svg viewBox="0 0 120 20" fill="none" className="h-5 w-24 shrink-0" focusable="false">
        <path d="M2 11 C 18 3, 32 3, 48 10 S 80 18, 96 10 S 112 5, 118 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M2 15 C 20 8, 36 9, 52 14 S 84 18, 100 12 S 114 9, 118 12" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-35" />
    </div>
  );
}
