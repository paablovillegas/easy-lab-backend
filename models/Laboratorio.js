const { Schema, model } = require("mongoose");

const LaboratorioSchema = Schema({
    laboratorio: {
        type: String,
        required: true,
        unique: true,
    },
    access_key: {
        type: String,
        required: true,
    },
    fecha_creacion: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

module.exports = model('Laboratorio', LaboratorioSchema);