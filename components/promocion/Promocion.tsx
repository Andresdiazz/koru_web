"use client";

import { AnimatePresence, m } from "framer-motion";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";
import { promocion as promo } from "@/content/promocion";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { hoyColombia } from "@/lib/reserva";
import { whatsappUrl } from "@/lib/whatsapp";

type Memoria = { cerradoEn?: number; registrado?: boolean };
const CLAVE = `koru-promo:${promo.id}`;
const DIA_MS = 24 * 60 * 60 * 1000;
const FOTO = { src: promo.imagen.src, alt: promo.imagen.alt, sizes: "(min-width: 768px) 24rem, calc(100vw - 2rem)", quality: 75 };

/** Descarga la foto antes de abrir la ventana: así aparece completa y no retrasa la carga de la página. */
function precargarFoto() {
  const { props } = getImageProps({ ...FOTO, fill: true });
  const img = new window.Image();
  img.sizes = props.sizes ?? "";
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
}

function leerMemoria(): Memoria {
  try {
    return JSON.parse(localStorage.getItem(CLAVE) ?? "{}") as Memoria;
  } catch {
    return {};
  }
}
function guardarMemoria(m: Memoria) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify({ ...leerMemoria(), ...m }));
  } catch {
    // sin almacenamiento: la ventana puede volver a salir, no pasa nada
  }
}

/** ¿Puede abrirse sola ahora? No si ya se registró o si la cerró hace menos de `diasEntreApariciones`. */
function puedeAbrirSola() {
  const mem = leerMemoria();
  if (mem.registrado) return false;
  return !mem.cerradoEn || Date.now() - mem.cerradoEn >= promo.diasEntreApariciones * DIA_MS;
}

/** ¿La promoción está vigente hoy (hora de Colombia)? */
function vigente() {
  const hoy = hoyColombia();
  return promo.activa && (!promo.desde || hoy >= promo.desde) && (!promo.hasta || hoy <= promo.hasta);
}

type Estado = { tipo: "form" } | { tipo: "enviando" } | { tipo: "error"; mensaje: string } | { tipo: "listo"; nombre: string };

/**
 * Ventana emergente de promoción + pestaña para volver a abrirla.
 * Todo el contenido sale de /content/promocion.ts.
 */
