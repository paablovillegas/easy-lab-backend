const { Router } = require("express");
const { check } = require("express-validator");
const { insertLaboratorio, getLaboratorios, getLaboratorio, updateLaboratorio, deleteLaboratorio } = require("../controllers/laboratorio");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get('/', getLaboratorios);

router.get('/:uid', getLaboratorio);

router.post(
    '/',
    [
        check('laboratorio', 'Laboratorio obligatorio').exists().trim().notEmpty(),
        check('direccion', 'Direccion Obligatorio').exists().trim().notEmpty(),
        check('telefono', 'Telefono Obligatorio').optional().trim().notEmpty(),
        check('email', 'E-mail Obligatorio').optional().trim().notEmpty(),
        check('encargado', 'Encargado Obligatorio').exists().trim().notEmpty(),
        validarCampos,
    ],
    insertLaboratorio,
);

router.put(
    '/:uid',
    [
        check('laboratorio', 'Laboratorio obligatorio').exists().trim().not().isEmpty(),
        validarCampos,
    ],
    updateLaboratorio,
);

router.delete('/:uid', deleteLaboratorio);

module.exports = router;