import { z } from "zod";

export const unidadMedidaSchemaCreate = z.object({

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

});

export const unidadMedidaSchemaUpdate = unidadMedidaSchemaCreate.partial();