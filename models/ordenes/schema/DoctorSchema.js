const { Schema } = require("mongoose");

const DoctorSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido_paterno: {
        type: String,
        required: true,
    },
    apellido_materno: {
        type: String,
        default: undefined,
    },
    correo: {
        type: String,
        default: undefined,
    },
    telefono: {
        type: String,
        default: undefined,
    },
    comision: {
        type: Number,
        default: 0,
    },
});

module.exports = DoctorSchema;