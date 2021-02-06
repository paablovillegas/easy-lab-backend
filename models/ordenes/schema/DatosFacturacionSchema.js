const { Schema } = require("mongoose");

const DatosFacturacionSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    rfc: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
});
module.exports = DatosFacturacionSchema;