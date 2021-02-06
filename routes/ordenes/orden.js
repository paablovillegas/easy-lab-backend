const { Router } = require("express");
const { check, oneOf } = require("express-validator");
const { insertOrden } = require("../../controllers/orden/orden");
const { validarCampos } = require("../../middlewares/validar-campos");

const router = Router();

// Ordenes entre dos fechas
// Ordenes por paciente
// Ordenes por doctor
// Ordenes por institucion
router.get('/',);
router.get('/:uid',);

// Insert Orden
router.post(
    '/',
    [
        check('laboratorio', 'ID del laboratorio requerido').exists().isString().trim().not().isEmpty(),
        check('paciente', 'ID del laboratorio requerido').exists().isString().trim().not().isEmpty(),
        check('doctor', 'ID del doctor requerido').exists().isString().trim().not().isEmpty(),
        check('institucion', 'ID de la institucion requerida').optional().isString().trim().not().isEmpty(),
        check('analisis', 'Al menos un analisis es requerido').exists().isArray({ min: 1 }),
        check('analisis.*', 'Analisis no válido').exists().isString().trim().not().isEmpty(),
        //TODO: facturacion
        //TODO: analisis
        check('descuento', 'Subtotal requerido').optional().trim().isNumeric(),
        check('descuento_pc', 'Subtotal requerido').optional().trim().isNumeric(),
        check('iva_pc', 'Subtotal requerido').optional().trim().isNumeric(),
        check('otros', 'Subtotal requerido').optional().trim().isNumeric(),
        oneOf([ 
            check('fecha_entrega').exists().trim().isNumeric(),
            check('fecha_entrega').exists().trim().isDate(),
        ]),
        validarCampos,
    ],
    insertOrden
);
router.put('/:uid',);
router.delete('/:uid',);

module.exports = router;