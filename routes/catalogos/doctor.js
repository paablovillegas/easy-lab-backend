const { Router } = require("express");
const { check } = require("express-validator");
const { 
    getDoctores, 
    getDoctor, 
    insertDoctor, 
    updateDoctor, 
    deleteDoctor 
} = require("../../controllers/catalogos/doctor");
const { validarCampos } = require("../../middlewares/validar-campos");

const router = Router();

//Obtener lista de doctores
router.get('/', getDoctores);

//Actualizar un doctor
router.get('/:uid', getDoctor);

//Crear un nuevo doctor
router.post(
    '/',
    [
        check('nombre', 'Nombre requerido').exists().trim().not().isEmpty(),
        check('apellido_paterno', 'Apellido paterno requerido').exists().trim().not().isEmpty(),
        check('apellido_materno', 'Apellido materno requerido').optional().trim().not().isEmpty(),
        check('correo', 'Correo inválido').optional().trim().isEmail(),
        check('telefono', 'Teléfono inválido').optional().trim().not().isMobilePhone(),
        check('comision', 'Comisión inválida').optional().trim().isNumeric(),
        validarCampos,
    ],
    insertDoctor
);

//Actualizar un doctor
router.put(
    '/:uid',
    [
        check('nombre', 'Nombre requerido').optional().trim().not().isEmpty(),
        check('apellido_paterno', 'Apellido paterno requerido').optional().trim().not().isEmpty(),
        check('apellido_materno', 'Apellido materno requerido').optional().trim().not().isEmpty(),
        check('correo', 'Correo inválido').optional().trim().isEmail(),
        check('telefono', 'Teléfono inválido').optional().trim().not().isMobilePhone(),
        check('comision', 'Comisión inválida').optional().trim().isNumeric(),
        validarCampos,
    ],
    updateDoctor
)

//Borrar un doctor
router.delete('/:uid', deleteDoctor);

module.exports = router;