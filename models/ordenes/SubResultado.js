const { Schema, model } = require("mongoose");

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
});

module.exports = model('SubResultado', SubResultadoSchema);