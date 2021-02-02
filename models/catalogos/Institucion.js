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
        default: new Date(),
    },
    fecha_actualizacion: {
        type: Date,
        default: undefined,
    },
});

module.exports = model(
    'Institucion', 
    InstitucionSchema, 
    'instituciones',
);