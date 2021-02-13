const { Schema, model } = require("mongoose");

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
    genero: {
        type: Number,
        required: true,
        default: 1,
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    direccion: {
        type: String,
        default: undefined,
    },
    fecha_creacion: {
        type: Date,
        required: true,
    },
    fecha_actualizacion: {
        type: Date,
        default: undefined,
    },
});

module.exports = model('Paciente', PacienteSchema);