const { Router } = require("express");
const { check, oneOf } = require("express-validator");

const {
    getPacientes,
    getPaciente,
    insertPaciente,
    updatePaciente,
    deletePaciente
} = require('../../controllers/catalogos/paciente');
const { validarCampos } = require("../../middlewares/validar-campos");

const router = Router();

//Obtener todos los pacientes
router.get('/', getPacientes);

//Obtener un paciente
router.get('/:uid', getPaciente);

//Crear un nuevo paciente
router.post(
    '/',
    [
        check('nombre', 'Nombre obligatorio').exists().trim().not().isEmpty(),
        check('apellido_paterno', 'Apellido paterno obligatorio').exists().trim().not().isEmpty(),
        check('apellido_materno', 'Apellido materno erróneo').optional().trim().not().isEmpty(),
        check('correo', 'Correo erróneo').optional().trim().isEmail(),
        check('telefono', 'Telefono Obligatorio').optional().trim().isMobilePhone(),
        check('genero', 'Genero Obligatorio').exists().trim().isNumeric(),
        oneOf([
            check('fecha_nacimiento', 'Fecha Nacimiento Obligatorio').exists().trim().isDate(),
            check('fecha_nacimiento', 'Fecha Nacimiento Obligatorio').exists().trim().isNumeric(),
        ]),
        check('direccion', 'Direccion Obligatorio').optional().trim().isString().not().isEmpty(),
        validarCampos
    ],
    insertPaciente
);

//Actualizar un paciente
router.put(
    '/:uid',
    [
        check('nombre', 'Nombre obligatorio').optional().trim().not().isEmpty(),
        check('apellido_paterno', 'Apellido paterno obligatorio').optional().trim().not().isEmpty(),
        check('apellido_materno', 'Apellido materno erróneo').optional().trim().not().isEmpty(),
        check('correo', 'Correo erróneo').optional().trim().isEmail(),
        check('telefono', 'Telefono Obligatorio').optional().trim().isMobilePhone(),
        check('genero', 'Genero Obligatorio').optional().trim().isNumeric(),
        oneOf([
            check('fecha_nacimiento', 'Fecha Nacimiento Obligatorio').optional().trim().isDate(),
            check('fecha_nacimiento', 'Fecha Nacimiento Obligatorio').optional().trim().isNumeric(),
        ]),
        check('direccion', 'Direccion Obligatorio').optional().trim().isString().not().isEmpty(),
        validarCampos
    ],
    updatePaciente
);

//Borrar un paciente
router.delete('/:uid', deletePaciente);

module.exports = router;