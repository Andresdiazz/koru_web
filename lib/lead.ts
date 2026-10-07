import { z } from "zod";

/** Validación del registro de la ventana de promoción (cliente y servidor). */
export const leadSchema = z.object({
  nombre: z.string({ error: "Escribe tu nombre." }).trim().min(2, { error: "Escribe tu nombre." }).max(80, { error: "Usa un nombre más corto." }),
  whatsapp: z
    .string({ error: "Escribe tu WhatsApp." })
    .transform((v) => v.replace(/\D/g, "").replace(/^57(?=\d{10}$)/, ""))
    .refine((v) => /^3\d{9}$/.test(v), { error: "Escribe un celular de 10 dígitos que empiece por 3." }),
  correo: z
    .string()
    .trim()
    .toLowerCase()
    .optional()
    .default("")
    .refine((v) => v === "" || z.email().safeParse(v).success, { error: "Revisa tu correo." }),
  acepta: z.literal(true, { error: "Necesitamos tu autorización para contactarte." }),
  promocion: z.string().max(80),
  pagina: z.string().max(200).optional().default(""),
  /* Anti-spam */
  sitioWeb: z.string().optional().default(""),
  inicio: z.number().optional(),
});

export type LeadEntrada = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
