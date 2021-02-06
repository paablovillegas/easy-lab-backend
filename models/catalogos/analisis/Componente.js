const { Schema, model } = require("mongoose");

const ComponenteSchema = Schema({
    componente: {
        type: String,
        unique: true,
        required: true,
    },
    referencia: {
        type: String,
    },
});

module.exports = model('Componente', ComponenteSchema);