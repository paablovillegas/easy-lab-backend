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
        required: true,
        default: '',
    },
});

const ResultadoSchema = Schema({
    analisis: {
        type: String,
        required: true,
    },
    componentes: {
        type: [SubResultadoSchema],
        required: true,
    },
});

module.exports = ResultadoSchema;