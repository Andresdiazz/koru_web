/**
 * Textos legales.
 * - Términos KORU Business: texto aprobado, usar tal cual.
 * - Privacidad y tratamiento de datos: TODO legal, KORU entrega el texto tras la revisión legal.
 */

export type ClausulaLegal = { titulo: string; texto: string };

export const terminosBusiness = {
  titulo: "Términos y condiciones KORU Business",
  actualizado: "2026-10-05",
  clausulas: [
    {
      titulo: "Reservas",
      texto:
        "Las experiencias corporativas de KORU se realizan solo con reserva previa y están sujetas a disponibilidad de fecha y horario. La reserva se confirma con el pago del 50% del valor total. El saldo se paga antes o el día de la experiencia, según lo acordado con la empresa.",
    },
    {
      titulo: "Capacidad",
      texto:
        "Las experiencias privadas tienen una capacidad máxima de 10 participantes, salvo que KORU acuerde previamente una capacidad diferente. Para grupos mayores aplican los formatos Jornada KORU Empresarial y Experiencia Fin de Año. El valor corresponde al grupo contratado y no cambia si asisten menos participantes.",
    },
    {
      titulo: "Cambios de fecha",
      texto:
        "La empresa puede solicitar un cambio de fecha con mínimo 72 horas de anticipación, sujeto a disponibilidad. Los cambios solicitados con menos anticipación pueden generar un cargo o la pérdida del anticipo, según los costos ya asumidos para el evento.",
    },
    {
      titulo: "Cancelaciones",
      texto:
        "Si la empresa cancela con mínimo 72 horas de anticipación, el anticipo se conserva para reprogramar la experiencia en una nueva fecha, sujeta a disponibilidad. En cancelaciones con menos de 72 horas, el anticipo no es reembolsable, porque cubre la reserva del espacio, los profesionales, el personal y los recursos de la experiencia.",
    },
    {
      titulo: "Puntualidad",
      texto:
        "La experiencia comienza a la hora acordada. Si el grupo llega tarde, la actividad termina a la hora establecida para no afectar las reservas siguientes. El tiempo perdido por retrasos no genera descuento ni devolución.",
    },
    {
      titulo: "Actividades acuáticas",
      texto:
        "Las actividades en piscina se realizan siguiendo las instrucciones del personal de KORU. Cada participante debe informar con anticipación cualquier condición física o restricción que afecte su participación. KORU puede adaptar o sustituir una actividad por razones de seguridad, condiciones de la piscina, clima u otras circunstancias operativas.",
    },
    {
      titulo: "Salud y participación",
      texto:
        "Cada participante es responsable de conocer sus condiciones y limitaciones para realizar actividad física. Las experiencias KORU son de bienestar, recreación y actividad física, y no sustituyen la atención médica, psicológica, fisioterapéutica ni nutricional. Cuando una experiencia incluye un profesional especializado, este actúa dentro del alcance de su formación y competencia profesional.",
    },
    {
      titulo: "Alimentación",
      texto:
        "Cuando la experiencia incluye bebidas o alimentos, la empresa debe informar con anticipación las alergias o restricciones alimentarias de los participantes. Las alternativas están sujetas a disponibilidad.",
    },
    {
      titulo: "Pertenencias",
      texto:
        "KORU recomienda no llevar objetos de valor innecesarios. Cada participante es responsable de sus pertenencias durante la experiencia.",
    },
    {
      titulo: "Fotografías y video",
      texto:
        "Cuando KORU tome fotografías o video para registro o comunicación, solicitará la autorización de cada participante. Si la empresa necesita fotografías para uso interno o externo, debe informarlo con anticipación.",
    },
    {
      titulo: "Comportamiento",
      texto:
        "Todos los participantes deben mantener un trato respetuoso con el personal, las instalaciones y las demás personas presentes en KORU. KORU puede solicitar el retiro de una persona cuyo comportamiento sea agresivo, irrespetuoso o ponga en riesgo la seguridad del grupo.",
    },
    {
      titulo: "Modificación de actividades",
      texto:
        "KORU puede modificar el orden, la duración o el contenido de una actividad por razones operativas, de seguridad, de clima o de disponibilidad de profesionales, manteniendo siempre el objetivo y el valor de la experiencia contratada.",
    },
    {
      titulo: "Servicios adicionales",
      texto:
        "Cualquier servicio no incluido en la propuesta inicial (alimentación especial, decoración, fotografía profesional, profesionales invitados, productos, transporte u otros) tiene un costo adicional, informado y aprobado previamente.",
    },
    {
      titulo: "Vigencia de la propuesta",
      texto:
        "Las condiciones económicas tienen una vigencia de 15 días calendario, salvo que el contrato indique otra cosa. Los precios pueden variar según la fecha, el número de participantes, los servicios incluidos y los requerimientos especiales de la empresa.",
    },
    {
      titulo: "Tratamiento de datos personales",
      texto:
        "Los datos de la empresa y de los participantes se tratan conforme a la Ley 1581 de 2012 y a la política de tratamiento de datos de KORU, únicamente para gestionar la reserva y la experiencia, y para comunicaciones comerciales cuando exista autorización expresa.",
    },
    {
      titulo: "Aceptación",
      texto:
        "La confirmación de la reserva implica que la empresa conoce y acepta estos términos y condiciones y las características de la experiencia contratada.",
    },
  ] satisfies ClausulaLegal[],
};

/** Estructura preparada. TODO legal: KORU entrega el texto tras la revisión legal. */
export const privacidad = {
  titulo: "Política de privacidad",
  secciones: [
    "Responsable del tratamiento",
    "Datos que recopilamos",
    "Finalidades",
    "Cookies y analítica",
    "Derechos de los titulares",
    "Contacto",
  ],
};

/** Estructura preparada. TODO legal: KORU entrega el texto tras la revisión legal. */
export const tratamientoDatos = {
  titulo: "Política de tratamiento de datos personales",
  subtitulo: "Ley 1581 de 2012 y Decreto 1377 de 2013",
  secciones: [
    "Identificación del responsable",
    "Tratamiento y finalidades",
    "Derechos de los titulares",
    "Autorización",
    "Procedimiento para consultas y reclamos",
    "Área responsable",
    "Vigencia",
  ],
};
