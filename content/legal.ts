/**
 * Textos legales.
 * - Términos KORU Business: texto aprobado, usar tal cual.
 * - Privacidad y tratamiento de datos: conforme a la Ley 1581 de 2012, aprobadas por el abogado
 *   de KORU (octubre de 2026). Cualquier cambio de fondo debe pasar de nuevo por revisión legal.
 */

import { sitio } from "@/content/sitio";

export type ClausulaLegal = { titulo: string; texto: string };

/** Sección de una política: párrafos, lista opcional y párrafos finales opcionales. */
export type SeccionLegal = {
  titulo: string;
  parrafos: string[];
  lista?: string[];
  cierre?: string[];
};

export type DocumentoLegal = {
  titulo: string;
  subtitulo?: string;
  /** Fecha AAAA-MM-DD de entrada en vigencia o última actualización */
  actualizado: string;
  secciones: SeccionLegal[];
};

/** Datos del responsable del tratamiento. */
export const responsable = {
  razonSocial: "Nac Connection Group SAS",
  nit: "901635449-7",
  domicilio: "Cali, Valle del Cauca, Colombia",
  direccion: sitio.ubicacion.direccion,
  correo: sitio.contacto.correo,
  telefono: sitio.contacto.whatsappVisible,
};

const nombreResponsable = responsable.nit ? `${responsable.razonSocial}, identificada con NIT ${responsable.nit}` : responsable.razonSocial;

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

/* ───────────── Política de tratamiento de datos personales ───────────── */

