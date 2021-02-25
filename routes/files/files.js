const { Router } = require("express");
const { uploadFile, getFile } = require("../../controllers/files/files");
const { validarArchivo } = require("../../middlewares/validar-file");

const router = Router();

//Subir un archivo
router.post(
    '/',
    validarArchivo,
    uploadFile,
);

//Bajar un archivo
router.get('/', getFile)

module.exports = router