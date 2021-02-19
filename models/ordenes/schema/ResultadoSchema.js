const { Schema } = require("mongoose");

const SubResultadoSchema = Schema({
    componente: {
        type: String,
        required: true,
    },
    referencia: {
        type: String,
    },
    resultado: {
        type: String,
    },
}, { _id: false });

const ResultadoSchema = Schema({
    analisis: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    componentes: {
        type: [SubResultadoSchema],
        required: true,
    },
}, { _id: false });

module.exports = ResultadoSchema;