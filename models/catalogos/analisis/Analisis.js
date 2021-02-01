const { Schema } = require("mongoose");
const Componente = require("./Componente");

const AnalisisSchema = Schema({
    analisis: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        default: undefined,
    },
    precio: {
        type: Number,
        required: true,
    },
    componentes: {
        type: [Componente],
        required: true,
    },
});

module.exports = model(
    'Analisis',
    AnalisisSchema,
    'analisis',
)