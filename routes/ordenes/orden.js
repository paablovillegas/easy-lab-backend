const { Router } = require("express");
const { check, oneOf } = require("express-validator");
const { insertOrden } = require("../../controllers/orden/orden");
const { validarCampos } = require("../../middlewares/validar-campos");

const router = Router();

// Ordenes entre dos fechas
// Ordenes por paciente
// Ordenes por doctor
// Ordenes por institucion
router.get('/',);
router.get('/:uid',);

// Insert Orden
router.post(
    '/',
    [
        validarCampos,
    ],
    insertOrden
);
router.put('/:uid',);
router.delete('/:uid',);

module.exports = router;