export const tratamientoDatos: DocumentoLegal = {
  titulo: "Política de tratamiento de datos personales",
  subtitulo: "Ley 1581 de 2012, Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015)",
  actualizado: "2026-10-05",
  secciones: [
    {
      titulo: "Responsable del tratamiento",
      parrafos: [
        `${nombreResponsable} (en adelante, “KORU”), club de bienestar con domicilio en ${responsable.domicilio}, es responsable del tratamiento de los datos personales que recoge en el desarrollo de sus actividades.`,
      ],
      lista: [
        `Dirección: ${responsable.direccion}`,
        `Correo electrónico: ${responsable.correo}`,
        `Teléfono y WhatsApp: ${responsable.telefono}`,
      ],
    },
    {
      titulo: "Alcance",
      parrafos: [
        "Esta política aplica a los datos personales de socios, clientes, participantes de experiencias empresariales, empresas contratantes, personas que nos contactan, proveedores y colaboradores, recogidos por cualquier canal: el sitio web, WhatsApp, correo electrónico, formularios físicos o atención en la sede.",
      ],
    },
    {
      titulo: "Definiciones",
      parrafos: ["Para efectos de esta política se tienen en cuenta las definiciones de la Ley 1581 de 2012, entre ellas:"],
      lista: [
        "Titular: persona natural cuyos datos personales son objeto de tratamiento.",
        "Dato personal: cualquier información vinculada o que pueda asociarse a una persona natural determinada o determinable.",
        "Dato sensible: aquel que afecta la intimidad del titular o cuyo uso indebido puede generar discriminación, como los datos relativos a la salud.",
        "Tratamiento: cualquier operación sobre datos personales, como la recolección, almacenamiento, uso, circulación o supresión.",
        "Autorización: consentimiento previo, expreso e informado del titular para el tratamiento de sus datos.",
        "Encargado del tratamiento: persona que realiza el tratamiento por cuenta del responsable.",
      ],
    },
    {
      titulo: "Datos que tratamos",
      parrafos: ["Según la relación que tengas con KORU, podemos tratar:"],
      lista: [
        "Datos de identificación y contacto: nombre, documento de identidad, fecha de nacimiento, teléfono, WhatsApp, correo electrónico y dirección.",
        "Datos de la empresa, cuando solicitas una experiencia corporativa: nombre de la empresa, cargo, número de participantes y fechas tentativas.",
        "Datos de salud y condición física (datos sensibles): evaluaciones físicas, lesiones, condiciones médicas o limitaciones que informes, y alergias o restricciones alimentarias.",
        "Imagen: fotografías y videos tomados en el club o durante las experiencias, solo con tu autorización.",
        "Datos de pago y facturación necesarios para la prestación del servicio.",
        "Datos de navegación del sitio web, de acuerdo con nuestra política de privacidad.",
      ],
    },
    {
      titulo: "Finalidades",
      parrafos: ["KORU trata los datos personales para:"],
      lista: [
        "Gestionar membresías, clases, sesiones de hidroterapia, masajes, reservas y experiencias empresariales.",
        "Realizar evaluaciones físicas y adaptar las actividades a tus condiciones, con fines de seguridad y bienestar.",
        "Atender solicitudes, preguntas, quejas y reclamos por WhatsApp, correo electrónico o en la sede.",
        "Enviar propuestas, confirmaciones, recordatorios e información sobre los servicios contratados.",
        "Facturar, cobrar y cumplir obligaciones legales, contables y tributarias.",
        "Enviar comunicaciones comerciales, novedades y eventos, solo cuando hayas dado tu autorización expresa para ello.",
        "Tomar fotografías o videos de registro y comunicación, solo con la autorización de cada persona.",
        "Medir y mejorar el funcionamiento del sitio web y de nuestros servicios.",
        "Proteger la seguridad de las personas, las instalaciones y la información.",
      ],
    },
    {
      titulo: "Datos sensibles",
      parrafos: [
        "Los datos relativos a tu salud y condición física son datos sensibles. No estás obligado a suministrarlos ni a autorizar su tratamiento. Si decides compartirlos, los usamos únicamente para cuidar tu seguridad y adaptar las actividades, y solo tiene acceso a ellos el personal que los necesita para atenderte.",
        "Si no los suministras, es posible que no podamos ofrecerte algunas actividades acuáticas o terapéuticas de manera segura.",
      ],
    },
    {
      titulo: "Niñas, niños y adolescentes",
      parrafos: [
        "Cuando KORU trate datos de menores de edad, lo hará respetando su interés superior y sus derechos fundamentales, y con la autorización previa de su padre, madre o representante legal.",
      ],
    },
    {
      titulo: "Autorización",
      parrafos: [
        "KORU solicita tu autorización a más tardar en el momento de recoger tus datos, por medios que permitan conservar prueba de ella: casillas en formularios del sitio web, formularios físicos, mensajes de WhatsApp o correo electrónico, o conductas inequívocas que permitan concluir que la otorgaste.",
        "La autorización para comunicaciones comerciales es independiente y opcional. Puedes revocar cualquiera de tus autorizaciones en cualquier momento, salvo cuando exista un deber legal o contractual de conservar la información.",
      ],
    },
    {
      titulo: "Derechos de los titulares",
      parrafos: ["Como titular de los datos tienes derecho a:"],
      lista: [
        "Conocer, actualizar y rectificar tus datos personales.",
        "Solicitar prueba de la autorización otorgada a KORU.",
        "Ser informado, previa solicitud, sobre el uso que se ha dado a tus datos.",
        "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley, después de haber agotado el trámite de consulta o reclamo ante KORU.",
        "Revocar la autorización y solicitar la supresión de tus datos cuando no exista un deber legal o contractual de conservarlos.",
        "Acceder en forma gratuita a tus datos personales.",
      ],
    },
    {
      titulo: "Área responsable y canales de atención",
      parrafos: [
        `La administración de KORU atiende las consultas y reclamos sobre datos personales. Puedes escribir a ${responsable.correo}, al WhatsApp ${responsable.telefono} o radicar tu solicitud en ${responsable.direccion}.`,
        "En tu solicitud indica tu nombre, documento de identidad, datos de contacto y una descripción de lo que solicitas. Si actúas en nombre de otra persona, adjunta el documento que acredite tu representación.",
      ],
    },
    {
      titulo: "Procedimiento para consultas y reclamos",
      parrafos: [
        "Consultas: se responden en un máximo de diez (10) días hábiles contados desde su recibo. Si no es posible atenderlas en ese plazo, te informaremos los motivos y la nueva fecha, que no superará cinco (5) días hábiles adicionales.",
        "Reclamos: cuando consideres que tus datos deben ser corregidos, actualizados o suprimidos, o que se ha incumplido la ley, puedes presentar un reclamo. Si está incompleto, te pediremos completarlo dentro de los cinco (5) días hábiles siguientes; si pasan dos (2) meses sin que lo hagas, se entenderá que desististe. Una vez completo, incluiremos en la base de datos la leyenda “reclamo en trámite” en un máximo de dos (2) días hábiles y lo resolveremos en un máximo de quince (15) días hábiles. Si no es posible en ese plazo, te informaremos los motivos y la nueva fecha, que no superará ocho (8) días hábiles adicionales.",
      ],
    },
    {
      titulo: "Transmisión y transferencia de datos",
      parrafos: [
        "KORU no vende ni cede tus datos personales. Para prestar sus servicios puede compartirlos con proveedores que actúan como encargados del tratamiento, como servicios de alojamiento del sitio web, envío de correos electrónicos, mensajería, facturación y medición. Algunos de estos proveedores pueden almacenar la información fuera de Colombia; en esos casos, KORU exige que cuenten con medidas de seguridad y que traten los datos solo para las finalidades autorizadas.",
      ],
    },
    {
      titulo: "Seguridad de la información",
      parrafos: [
        "KORU adopta medidas técnicas, humanas y administrativas razonables para proteger tus datos contra pérdida, consulta, uso o acceso no autorizado.",
      ],
    },
    {
      titulo: "Vigencia",
      parrafos: [
        "Esta política rige desde la fecha de su publicación. Las bases de datos se conservarán mientras sea necesario para cumplir las finalidades descritas y las obligaciones legales aplicables. Cualquier cambio sustancial se comunicará a través de este sitio web antes de su aplicación.",
      ],
    },
  ],
};

