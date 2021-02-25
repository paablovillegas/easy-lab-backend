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
    laboratorio: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    usuario_creado: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = model('Componente', ComponenteSchema);