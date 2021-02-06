const { Schema } = require("mongoose");

const UsuarioRegistroSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

module.exports = UsuarioRegistroSchema;