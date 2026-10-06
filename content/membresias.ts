import type { ConfigMembresias } from "@/types/content";

/**
 * Membresías.
 *
 * INTERRUPTOR: `mostrarPrecios`
 *  - false → se muestran los beneficios y el botón "Agenda tu primera clase", sin cifras.
 *  - true  → aparece el precio mensual de cada plan.
 *
 * Las filas con `dependeDeMasajes: true` solo aparecen si `masajes.disponible` es true.
 * Usa null para "no incluido" (se muestra como una raya).
 */
export const membresias: ConfigMembresias = {
  mostrarPrecios: false,

  titulo: "Membresías",
  eyebrow: "Hazte socio",
  tituloPagina: "Elige cómo vivir KORU.",
  imagen: { src: "/images/salon-yoga.jpg", alt: "Salón de yoga y Pilates de KORU con arcos iluminados y mats en el piso" },
  tituloComparativa: "Compara las membresías",
  intro: "Tres formas de vivir KORU. Todas incluyen clases de salón ilimitadas y el acompañamiento de nuestros especialistas.",
  notaInscripcion: "Sin cuota de inscripción.",
  boton: "Agenda tu primera clase",

  planes: [
    {
      id: "revive",
      nombre: "Revive",
      frase: "Para empezar a moverte con intención.",
      precioMensual: 280000,
    },
    {
      id: "flow",
      nombre: "Flow",
      frase: "El equilibrio entre el salón y el agua.",
      precioMensual: 480000,
      destacada: true,
      etiquetaDestacada: "La más elegida",
    },
    {
      id: "aqua",
      nombre: "Aqua",
      frase: "La experiencia KORU completa, con el agua al centro.",
      precioMensual: 780000,
    },
  ],

  beneficios: [
    {
      id: "salon",
      label: "Clases de salón",
      valores: { revive: "Ilimitadas", flow: "Ilimitadas", aqua: "Ilimitadas" },
    },
    {
      id: "acuaticas",
      label: "Clases acuáticas grupales",
      valores: { revive: "2 al mes", flow: "8 al mes", aqua: "Ilimitadas" },
    },
    {
      id: "acondicionamiento",
      label: "Acondicionamiento acuático personalizado",
      valores: { revive: null, flow: "2 al mes", aqua: "Ilimitado" },
    },
    {
      id: "hidroterapia",
      label: "Hidroterapia individual",
      valores: { revive: null, flow: null, aqua: "2 al mes" },
    },
    {
      id: "masaje",
      label: "Masaje incluido",
      valores: { revive: null, flow: "1 relajante al mes", aqua: "1 a elección al mes" },
      dependeDeMasajes: true,
    },
    {
      id: "saisei",
      // Se presenta como beneficio en tienda (sin la palabra "descuento"), aprobado por KORU.
      label: "Beneficio en tienda SAISEI",
      valores: { revive: "10%", flow: "15%", aqua: "20%" },
    },
    {
      id: "fisioterapia",
      label: "Sala de fisioterapia",
      valores: { revive: null, flow: "Sí", aqua: "Sí" },
    },
    {
      id: "evaluacion",
      label: "Evaluación física",
      valores: { revive: "Inicial", flow: "Trimestral", aqua: "Trimestral + prioridad de reservas" },
    },
    {
      id: "invitados",
      label: "Sesiones de invitado",
      valores: { revive: null, flow: null, aqua: "2 al mes" },
    },
  ],

  primeraClase: {
    titulo: "Tu primera clase",
    texto: "Elige una clase del horario y vívela como socio por un día.",
    precio: 50000,
    condicion: "abonables a tu primera mensualidad",
    plazo: "si te unes en los siguientes 30 días.",
    boton: "Agenda tu primera clase",
    mensajeWhatsApp: "Hola KORU 🌿 Quiero agendar mi primera clase.",
  },
};
