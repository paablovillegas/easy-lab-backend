const { Schema } = require("mongoose");

const TotalesSchema = new Schema({
    subtotal: {
        type: Number,
        required: true,
    },
    descuento: {
        type: Number
    },
    descuento_pc: {
        type: Number
    },
    descuento_2: {
        type: Number
    },
    comision_pc: {
        type: Number,
    },
    comision: {
        type: Number,
    },
    extras: {
        type: Number,
    },
    total: {
        type: Number,
        required: true,
    },
});

module.exports = TotalesSchema;