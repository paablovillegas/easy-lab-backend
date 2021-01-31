const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generateJWT } = require('../helpers/jwt');

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
        const token = await generateJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            email,
            token
        });
    } catch(err) {
        res.status(500).json({
            ok: false
        });
    }
};
const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        if (!usuario)
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no inválido',
            });
        const validarPasswords = bcrypt.compareSync(password, usuario.password);
        if (!validarPasswords)
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no inválido'
            });
        const token = await generateJWT(usuario.id, usuario.name);
        res.json({
            ok:true,
            id: usuario.id,
            token
        });
    } catch(err) {
        return res.status(500).json({
            ok: false
        });
    }
};
const renewToken = async (req, res = response) => {
    const token = await generateJWT(req.uid, req.name);
    res.json({
        ok: true,
        token,
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
};