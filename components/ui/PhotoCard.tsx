import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Imagen } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * Tarjeta con foto protagonista y bordes de 24px.
 * Al pasar el cursor se eleva y la imagen se aclara.
 */
export function PhotoCard({
  imagen,
  titulo,
  texto,
  etiqueta,
  pie,
  href,
  proporcion = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw",
  className,
}: {
  imagen: Imagen;
  titulo: string;
  texto?: ReactNode;
  etiqueta?: string;
  pie?: ReactNode;
  href?: string;
  proporcion?: string;
  sizes?: string;
  className?: string;
}) {
  const contenido = (
    <>
      <div className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-tostado", proporcion)}>
        <Image
          src={imagen.src}
          alt={imagen.alt}
          fill
          sizes={sizes}
          quality={75}
          className="object-cover brightness-[0.82] saturate-[0.92] transition-[transform,filter] duration-700 ease-(--ease-koru) group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
        />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(44_26_14/0.88)_100%)]" />
        {etiqueta && (
          <span className="eyebrow absolute top-4 left-4 rounded-full bg-espresso/70 px-3 py-1.5 text-[0.6875rem] text-arena backdrop-blur-sm">
            {etiqueta}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-6 text-marfil">
          <h3 className="text-[1.75rem] leading-tight md:text-3xl">{titulo}</h3>
          {texto && <div className="mt-2 text-sm leading-relaxed text-marfil/85">{texto}</div>}
          {pie && <div className="mt-4">{pie}</div>}
        </div>
      </div>
    </>
  );

  const clases = cn(
    "group block rounded-[var(--radius-card)] shadow-(--shadow-card) transition-[transform,box-shadow] duration-500 ease-(--ease-koru) hover:-translate-y-1.5 hover:shadow-(--shadow-card-hover)",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={clases}>
        {contenido}
      </Link>
    );
  }
  return <article className={clases}>{contenido}</article>;
}
