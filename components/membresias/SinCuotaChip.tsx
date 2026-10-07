import { Icon } from "@/components/ui/Icon";
import { membresias } from "@/content/membresias";
import { cn } from "@/lib/cn";

/** Etiqueta destacada "Sin cuota de inscripción": un beneficio que debe verse de primeras. */
export function SinCuotaChip({ oscuro, className }: { oscuro?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
        oscuro ? "bg-espresso/50 text-marfil ring-1 ring-caramelo/60 backdrop-blur-sm" : "bg-marfil text-espresso ring-1 ring-caramelo",
        className,
      )}
    >
      <Icon nombre="check" className={cn("h-4 w-4", oscuro ? "text-caramelo" : "text-terracota")} strokeWidth={2} />
      {membresias.notaInscripcion.replace(/\.$/, "")}
    </p>
  );
}
