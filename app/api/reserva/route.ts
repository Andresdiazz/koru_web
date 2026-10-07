import { after } from "next/server";
import { Resend } from "resend";
import { sitio } from "@/content/sitio";
import { correoCliente, correoKoru } from "@/lib/email/plantillas";
import { erroresDe, reservaSchema } from "@/lib/reserva";
import { esBot, ipDe, json, limpiar, superaLimite } from "@/lib/servidor";
import { ETIQUETA_WEB, enviarASysteme } from "@/lib/systeme";

export async function POST(request: Request) {
  if (superaLimite(ipDe(request), "reserva")) {
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
  if (esBot(reserva.sitioWeb, reserva.inicio)) {
    return json({ ok: true });
  }

  // Embudo: solo empresas que autorizaron comunicaciones comerciales (Ley 1581)
  if (reserva.autorizaComunicaciones) {
    after(() =>
      enviarASysteme({
        correo: reserva.correo,
        nombre: reserva.nombre,
        telefono: `+57${reserva.whatsapp}`,
        etiquetas: [ETIQUETA_WEB, "business-solicitud", `business-${reserva.opcion.split(":")[0]}`],
      }),
    );
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
