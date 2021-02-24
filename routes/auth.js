const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')
const {
    renewToken,
    updatePasswordAdmin,
    updateUsuario,
    updatePasswordWithToken,
    generateTokenChangepassword
} = require('../controllers/auth');

const router = Router();

router.post(
    '/forgot_password',
    [
        check('password', 'Password obligatorio').isLength({ min: 8 }),
        validarCampos,
    ],
    updatePasswordWithToken,
);

router.get('/', (e, r, n) => {
    r.status(200).json({ ok: true, msg: ':)' });
})

router.post(
    '/jwt/change_password',
    generateTokenChangepassword
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