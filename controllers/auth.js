const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        if (usuario)
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya existente!'
            })
        usuario = new Usuario(req.body);
        //Encripcion contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        res.status(201).json({
            ok: true,
            usuario
        });
    } catch(err) {
        res.status(500).json({
            ok: false
        });
    }
};
const loginUsuario = (req, res = response) => {
    res.json({
        holi: 'holi'
    })
};
const renewToken = (req, res = response) => {
    res.json({
        holi: 'holi'
    })
};

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
};