const { Router } = require("express");
const { check, oneOf } = require("express-validator");
const { insertOrden } = require("../../controllers/orden/orden");
const { validacionOrden } = require("../../middlewares/orden-validation");
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
        //Paciente
        check('paciente', 'El paciente es requerido').exists(),
        check('paciente.nombre', 'El nombre del paciente es requerido').exists().isString(),
        check('paciente.apellido_paterno', 'El apellido paterno del paciente es requerido').exists().isString(),
        check('paciente.apellido_materno', 'El apellido materno del paciente debe ser texto').optional().isString(),
        check('paciente.correo', 'El correo del paciente debe ser texto').optional().isString(),
        check('paciente.telefono', 'El telefono del paciente debe ser texto').optional().isString(),
        //Doctor
        oneOf([
            check('doctor').not().exists(),
            check('doctor.nombre').exists().isString(),
        ]),
        oneOf([
            check('doctor').not().exists(),
            check('doctor.apellido_paterno').exists().isString(),
        ]),
        check('doctor.apellido_materno').optional().isString(),
        check('doctor.correo').optional().isString(),
        check('doctor.telefono').optional().isString(),
        check('doctor.comision').optional().isNumeric(),
        //Institucion
        oneOf([
            check('institucion').not().exists(),
            check('institucion.institucion').exists().isString(),
        ]),
        check('institucion.descuento').optional().isNumeric(),
        //Facturacion
        oneOf([
            check('facturacion').not().exists(),
            check('facturacion.rfc').exists().isString(),
        ]),
        oneOf([
            check('facturacion').not().exists(),
            check('facturacion.correo').exists().isString(),
        ]),
        oneOf([
            check('facturacion').not().exists(),
            check('facturacion.uso_cfdi').exists().isString(),
        ]),
        oneOf([
            check('facturacion').not().exists(),
            check('facturacion.forma_pago').exists().isString(),
        ]),
        //Analisis
        check('analisis').exists().isArray({ min: 1 }),
        check('analisis.*.analisis').exists().isString().notEmpty(),
        check('analisis.*.precio').exists().isNumeric(),
        check('analisis.*.componentes').exists().isArray({ min: 1 }),
        check('analisis.*.componentes.*.componente').exists().isString().notEmpty(),
        check('analisis.*.componentes.*.referencia').optional().isString(),
        check('analisis.*.componentes.*.resultado').not().exists(),
        //Totales
        check('totales').exists(),
        check('totales.subtotal').exists().isNumeric(),
        check('totales.descuento').exists().isNumeric(),
        check('totales.descuento_pc').exists().isNumeric(),
        check('totales.descuento_2').exists().isNumeric(),
        check('totales.comision_pc').exists().isNumeric(),
        check('totales.comision').exists().isNumeric(),
        check('totales.extras').exists().isNumeric(),
        check('totales.total').exists().isNumeric(),
        //Extras
        check('comentarios').optional().isString().trim().notEmpty(),
        oneOf([
            check('fecha_entrega').exists().isNumeric()
                .custom((i) => new Date(i) > new Date()),
            check('fecha_entrega').exists().isDate(),
        ]),
        //Pagos
        check('pagos').exists(),
        check('pagos.*.pago').exists().isNumeric(),
        check('pagos.*.tipo_pago').exists().isString(),
        validarCampos,
    ],
    insertOrden
);
router.put('/:uid',);
router.delete('/:uid',);

module.exports = router;