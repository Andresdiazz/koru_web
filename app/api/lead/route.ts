import { after } from "next/server";
import { Resend } from "resend";
import { promocion } from "@/content/promocion";
import { sitio } from "@/content/sitio";
import { correoLead } from "@/lib/email/plantillas";
import { leadSchema } from "@/lib/lead";
import { ipDe, json, limpiar, motivoBot, superaLimite } from "@/lib/servidor";
import { enviarASysteme } from "@/lib/systeme";

/**
 * Registro desde la ventana de promoción: valida, descarta bots y envía el contacto a KORU.
 * Si hay correo y Systeme está configurado, el contacto entra con la etiqueta de la campaña.
 */
export async function POST(request: Request) {
  if (superaLimite(ipDe(request), "lead")) {
    return json({ ok: false, mensaje: "Recibimos varios registros seguidos. Intenta en unos minutos o escríbenos por WhatsApp." }, 429);
  }

  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return json({ ok: false, mensaje: "No pudimos leer el registro." }, 400);
  }

  const resultado = leadSchema.safeParse(cuerpo);
  if (!resultado.success) {
    const errores: Record<string, string> = {};
    for (const i of resultado.error.issues) {
      const campo = String(i.path[0]);
      errores[campo] ??= i.message;
    }
    return json({ ok: false, mensaje: "Revisa los datos.", errores }, 422);
  }
  const lead = resultado.data;

  if (promocion.pedirCorreo && !lead.correo) {
    return json({ ok: false, mensaje: "Revisa los datos.", errores: { correo: "Escribe tu correo." } }, 422);
  }

  // Bots: respondemos "ok" sin hacer nada
  // (el tiempo se mide desde que cargó la página: con autocompletado una persona real llena rápido)
  const bot = motivoBot(lead.sitioWeb, lead.inicio, 1500);
  if (bot) {
    console.warn(`[lead] descartado como bot (${bot}) · promoción ${lead.promocion} · página ${lead.pagina}`);
    return json({ ok: true });
  }

  // Embudo: Systeme (después de responder, sin hacer esperar a la persona)
  if (lead.correo) {
    after(() =>
      enviarASysteme({
        correo: lead.correo,
        nombre: lead.nombre,
        telefono: `+57${lead.whatsapp}`,
        etiquetas: [promocion.etiqueta],
      }),
    );
  }

  const apiKey = limpiar(process.env.RESEND_API_KEY);
  const remitente = limpiar(process.env.RESEND_FROM);
  const correo = correoLead(lead, promocion);

  if (!apiKey || !remitente) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] Resend no configurado. Contacto simulado:\n", correo.text);
      return json({ ok: true, simulado: true });
    }
    console.error("[lead] Falta RESEND_API_KEY o RESEND_FROM");
    return json({ ok: false, mensaje: "No pudimos registrarte en este momento. Escríbenos por WhatsApp." }, 503);
  }

  const envio = await new Resend(apiKey).emails.send({
    from: remitente,
    to: sitio.contacto.correoReservas,
    replyTo: lead.correo || undefined,
    subject: correo.asunto,
    html: correo.html,
    text: correo.text,
  });
  if (envio.error) {
    console.error("[lead] Error enviando a KORU:", envio.error);
    return json({ ok: false, mensaje: "No pudimos registrarte. Intenta de nuevo o escríbenos por WhatsApp." }, 502);
  }

  return json({ ok: true });
}
