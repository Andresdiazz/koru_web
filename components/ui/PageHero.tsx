import Image from "next/image";
import type { ReactNode } from "react";
import type { Imagen } from "@/types/content";
import { cn } from "@/lib/cn";
import { KoruSpiral } from "./KoruSpiral";
import { Container, Eyebrow } from "./Section";

/**
 * Encabezado oscuro de las páginas internas. Con imagen opcional a sangre
 * (con zoom lento) o solo con la espiral de marca de agua.
 * Siempre oscuro, para que el header transparente se lea bien.
 */
export function PageHero({
  eyebrow,
  titulo,
  texto,
  imagen,
  children,
  alto = "medio",
}: {
  eyebrow?: string;
  titulo: ReactNode;
  texto?: ReactNode;
  imagen?: Imagen;
  children?: ReactNode;
  alto?: "bajo" | "medio" | "pantalla";
}) {
  return (
    <section
      className={cn(
        "relative isolate flex items-end overflow-hidden bg-espresso text-marfil",
        alto === "bajo" && "pt-40 pb-16 md:pt-48 md:pb-20",
        alto === "medio" && "min-h-[78svh] pt-36 pb-16 md:min-h-[72vh] md:pb-24",
        alto === "pantalla" && "min-h-svh pt-36 pb-20 md:pb-28",
      )}
    >
      {imagen ? (
        <>
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <Image
              src={imagen.src}
              alt={imagen.alt}
              fill
              preload
              sizes="100vw"
              quality={60}
              className="animate-slow-zoom object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(44_26_14/0.6)_0%,rgb(44_26_14/0.3)_30%,rgb(44_26_14/0.7)_60%,rgb(44_26_14/0.92)_100%)]"
          />
        </>
      ) : (
        <KoruSpiral aria-hidden className="pointer-events-none absolute -top-40 -right-56 -z-10 h-[44rem] w-[44rem] text-caramelo opacity-[0.06]" />
      )}
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <Eyebrow oscuro className="mb-6">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl">{titulo}</h1>
          {texto && <div className="mt-6 max-w-xl text-lg text-marfil/85 md:text-xl">{texto}</div>}
          {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
