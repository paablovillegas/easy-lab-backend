const { Schema, model } = require("mongoose");

const InstitucionSchema = Schema({
    institucion: {
        type: String,
        required: true,
        unique: true,
    },
    descuento: {
        type: Number,
        default: 0,
    },
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
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = model(
    'Institucion', 
    InstitucionSchema, 
    'instituciones',
);