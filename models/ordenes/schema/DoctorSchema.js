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
    },
    correo: {
        type: String,
    },
    telefono: {
        type: String,
    },
    comision: {
        type: Number,
        default: 0,
    },
}, { _id: false });

module.exports = DoctorSchema;