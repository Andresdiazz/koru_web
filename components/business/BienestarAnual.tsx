import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { bienestarTodoElAno } from "@/content/experiencias";
import { formatCOP } from "@/lib/format";

/** Bienestar todo el año: servicios continuos para empresas. */
export function BienestarAnual() {
  return (
    <Section tono="marfil">
      <Container>
        <SectionHeader eyebrow="Programas" titulo={bienestarTodoElAno.titulo} texto={bienestarTodoElAno.texto} />
        <Stagger as="ul" className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {bienestarTodoElAno.servicios.map((s) => (
            <StaggerItem as="li" key={s.id} className="flex flex-col rounded-[var(--radius-card)] border border-arena bg-crema p-7 md:p-8">
              <h3 className="text-[1.75rem] leading-tight">{s.nombre}</h3>
              <p className="mt-3 text-tostado">{s.detalle}</p>
              <div className="mt-auto pt-6">
                {s.precios.length > 0 ? (
                  <dl className="divide-y divide-arena border-t border-arena">
                    {s.precios.map((p) => (
                      <div key={p.label} className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-sm text-tostado">{p.label}</dt>
                        <dd className="font-display text-2xl">{formatCOP(p.precio)}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="border-t border-arena pt-4 font-display text-2xl text-terracota">{s.notaPrecio}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
