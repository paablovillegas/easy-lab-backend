const { response } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    res.status(201).json({
        name, email, password,
        holi: 'holi2'
    });
};
const loginUsuario = (req, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
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