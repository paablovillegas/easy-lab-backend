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
    fecha_creacion: {
        type: Date,
        required: true,
    },
    fecha_actualizacion: {
        type: Date,
        default: undefined,
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

module.exports = model(
    'Analisis',
    AnalisisSchema,
    'analisis',
)