const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/** 1200000 → "$1.200.000" */
export function formatCOP(valor: number) {
  // Intl agrega un espacio duro entre "$" y la cifra; lo quitamos para el estilo de marca.
  return cop.format(valor).replace(/\s/g, "");
}

/**
 * Precio de experiencia privada, siempre por grupo:
 * "$1.200.000 por grupo · equivale a $120.000 por persona con 10 participantes"
 */
export function precioPorGrupo(precio: number, capacidad: number) {
  return {
    grupo: `${formatCOP(precio)} por grupo`,
    equivalencia: `equivale a ${formatCOP(Math.round(precio / capacidad))} por persona con ${capacidad} participantes`,
  };
}
