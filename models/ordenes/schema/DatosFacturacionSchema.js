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
});
module.exports = DatosFacturacionSchema;