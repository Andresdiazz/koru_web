"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { ItemGaleria } from "@/types/content";

const spans: Record<ItemGaleria["formato"], string> = {
  grande: "col-span-2 row-span-2",
  alto: "row-span-2",
  ancho: "col-span-2",
  normal: "",
};

/** Mosaico asimétrico con lightbox al tocar (teclado: flechas y Esc; celular: deslizar). */
export function Gallery({ items }: { items: ItemGaleria[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [indice, setIndice] = useState<number | null>(null);
  const toqueX = useRef<number | null>(null);
  const reducir = useReducedMotion();

  const abrir = (i: number) => {
    setIndice(i);
    dialogRef.current?.showModal();
  };
  const cerrar = useCallback(() => dialogRef.current?.close(), []);
  const mover = useCallback(
    (dir: 1 | -1) => setIndice((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setIndice(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [mover]);

  const actual = indice !== null ? items[indice] : null;

  return (
    <>
      <ul className="grid auto-rows-[10.5rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[15rem]">
        {items.map((item, i) => (
          <m.li
            key={item.src}
            className={spans[item.formato]}
            initial={reducir ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => abrir(i)}
              className="group relative block h-full w-full overflow-hidden rounded-[var(--radius-card)] bg-tostado"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                quality={60}
                sizes={item.formato === "grande" || item.formato === "ancho" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover brightness-[0.85] transition-[transform,filter] duration-700 ease-(--ease-koru) group-hover:scale-[1.05] group-hover:brightness-100"
              />
              <span className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-espresso/60 text-marfil opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Icon nombre="mas" className="h-5 w-5" />
              </span>
              <span className="sr-only">Ampliar foto: {item.alt}</span>
            </button>
          </m.li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Galería de fotos"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-espresso/96 p-0 text-marfil backdrop:bg-espresso/80 open:flex open:flex-col"
        onClick={(e) => e.target === e.currentTarget && cerrar()}
        onTouchStart={(e) => (toqueX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (toqueX.current === null) return;
          const dx = e.changedTouches[0].clientX - toqueX.current;
          if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
          toqueX.current = null;
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <p className="text-sm text-marfil/70" aria-live="polite">
            {indice !== null && `${indice + 1} / ${items.length}`}
          </p>
          <button
            type="button"
            onClick={cerrar}
            autoFocus
            className="inline-flex h-12 w-12 items-center justify-center rounded-full hover:bg-marfil/10"
          >
            <Icon nombre="cerrar" className="h-7 w-7" />
            <span className="sr-only">Cerrar galería</span>
          </button>
        </div>
        <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && cerrar()}>
          {actual && (
            <Image key={actual.src} src={actual.src} alt={actual.alt} fill sizes="100vw" quality={75} className="object-contain px-4 sm:px-20" />
          )}
          {(["anterior", "siguiente"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => mover(dir === "siguiente" ? 1 : -1)}
              className={cn(
                "absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-caramelo/60 hover:bg-caramelo/20 sm:flex",
                dir === "anterior" ? "left-6" : "right-6",
              )}
            >
              <Icon nombre="flecha" className={cn("h-5 w-5", dir === "anterior" && "rotate-180")} />
              <span className="sr-only">{dir === "anterior" ? "Foto anterior" : "Foto siguiente"}</span>
            </button>
          ))}
        </div>
        <p className="px-5 py-5 text-center text-sm text-marfil/80 sm:px-8">{actual?.alt}</p>
      </dialog>
    </>
  );
}
