const { Router } = require("express");
const { uploadFile, getFile } = require("../../controllers/files/files");
const { validarArchivo } = require("../../middlewares/validar-file");

const router = Router();

router.post(
    '/',
    validarArchivo,
    uploadFile,
);

router.get('/', getFile)

module.exports = router