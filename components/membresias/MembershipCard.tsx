import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { masajes } from "@/content/masajes";
import { membresias } from "@/content/membresias";
import { cn } from "@/lib/cn";
import { formatCOP } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Plan } from "@/types/content";

/** Filas de beneficios visibles según los interruptores. */
export function beneficiosVisibles() {
  return membresias.beneficios.filter((b) => !b.dependeDeMasajes || masajes.disponible);
}

/**
 * Tarjeta de membresía. Muestra el precio solo si `mostrarPrecios` es true;
 * si no, muestra los beneficios y el botón "Agenda tu primera clase".
 */
export function MembershipCard({ plan, className }: { plan: Plan; className?: string }) {
  const destacada = !!plan.destacada;
  const incluidos = beneficiosVisibles().filter((b) => b.valores[plan.id]);
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[var(--radius-card)] p-8 transition-[transform,box-shadow] duration-500 ease-(--ease-koru) hover:-translate-y-1.5 md:p-10",
        destacada
          ? "bg-espresso text-marfil shadow-(--shadow-card-hover) ring-1 ring-caramelo/50 lg:-my-6 lg:py-14"
          : "border border-arena bg-marfil text-espresso hover:shadow-(--shadow-card)",
        className,
      )}
    >
      {destacada && plan.etiquetaDestacada && (
        <span className="eyebrow absolute -top-3.5 left-8 rounded-full bg-caramelo px-4 py-1.5 text-[0.6875rem] text-espresso md:left-10">
          ★ {plan.etiquetaDestacada}
        </span>
      )}
      <h3 className="koru-wordmark text-[2.5rem] leading-none tracking-[0.18em]!">{plan.nombre}</h3>
      <p className={cn("mt-4", destacada ? "text-marfil/80" : "text-tostado")}>{plan.frase}</p>

      {membresias.mostrarPrecios && (
        <p className="mt-6 font-display text-5xl font-light">
          {formatCOP(plan.precioMensual)}
          <span className={cn("ml-1 font-sans text-sm", destacada ? "text-marfil/70" : "text-tostado")}>/ mes</span>
        </p>
      )}

      <ul className={cn("mt-8 flex-1 space-y-3.5 border-t pt-8 text-[0.9375rem]", destacada ? "border-caramelo/30" : "border-arena")}>
        {incluidos.map((b) => (
          <li key={b.id} className="flex gap-3">
            <Icon nombre="check" className={cn("mt-0.5 h-5 w-5 shrink-0", destacada ? "text-caramelo" : "text-terracota")} strokeWidth={1.5} />
            <span>
              <span className={destacada ? "text-marfil/75" : "text-tostado"}>{b.label}:</span>{" "}
              <span className="font-medium">{b.valores[plan.id]}</span>
            </span>
          </li>
        ))}
      </ul>

      <ButtonLink
        href={whatsappUrl(`Hola KORU 🌿 Quiero agendar mi primera clase. Me interesa la membresía ${plan.nombre}.`)}
        variante={destacada ? "primario" : "secundario"}
        className="mt-10 w-full"
      >
        {membresias.boton}
      </ButtonLink>
    </article>
  );
}
