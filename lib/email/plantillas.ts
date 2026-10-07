import { sitio } from "@/content/sitio";
import type { Lead } from "@/lib/lead";
import { fechaLarga, getOpcion, whatsappVisible, type Reserva } from "@/lib/reserva";

/* Correos con estilos en línea (los clientes de correo no leen CSS externo). */

const c = {
  espresso: "#2C1A0E",
  tostado: "#5C3317",
  terracota: "#8B4A2B",
  caramelo: "#C4813F",
  arena: "#E8C99A",
  crema: "#F5EDE0",
  marfil: "#FAF5EF",
};

const escapar = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const serif = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const sans = "'DM Sans', Helvetica, Arial, sans-serif";

function marco(contenido: string, preheader: string) {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>KORU</title></head>
<body style="margin:0;padding:0;background:${c.crema};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapar(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.crema};padding:32px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${c.marfil};border-radius:24px;overflow:hidden">
<tr><td style="background:${c.espresso};padding:32px 40px;text-align:center">
<p style="margin:0;font-family:${serif};font-size:28px;letter-spacing:0.4em;color:${c.marfil}">KORU</p>
<p style="margin:8px 0 0;font-family:${serif};font-style:italic;font-size:16px;color:${c.arena}">${escapar(sitio.frase)}</p>
</td></tr>
<tr><td style="padding:40px;font-family:${sans};font-size:15px;line-height:1.6;color:${c.espresso}">
${contenido}
</td></tr>
<tr><td style="background:${c.espresso};padding:24px 40px;font-family:${sans};font-size:12px;line-height:1.6;color:${c.arena};text-align:center">
KORU · ${escapar(sitio.ubicacion.sede)} · <a href="mailto:${sitio.contacto.correo}" style="color:${c.arena}">${sitio.contacto.correo}</a>
</td></tr>
</table></td></tr></table></body></html>`;
}

function filas(datos: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:24px 0">
${datos
  .map(
    ([k, v]) => `<tr>
<td style="padding:10px 12px 10px 0;border-top:1px solid ${c.arena};vertical-align:top;width:38%;color:${c.tostado};font-size:13px">${escapar(k)}</td>
<td style="padding:10px 0;border-top:1px solid ${c.arena};vertical-align:top">${escapar(v).replace(/\n/g, "<br>")}</td>
</tr>`,
  )
  .join("")}
</table>`;
}

function datosReserva(r: Reserva): [string, string][] {
  const opcion = getOpcion(r.opcion);
  return [
    ["Experiencia", opcion?.label ?? r.opcion],
    ...(opcion?.precio ? ([["Precio de referencia", opcion.precio]] as [string, string][]) : []),
    ["Participantes", String(r.participantes)],
    ["Fechas tentativas", r.fechas.map(fechaLarga).join("\n")],
  ];
}

/** Correo interno para KORU con todos los datos. */
export function correoKoru(r: Reserva) {
  const datos: [string, string][] = [
    ...datosReserva(r),
    ["Empresa", r.empresa],
    ["Responsable", r.nombre],
    ["Cargo", r.cargo],
    ["Correo", r.correo],
    ["WhatsApp", whatsappVisible(r.whatsapp)],
    ["Restricciones alimentarias", r.restricciones || "Ninguna informada"],
    ["Comentarios", r.comentarios || "—"],
    ["Autoriza tratamiento de datos", "Sí (Ley 1581)"],
    ["Autoriza comunicaciones comerciales", r.autorizaComunicaciones ? "Sí" : "No"],
  ];
  const asunto = `Nueva solicitud KORU Business · ${r.empresa} · ${getOpcion(r.opcion)?.label ?? r.opcion}`;
  const html = marco(
    `<h1 style="margin:0 0 8px;font-family:${serif};font-weight:400;font-size:30px;line-height:1.2">Nueva solicitud de reserva</h1>
<p style="margin:0;color:${c.tostado}">${escapar(r.nombre)} de <strong>${escapar(r.empresa)}</strong> quiere vivir una experiencia KORU.</p>
${filas(datos)}
<p style="margin:0"><a href="https://wa.me/57${r.whatsapp}" style="display:inline-block;background:${c.terracota};color:${c.marfil};text-decoration:none;padding:14px 28px;border-radius:999px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase">Responder por WhatsApp</a></p>`,
    `${r.empresa} · ${r.participantes} participantes`,
  );
  const text = datos.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { asunto, html, text };
}

