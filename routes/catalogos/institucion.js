const { Router } = require('express');
const { check } = require('express-validator');

const { getInstituciones, insertInstitucion, updateInstitucion, deleteInstitucion, getInstitucion } = require('../../controllers/catalogos/institucion');
const { validarCampos } = require('../../middlewares/validar-campos');

const router = Router();

//Obtener todas las instituciones
router.get('/', getInstituciones);

//Obtener una institucion en especifico
router.get('/:uid', getInstitucion);

//Crear una nueva institucion
router.post(
    '/',
    [
        check('institucion', 'Institucion requerida').exists().trim().not().isEmpty(),
        check('descuento', 'Descuento entre 0-100').optional().isFloat({ min: 0, max: 100 }),
        validarCampos,
    ],
    insertInstitucion,
);

//Actualizar una institucion
router.put(
    '/:uid',
    [
        check('institucion', 'Institucion requerida').optional().trim().not().isEmpty(),
        check('descuento', 'Descuento entre 0-100').optional().isFloat({ min: 0, max: 100 }),
        validarCampos,
    ],
    updateInstitucion,
);

//Borrar una insitucion
router.delete('/:uid', deleteInstitucion);

module.exports = router;