import { z } from "zod";

export const responsableSchemaCreate = z.object({

    nombre: z.string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "Ingresar un nombre válido"
    })
        .trim()
        .min(1, "El nombre no puede estar vacío")
        .max(50, "El nombre no puede tener más de 50 caracteres")
        .transform((value) => {
             return value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }),

    cargo: z.string({
        required_error: "El cargo es obligatorio",
        invalid_type_error: "Ingresar un cargo válido"
    })
        .trim()
        .min(1, "El cargo no puede estar vacío")
        .max(50, "El cargo no puede tener más de 50 caracteres")
        .transform((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }),

    rut: z.string({
        required_error: "El rut es obligatorio",
        invalid_type_error: "Ingresar un rut válido"
    })
        .trim()
        .min(9, "El rut no puede estar vacío")
        .max(12, "El rut no puede tener más de 12 caracteres")
        .regex(/^[0-9]{1,12}[-|\s]{1}[0-9K]{1,3}$/, "El rut debe tener el formato 12345678-9"),

    estado: z.string({
        required_error: "El estado es obligatorio",
        invalid_type_error: "Ingresar un estado válido"
    })
        .trim()
        .min(1, "El estado no puede estar vacío")
        .max(50, "El estado no puede tener más de 50 caracteres")
        .transform((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        })
});

export const responsableSchemaUpdate = responsableSchemaCreate.partial();