/** Confirmación para el cliente. */
export function correoCliente(r: Reserva) {
  const nombre = r.nombre.split(" ")[0];
  const asunto = "Recibimos tu solicitud · KORU Business";
  const intro = `Gracias por pensar en KORU para tu equipo. Recibimos tu solicitud y en máximo 2 días hábiles te enviaremos la propuesta con disponibilidad y detalles.`;
  const html = marco(
    `<h1 style="margin:0 0 16px;font-family:${serif};font-weight:400;font-size:32px;line-height:1.2">Hola, ${escapar(nombre)}.</h1>
<p style="margin:0">${escapar(intro)}</p>
${filas(datosReserva(r))}
<p style="margin:0 0 24px;color:${c.tostado};font-size:13px">Este correo no confirma la reserva. La reserva se confirma con el pago del 50% del valor total, según los <a href="${sitio.url}/legal/terminos-business" style="color:${c.terracota}">términos y condiciones</a>.</p>
<p style="margin:0">¿Tienes alguna pregunta? <a href="https://wa.me/${sitio.contacto.whatsapp}" style="color:${c.terracota}">Escríbenos por WhatsApp</a>.</p>
<p style="margin:32px 0 0;font-family:${serif};font-size:20px;font-style:italic;color:${c.tostado}">${escapar(sitio.fraseCierre)}</p>`,
    "Recibimos tu solicitud. Pronto te enviamos la propuesta.",
  );
  const text = `Hola, ${nombre}.\n\n${intro}\n\n${datosReserva(r)
    .map(([k, v]) => `${k}: ${v.replace(/\n/g, ", ")}`)
    .join("\n")}\n\nEste correo no confirma la reserva. La reserva se confirma con el pago del 50% del valor total.\n\nKORU · ${sitio.ubicacion.sede}`;
  return { asunto, html, text };
}

/** Aviso interno de un nuevo contacto desde la ventana de promoción. */
export function correoLead(lead: Lead, promo: { titulo: string; etiqueta: string }) {
  const datos: [string, string][] = [
    ["Nombre", lead.nombre],
    ["WhatsApp", whatsappVisible(lead.whatsapp)],
    ...(lead.correo ? ([["Correo", lead.correo]] as [string, string][]) : []),
    ["Promoción", `${promo.titulo} (${promo.etiqueta})`],
    ["Página", lead.pagina || "—"],
    ["Autoriza contacto por WhatsApp", "Sí (Ley 1581)"],
  ];
  const asunto = `Nuevo contacto · ${promo.titulo} · ${lead.nombre}`;
  const html = marco(
    `<h1 style="margin:0 0 8px;font-family:${serif};font-weight:400;font-size:30px;line-height:1.2">Nuevo contacto desde la web</h1>
<p style="margin:0;color:${c.tostado}">${escapar(lead.nombre)} dejó sus datos en la promoción <strong>${escapar(promo.titulo)}</strong>. Escríbele pronto: los primeros minutos cuentan.</p>
${filas(datos)}
<p style="margin:0"><a href="https://wa.me/57${lead.whatsapp}" style="display:inline-block;background:${c.terracota};color:${c.marfil};text-decoration:none;padding:14px 28px;border-radius:999px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase">Escribirle por WhatsApp</a></p>`,
    `${lead.nombre} · ${promo.titulo}`,
  );
  const text = datos.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { asunto, html, text };
}
