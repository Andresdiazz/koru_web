/**
 * Utilidades compartidas por las rutas de API (formularios):
 * límite de envíos, respuestas JSON, IP y variables de entorno limpias.
 */

const VENTANA_MS = 10 * 60 * 1000;
const MAX_ENVIOS = 5;
const envios = new Map<string, number[]>();

/** Límite básico en memoria (por instancia): máximo 5 envíos cada 10 minutos por IP y formulario. */
export function superaLimite(ip: string, formulario: string) {
  const clave = `${formulario}:${ip}`;
  const ahora = Date.now();
  const recientes = (envios.get(clave) ?? []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  envios.set(clave, recientes);
  return recientes.length > MAX_ENVIOS;
}

/** Tiempo mínimo que tarda una persona en llenar un formulario (anti-bots). */
export const TIEMPO_MINIMO_MS = 4000;

/**
 * Motivo por el que el envío parece de un bot (llenó el campo trampa o fue demasiado rápido),
 * o null si parece de una persona.
 */
export function motivoBot(sitioWeb?: string, inicio?: number, minimoMs = TIEMPO_MINIMO_MS) {
  if (sitioWeb) return "campo trampa lleno";
  if (inicio && Date.now() - inicio < minimoMs) return `enviado en ${Date.now() - inicio} ms`;
  return null;
}

/** true si el envío parece de un bot. */
export const esBot = (sitioWeb?: string, inicio?: number, minimoMs = TIEMPO_MINIMO_MS) => motivoBot(sitioWeb, inicio, minimoMs) !== null;

export const json = (data: unknown, status = 200) => Response.json(data, { status });

export function ipDe(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}

/** Limpia una variable de entorno: quita espacios y comillas que a veces se pegan al copiarla. */
export const limpiar = (valor?: string) => valor?.trim().replace(/^["'](.*)["']$/, "$1").trim() || undefined;
