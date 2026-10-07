// Verifica la conexión con Systeme sin mostrar la clave.
// Uso: node --env-file=.env.local scripts/verificar-systeme.mjs
const clave = process.env.SYSTEME_API_KEY?.trim().replace(/^["'](.*)["']$/, "$1");
if (!clave) {
  console.log("Falta SYSTEME_API_KEY en .env.local");
  process.exit(1);
}
const api = async (ruta) => {
  const r = await fetch(`https://api.systeme.io/api${ruta}`, { headers: { "X-API-Key": clave, Accept: "application/json" } });
  return { status: r.status, data: await r.json().catch(() => ({})) };
};
const campos = await api("/contact_fields");
console.log("Conexión:", campos.status === 200 ? "OK" : `ERROR ${campos.status}`);
if (campos.status !== 200) {
  console.log(JSON.stringify(campos.data).slice(0, 300));
  process.exit(1);
}
console.log("Campos de contacto:", (campos.data.items ?? []).map((c) => `${c.fieldName ?? c.name} (${c.slug})`).join(", "));
const tags = await api("/tags?limit=100");
console.log("Etiquetas existentes:", (tags.data.items ?? []).map((t) => t.name).join(", ") || "(ninguna)");
