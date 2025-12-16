import { z } from "zod";

export const userSchemaCreate = z.object({

    name: z.string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "Ingresar un nombre válido"
    })
        .trim()
        .min(1, "El nombre no puede estar vacío")
        .max(50, "El nombre no puede tener más de 50 caracteres")
        .transform((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }),

    email: z.string({
        required_error: "El email es obligatoria",
    })
        .trim()
        .email("Ingresar un formato de email válido"),

    password: z.string({ required_error: "La contraseña es obligtoria" })
        .min(6, "Debe tener al menos 6 caracteres")
        .max(100, "No puede tener más de 100 caracteres")
        
});

export const userSchemaUpdate = userSchemaCreate.partial();

export const loginSchema = z.object({
    email: z.string({ required_error: "El email es obligatorio "})
    .trim()
    .email("Ingresar un formato de email válido"),

    password: z.string({ required_error: "La contraseña es obligtoria" })
        .min(1, "No dejar el campo vacío")
        
})