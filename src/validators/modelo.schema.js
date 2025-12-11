import { z } from "zod";

export const modeloSchemaCreate = z.object({

    nombre: z.string({
        required_error: "El nombre del modelo es obligatorio",
        invalid_type_error: "Ingresar un nombre válido"
    })
        .trim()
        .min(1, "El nombre del modelo no puede estar vacío")
        .max(50, "El nombre del modelo no puede tener más de 50 caracteres")
        .transform((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }),

    marcaId: z.number({
        required_error: "El id de la marca es obligatorio",
        invalid_type_error: "Ingresar un id de la marca válido"
    })
        .int("El id de la marca debe ser un número entero")
        .positive("El id de la marca debe ser un número positivo")
});

export const modeloSchemaUpdate = modeloSchemaCreate.partial();