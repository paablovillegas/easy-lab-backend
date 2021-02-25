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

//Obtener todos los componentes
router.get('/', getComponentes);

//Obtener un componente
router.get('/:uid', getComponente);

//Crear un componente
router.post(
    '/',
    [
        check('componente', 'Componente obligatorio').exists().trim().isString().not().isEmpty(),
        check('referencia', 'Referencia erronea').optional().trim().isString().not().isEmpty(),
        validarCampos,
    ],
    insertComponente,
);

//Actualizar un componente
router.put(
    '/:uid',
    [
        check('componente', 'Componente obligatorio').optional().trim().isString().not().isEmpty(),
        check('referencia', 'Referencia erronea').optional().trim().isString().not().isEmpty(),
        validarCampos,
    ],
    updateComponente,
);

//Borrar un componente
router.delete('/:uid', deleteComponente);

module.exports = router