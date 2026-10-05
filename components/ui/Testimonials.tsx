import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import type { Testimonio } from "@/types/content";

/**
 * Testimonios: en celular, carrusel deslizable; en escritorio, tres columnas.
 * Preparado para recibir reseñas de Google en la Fase 3 (mismo formato).
 */
export function Testimonials({ items, oscuro }: { items: Testimonio[]; oscuro?: boolean }) {
  if (items.length === 0) return null;
  return (
    <Stagger
      as="ul"
      className="snap-carousel -mx-5 sm:-mx-8 sm:px-8 sm:[scroll-padding-inline:2rem] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
    >
      {items.map((t) => (
        <StaggerItem
          as="li"
          key={t.nombre + t.texto}
          className={cn(
            "flex w-[82vw] flex-col rounded-[var(--radius-card)] p-8 sm:w-[24rem] md:w-auto md:p-10",
            oscuro ? "bg-tostado text-marfil" : "border border-arena bg-marfil",
          )}
        >
          <span aria-hidden className={cn("font-display text-7xl leading-[0.6]", oscuro ? "text-caramelo" : "text-terracota")}>“</span>
          <blockquote className="mt-4 flex-1 font-display text-2xl leading-snug md:text-[1.75rem]">{t.texto}</blockquote>
          <p className="mt-8 text-sm">
            <span className="font-medium">{t.nombre}</span>
            <span className={oscuro ? "text-marfil/70" : "text-tostado"}> · {t.detalle}</span>
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
