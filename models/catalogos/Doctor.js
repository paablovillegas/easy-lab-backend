const { Schema, model } = require("mongoose");

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
    fecha_creacion: {
        type: Date,
        required: true,
    },
    fecha_actualizacion: {
        type: Date,
        default: undefined,
    },
});

module.exports = model(
    'Doctor',
    DoctorSchema,
    'doctores'
);