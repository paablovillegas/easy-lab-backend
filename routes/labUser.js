const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearUsuario, getUsers, renewToken } = require('../controllers/auth');
const { check } = require("express-validator");

const router = Router();

//Generacion de nuevo token de acceso
router.get(
    '/renew_token',
    renewToken
);

//Generacion de nuevo usuario del mismo laboratorio del que se está logeado
router.post(
    '/new/lab_user',
    [
        check('name', 'Name obligatorio').not().isEmpty(),
        check('email', 'E-mail obligatorio').trim().isEmail(),
        check('password', 'Password obligatorio y mayor a 8 caracteres').trim().isLength({ min: 8 }),
        check('roles', 'Roles válidos').optional().isArray(),
        check('roles.*', 'Roles deben ser strings').optional().isString(),
        validarCampos,
    ],
    crearUsuario
);

//Obtencion de todos los usuarios
router.get('/users', getUsers);

//Obtencion de todos los usuarios de un laboratorio
router.get('/users/:lab_id', getUsers);

module.exports = router;