const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT, generateJWTChangePassword } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');

const compareCredentials = (password, stored) => bcrypt.compareSync(password, stored);

const generatePassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

const crearUsuario = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario)
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya registrado!'
            });
        usuario = new Usuario({
            ...req.body,
            fecha_creacion: new Date(),
        });
        usuario.password = generatePassword(password);
        await usuario.save();
        res.status(201).json({ ok: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
};

const updateUsuario = async (req = request, res = response) => {
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

// Admin actualiza contraseña de contacto, es necesaria la contraseña del amdin
const updatePasswordAdmin = async (req = request, res = response) => {
    const { admin_password, password } = req.body;
    //TODO: checar token role
    try {
        let usuario = await Usuario.findById(uid);
        if (!usuario)
            return res.status(400).json({ ok: false });
        usuario.password = generatePassword(password);
        await usuario.save();
        return res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const generateTokenChangepassword = async (req = request, res = response) => {
    const { email } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ ok: false });
        const token = await generateJWTChangePassword(email);
        res.json({
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

//Cambio de contraseña por el usuario
const updatePasswordWithOldPassword = async (req = request, res = response) => {
    //TODO: quitar uid y mandar token
    const { uid } = req.params;
    const { old_password, new_password } = req.body;
    try {
        let usuario = await Usuario.findById(uid);
        if (!usuario)
            return res.status(400).json({ ok: false });
        const validateOldPassword = bcrypt.compareSync(old_password, usuario.password);
        if (!validateOldPassword)
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(new_password, salt);
        await usuario.save();
        res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

//Cambio de contraseña cuando el usuario no recuerda el password
const updatePasswordWithToken = async (req = request, res = response) => {
    const { email, body } = req;
    const { password } = body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario)
            return res.status(400).json({ ok: false });
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        usuario.password_last_change = new Date();
        await usuario.save();
        return res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const loginUsuario = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (!usuario)
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no inválido',
            });
        const validarPasswords = compareCredentials(password, usuario.password);
        if (!validarPasswords)
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no inválido'
            });
        const token = await generateJWT(usuario);
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
const renewToken = async (req = request, res = response) => {
    const token = await generateToken(req.uid, req.name, req.roles);
    res.json({
        ok: true,
        token,
    });
};

module.exports = {
    crearUsuario,
    updateUsuario,
    generateTokenChangepassword,
    updatePasswordAdmin,
    updatePasswordWithOldPassword,
    updatePasswordWithToken,
    loginUsuario,
    renewToken
};