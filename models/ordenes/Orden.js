const { Schema, model } = require("mongoose");
const DatosFacturacionSchema = require("./schema/DatosFacturacionSchema");
const DoctorSchema = require("./schema/DoctorSchema");
const InstitucionSchema = require("./schema/InstitucionSchema");
const LaboratorioSchema = require("./schema/LaboratorioSchema");
const PacienteSchema = require("./schema/PacienteSchema");
const PagoSchema = require("./schema/PagoSchema");
const ResultadoSchema = require("./schema/ResultadoSchema");
const TotalesSchema = require("./schema/TotalesSchema");
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
    },
    facturacion: {
        type: DatosFacturacionSchema,
    },
    analisis: {
        type: [ResultadoSchema],
        requred: true
    },
    totales: {
        type: TotalesSchema,
        required: true,
    },
    comentarios: {
        type: String,
    },
    fecha_pedido: {
        type: Date,
        required: true,
    },
    fecha_entrega: {
        type: Date,
        required: true,
    },
    fecha_actualizacion: {
        type: Date,
    },
    pdf: {
        type: String,
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