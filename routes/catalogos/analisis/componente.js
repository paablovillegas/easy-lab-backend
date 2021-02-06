const { Router } = require("express");
const { check } = require("express-validator");
const {
    getComponentes,
    getComponente,
    insertComponente,
    updateComponente,
    deleteComponente
} = require("../../../controllers/catalogos/analisis/componente");
const { validarCampos } = require("../../../middlewares/validar-campos");

const router = Router();

router.get('/', getComponentes);

router.get(
    '/:uid',
    getComponente,
);

router.post(
    '/',
    [
        check('componente', 'Componente obligatorio').exists().trim().isString().not().isEmpty(),
        check('referencia', 'Referencia erronea').optional().trim().isString().not().isEmpty(),
        validarCampos,
    ],
    insertComponente,
);

router.put(
    '/:uid',
    [
        check('componente', 'Componente obligatorio').optional().trim().isString().not().isEmpty(),
        check('referencia', 'Referencia erronea').optional().trim().isString().not().isEmpty(),
        validarCampos,
    ],
    updateComponente,
);

router.delete('/:uid', deleteComponente);

module.exports = router