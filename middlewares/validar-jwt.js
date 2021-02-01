const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token)
        return res.status(401).json({
            ok: false,
            msg: 'Token necesario'
        })
    try {
        const { uid, name, roles } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
        );
        req.uid = uid;
        req.name = name;
        req.roles = roles;
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }
    next();
};

const validarChangePasswordJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token)
        return res.status(401).json({
            ok: false,
            msg: 'Token necesario'
        })
    try {
        const { email } = jwt.verify(
            token,
            process.env.SECRET_JWT_CHANGE_PASSWORD_SEED,
        );
        req.email = email;
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }
    next();
}

module.exports = { validarJWT, validarChangePasswordJWT };