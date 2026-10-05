/**
 * Tipos de todo el contenido editable del sitio.
 * El contenido vive en /content; los componentes solo lo leen.
 */

export type Imagen = {
  /** Ruta dentro de /public, p. ej. "/images/piscina-hero.jpg" */
  src: string;
  /** Texto alternativo descriptivo (obligatorio por accesibilidad) */
  alt: string;
};

/* ───────────── Sitio ───────────── */

export type EnlaceNav = { label: string; href: string };

export type Horario = {
  dias: string;
  horas: string;
  /** Para datos estructurados (schema.org). Días en inglés, horas HH:MM. */
  schema?: { dias: string[]; abre: string; cierra: string };
};

export type Testimonio = {
  nombre: string;
  detalle: string;
  texto: string;
};

export type Fundador = {
  nombre: string;
  rol: string;
  bio: string;
  imagen: Imagen;
};

export type Pilar = {
  icono: "agua" | "movimiento" | "nutricion";
  titulo: string;
  texto: string;
};

export type ItemGaleria = Imagen & {
  /** Tamaño en el mosaico asimétrico */
  formato: "alto" | "ancho" | "grande" | "normal";
};

/** Funciones preparadas para la Fase 3. En `false` no se muestran. */
export type FlagsFase3 = {
  iniciarSesion: boolean;
  idiomas: boolean;
  giftCards: boolean;
  tienda: boolean;
};

/* ───────────── Clases ───────────── */

export type TipoClase = "piscina" | "salon";

export type Clase = {
  slug: string;
  nombre: string;
  tipo: TipoClase;
  descripcion: string;
  /** Texto largo opcional para las clases con más protagonismo */
  descripcionLarga?: string;
  formato: string;
  imagen: Imagen;
  /** La clase estrella recibe más espacio en el diseño */
  destacada?: boolean;
  /** Se muestra en la página de clases pero no en el carrusel del home */
  soloEnDetalle?: boolean;
};

/* ───────────── Masajes ───────────── */

export type Masaje = {
  nombre: string;
  duracionMin: number;
  /** Precio en pesos colombianos. Solo se muestra si `disponible` es true. */
  precio: number;
};

export type ConfigMasajes = {
  /** Interruptor: false = "Próximamente", sin precios. */
  disponible: boolean;
  titulo: string;
  tituloProximamente: string;
  textoProximamente: string;
  texto: string;
  botonAviso: string;
  mensajeAviso: string;
  botonAgendar: string;
  mensajeAgendar: string;
  imagen: Imagen;
  masajes: Masaje[];
};

/* ───────────── Membresías ───────────── */

export type IdPlan = "revive" | "flow" | "aqua";

export type FilaBeneficio = {
  id: string;
  label: string;
  valores: Record<IdPlan, string | null>;
  /** Si es true, la fila solo aparece cuando los masajes están disponibles */
  dependeDeMasajes?: boolean;
};

export type Plan = {
  id: IdPlan;
  nombre: string;
  frase: string;
  /** Precio mensual en COP. Solo se muestra si `mostrarPrecios` es true. */
  precioMensual: number;
  destacada?: boolean;
  etiquetaDestacada?: string;
};

export type ConfigMembresias = {
  /** Interruptor: false = se ocultan las cifras. */
  mostrarPrecios: boolean;
  titulo: string;
  eyebrow: string;
  tituloPagina: string;
  imagen: Imagen;
  tituloComparativa: string;
  intro: string;
  notaInscripcion: string;
  boton: string;
  planes: Plan[];
  beneficios: FilaBeneficio[];
  primeraClase: {
    titulo: string;
    texto: string;
    precio: number;
    /** Va resaltado junto al precio */
    condicion: string;
    plazo: string;
    boton: string;
    mensajeWhatsApp: string;
  };
};

/* ───────────── KORU Business ───────────── */

export type IdNecesidad = "conectar" | "desconectar" | "bienestar" | "celebrar" | "vivir-koru";

export type Necesidad = {
  id: IdNecesidad;
  label: string;
  descripcion: string;
  /** slug de la experiencia a la que lleva */
  experiencia: string;
};

export type Modalidad = {
  id: string;
  nombre: string;
  precio: number;
  descripcion?: string;
};

export type Experiencia = {
  slug: string;
  necesidad: IdNecesidad;
  nombre: string;
  nombreCorto: string;
  frase: string;
  paraQuien: string;
  incluye: string[];
  duracion: string;
  /** Capacidad máxima del grupo */
  capacidad: number;
  modalidades: Modalidad[];
  botonPrincipal?: string;
  imagen: Imagen;
};

export type FormatoGrupoGrande = {
  formato: string;
  participantes: string;
  minimo: number;
  maximo: number;
  duracion: string;
  precioPersona: number;
};

export type ServicioAnual = {
  id: string;
  nombre: string;
  detalle: string;
  /** Opciones de precio. Vacío = sin precio en la web. */
  precios: { label: string; precio: number }[];
  /** Texto a mostrar cuando no hay precio publicado */
  notaPrecio?: string;
};

export type RazonKoru = { titulo: string; texto: string };

/* ───────────── Campaña ───────────── */

export type Campana = {
  activa: boolean;
  titulo: string;
  texto: string;
  beneficio: string;
  /** Fecha ISO (AAAA-MM-DD). Pasada esta fecha, el beneficio se oculta solo. */
  fechaLimite: string;
  escasez: string;
  boton: string;
};
