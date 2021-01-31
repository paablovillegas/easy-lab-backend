const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario)
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya registrado!'
            });
        usuario = new Usuario(req.body);
        //Encripcion contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        res.status(201).json({ ok: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
};

const updateUsuario = async (req, res = response) => {
    const { uid } = req.params;
    try {
        let usuario = await Usuario.findById(uid);
        if (!usuario)
            return res.status(400).json({ ok: false });
        const { name, email, active, roles } = req.body;
        usuario.name = name || usuario.name;
        usuario.email = email || usuario.email;
        usuario.active = active || usuario.active;
        usuario.roles = roles || usuario.roles;
        await usuario.save();
        res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updatePassword = async (req, res = response) => {
    const { uid } = req.params;
    try {
        let usuario = await Usuario.findById(uid);
        if (!usuario)
            return res.status(400).json({ ok: false });
        const salt = bcrypt.genSaltSync();
        const { password } = req.body;
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        return res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
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
            ok: true,
            id: usuario.id,
            token
        });
    } catch (err) {
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
    updateUsuario,
    updatePassword,
    loginUsuario,
    renewToken
};