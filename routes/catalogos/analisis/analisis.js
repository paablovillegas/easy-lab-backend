const { Router } = require("express");
const { check } = require("express-validator");
const {
    getAnalisis,
    getAnalisisItem,
    insertAnalisis,
    updateAnalisis,
    deleteAnalisis,
} = require("../../../controllers/catalogos/analisis/analisis");
const { validarCampos } = require("../../../middlewares/validar-campos");

const router = Router();

router.get('/', getAnalisis);

router.get('/:uid', getAnalisisItem);

router.post(
    '/',
    [
        check('analisis', 'Nombre del analisis requerido').exists().trim().isString().not().isEmpty(),
        check('descripcion', 'Descripcion errónea').optional().trim().isString().not().isEmpty(),
        check('precio', 'Precio requerido').exists().trim().isNumeric(),
        check('componentes', 'Al menos un componente es requerido').exists().isArray({ min: 1 }),
        check('componentes.*', 'Componentes no válidos').exists().trim().isString().not().isEmpty(),
        validarCampos
    ],
    insertAnalisis
);

router.put(
    '/:uid',
    [
        validarCampos
    ],
    updateAnalisis
);

router.delete('/:uid', deleteAnalisis);

module.exports = router;