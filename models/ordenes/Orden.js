const { Schema, model } = require("mongoose");
const DatosFacturacionSchema = require("./schema/DatosFacturacionSchema");
const DoctorSchema = require("./schema/DoctorSchema");
const InstitucionSchema = require("./schema/InstitucionSchema");
const LaboratorioSchema = require("./schema/LaboratorioSchema");
const PacienteSchema = require("./schema/PacienteSchema");
const PagoSchema = require("./schema/PagoSchema");
const ResultadoSchema = require("./schema/ResultadoSchema");
const UsuarioRegistroSchema = require("./schema/UsuarioRegistroSchema");
 
const OrdenSchema = Schema({
    laboratorio: {
        type: LaboratorioSchema,
        required: true,
    },
    paciente: {
        type: PacienteSchema,
        required: true
    },
    doctor: {
        type: DoctorSchema,
        required: true,
    },
    institucion: {
        type: InstitucionSchema,
        default: undefined
    },
    facturacion: {
        type: DatosFacturacionSchema,
    },
    analisis: {
        type: [ResultadoSchema],
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
        default: undefined,
    },
    pdf: {
        type: String,
        default: undefined,
    },
    publicado: {
        type: Boolean,
        required: true,
        default: false,
    },
    actualizaciones: {
        type: [UsuarioRegistroSchema],
        default: [],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    pagos: {
        type: [PagoSchema],
        default: [],
    }
});

module.exports = model('Orden', OrdenSchema, 'ordenes');