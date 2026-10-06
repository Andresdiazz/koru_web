import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { business, precioDesde } from "@/content/experiencias";
import { formatCOP } from "@/lib/format";
import type { Experiencia } from "@/types/content";

/** Tarjeta de experiencia privada: foto, nombre, frase, duración, capacidad y precio desde. */
export function ExperienceCard({ experiencia, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }: { experiencia: Experiencia; sizes?: string }) {
  const varias = experiencia.modalidades.length > 1;
  return (
    <Link
      href={`/business/${experiencia.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-marfil shadow-(--shadow-card) ring-1 ring-arena transition-[transform,box-shadow] duration-500 ease-(--ease-koru) hover:-translate-y-1.5 hover:shadow-(--shadow-card-hover)"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-tostado">
        <Image
          src={experiencia.imagen.src}
          alt={experiencia.imagen.alt}
          fill
          sizes={sizes}
          quality={75}
          className="object-cover brightness-[0.88] transition-[transform,filter] duration-700 ease-(--ease-koru) group-hover:scale-[1.05] group-hover:brightness-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 className="text-3xl leading-tight">{experiencia.nombre}</h3>
        <p className="mt-3 text-tostado">{experiencia.frase}</p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-tostado">
          <li className="flex items-center gap-2">
            <Icon nombre="reloj" className="h-4 w-4 text-terracota" />
            {experiencia.duracion}
          </li>
          <li className="flex items-center gap-2">
            <Icon nombre="usuarios" className="h-4 w-4 text-terracota" />
            {business.capacidadTexto}
          </li>
        </ul>
        <div className="mt-auto pt-8">
          <p className="border-t border-arena pt-6">
            <span className="block text-xs tracking-[0.14em] text-tostado uppercase">{varias ? "Desde" : "Precio"}</span>
            <span className="font-display text-3xl">{formatCOP(precioDesde(experiencia))}</span>
            <span className="text-sm text-tostado"> por grupo</span>
          </p>
          <span className="mt-5 inline-flex min-h-12 items-center gap-2 text-[0.8125rem] font-medium tracking-[0.14em] text-terracota uppercase">
            {business.botonExperiencia}
            <Icon nombre="flecha" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
