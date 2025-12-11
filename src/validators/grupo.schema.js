import { z } from "zod";

export const grupoSchemaCreate = z.object({

    nombre: z.string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "Ingresar un nombre válido"
    })
        .trim()
        .min(1, "El nombre no puede estar vacío")
        .max(50, "El nombre no puede tener más de 50 caracteres")
        .transform((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }),

    vidaUtil: z.number({
        required_error: "La vida útil es obligatoria",
        invalid_type_error: "La vida útil debe ser un número"
    })
        .int("La vida útil debe ser un número entero")
        .positive("La vida útil debe ser un número positivo")
});

export const grupoSchemaUpdate = grupoSchemaCreate.partial();