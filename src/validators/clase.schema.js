import { z } from "zod";

export const claseSchemaCreate = z.object({

    nombre: z.string({
        required_error: "El nombre de la clase es obligatorio",
        invalid_type_error: "Ingresar un nombre válido"
    })
        .trim()
        .min(1, "El nombre de la clase no puede estar vacío")
        .max(50, "El nombre de la clase no puede tener más de 50 caracteres")
        .transform((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }),

    grupoId: z.number({
        required_error: "El id de grupo es obligatorio",
        invalid_type_error: "Ingresar un id de grupo válido"
    })
        .int("El id de grupo debe ser un número entero")
        .positive("El id de grupo debe ser un número positivo")
});

export const claseSchemaUpdate = claseSchemaCreate.partial();