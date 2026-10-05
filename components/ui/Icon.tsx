import type { ComponentProps, ReactNode } from "react";

/**
 * Íconos de línea fina (trazo 1.25) para mantener la estética editorial.
 * Todos usan currentColor.
 */
const trazos: Record<string, ReactNode> = {
  /* Pilares */
  agua: (
    <>
      <path d="M3 9c2.2-1.6 4.1-1.6 6 0s3.8 1.6 6 0 4-1.6 6 0" />
      <path d="M3 14c2.2-1.6 4.1-1.6 6 0s3.8 1.6 6 0 4-1.6 6 0" />
      <path d="M3 19c2.2-1.6 4.1-1.6 6 0s3.8 1.6 6 0 4-1.6 6 0" />
      <circle cx="16.5" cy="4" r="1.6" />
    </>
  ),
  movimiento: (
    <>
      <circle cx="13" cy="4.2" r="1.8" />
      <path d="M6 10.5c2.4-1.6 4.6-2.1 7-1.4l2.6 3.4 3.4.8" />
      <path d="M13 9.1 11 14l3.5 2.6-1.3 4.9" />
      <path d="M11 14l-2.6 3.2L5 18" />
    </>
  ),
  nutricion: (
    <>
      <path d="M12 21c-4.4 0-7-3.4-7-7.6C5 9.4 8 7 12 8c4-1 7 1.4 7 5.4 0 4.2-2.6 7.6-7 7.6Z" />
      <path d="M12 8c0-2.4 1-4 3-5" />
      <path d="M12 8c-1.2-1.6-3-2.2-4.6-1.8" />
    </>
  ),
  /* Necesidades KORU Business */
  conectar: (
    <>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </>
  ),
  desconectar: (
    <>
      <path d="M4 15c2.6 0 4-1.6 8-1.6s5.4 1.6 8 1.6" />
      <path d="M7 19c1.8 0 2.8-.9 5-.9s3.2.9 5 .9" />
      <circle cx="12" cy="7" r="2.6" />
    </>
  ),
  bienestar: (
    <>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      <path d="M9 12.5c1.2 1 4.8 1 6 0" />
    </>
  ),
  celebrar: (
    <>
      <path d="M5 20 9.5 8.5l6 6L5 20Z" />
      <path d="M14 4.5c.6 1 .6 2-.2 3M18.5 9.5c1-.6 2-.6 3 .2M17 3.5l.5 1.6M20.5 6l-1.6.6" />
    </>
  ),
  "vivir-koru": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="9" cy="8.3" r="1.5" fill="currentColor" stroke="none" />
      <path d="M4.5 13c2.4-1.2 4.6-1.2 7.5 0s5 1.2 7.5 0" />
      <path d="M5.5 16.4c2.2-.9 4.2-.9 6.5 0s4.4.9 6.5 0" />
    </>
  ),
  /* Interfaz */
  flecha: <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />,
  "flecha-abajo": <path d="M12 4v15M6.5 13.5 12 19l5.5-5.5" />,
  check: <path d="M4.5 12.5 9.5 17.5 19.5 7" />,
  menu: <path d="M3.5 8h17M3.5 16h17" />,
  cerrar: <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />,
  mas: <path d="M12 5v14M5 12h14" />,
  ubicacion: (
    <>
      <path d="M12 21s-6.5-6.1-6.5-11.2a6.5 6.5 0 1 1 13 0C18.5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.3" />
    </>
  ),
  reloj: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  correo: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  usuarios: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <path d="M15.5 5.8a3 3 0 0 1 0 5.4M17.5 14.4c1.6.7 2.7 2.3 3 4.6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: <path d="M14 3.5v11.2a3.8 3.8 0 1 1-3.8-3.8M14 3.5c.4 2.6 2.2 4.4 5 4.6" />,
  facebook: <path d="M14.5 21v-7.5h2.7l.4-3h-3.1V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4a20 20 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H8.6v3h2.7V21" />,
};

export type NombreIcono = keyof typeof trazos;

export function Icon({
  nombre,
  className = "h-6 w-6",
  strokeWidth = 1.25,
  ...props
}: { nombre: NombreIcono; strokeWidth?: number } & ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
      {...props}
    >
      {trazos[nombre]}
    </svg>
  );
}

/** Logo de WhatsApp (relleno), para los botones de contacto. */
export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
