const { Schema, model } = require("mongoose");

const AnalisisSchema = Schema({
    analisis: {
        type: String,
        unique: true,
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
    componentes: [{
        type: Schema.Types.ObjectId,
        ref: 'Componente',
        required: true,
    }],
});

module.exports = model(
    'Analisis',
    AnalisisSchema,
    'analisis',
)