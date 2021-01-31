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
        default: new Date(),
    },
    active: {
        type: Boolean,
        default: true,
    },
    roles: {
        type: [String],
        default: [],
    },
    laboratory: {
        type: String
    }
});

module.exports = model('Usuario', UsuarioSchema);