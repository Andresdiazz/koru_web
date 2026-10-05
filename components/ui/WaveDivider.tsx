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

/** Variante a todo el ancho para separar secciones grandes. */
export function WaveLine({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none" className={cn("h-6 w-full text-caramelo", className)} focusable="false">
      <path d="M0 22 C 180 6, 360 6, 540 20 S 900 36, 1080 20 S 1340 8, 1440 16" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M0 28 C 200 14, 400 16, 600 26 S 960 34, 1160 22 S 1380 14, 1440 22" stroke="currentColor" strokeWidth="1" opacity="0.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
