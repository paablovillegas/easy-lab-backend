const { Schema, model } = require("mongoose");

const LaboratorioSchema = Schema({
    laboratorio: {
        type: String,
        required: true,
        unique: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    cp: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
    },
    email: {
        type: String,
    },
    encargado: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    fecha_creacion: {
        type: Date,
        required: true,
    },
});

module.exports = model('Laboratorio', LaboratorioSchema);