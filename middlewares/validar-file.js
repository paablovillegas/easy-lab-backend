const { request } = require("express");

const validarArchivo = (req = request, res = request, next) => {
    if (!req.files || !req.files.archivo)
        return res.status(400).json({
            ok: false,
            err: 'No se han subido archivos',
        });
    next()
}

module.exports = {
    validarArchivo,
}