/* ───────────── Política de privacidad del sitio web ───────────── */

export const privacidad: DocumentoLegal = {
  titulo: "Política de privacidad",
  subtitulo: "Sitio web de KORU",
  actualizado: "2026-10-05",
  secciones: [
    {
      titulo: "Quiénes somos",
      parrafos: [
        `Este sitio web es operado por ${nombreResponsable} (“KORU”), con domicilio en ${responsable.domicilio}. Esta política explica qué información recogemos cuando visitas el sitio y cómo la usamos. Complementa nuestra política de tratamiento de datos personales, que describe en detalle tus derechos y cómo ejercerlos.`,
      ],
    },
    {
      titulo: "Información que recogemos",
      parrafos: ["Recogemos información de tres formas:"],
      lista: [
        "La que nos das en el formulario de reserva de KORU Business: experiencia de interés, número de participantes, fechas tentativas, empresa, nombre, cargo, correo, WhatsApp, restricciones alimentarias o alergias y comentarios.",
        "La que compartes cuando nos escribes por WhatsApp o correo electrónico desde los botones del sitio. Esas conversaciones también están sujetas a las condiciones de WhatsApp o de tu proveedor de correo.",
        "Información técnica de tu visita: dirección IP, tipo de navegador y dispositivo, páginas visitadas y fecha y hora, que se registran de forma automática para el funcionamiento y la seguridad del sitio.",
      ],
    },
    {
      titulo: "Para qué la usamos",
      lista: [
        "Responder tu solicitud y enviarte la propuesta y la confirmación por correo.",
        "Contactarte por WhatsApp o correo sobre la solicitud que hiciste.",
        "Enviarte comunicaciones comerciales, solo si marcaste la casilla que lo autoriza.",
        "Medir cómo se usa el sitio para mejorarlo.",
        "Prevenir abusos, como el envío automático de formularios.",
      ],
      parrafos: [],
    },
    {
      titulo: "Cookies y herramientas de medición",
      parrafos: [
        "El sitio puede usar cookies y tecnologías similares de terceros, como Google Analytics y el píxel de Meta, para entender cuántas personas lo visitan y medir el resultado de nuestras campañas. Estas herramientas pueden recoger datos de navegación de forma agregada.",
        "Puedes bloquear o borrar las cookies desde la configuración de tu navegador. El sitio seguirá funcionando, aunque algunas mediciones dejarán de registrarse.",
      ],
    },
    {
      titulo: "Con quién la compartimos",
      parrafos: [
        "No vendemos tu información. La compartimos únicamente con proveedores que nos ayudan a operar el sitio, como el servicio de alojamiento web, el servicio de envío de correos, Google Maps para el mapa de ubicación y, cuando están activas, las herramientas de medición mencionadas. Algunos de ellos procesan datos fuera de Colombia.",
      ],
    },
    {
      titulo: "Cuánto tiempo la conservamos",
      parrafos: [
        "Conservamos las solicitudes de reserva durante el tiempo necesario para gestionar la relación comercial y cumplir obligaciones legales. Puedes pedir en cualquier momento que actualicemos o eliminemos tus datos, salvo que debamos conservarlos por ley.",
      ],
    },
    {
      titulo: "Seguridad",
      parrafos: [
        "El sitio usa conexión cifrada (HTTPS) y medidas razonables para proteger la información que nos envías. Ningún sistema es completamente infalible, por eso solo te pedimos los datos necesarios.",
      ],
    },
    {
      titulo: "Menores de edad",
      parrafos: [
        "El formulario del sitio está dirigido a personas mayores de edad que actúan en nombre de empresas. No recogemos de forma intencional datos de menores a través del sitio.",
      ],
    },
    {
      titulo: "Tus derechos",
      parrafos: [
        `Puedes conocer, actualizar, rectificar y suprimir tus datos, y revocar tu autorización, escribiendo a ${responsable.correo}. El detalle de tus derechos y de los plazos de respuesta está en nuestra política de tratamiento de datos personales.`,
      ],
    },
    {
      titulo: "Cambios a esta política",
      parrafos: [
        "Podemos actualizar esta política. La versión vigente siempre estará publicada en esta página, con su fecha de actualización.",
      ],
    },
  ],
};
