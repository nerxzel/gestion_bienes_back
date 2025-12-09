import { BadRequestError } from "./app-error.js";

const trimAndCapitalize = (str) => {
    if (!str) return str;

    const trimedStr = str.trim();
    if (!trimedStr) {
        throw new BadRequestError("El nombre no puede estar vacío");
    }

    const capitalizedStr = trimedStr.charAt(0).toUpperCase() + trimedStr.slice(1).toLowerCase();

    return capitalizedStr;
}

const parseAndValidateId = (id) => {

    if (!id) {
        throw new BadRequestError("El id es obligatorio");
    }

    const idInt = parseInt(id);

    if (isNaN(idInt)) {
        throw new BadRequestError("El id debe ser un número");
    }

    return idInt;
}

const validateRut = (rut) => {
    if (!rut) {
        throw new BadRequestError("El rut es obligatorio");
    }

    const regex = /^\d{7,8}-[0-9K]$/;

    if (!regex.test(rut)) {
        throw new BadRequestError("El RUT debe tener formato XXXXXXXX-Y, sin puntos y con guión. Ejemplo: 12345678-K");
    }
    return rut;
}

export {
    trimAndCapitalize,
    parseAndValidateId,
    validateRut
}