const { Schema, model } = require("mongoose");

const UsuarioRegistroSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

module.exports = model('Usuario-Registro', UsuarioRegistroSchema, 'usuario-registro');