const { Schema } = require("mongoose");

const DatosFacturacionSchema = Schema({
    rfc: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    uso_cfdi: {
        type: String,
        required: true,
    },
    forma_pago: {
        type: String,
        required: true,
    },
}, { _id: false });

module.exports = DatosFacturacionSchema;