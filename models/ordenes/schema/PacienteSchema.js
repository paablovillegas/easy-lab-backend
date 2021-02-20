const { Schema } = require("mongoose");

const PacienteSchema = Schema({
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
        type: Number,
    },
});

module.exports = PacienteSchema