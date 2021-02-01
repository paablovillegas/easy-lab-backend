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
});

module.exports = model(
    'Institucion', 
    InstitucionSchema, 
    'instituciones',
);