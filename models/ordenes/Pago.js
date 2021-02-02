const { Schema, model } = require("mongoose");

const PagoSchema = Schema({
    pago: {
        type: Number,
        required: true,
    },
    tipo_pago: {
        type: String,
        required: true,
    },
    tarjeta: {
        type: String,
        default: undefined,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
});

module.exports = model('Pago', PagoSchema);