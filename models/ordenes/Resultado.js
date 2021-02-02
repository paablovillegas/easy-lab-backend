const { Schema, model } = require("mongoose");
const SubResultado = require("./SubResultado");

const ResultadoSchema = Schema({
    analisis: {
        type: String,
        required: true,
    },
    componentes: {
        type: [SubResultado],
        required: true,
    },
});

module.exports = model('Resultado', ResultadoSchema);