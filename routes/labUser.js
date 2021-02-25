const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearUsuario, getUsers } = require('../controllers/auth');
const { check } = require("express-validator");

const router = Router();

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

router.get('/users', getUsers);

router.get('/users/:uid', getUsers);

module.exports = router;