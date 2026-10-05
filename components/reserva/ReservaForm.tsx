"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";
import { business } from "@/content/experiencias";
import { cn } from "@/lib/cn";
import {
  MAX_FECHAS,
  erroresDe,
  getOpcion,
  hoyColombia,
  opcionDesdeUrl,
  opcionesReserva,
  pasosReserva,
  reservaSchema,
  resumenTexto,
  type CampoReserva,
} from "@/lib/reserva";
import { whatsappUrl } from "@/lib/whatsapp";
import { Campo, ariaCampo, claseInput } from "./Campo";

type Datos = {
  opcion: string;
  participantes: string;
  fechas: string[];
  empresa: string;
  nombre: string;
  cargo: string;
  correo: string;
  whatsapp: string;
  restricciones: string;
  comentarios: string;
  autorizaDatos: boolean;
  autorizaComunicaciones: boolean;
  sitioWeb: string;
};

type Estado =
  { tipo: "editando" } | { tipo: "enviando" } | { tipo: "error"; mensaje: string } | { tipo: "exito"; simulado?: boolean };

const EASE = [0.22, 1, 0.36, 1] as const;

/** Mañana en Colombia (AAAA-MM-DD), mínimo para las fechas tentativas. */
function manana() {
  const [a, mes, d] = hoyColombia().split("-").map(Number);
  return new Date(Date.UTC(a, mes - 1, d + 1)).toISOString().slice(0, 10);
}

const grupos = [...new Set(opcionesReserva.map((o) => o.grupo))];

