const { Schema, model } = require("mongoose");
const Doctor = require("../catalogos/Doctor");
const Institucion = require("../catalogos/Institucion");
const Paciente = require("../catalogos/Paciente");
const Laboratorio = require("../Laboratorio");
const DatosFacturacion = require("./DatosFacturacion");
const Pago = require("./Pago");
const Resultado = require("./Resultado");
const UsuarioRegistro = require("./UsuarioRegistro");


const OrdenSchema = Schema({
    laboratorio: {
        type: Laboratorio,
        required: true,
    },
    paciente: {
        type: Paciente,
        required: true
    },
    doctor: {
        type: Doctor,
        required: true,
    },
    institucion: {
        type: Institucion,
        default: undefined
    },
    facturacion: {
        type: DatosFacturacion,
    },
    analsis: {
        type: [Resultado],
        requred: true
    },
    subtotal: {
        type: Number,
        required: true,
    },
    descuento: {
        type: Number
    },
    descuento_pc: {
        type: Number
    },
    iva_pc: {
        type: Number,
        required: true,
        default: 16,
    },
    iva: {
        type: Number,
        required: true,
    },
    otros: {
        type: Number
    },
    total: {
        type: Number,
        required: true,
    },
    fecha_pedido: {
        type: Date,
        required: true,
        default: new Date(),
    },
    fecha_entrega: {
        type: Date,
        default: undefinded,
    },
    pdf: {
        type: String,
        default: undefined,
    },
    publicado: {
        type: Boolean,
        default: undefined,
    },
    actualizaciones: {
        type: [UsuarioRegistro],
        default: [],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    pagos: {
        type: [Pago],
        default: [],
    }
});

module.exports = model('Orden', OrdenSchema, 'ordenes');