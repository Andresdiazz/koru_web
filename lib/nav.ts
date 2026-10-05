/** true si el enlace corresponde a la página actual */
export function esActivo(href: string, pathname: string) {
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}
