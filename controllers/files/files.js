const { response, request } = require("express");
const path = require('path');

const uploadFile = (req = request, res = response) => {
    if (!req.files || !req.files.archivo) {
        return res.status(400).json({
            ok: false,
            err: 'No se han subido archivos',
        });
    }
    const { archivo } = req.files;
    console.log(archivo);

    const uploadPath = path.join(__dirname, '../../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err)
            return res.status(500).send({ err });
        return res.status(200).json({ ok: true, msg: 'File uploaded to' + uploadPath });
    });
};

module.exports = {
    uploadFile,
};