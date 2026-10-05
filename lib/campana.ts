import type { Campana } from "@/types/content";

/** true si la fecha límite (AAAA-MM-DD, hora de Colombia) todavía no ha pasado. */
export function beneficioVigente(campana: Campana, ahora = new Date()) {
  // Fin del día en Colombia (UTC-5)
  const limite = new Date(`${campana.fechaLimite}T23:59:59-05:00`);
  return ahora.getTime() <= limite.getTime();
}
