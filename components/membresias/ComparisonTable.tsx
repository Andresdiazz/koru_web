import { Icon } from "@/components/ui/Icon";
import { membresias } from "@/content/membresias";
import { cn } from "@/lib/cn";
import { formatCOP } from "@/lib/format";
import { beneficiosVisibles } from "./MembershipCard";

/** Tabla comparativa de las tres membresías. Se desliza horizontalmente en pantallas pequeñas. */
export function ComparisonTable() {
  const filas = beneficiosVisibles();
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0" tabIndex={0} role="region" aria-label="Comparativa de membresías">
      <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-left">
        <caption className="sr-only">Beneficios incluidos en cada membresía</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[34%] pb-6 align-bottom text-sm font-normal text-tostado">
              Beneficio
            </th>
            {membresias.planes.map((p) => (
              <th
                key={p.id}
                scope="col"
                className={cn("px-4 pt-6 pb-6 text-center align-bottom", p.destacada && "rounded-t-[var(--radius-card)] bg-espresso text-marfil")}
              >
                {p.destacada && <span className="eyebrow mb-2 block text-[0.625rem] text-caramelo">★ {p.etiquetaDestacada}</span>}
                <span className="koru-wordmark block text-2xl tracking-[0.18em]!">{p.nombre}</span>
                {membresias.mostrarPrecios && (
                  <span className="mt-2 block font-display text-2xl font-light">
                    {formatCOP(p.precioMensual)}
                    <span className="font-sans text-xs opacity-70"> / mes</span>
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={f.id}>
              <th scope="row" className="border-t border-arena py-4 pr-4 text-[0.9375rem] font-normal">
                {f.label}
              </th>
              {membresias.planes.map((p) => {
                const v = f.valores[p.id];
                return (
                  <td
                    key={p.id}
                    className={cn(
                      "border-t px-4 py-4 text-center text-[0.9375rem]",
                      p.destacada ? "border-caramelo/25 bg-espresso text-marfil" : "border-arena",
                      p.destacada && i === filas.length - 1 && "rounded-b-[var(--radius-card)]",
                    )}
                  >
                    {v === null ? (
                      <>
                        <span aria-hidden className={p.destacada ? "text-marfil/40" : "text-tostado/50"}>—</span>
                        <span className="sr-only">No incluido</span>
                      </>
                    ) : v === "Sí" ? (
                      <>
                        <Icon nombre="check" className={cn("mx-auto h-5 w-5", p.destacada ? "text-caramelo" : "text-terracota")} strokeWidth={1.6} />
                        <span className="sr-only">Incluido</span>
                      </>
                    ) : (
                      v
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
