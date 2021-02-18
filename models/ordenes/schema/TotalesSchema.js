const { Schema } = require("mongoose");

const TotalesSchema = new Schema({
    subtotal: {
        type: Number,
        required: true,
    },
    descuento: {
        type: Number,
        required: true,
    },
    descuento_pc: {
        type: Number,
        required: true,
    },
    descuento_2: {
        type: Number,
        required: true,
    },
    comision_pc: {
        type: Number,
        required: true,
    },
    comision: {
        type: Number,
        required: true,
    },
    extras: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
}, { _id: false });

module.exports = TotalesSchema;