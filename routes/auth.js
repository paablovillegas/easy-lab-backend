const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarChangePasswordJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos')
const {
    crearUsuario,
    loginUsuario,
    renewToken,
    updatePasswordAdmin,
    updateUsuario,
    updatePasswordWithToken,
    generateTokenChangepassword
} = require('../controllers/auth');
const passport = require('passport');

const router = Router();

//Endpoints públicos
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
    '/forgot_password',
    [
        check('password', 'Password obligatorio').isLength({ min: 8 }),
        validarChangePasswordJWT,
    ],
    updatePasswordWithToken,
);
router.use(passport.initialize());
require('./../middlewares/passport')(passport);

router.get('/', passport.authenticate('jwt', { session: false }), (e, r, n) => {
    r.status(200).json({ ok: true, msg: ':)' });
})

router.use(validarJWT);

router.post(
    '/jwt/change_password',
    generateTokenChangepassword
);


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
    updatePasswordAdmin
)

router.get('/renew', renewToken);

module.exports = router;