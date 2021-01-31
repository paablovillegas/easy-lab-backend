const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos')
const { crearUsuario, updateUsuario, loginUsuario, renewToken, updatePassword } = require('../controllers/auth');

const router = Router();

router.post(
    '/new',
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

router.put(
    '/:uid',
    updateUsuario
);

router.put(
    '/:uid/password',
    //TODO: comprobar password antigua
    updatePassword
)
router.post(
    '/',
    [
        check('email', 'E-mail obligatorio').isEmail(),
        check('password', 'Password obligatorio y mayor a 8 caracteres').isLength({ min: 8 }),
        validarCampos,
    ],
    loginUsuario
);
router.get(
    '/renew',
    [
        validarJWT,
    ],
    renewToken
);

module.exports = router;