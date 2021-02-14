const { response, request } = require("express");
const path = require('path');

const getFile = (req = request, res = response) => {
    const uploadPath = path.join(__dirname, '../../uploads/', 'aa.png');
    res.sendFile(uploadPath)
}

const uploadFile = (req = request, res = response) => {
    const { archivo } = req.files;
    const uploadPath = path.join(__dirname, '../../uploads/', 'aa.png');

    archivo.mv(uploadPath, (err) => {
        if (err)
            return res.status(500).send({ err });
        return res.status(200).json({ ok: true, msg: 'File uploaded to' + uploadPath });
    });
};

module.exports = {
    uploadFile,
    getFile,
};