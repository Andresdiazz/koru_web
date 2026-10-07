"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { eventoDeEnlace, track } from "@/lib/analytics";

/**
 * Escucha los clics en toda la página y registra los que importan para el negocio
 * (WhatsApp, Cómo llegar, perfil de Google, correo), con la página y el texto del botón.
 */
export function MedicionClics() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const enlace = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!enlace) return;
      const evento = eventoDeEnlace(enlace.href);
      if (!evento) return;
      track(evento, {
        pagina: pathname,
        boton: (enlace.getAttribute("aria-label") || enlace.textContent || "").trim().slice(0, 60),
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  return null;
}