export function ReservaForm() {
  const params = useSearchParams();
  const textos = business.reserva;
  const formRef = useRef<HTMLFormElement>(null);
  const contenedorRef = useRef<HTMLDivElement>(null);
  const tituloPasoRef = useRef<HTMLHeadingElement>(null);
  const [inicio] = useState(() => Date.now());
  const [paso, setPaso] = useState(0);
  const [tocados, setTocados] = useState<Set<CampoReserva>>(new Set());
  const [estado, setEstado] = useState<Estado>({ tipo: "editando" });
  const [erroresServidor, setErroresServidor] = useState<Partial<Record<CampoReserva, string>>>({});
  const [datos, setDatos] = useState<Datos>(() => ({
    opcion: opcionDesdeUrl(params.get("experiencia"), params.get("modalidad")),
    participantes: "",
    fechas: [""],
    empresa: "",
    nombre: "",
    cargo: "",
    correo: "",
    whatsapp: "",
    restricciones: "",
    comentarios: "",
    autorizaDatos: false,
    autorizaComunicaciones: false,
    sitioWeb: "",
  }));

  const resultado = useMemo(() => reservaSchema.safeParse({ ...datos, inicio }), [datos, inicio]);
  const errores = useMemo(() => erroresDe(resultado), [resultado]);
  const error = (campo: CampoReserva) => (tocados.has(campo) ? (errores[campo] ?? erroresServidor[campo]) : undefined);

  const actualizar = <K extends keyof Datos>(campo: K, valor: Datos[K]) => {
    setDatos((d) => ({ ...d, [campo]: valor }));
    setErroresServidor((e) => ({ ...e, [campo]: undefined }));
  };
  const tocar = (...campos: CampoReserva[]) => setTocados((t) => new Set([...t, ...campos]));

  const opcion = getOpcion(datos.opcion);
  const participantes = Number(datos.participantes);
  const grupoGrande = !!opcion?.privada && participantes > 10;

  /** Valida los campos del paso; si hay errores, enfoca el primero. */
  const pasoValido = (i: number) => {
    const campos = pasosReserva[i].campos;
    tocar(...campos);
    const primero = campos.find((c) => errores[c]);
    if (primero) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-campo="${primero}"]`);
      el?.focus();
      return false;
    }
    return true;
  };

  const irAPaso = (i: number) => {
    setPaso(i);
    requestAnimationFrame(() => {
      contenedorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      tituloPasoRef.current?.focus({ preventScroll: true });
    });
  };

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (paso < pasosReserva.length - 1) {
      if (pasoValido(paso)) irAPaso(paso + 1);
      return;
    }
    if (!pasoValido(paso)) return;
    if (!resultado.success) {
      // Algún paso anterior quedó inválido (no debería pasar): vuelve a ese paso.
      const pasoConError = pasosReserva.findIndex((p) => p.campos.some((c) => errores[c]));
      if (pasoConError >= 0) irAPaso(pasoConError);
      return;
    }
    setEstado({ tipo: "enviando" });
    try {
      const res = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, inicio }),
      });
      const cuerpo = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        mensaje?: string;
        simulado?: boolean;
        errores?: Partial<Record<CampoReserva, string>>;
      };
      if (res.ok && cuerpo.ok) {
        setEstado({ tipo: "exito", simulado: cuerpo.simulado });
        requestAnimationFrame(() => contenedorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
      if (cuerpo.errores) {
        setErroresServidor(cuerpo.errores);
        tocar(...(Object.keys(cuerpo.errores) as CampoReserva[]));
        const pasoConError = pasosReserva.findIndex((p) => p.campos.some((c) => cuerpo.errores?.[c]));
        if (pasoConError >= 0) irAPaso(pasoConError);
      }
      setEstado({ tipo: "error", mensaje: cuerpo.mensaje ?? "Algo salió mal. Intenta de nuevo o escríbenos por WhatsApp." });
    } catch {
      setEstado({ tipo: "error", mensaje: "Parece que no hay conexión. Revisa tu internet e intenta de nuevo." });
    }
  };

  /* ───────────── Pantalla de agradecimiento ───────────── */
  if (estado.tipo === "exito" && resultado.success) {
    const r = resultado.data;
    const mensajeWa = `Hola KORU 🌿 Acabo de enviar una solicitud de reserva desde la web:\n\n${resumenTexto(r)}`;
    return (
      <div ref={contenedorRef} className="scroll-mt-28">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-[var(--radius-card)] bg-espresso p-8 text-marfil md:p-12"
          role="status"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-caramelo text-caramelo">
            <Icon nombre="check" className="h-8 w-8" strokeWidth={1.5} />
          </span>
          <h2 className="mt-8 text-4xl md:text-5xl">{textos.gracias.titulo.replace("{nombre}", r.nombre.split(" ")[0])}</h2>
          <p className="mt-4 max-w-xl text-lg text-marfil/85">{textos.gracias.texto.replace("{correo}", r.correo)}</p>
          <pre className="mt-8 rounded-2xl bg-tostado/60 p-6 font-sans text-sm leading-relaxed whitespace-pre-wrap text-marfil/90">
            {resumenTexto(r)}
          </pre>
          {estado.simulado && (
            <p className="mt-4 text-xs text-arena">
              Modo desarrollo: Resend no está configurado, el correo se simuló en la consola del servidor.
            </p>
          )}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl(mensajeWa)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ tamano: "lg" })}
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>{textos.gracias.botonWhatsApp}</span>
            </a>
            <Link href="/business" className={buttonClasses({ variante: "secundario-claro" })}>
              <span>{textos.gracias.botonVolver}</span>
            </Link>
          </div>
        </m.div>
      </div>
    );
  }

  const enviando = estado.tipo === "enviando";
  const ultimo = paso === pasosReserva.length - 1;

  return (
    <div ref={contenedorRef} className="scroll-mt-28">
      <form ref={formRef} onSubmit={enviar} noValidate aria-label="Solicitud de reserva KORU Business">
        {/* Barra de progreso */}
        <div className="mb-10">
          <p className="mb-3 text-sm text-tostado" aria-live="polite">
            Paso {paso + 1} de {pasosReserva.length} · <span className="text-espresso">{pasosReserva[paso].titulo}</span>
          </p>
          <ol className="grid grid-cols-3 gap-2" aria-hidden>
            {pasosReserva.map((p, i) => (
              <li key={p.titulo}>
                <div className="h-1 overflow-hidden rounded-full bg-arena">
                  <m.div
                    className="h-full rounded-full bg-terracota"
                    initial={false}
                    animate={{ width: i <= paso ? "100%" : "0%" }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </div>
                <span className={cn("mt-2 hidden text-xs sm:block", i <= paso ? "text-espresso" : "text-tostado/70")}>
                  {p.titulo}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Honeypot: invisible para personas */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="sitio-web">No llenar este campo</label>
          <input
            id="sitio-web"
            name="sitio_web"
            tabIndex={-1}
            autoComplete="off"
            value={datos.sitioWeb}
            onChange={(e) => actualizar("sitioWeb", e.target.value)}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.fieldset
            key={paso}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="space-y-7"
          >
            <legend className="sr-only">{pasosReserva[paso].titulo}</legend>
            <h2 ref={tituloPasoRef} tabIndex={-1} className="text-4xl outline-none md:text-5xl">
              {pasosReserva[paso].titulo}
            </h2>

            {paso === 0 && (
              <>
                <Campo id="campo-opcion" label="Experiencia y modalidad" error={error("opcion")} ayuda={opcion?.precio}>
                  <div className="relative">
                    <select
                      {...ariaCampo("campo-opcion", error("opcion"), !!opcion?.precio)}
                      data-campo="opcion"
                      required
                      value={datos.opcion}
                      onChange={(e) => actualizar("opcion", e.target.value)}
                      onBlur={() => tocar("opcion")}
                      className={cn(claseInput(!!error("opcion")), "h-14 appearance-none pr-12")}
                    >
                      <option value="" disabled>
                        Elige una opción
                      </option>
                      {grupos.map((g) => (
                        <optgroup key={g} label={g}>
                          {opcionesReserva
                            .filter((o) => o.grupo === g)
                            .map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.label}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                    <Icon
                      nombre="flecha-abajo"
                      className="pointer-events-none absolute top-1/2 right-5 h-4 w-4 -translate-y-1/2 text-terracota"
                    />
                  </div>
                </Campo>

                <Campo id="campo-participantes" label="Número estimado de participantes" error={error("participantes")}>
                  <input
                    {...ariaCampo("campo-participantes", error("participantes"))}
                    data-campo="participantes"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={500}
                    required
                    value={datos.participantes}
                    onChange={(e) => actualizar("participantes", e.target.value)}
                    onBlur={() => tocar("participantes")}
                    placeholder="Ej. 8"
                    className={cn(claseInput(!!error("participantes")), "h-14 max-w-48")}
                  />
                </Campo>

                <AnimatePresence>
                  {grupoGrande && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div role="status" className="rounded-2xl border border-caramelo bg-arena/50 p-5 md:p-6">
                        <p className="flex gap-3">
                          <Icon nombre="usuarios" className="h-6 w-6 shrink-0 text-terracota" />
                          <span>{textos.avisoGrupoGrande}</span>
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2 pl-9">
                          {(["jornada-empresarial", "fin-de-ano"] as const).map((id) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => actualizar("opcion", id)}
                              className="min-h-12 rounded-full border border-terracota px-5 text-sm font-medium text-terracota transition-colors hover:bg-terracota hover:text-marfil"
                            >
                              Cambiar a {getOpcion(id)?.label.split(" (")[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                <fieldset>
                  <legend className="mb-2 text-sm font-medium">Fechas tentativas</legend>
                  <p id="fechas-ayuda" className="mb-3 text-sm text-tostado">
                    Propón hasta {MAX_FECHAS} fechas. Recibimos un grupo a la vez.
                  </p>
                  <ul className="space-y-3">
                    {datos.fechas.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <label htmlFor={`campo-fecha-${i}`} className="sr-only">
                          Fecha tentativa {i + 1}
                        </label>
                        <input
                          id={`campo-fecha-${i}`}
                          data-campo={i === 0 ? "fechas" : undefined}
                          type="date"
                          min={manana()}
                          required={i === 0}
                          value={f}
                          aria-invalid={error("fechas") ? true : undefined}
                          aria-describedby={error("fechas") ? "campo-fechas-error" : "fechas-ayuda"}
                          onChange={(e) =>
                            actualizar(
                              "fechas",
                              datos.fechas.map((x, j) => (j === i ? e.target.value : x)),
                            )
                          }
                          onBlur={() => tocar("fechas")}
                          className={cn(claseInput(!!error("fechas")), "h-14 max-w-64")}
                        />
                        {i > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              actualizar(
                                "fechas",
                                datos.fechas.filter((_, j) => j !== i),
                              )
                            }
                            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-tostado hover:bg-arena/60"
                          >
                            <Icon nombre="cerrar" className="h-5 w-5" />
                            <span className="sr-only">Quitar fecha {i + 1}</span>
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {datos.fechas.length < MAX_FECHAS && (
                    <button
                      type="button"
                      onClick={() => actualizar("fechas", [...datos.fechas, ""])}
                      className="mt-3 inline-flex min-h-12 items-center gap-2 text-sm font-medium text-terracota hover:underline"
                    >
                      <Icon nombre="mas" className="h-4 w-4" /> Agregar otra fecha
                    </button>
                  )}
                  {error("fechas") && (
                    <p id="campo-fechas-error" role="alert" className="mt-2 text-sm text-terracota">
                      {error("fechas")}
                    </p>
                  )}
                </fieldset>
              </>
            )}

            {paso === 1 && (
              <div className="grid gap-7 sm:grid-cols-2">
                <Campo id="campo-empresa" label="Empresa" error={error("empresa")} className="sm:col-span-2">
                  <input
                    {...ariaCampo("campo-empresa", error("empresa"))}
                    data-campo="empresa"
                    autoComplete="organization"
                    required
                    value={datos.empresa}
                    onChange={(e) => actualizar("empresa", e.target.value)}
                    onBlur={() => tocar("empresa")}
                    className={cn(claseInput(!!error("empresa")), "h-14")}
                  />
                </Campo>
                <Campo id="campo-nombre" label="Nombre del responsable" error={error("nombre")}>
                  <input
                    {...ariaCampo("campo-nombre", error("nombre"))}
                    data-campo="nombre"
                    autoComplete="name"
                    required
                    value={datos.nombre}
                    onChange={(e) => actualizar("nombre", e.target.value)}
                    onBlur={() => tocar("nombre")}
                    className={cn(claseInput(!!error("nombre")), "h-14")}
                  />
                </Campo>
                <Campo id="campo-cargo" label="Cargo" error={error("cargo")}>
                  <input
                    {...ariaCampo("campo-cargo", error("cargo"))}
                    data-campo="cargo"
                    autoComplete="organization-title"
                    required
                    value={datos.cargo}
                    onChange={(e) => actualizar("cargo", e.target.value)}
                    onBlur={() => tocar("cargo")}
                    className={cn(claseInput(!!error("cargo")), "h-14")}
                  />
                </Campo>
                <Campo id="campo-correo" label="Correo" error={error("correo")}>
                  <input
                    {...ariaCampo("campo-correo", error("correo"))}
                    data-campo="correo"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={datos.correo}
                    onChange={(e) => actualizar("correo", e.target.value)}
                    onBlur={() => tocar("correo")}
                    placeholder="nombre@empresa.com"
                    className={cn(claseInput(!!error("correo")), "h-14")}
                  />
                </Campo>
                <Campo id="campo-whatsapp" label="WhatsApp" error={error("whatsapp")}>
                  <div className="relative">
                    <span aria-hidden className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-tostado">
                      +57
                    </span>
                    <input
                      {...ariaCampo("campo-whatsapp", error("whatsapp"))}
                      data-campo="whatsapp"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      required
                      value={datos.whatsapp}
                      onChange={(e) => actualizar("whatsapp", e.target.value)}
                      onBlur={() => tocar("whatsapp")}
                      placeholder="300 000 0000"
                      className={cn(claseInput(!!error("whatsapp")), "h-14 pl-14")}
                    />
                  </div>
                </Campo>
              </div>
            )}

            {paso === 2 && (
              <>
                <Campo
                  id="campo-restricciones"
                  label="Restricciones alimentarias o alergias"
                  opcional
                  error={error("restricciones")}
                >
                  <textarea
                    {...ariaCampo("campo-restricciones", error("restricciones"))}
                    data-campo="restricciones"
                    rows={3}
                    value={datos.restricciones}
                    onChange={(e) => actualizar("restricciones", e.target.value)}
                    onBlur={() => tocar("restricciones")}
                    placeholder="Ej. 2 personas vegetarianas, 1 alergia al maní"
                    className={cn(claseInput(!!error("restricciones")), "py-4")}
                  />
                </Campo>
                <Campo id="campo-comentarios" label="Comentarios" opcional error={error("comentarios")}>
                  <textarea
                    {...ariaCampo("campo-comentarios", error("comentarios"))}
                    data-campo="comentarios"
                    rows={4}
                    value={datos.comentarios}
                    onChange={(e) => actualizar("comentarios", e.target.value)}
                    onBlur={() => tocar("comentarios")}
                    placeholder="Cuéntanos qué celebran, qué necesita tu equipo o cualquier detalle"
                    className={cn(claseInput(!!error("comentarios")), "py-4")}
                  />
                </Campo>

                <div className="space-y-4 rounded-2xl bg-marfil p-5 ring-1 ring-arena md:p-6">
                  <Casilla
                    id="campo-autoriza-datos"
                    campo="autorizaDatos"
                    checked={datos.autorizaDatos}
                    onChange={(v) => {
                      actualizar("autorizaDatos", v);
                      tocar("autorizaDatos");
                    }}
                    error={error("autorizaDatos")}
                  >
                    Autorizo a KORU el tratamiento de mis datos personales para gestionar esta solicitud, conforme a la Ley 1581
                    de 2012 y la{" "}
                    <Link
                      href="/legal/tratamiento-de-datos"
                      target="_blank"
                      className="text-terracota underline underline-offset-4"
                    >
                      política de tratamiento de datos
                    </Link>
                    .
                  </Casilla>
                  <Casilla
                    id="campo-autoriza-comunicaciones"
                    campo="autorizaComunicaciones"
                    checked={datos.autorizaComunicaciones}
                    onChange={(v) => actualizar("autorizaComunicaciones", v)}
                    opcional
                  >
                    Quiero recibir comunicaciones comerciales de KORU (novedades, eventos y experiencias).
                  </Casilla>
                </div>

                {opcion && (
                  <div className="rounded-2xl border border-dashed border-caramelo p-5 text-sm md:p-6">
                    <p className="eyebrow mb-2 text-terracota">Resumen</p>
                    <p className="font-display text-2xl">{opcion.label}</p>
                    <p className="mt-1 text-tostado">
                      {datos.participantes} participantes · {datos.empresa}
                      {opcion.precio && ` · ${opcion.precio}`}
                    </p>
                  </div>
                )}
              </>
            )}
          </m.fieldset>
        </AnimatePresence>

        {estado.tipo === "error" && (
          <div
            role="alert"
            className="mt-8 flex flex-col gap-4 rounded-2xl border border-terracota bg-arena/40 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>{estado.mensaje}</p>
            <a
              href={whatsappUrl(
                resultado.success
                  ? `Hola KORU 🌿 Quiero reservar una experiencia:\n\n${resumenTexto(resultado.data)}`
                  : undefined,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variante: "secundario", className: "shrink-0" })}
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-arena pt-8 sm:flex-row sm:items-center sm:justify-between">
          {paso > 0 ? (
            <Button variante="texto" onClick={() => irAPaso(paso - 1)} className="self-start text-tostado">
              ← Atrás
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit" tamano="lg" disabled={enviando} className="sm:min-w-64">
            {enviando ? "Enviando…" : ultimo ? textos.botonEnviar : "Continuar"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Casilla({
  id,
  campo,
  checked,
  onChange,
  error,
  opcional,
  children,
}: {
  id: string;
  campo: CampoReserva;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  opcional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex gap-4">
        <span className="relative mt-0.5 flex h-6 w-6 shrink-0">
          <input
            id={id}
            data-campo={campo}
            type="checkbox"
            checked={checked}
            required={!opcional}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border border-caramelo bg-marfil transition-colors checked:border-terracota checked:bg-terracota focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramelo"
          />
          <Icon
            nombre="check"
            strokeWidth={2}
            className="pointer-events-none absolute inset-0.5 h-5 w-5 text-marfil opacity-0 peer-checked:opacity-100"
          />
        </span>
        <label htmlFor={id} className="cursor-pointer text-[0.9375rem] leading-relaxed">
          {children}
          {opcional && <span className="ml-1 text-xs text-tostado">(opcional)</span>}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 pl-10 text-sm text-terracota">
          {error}
        </p>
      )}
    </div>
  );
}
