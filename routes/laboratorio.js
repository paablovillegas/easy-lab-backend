const { Router } = require("express");
const { check } = require("express-validator");
const { insertLaboratorio, getLaboratorios, getLaboratorio, updateLaboratorio, deleteLaboratorio } = require("../controllers/laboratorio");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get('/',getLaboratorios);

router.get('/:uid', getLaboratorio);

router.post(
    '/',
    [
        check('laboratorio', 'Laboratorio obligatorio').exists().trim().not().isEmpty(),
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