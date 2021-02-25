const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    password_last_change: {
        type: Date,
    },
    active: {
        type: Boolean,
        default: true,
    },
    roles: {
        type: [String],
        required: true,
    },
    fecha_creacion: {
        type: Date,
        required: true,
    },
    fecha_actualizacion: {
        type: Date,
        default: undefined,
    },
    laboratorio: {
        type: Schema.Types.ObjectId,
        ref: 'Laboratorio',
    },
    activo: {
        type: Boolean,
        required: true,
        default: true,
    }
});

module.exports = model('Usuario', UsuarioSchema);