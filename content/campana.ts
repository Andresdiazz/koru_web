import type { Campana } from "@/types/content";

/**
 * Banner de campaña de KORU Business.
 *
 * - `activa: false` oculta el banner completo.
 * - Si `fechaLimite` (AAAA-MM-DD) ya pasó, el beneficio se oculta solo;
 *   el resto del banner sigue visible mientras `activa` sea true.
 * - Sin campos de precio: los beneficios son siempre valor agregado.
 */
export const campana: Campana = {
  activa: true,
  titulo: "Cierra el año diferente",
  texto: "Este año, regala bienestar. Regala conexión. Regala una experiencia.",
  beneficio: "Las experiencias confirmadas antes del 31 de octubre incluyen el video editado de la experiencia.",
  fechaLimite: "2026-10-31",
  escasez:
    "Un solo club, una sola piscina: recibimos un grupo a la vez. Fechas limitadas entre el 14 de noviembre y el 19 de diciembre.",
  boton: "Reserva tu fecha",
};