export function Promocion() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [abierta, setAbierta] = useState(false);
  // Lectura inicial del navegador (en el servidor no hay memoria; ahí no se muestra nada)
  const [memoria, setMemoria] = useState<Memoria>(() => (typeof window === "undefined" ? {} : leerMemoria()));
  const [listoParaPestana, setListoParaPestana] = useState(false);
  const [tapada, setTapada] = useState(false);
  const [estado, setEstado] = useState<Estado>({ tipo: "form" });
  const [errores, setErrores] = useState<Record<string, string>>({});
  // Momento en que cargó la página (anti-bots: un envío instantáneo no es de una persona)
  const [inicio] = useState(() => Date.now());

  const aplica = useMemo(() => vigente() && promo.mostrarEn.includes(pathname), [pathname]);

  const abrir = useCallback((origen: "auto" | "pestana") => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open || document.querySelector("dialog[open]")) return;
    dialog.showModal();
    setAbierta(true);
    track("promo_abierta", { promocion: promo.id, origen });
  }, []);

  /** Cierra la ventana y recuerda que la persona la cerró (para no insistir). */
  const cerrar = useCallback(() => {
    dialogRef.current?.close();
    setAbierta(false);
    const nueva = { cerradoEn: Date.now() };
    guardarMemoria(nueva);
    setMemoria((mem) => ({ ...mem, ...nueva }));
  }, []);

  // Apertura automática: tras X segundos o al bajar Y % de la página (se revisa la memoria en cada intento)
  useEffect(() => {
    if (!aplica || leerMemoria().registrado) return;
    if (puedeAbrirSola()) precargarFoto();
    const intentar = () => {
      if (puedeAbrirSola()) abrir("auto");
    };
    const onScroll = () => {
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY > window.innerHeight * 0.6) setListoParaPestana(true);
      if (alto > 0 && (window.scrollY / alto) * 100 >= promo.scrollPorcentaje) intentar();
    };
    const temporizador = window.setTimeout(intentar, promo.retrasoSegundos * 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(temporizador);
      window.removeEventListener("scroll", onScroll);
    };
  }, [aplica, abrir]);

  // Respaldo: si el navegador cierra el diálogo por su cuenta, igual se registra el cierre
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      if (!leerMemoria().cerradoEn) cerrar();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [cerrar]);

  // La pestaña se esconde sobre el pie de página
  useEffect(() => {
    const pie = document.querySelector("footer");
    if (!pie) return;
    const obs = new IntersectionObserver(([e]) => setTapada(e.isIntersecting));
    obs.observe(pie);
    return () => obs.disconnect();
  }, [pathname]);

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const datos = {
      nombre: String(f.get("nombre") ?? ""),
      whatsapp: String(f.get("whatsapp") ?? ""),
      correo: String(f.get("correo") ?? ""),
      acepta: f.get("acepta") === "on",
      promocion: promo.id,
      pagina: pathname,
      sitioWeb: String(f.get("kx_referencia") ?? ""),
      inicio,
    };
    setEstado({ tipo: "enviando" });
    setErrores({});
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) });
      const cuerpo = (await res.json().catch(() => ({}))) as { ok?: boolean; mensaje?: string; errores?: Record<string, string> };
      if (res.ok && cuerpo.ok) {
        const nombre = datos.nombre.trim().split(" ")[0];
        setEstado({ tipo: "listo", nombre });
        guardarMemoria({ registrado: true });
        setMemoria((mem) => ({ ...mem, registrado: true }));
        track("generate_lead", { origen: "promocion", promocion: promo.id, etiqueta: promo.etiqueta });
        return;
      }
      if (cuerpo.errores) setErrores(cuerpo.errores);
      setEstado({ tipo: "error", mensaje: cuerpo.mensaje ?? "Algo salió mal. Intenta de nuevo." });
    } catch {
      setEstado({ tipo: "error", mensaje: "Parece que no hay conexión. Intenta de nuevo." });
    }
  };

  if (!aplica) return null;

  const mostrarPestana = !abierta && !memoria.registrado && !!memoria.cerradoEn && listoParaPestana && !tapada;
  const campo = (id: string) =>
    cn(
      "h-12 w-full rounded-xl border bg-marfil px-4 text-base text-espresso placeholder:text-tostado/50 focus:border-terracota focus:outline-none focus:shadow-[0_0_0_4px_rgb(196_129_63/0.2)]",
      errores[id] ? "border-terracota" : "border-arena",
    );

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-labelledby="promo-titulo"
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-3xl overflow-y-auto rounded-[var(--radius-card)] bg-crema p-0 text-espresso shadow-[0_40px_80px_-20px_rgb(44_26_14/0.6)] backdrop:bg-espresso/70 backdrop:backdrop-blur-sm open:grid open:animate-promo-in md:grid-cols-[1fr_1.15fr]"
        onClick={(e) => e.target === e.currentTarget && cerrar()}
        onCancel={(e) => {
          e.preventDefault();
          cerrar();
        }}
      >
        <div className="relative h-40 overflow-hidden sm:h-52 md:h-auto md:min-h-[30rem]">
          <Image {...FOTO} alt={FOTO.alt} fill className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgb(44_26_14/0.35)_100%)]" />
        </div>

        <div className="relative p-6 sm:p-8 md:p-10">
          <button
            type="button"
            onClick={cerrar}
            className="absolute top-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-tostado hover:bg-arena/50 max-md:bg-crema/90"
          >
            <Icon nombre="cerrar" className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </button>

          {estado.tipo === "listo" ? (
            <div role="status" className="flex h-full flex-col justify-center py-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-caramelo text-terracota">
                <Icon nombre="check" className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <h2 className="mt-6 text-4xl">{promo.gracias.titulo.replace("{nombre}", estado.nombre)}</h2>
              <p className="mt-3 text-tostado">{promo.gracias.texto}</p>
              <a
                href={whatsappUrl(promo.mensajeWhatsApp.replace("{nombre}", estado.nombre))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ className: "mt-8 w-full" })}
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{promo.gracias.boton}</span>
              </a>
            </div>
          ) : (
            <>
              <p className="eyebrow text-terracota">{promo.eyebrow}</p>
              <h2 id="promo-titulo" className="mt-3 pr-8 text-4xl sm:text-[2.75rem]">
                {promo.titulo}
              </h2>
              <p className="mt-3 text-tostado">{promo.texto}</p>
              <p className="mt-5 rounded-2xl bg-arena/60 px-4 py-3">
                <span className="font-display text-2xl">{promo.beneficio}</span>
                {promo.condiciones && <span className="mt-0.5 block text-sm text-tostado">{promo.condiciones}</span>}
              </p>

              <form onSubmit={enviar} noValidate className="mt-6 space-y-3">
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  {/* Campo trampa con un nombre que el autocompletado de los navegadores no reconoce */}
                  <label htmlFor="promo-kx">Deja este campo vacío</label>
                  <input id="promo-kx" name="kx_referencia" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" />
                </div>
                <div>
                  <label htmlFor="promo-nombre" className="sr-only">
                    Nombre
                  </label>
                  <input id="promo-nombre" name="nombre" autoComplete="given-name" placeholder="Tu nombre" required className={campo("nombre")} aria-invalid={!!errores.nombre || undefined} />
                  {errores.nombre && <p className="mt-1 text-sm text-terracota">{errores.nombre}</p>}
                </div>
                <div>
                  <label htmlFor="promo-whatsapp" className="sr-only">
                    WhatsApp
                  </label>
                  <div className="relative">
                    <span aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-tostado">
                      +57
                    </span>
                    <input id="promo-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Tu WhatsApp" required className={cn(campo("whatsapp"), "pl-12")} aria-invalid={!!errores.whatsapp || undefined} />
                  </div>
                  {errores.whatsapp && <p className="mt-1 text-sm text-terracota">{errores.whatsapp}</p>}
                </div>
                {promo.pedirCorreo && (
                  <div>
                    <label htmlFor="promo-correo" className="sr-only">
                      Correo
                    </label>
                    <input id="promo-correo" name="correo" type="email" inputMode="email" autoComplete="email" placeholder="Tu correo" required className={campo("correo")} aria-invalid={!!errores.correo || undefined} />
                    {errores.correo && <p className="mt-1 text-sm text-terracota">{errores.correo}</p>}
                  </div>
                )}
                <label className="flex cursor-pointer gap-3 pt-1 text-xs leading-relaxed text-tostado">
                  <input name="acepta" type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#8b4a2b]" />
                  <span>
                    {promo.autorizacion}{" "}
                    <Link href="/legal/tratamiento-de-datos" target="_blank" className="text-terracota underline underline-offset-2">
                      política de tratamiento de datos
                    </Link>
                    .
                  </span>
                </label>
                {errores.acepta && <p className="text-sm text-terracota">{errores.acepta}</p>}
                {estado.tipo === "error" && (
                  <p role="alert" className="text-sm text-terracota">
                    {estado.mensaje}
                  </p>
                )}
                <button type="submit" disabled={estado.tipo === "enviando"} className={buttonClasses({ tamano: "lg", className: "w-full" })}>
                  <span>{estado.tipo === "enviando" ? "Enviando…" : promo.boton}</span>
                </button>
              </form>
              <button type="button" onClick={cerrar} className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-sm text-tostado underline-offset-4 hover:underline">
                {promo.noGracias}
              </button>
            </>
          )}
        </div>
      </dialog>

      {/* Pestaña para volver a abrir la promoción después de cerrarla */}
      <AnimatePresence>
        {mostrarPestana && (
          <m.button
            type="button"
            onClick={() => abrir("pestana")}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 z-30 flex min-h-12 items-center gap-2 rounded-r-full bg-terracota py-2 pr-5 pl-4 text-sm font-medium text-marfil shadow-[0_12px_32px_-8px_rgb(44_26_14/0.55)] transition-colors hover:bg-tostado sm:bottom-6"
          >
            <Icon nombre="celebrar" className="h-5 w-5" />
            {promo.pestana}
          </m.button>
        )}
      </AnimatePresence>
    </>
  );
}
