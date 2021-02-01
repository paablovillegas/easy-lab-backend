const { Router } = require('express');
const { check, oneOf } = require('express-validator');

const { getInstituciones, insertInstitucion, updateInstitucion, deleteInstitucion } = require('../../controllers/catalogos/institucion');
const { validarCampos } = require('../../middlewares/validar-campos');

const router = Router();

router.get(
    '/',
    getInstituciones,
);

router.post(
    '/',
    [
        check('institucion', 'Institucion requerida').exists().trim().not().isEmpty(),
        check('descuento', 'Descuento entre 0-100').optional().isFloat({ min: 0, max: 100 }),
        validarCampos,
    ],
    insertInstitucion,
)

router.put(
    '/:uid',
    [
        check('institucion', 'Institucion requerida').optional().trim().not().isEmpty(),
        check('descuento', 'Descuento entre 0-100').optional().isFloat({ min: 0, max: 100 }),
        validarCampos,
    ],
    updateInstitucion,
);

router.delete(
    '/:uid',
    deleteInstitucion,
)

module.exports = router;