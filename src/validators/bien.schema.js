import { z } from "zod";

const optionalNumber = z.preprocess(
    (value) => (value === "" ? null : value),
    z.coerce.number({ invalid_type_error: "Debe ser un número" })
        .positive("Debe ser mayor a 0")
        .nullable()
        .optional()
);

export const bienSchemaCreate = z.object({

    // Descripción corta
    nombre: z.string({
        required_error: "La descripción corta es obligatoria",
        invalid_type_error: "Ingresar una descripción válida"
    })
        .trim()
        .min(1, "La descripción corta no puede estar vacía")
        .max(50, "La descripción corta no puede tener más de 50 caracteres")
        .transform((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }),

    // Descripción larga
    descripcionLarga: z.string({
        required_error: "La descripción larga es obligatoria",
        invalid_type_error: "Ingresar una descripción larga válida"
    })
        .trim()
        .min(1, "La descripción larga no puede estar vacía")
        .max(60, "La descripción larga puede llevar máximo 60 carácteres"),

    // Valor residual
    valorResidual: z.number({
        required_error: "El valor residual es obligatorio",
        invalid_type_error: "El valor residual debe ser un número"
    })
        .int("El valor residual debe ser un número entero")
        .nonnegative("El valor residual debe ser un número positivo"),

    // Costo adquisición
    costoAdquisicion: z.number({
        required_error: "El costo de adquisicón es obligatorio",
        invalid_type_error: "El costo de adquisición debe ser un número"
    })
        .int("El costo de adquisición debe ser un número entero")
        .positive("El costo de adquisición debe ser un número positivo"),

    // Fecha Ingreso
    fechaIngreso: z.coerce.date({
        required_error: "La fecha de ingreso es obligatoria",
        invalid_type_error: "El formato de fecha no es válido"
    })
        .max(new Date(), "La fecha de ingreso no puede ser más allá de hoy"),

    // Tipo Objeto
    tipoObjeto: z.string({
        required_error: "El tipo del objeto es obligatoria",
        invalid_type_error: "Ingresar un tipo de objeto válido"
    })
        .trim()
        .min(1, "El tipo del objeto no puede estar vacío")
        .max(50, "El tipo del objeto no puede tener más de 50 caracteres")
        .transform((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }),

    // Estado
    estado: z.enum(["Bueno", "Regular", "Malo"], {
        errorMap: () => ({ message: "El estado debe ser una de las opciones disponibles" })
    }),

    // Numero serie
    numSerie: z.string({ invalid_type_error: "El número de serie válido" })
        .trim()
        .transform(val => val === "" ? null : val)
        .nullable()
        .optional(),

    // Color
    color: z.string({
        required_error: "El color es obligatoria",
        invalid_type_error: "Ingresar un color válido"
    })
        .trim()
        .min(1, "El color no puede estar vacío")
        .max(50, "El color no puede tener más de 50 caracteres")
        .transform((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }),

    // Cantidad Piezas
    cantidadPieza: optionalNumber,

    // Largo
    largo: optionalNumber,

    // Alto
    alto: optionalNumber,

    // Ancho
    ancho: optionalNumber,

    // Isla
    isla: z.string({
        invalid_type_error: "Ingresar una descripción válida"
    })
        .trim()
        .max(2, "La isla no puede tener más de 2 caracteres")
        .transform(val => val === "" ? null : val)
        .nullable()
        .optional(),

    // Fila
    fila: z.string({
        invalid_type_error: "Ingresar una descripción válida"
    })
        .trim()
        .max(2, "La fila no puede tener más de 2 caracteres")
        .transform(val => val === "" ? null : val)
        .nullable()
        .optional(),

    // Columna
    columna: z.string({
        invalid_type_error: "Ingresar una descripción válida"
    })
        .trim()
        .max(2, "La columna no puede tener más de 2 caracteres")
        .transform(val => val === "" ? null : val)
        .nullable()
        .optional(),

    // Catalogos

    grupoId: z.coerce.number().int().positive(),
    claseId: z.coerce.number().int().positive(),
    subclaseId: z.coerce.number().int().positive(),
    marcaId: z.coerce.number().int().positive(),
    modeloId: z.coerce.number().int().positive(),
    ubicacionId: z.coerce.number().int().positive(),
    unidadMedidaId: z.coerce.number().int().positive(),
    responsableId: z.coerce.number().int().positive(),

});

export const bienSchemaUpdate = bienSchemaCreate.partial();