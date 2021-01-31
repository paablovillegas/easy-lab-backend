const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');

const router = Router();

router.post(
    '/new',
    [
        check('name', 'Name obligatorio').not().isEmpty(),
        check('email', 'E-mail obligatorio').isEmail(),
        check('password', 'Password obligatorio y mayor a 8 caracteres').isLength({ min: 8 }),
    ],
    crearUsuario
);
router.post(
    '/',
    [
        check('email', 'E-mail obligatorio').isEmail(),
        check('password', 'Password obligatorio y mayor a 8 caracteres').isLength({ min: 8 }),
    ],
    loginUsuario
);
router.get(
    '/renew', 
    [],
    renewToken
);

module.exports = router;