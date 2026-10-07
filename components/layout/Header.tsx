"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sitio } from "@/content/sitio";
import { cn } from "@/lib/cn";
import { esActivo } from "@/lib/nav";
import { mensajeParaRuta, whatsappUrl } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";
import { MobileMenu } from "./MobileMenu";

/**
 * Encabezado fijo. Transparente sobre el hero oscuro de cada página;
 * al hacer scroll se vuelve espresso sólido con desenfoque.
 */
export function Header() {
  const pathname = usePathname();
  const [solido, setSolido] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolido(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-full bg-marfil px-5 py-3 text-espresso focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 text-marfil transition-[background-color,box-shadow,backdrop-filter] duration-500",
          solido ? "bg-espresso/92 shadow-[0_1px_0_rgb(196_129_63/0.18)] backdrop-blur-md" : "bg-linear-to-b from-espresso/45 to-transparent",
        )}
      >
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 md:h-20 lg:px-12">
          <Link href="/" className="flex items-center gap-3 rounded-md" aria-label="KORU, ir al inicio">
            <Image
              src="/brand/koru-simbolo-marfil.png"
              alt=""
              width={44}
              height={43}
              className="h-10 w-auto md:h-11"
              preload
            />
            <span className="koru-wordmark text-xl leading-none md:text-[1.375rem]">KORU</span>
          </Link>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-9 2xl:gap-11">
              {sitio.navegacion.map((item) => {
                const activo = esActivo(item.href, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={activo ? "page" : undefined}
                      className={cn(
                        "relative py-2 text-[0.8125rem] whitespace-nowrap font-medium tracking-[0.08em] transition-colors hover:text-arena",
                        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-caramelo after:transition-transform after:duration-500",
                        activo ? "text-arena after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Fase 3: iniciar sesión / idiomas (desactivados en sitio.fase3) */}
            {sitio.fase3.idiomas && <span className="hidden text-sm xl:inline">ES</span>}
            {sitio.fase3.iniciarSesion && (
              <Link href="/ingresar" className="hidden text-sm xl:inline">
                Ingresar
              </Link>
            )}
            <a
              href={whatsappUrl(mensajeParaRuta(pathname))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variante: "secundario-claro", className: "px-5! max-sm:w-12 max-sm:px-0!" })}
            >
              <WhatsAppIcon className="h-[1.125rem] w-[1.125rem]" />
              <span className="max-sm:sr-only">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuAbierto(true)}
              aria-expanded={menuAbierto}
              aria-controls="menu-movil"
              className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-marfil/10 xl:hidden"
            >
              <Icon nombre="menu" className="h-7 w-7" />
              <span className="sr-only">Abrir menú</span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} pathname={pathname} />
    </>
  );
}
