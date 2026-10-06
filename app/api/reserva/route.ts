import { Resend } from "resend";
import { sitio } from "@/content/sitio";
import { correoCliente, correoKoru } from "@/lib/email/plantillas";
import { erroresDe, reservaSchema } from "@/lib/reserva";

/* ───────────── Límite de envíos (básico, en memoria por instancia) ───────────── */

const VENTANA_MS = 10 * 60 * 1000;
const MAX_ENVIOS = 5;
const envios = new Map<string, number[]>();

function superaLimite(ip: string) {
  const ahora = Date.now();
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  envios.set(ip, recientes);
  return recientes.length > MAX_ENVIOS;
}

/** Tiempo mínimo que tarda una persona en llenar el formulario. */
const TIEMPO_MINIMO_MS = 4000;

const json = (data: unknown, status = 200) => Response.json(data, { status });

/** Limpia una variable de entorno: quita espacios y comillas que a veces se pegan al copiarla. */
const limpiar = (valor?: string) => valor?.trim().replace(/^["'](.*)["']$/, "$1").trim() || undefined;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  if (superaLimite(ip)) {
    return json({ ok: false, mensaje: "Recibimos varias solicitudes seguidas. Intenta de nuevo en unos minutos o escríbenos por WhatsApp." }, 429);
  }

  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return json({ ok: false, mensaje: "No pudimos leer la solicitud." }, 400);
  }

  const resultado = reservaSchema.safeParse(cuerpo);
  if (!resultado.success) {
    return json({ ok: false, mensaje: "Revisa los campos marcados.", errores: erroresDe(resultado) }, 422);
  }
  const reserva = resultado.data;

  // Honeypot o envío demasiado rápido: respondemos "ok" sin enviar nada para no dar pistas al bot.
  if (reserva.sitioWeb || (reserva.inicio && Date.now() - reserva.inicio < TIEMPO_MINIMO_MS)) {
    return json({ ok: true });
  }

  const apiKey = limpiar(process.env.RESEND_API_KEY);
  const remitente = limpiar(process.env.RESEND_FROM);
  const koru = correoKoru(reserva);
  const cliente = correoCliente(reserva);

  if (!apiKey || !remitente) {
    if (process.env.NODE_ENV !== "production") {
      // Desarrollo sin Resend configurado: se simula el envío y se muestra en la consola.
      console.info("[reserva] Resend no configurado. Correo simulado:\n", koru.asunto, "\n", koru.text);
      return json({ ok: true, simulado: true });
    }
    console.error("[reserva] Falta RESEND_API_KEY o RESEND_FROM");
    return json({ ok: false, mensaje: "No pudimos enviar tu solicitud en este momento. Escríbenos por WhatsApp y te atendemos de inmediato." }, 503);
  }

  const resend = new Resend(apiKey);

  const envioKoru = await resend.emails.send({
    from: remitente,
    to: sitio.contacto.correoReservas,
    replyTo: reserva.correo,
    subject: koru.asunto,
    html: koru.html,
    text: koru.text,
  });
  if (envioKoru.error) {
    console.error("[reserva] Error enviando a KORU:", envioKoru.error);
    return json({ ok: false, mensaje: "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp." }, 502);
  }

  // La confirmación al cliente no bloquea: si falla, KORU ya tiene la solicitud.
  const envioCliente = await resend.emails.send({
    from: remitente,
    to: reserva.correo,
    replyTo: sitio.contacto.correoReservas,
    subject: cliente.asunto,
    html: cliente.html,
    text: cliente.text,
  });
  if (envioCliente.error) console.error("[reserva] Error enviando confirmación:", envioCliente.error);

  return json({ ok: true });
}
