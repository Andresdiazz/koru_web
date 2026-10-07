import { limpiar } from "@/lib/servidor";

/**
 * Integración con Systeme.io (embudo de correo).
 *
 * - Crea el contacto (o lo encuentra si ya existe) y le asigna etiquetas.
 * - Si una etiqueta no existe en Systeme, la crea: cada campaña nueva genera su etiqueta sola.
 * - Nunca debe romper un formulario: los errores se registran y se devuelve false.
 *
 * Variables de entorno: SYSTEME_API_KEY (obligatoria para activar).
 * Opcionales: SYSTEME_CAMPO_NOMBRE, SYSTEME_CAMPO_APELLIDO y SYSTEME_CAMPO_TELEFONO (slugs de
 * los campos; por defecto first_name, surname y phone_number, los estándar de Systeme).
 */

const BASE = "https://api.systeme.io/api";

/**
 * Nota: el plan gratuito de Systeme limita cuántas etiquetas se pueden crear. Por eso cada
 * origen usa una sola etiqueta (la de la campaña o "business-solicitud"). Con un plan pago,
 * aquí se puede volver a sumar una etiqueta general como "web-koru".
 */

type ContactoSysteme = {
  correo: string;
  nombre?: string;
  /** Número con indicativo, p. ej. +573103012510 */
  telefono?: string;
  etiquetas: string[];
};

function clave() {
  return limpiar(process.env.SYSTEME_API_KEY);
}

export const systemeActivo = () => !!clave();

async function api<T>(ruta: string, init: RequestInit = {}): Promise<{ ok: boolean; status: number; data: T }> {
  const res = await fetch(`${BASE}${ruta}`, {
    ...init,
    headers: {
      "X-API-Key": clave() ?? "",
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as T;
  return { ok: res.ok, status: res.status, data };
}

type Coleccion<T> = { items?: T[] };

/** Busca un contacto por correo. */
async function buscarContacto(correo: string) {
  const r = await api<Coleccion<{ id: number; email: string }>>(`/contacts?email=${encodeURIComponent(correo)}`);
  return r.data.items?.find((c) => c.email?.toLowerCase() === correo.toLowerCase())?.id;
}

/** Crea el contacto; si el correo ya existe, devuelve el id del existente. */
async function crearOEncontrarContacto(c: ContactoSysteme) {
  // Primer nombre en "first_name" (para saludar "Hola, Andrés") y el resto en "surname"
  const [primerNombre, ...resto] = (c.nombre ?? "").trim().split(/\s+/);
  const apellidos = resto.join(" ");
  const campos = [
    primerNombre && { slug: process.env.SYSTEME_CAMPO_NOMBRE || "first_name", value: primerNombre },
    apellidos && { slug: process.env.SYSTEME_CAMPO_APELLIDO || "surname", value: apellidos },
    c.telefono && { slug: process.env.SYSTEME_CAMPO_TELEFONO || "phone_number", value: c.telefono },
  ].filter(Boolean);

  const r = await api<{ id?: number; detail?: string; violations?: unknown }>("/contacts", {
    method: "POST",
    body: JSON.stringify({ email: c.correo, locale: "es", fields: campos }),
  });
  if (r.ok && r.data.id) return r.data.id;

  // Ya existía (u otro error de validación): lo buscamos por correo
  const existente = await buscarContacto(c.correo);
  if (existente) return existente;

  console.error("[systeme] No se pudo crear el contacto:", r.status, JSON.stringify(r.data).slice(0, 400));
  return undefined;
}

/** Devuelve el id de la etiqueta; la crea si no existe. */
async function idEtiqueta(nombre: string) {
  const lista = await api<Coleccion<{ id: number; name: string }>>(`/tags?query=${encodeURIComponent(nombre)}&limit=100`);
  const existente = lista.data.items?.find((t) => t.name === nombre);
  if (existente) return existente.id;

  const nueva = await api<{ id?: number }>("/tags", { method: "POST", body: JSON.stringify({ name: nombre }) });
  if (nueva.ok && nueva.data.id) return nueva.data.id;

  console.error("[systeme] No se pudo crear la etiqueta:", nombre, nueva.status, JSON.stringify(nueva.data).slice(0, 300));
  return undefined;
}

/**
 * Registra un contacto en Systeme con sus etiquetas.
 * Devuelve true si quedó con todas las etiquetas; false si algo falló (ya quedó en el log).
 */
export async function enviarASysteme(c: ContactoSysteme) {
  if (!systemeActivo()) return false;
  try {
    const id = await crearOEncontrarContacto(c);
    if (!id) return false;
    let todo = true;
    for (const nombre of [...new Set(c.etiquetas.filter(Boolean))]) {
      const tagId = await idEtiqueta(nombre);
      if (!tagId) {
        todo = false;
        continue;
      }
      const r = await api(`/contacts/${id}/tags`, { method: "POST", body: JSON.stringify({ tagId }) });
      // 204/201 = asignada; 422 suele indicar que ya la tenía
      if (!r.ok && r.status !== 422) {
        todo = false;
        console.error("[systeme] No se pudo asignar la etiqueta:", nombre, r.status, JSON.stringify(r.data).slice(0, 300));
      }
    }
    return todo;
  } catch (e) {
    console.error("[systeme] Error de conexión:", e);
    return false;
  }
}
