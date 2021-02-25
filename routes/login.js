const { check, oneOf } = require('express-validator');
const { Router } = require('express');

const { loginUsuario, crearUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/',
    [
        check('email', 'E-mail obligatorio').isEmail(),
        check('password', 'Password obligatorio y mayor a 8 caracteres').isLength({ min: 8 }),
        validarCampos,
    ],
    loginUsuario
);

router.post(
    '/new',
    [
        check('name', 'Name obligatorio').not().isEmpty(),
        check('email', 'E-mail obligatorio').trim().isEmail(),
        check('password', 'Password obligatorio y mayor a 8 caracteres').trim().isLength({ min: 8 }),
        check('roles', 'Roles válidos').optional().isArray(),
        check('roles.*', 'Roles deben ser strings').optional().isString(),
        oneOf([
            check('laboratorio').not().exists(),
            check('laboratorio').exists().isString().isEmpty(),
        ]),
        validarCampos,
    ],
    crearUsuario
);

module.exports = router;