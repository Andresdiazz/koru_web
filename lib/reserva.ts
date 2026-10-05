import { z } from "zod";
import { experiencias, gruposGrandes } from "@/content/experiencias";
import { formatCOP } from "@/lib/format";

/* ───────────── Opciones de "Experiencia y modalidad" ───────────── */

export type OpcionReserva = {
  id: string;
  label: string;
  grupo: string;
  /** Experiencia privada de hasta 10 personas */
  privada: boolean;
  /** Texto de precio para el resumen y los correos */
  precio?: string;
};

const GRUPO_PRIVADAS = "Experiencias privadas · hasta 10 personas";
const GRUPO_GRANDES = "Grupos de más de 10 personas";
const GRUPO_OTROS = "Otras opciones";

export const opcionesReserva: OpcionReserva[] = [
  ...experiencias.flatMap((e) =>
    e.modalidades.map((mo) => ({
      id: `${e.slug}:${mo.id}`,
      label: e.modalidades.length > 1 ? `${e.nombre} — ${mo.nombre}` : e.nombre,
      grupo: GRUPO_PRIVADAS,
      privada: true,
      precio: `${formatCOP(mo.precio)} por grupo`,
    })),
  ),
  {
    id: "jornada-empresarial",
    label: "Jornada KORU Empresarial (11 – 20 personas)",
    grupo: GRUPO_GRANDES,
    privada: false,
    precio: `Desde ${formatCOP(Math.min(...gruposGrandes.formatos.filter((f) => f.formato.startsWith("Jornada")).map((f) => f.precioPersona)))} por persona`,
  },
  {
    id: "fin-de-ano",
    label: "Experiencia Fin de Año KORU (15 – 30 personas)",
    grupo: GRUPO_GRANDES,
    privada: false,
    precio: `Desde ${formatCOP(Math.min(...gruposGrandes.formatos.filter((f) => f.formato.startsWith("Experiencia Fin")).map((f) => f.precioPersona)))} por persona`,
  },
  { id: "bienestar-anual", label: "Bienestar todo el año (pausas activas, charlas, planes)", grupo: GRUPO_OTROS, privada: false },
  { id: "asesoria", label: "Aún no lo sé, quiero asesoría", grupo: GRUPO_OTROS, privada: false },
];

export const getOpcion = (id: string) => opcionesReserva.find((o) => o.id === id);

/** Convierte ?experiencia=slug&modalidad=id en el id de la opción. */
export function opcionDesdeUrl(experiencia?: string | null, modalidad?: string | null) {
  if (!experiencia) return "";
  if (getOpcion(experiencia)) return experiencia;
  const exp = experiencias.find((e) => e.slug === experiencia);
  if (!exp) return "";
  const mod = exp.modalidades.find((m) => m.id === modalidad) ?? exp.modalidades[0];
  return `${exp.slug}:${mod.id}`;
}

/* ───────────── Validación (cliente y servidor) ───────────── */

export const MAX_FECHAS = 3;

/** Fecha de hoy en Colombia, AAAA-MM-DD */
export function hoyColombia() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date());
}

const texto = (min: number, mensaje: string) =>
  z.string({ error: mensaje }).trim().min(min, { error: mensaje }).max(160, { error: "Es un poco largo; resúmelo, por favor." });

const opcional = z.string().trim().max(1000, { error: "Máximo 1.000 caracteres." }).optional().default("");

const PARTICIPANTES = "Cuéntanos cuántas personas serían, aunque sea un aproximado.";

export const reservaSchema = z.object({
  opcion: z.string().refine((v) => !!getOpcion(v), { error: "Elige la experiencia que te interesa." }),
  participantes: z
    .union([z.number(), z.string().trim().min(1, { error: PARTICIPANTES })], { error: PARTICIPANTES })
    .pipe(z.coerce.number<string | number>({ error: "Cuéntanos cuántas personas serían, aunque sea un aproximado." })
    .int({ error: "Escribe un número entero." })
    .min(1, { error: "Debe haber al menos 1 participante." })
    .max(500, { error: "Para grupos tan grandes, escríbenos por WhatsApp y armamos una propuesta." })),
  fechas: z
    .array(z.string(), { error: "Propón al menos una fecha tentativa." })
    .transform((f) => f.filter(Boolean))
    .pipe(
      z
        .array(
          z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Revisa la fecha." })
            .refine((f) => f > hoyColombia(), { error: "Elige una fecha a partir de mañana." }),
        )
        .min(1, { error: "Propón al menos una fecha tentativa." })
        .max(MAX_FECHAS, { error: `Máximo ${MAX_FECHAS} fechas.` }),
    ),
  empresa: texto(2, "¿Cómo se llama tu empresa?"),
  nombre: texto(3, "Escribe tu nombre completo."),
  cargo: texto(2, "¿Cuál es tu cargo?"),
  correo: z
    .string({ error: "Escribe tu correo." })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Revisa tu correo; parece que le falta algo." })),
  whatsapp: z
    .string({ error: "Escribe tu número de WhatsApp." })
    .transform((v) => v.replace(/\D/g, "").replace(/^57(?=\d{10}$)/, ""))
    .refine((v) => /^3\d{9}$/.test(v), { error: "Escribe un celular colombiano de 10 dígitos que empiece por 3." }),
  restricciones: opcional,
  comentarios: opcional,
  autorizaDatos: z.literal(true, { error: "Necesitamos tu autorización para gestionar la solicitud." }),
  autorizaComunicaciones: z.boolean().optional().default(false),
  /* Anti-spam */
  sitioWeb: z.string().optional().default(""),
  inicio: z.number().optional(),
});

export type ReservaEntrada = z.input<typeof reservaSchema>;
export type Reserva = z.output<typeof reservaSchema>;
export type CampoReserva = keyof Omit<ReservaEntrada, "sitioWeb" | "inicio">;

/** Campos de cada paso del formulario. */
export const pasosReserva: { titulo: string; campos: CampoReserva[] }[] = [
  { titulo: "La experiencia", campos: ["opcion", "participantes", "fechas"] },
  { titulo: "Tus datos", campos: ["empresa", "nombre", "cargo", "correo", "whatsapp"] },
  { titulo: "Detalles", campos: ["restricciones", "comentarios", "autorizaDatos", "autorizaComunicaciones"] },
];

/** Errores por campo (primer mensaje de cada uno). */
export function erroresDe(resultado: z.ZodSafeParseResult<unknown>) {
  const errores: Partial<Record<CampoReserva, string>> = {};
  if (resultado.success) return errores;
  for (const issue of resultado.error.issues) {
    const campo = issue.path[0] as CampoReserva;
    if (campo && !errores[campo]) errores[campo] = issue.message;
  }
  return errores;
}

/* ───────────── Formato ───────────── */

const formatoFecha = new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function fechaLarga(iso: string) {
  return formatoFecha.format(new Date(`${iso}T12:00:00Z`));
}

export function whatsappVisible(numero: string) {
  return `+57 ${numero.slice(0, 3)} ${numero.slice(3, 6)} ${numero.slice(6)}`;
}

/** Resumen corto en texto plano (para WhatsApp y correos). */
export function resumenTexto(r: Reserva) {
  const opcion = getOpcion(r.opcion);
  return [
    `Experiencia: ${opcion?.label ?? r.opcion}`,
    `Empresa: ${r.empresa}`,
    `Responsable: ${r.nombre} (${r.cargo})`,
    `Participantes: ${r.participantes}`,
    `Fechas tentativas: ${r.fechas.map(fechaLarga).join(" · ")}`,
  ].join("\n");
}
