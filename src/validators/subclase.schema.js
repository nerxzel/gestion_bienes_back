import { z } from "zod";

export const subclaseSchemaCreate = z.object({

    nombre: z.string({
        required_error: "El nombre de la subclase es obligatorio",
        invalid_type_error: "Ingresar un nombre válido"
    })
        .trim()
        .min(1, "El nombre de la subclase no puede estar vacío")
        .max(50, "El nombre de la subclase no puede tener más de 50 caracteres")
        .transform((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }),

    claseId: z.number({
        required_error: "El id de clase es obligatorio",
        invalid_type_error: "Ingresar un id de clase válido"
    })
        .int("El id de clase debe ser un número entero")
        .positive("El id de clase debe ser un número positivo"),

    grupoId: z.number({
        required_error: "El id de grupo es obligatorio",
        invalid_type_error: "Ingresar un id de grupo válido"
    })
        .int("El id de grupo debe ser un número entero")
        .positive("El id de grupo debe ser un número positivo")
});

export const subclaseSchemaUpdate = subclaseSchemaCreate.partial();