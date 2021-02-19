const { Schema } = require("mongoose");

const LaboratorioSchema = Schema({
    laboratorio: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
    },
    cp: {
        type: Number,
    },
    ciudad: {
        type: String,
    },
    estado: {
        type: String,
    },
    correo: {
        type: String,
    },
    telefono: {
        type: String,
    },
    encargado: {
        type: String,
    },
    logo: {
        type: String,
    },
    titulo: {
        type: String,
    },
    mensaje: {
        type: String
    },
});

module.exports = LaboratorioSchema;