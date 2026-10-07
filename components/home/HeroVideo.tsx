"use client";

import { useEffect, useState } from "react";

/**
 * Video en loop del hero. Se carga después de la imagen (no compite con el LCP)
 * y no se carga si la persona pidió reducir movimiento o ahorrar datos.
 * En pantallas pequeñas usa la versión liviana (720p) si existe.
 */
export function HeroVideo({ mp4, mp4Movil, webm }: { mp4: string; mp4Movil?: string; webm?: string }) {
  const [montar, setMontar] = useState(false);
  const [movil, setMovil] = useState(false);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reducir || ahorro) return;

    const iniciar = () => {
      setMovil(window.matchMedia("(max-width: 767px)").matches);
      setMontar(true);
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    if (document.readyState === "complete") idle(iniciar);
    else window.addEventListener("load", () => idle(iniciar), { once: true });
  }, []);

  if (!montar) return null;

  return (
    <video
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onPlaying={() => setListo(true)}
      className={`absolute inset-0 h-full w-full animate-slow-zoom object-cover object-[72%_center] md:object-center transition-opacity duration-[1500ms] ${listo ? "opacity-100" : "opacity-0"}`}
    >
      {webm && !movil && <source src={webm} type="video/webm" />}
      <source src={movil && mp4Movil ? mp4Movil : mp4} type="video/mp4" />
    </video>
  );
}
