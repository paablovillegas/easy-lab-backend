const { response, request } = require("express");
const { subirArchivo } = require("../../helpers/subirArchivo");

const uploadFile = async (req = request, res = response) => {
    if (!req.files || !req.files.archivo) {
        return res.status(400).json({
            ok: false,
            err: 'No se han subido archivos',
        });
    }
    subirArchivo(req.files)
        .then(response => res.json({ ok: true, response }))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                mgs: 'Error al subir el archivo'
            })
        });
};

module.exports = {
    uploadFile,
};