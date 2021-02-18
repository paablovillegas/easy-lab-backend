const { Schema } = require("mongoose");

const InstitucionSchema = Schema({
    institucion: {
        type: String,
        required: true,
    },
    descuento: {
        type: Number,
        default: 0,
    },
}, { _id: false });

module.exports = InstitucionSchema;