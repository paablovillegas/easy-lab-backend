const { Schema, model } = require("mongoose");

const ComponenteSchema = Schema({
    componente: {
        type: String,
        required: true,
    },
    referencia: {
        type: String,
        required: true,
    },
});

module.exports = model('Componente', ComponenteSchema);