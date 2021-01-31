const { response } = require('express');

const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body;
    res.status(201).json({
        name, email, password,
        holi: 'holi2'
    });
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