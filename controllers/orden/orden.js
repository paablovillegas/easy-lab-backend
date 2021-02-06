const { request, response } = require("express");
const Analisis = require("../../models/catalogos/analisis/Analisis");
const Doctor = require("../../models/catalogos/Doctor");
const Institucion = require("../../models/catalogos/Institucion");
const Paciente = require("../../models/catalogos/Paciente");
const Laboratorio = require("../../models/Laboratorio");
const DatosFacturacionSchema = require("../../models/ordenes/schema/DatosFacturacionSchema");


const insertOrden = async (req = request, res = response) => {
    const {
        laboratorio: lab,
        paciente: pax,
        doctor: doc,
        institucion: inst,
        analisis: als,
        descuento,
        descuento_pc,
        otros,
        iva_pc,
    } = req.body;
    try {
        let dataOrden = {};
        const laboratorio = await Laboratorio.findById(lab);
        if (!laboratorio)
            return res.status(400).json({
                ok: false,
                msg: 'Laboratorio no válido'
            });
        dataOrden.laboratorio = { laboratorio: laboratorio.laboratorio };
        const paciente = await Paciente.findById(pax);
        if (!paciente)
            return res.status(400).json({
                ok: false,
                msg: 'Paciente no válido'
            });
        dataOrden.paciente = {
            nombre: paciente.nombre,
            apellido_paterno: paciente.apellido_paterno,
            apellido_materno: paciente.apellido_materno,
            correo: paciente.correo,
            telefono: paciente.telefono,
        };
        let doctor;
        doctor = await Doctor.findById(doc);
        if (!doctor)
            return res.status(400).json({
                ok: false,
                msg: 'Doctor no válido'
            });
        dataOrden.doctor = {
            nombre: doctor.nombre,
            apellido_paterno: doctor.apellido_paterno,
            apellido_materno: doctor.apellido_materno,
            correo: doctor.correo,
            telefono: doctor.telefono,
            comision: doctor.comision,
        };
        let institucion;
        if (inst) {
            institucion = await Institucion.findById(inst);
            if (!institucion)
                return res.status(400).json({
                    ok: false,
                    msg: 'Institución no válida'
                });
            dataOrden.institucion = {
                institucion: institucion.institucion,
                descuento: institucion.descuento,
            };
        }
        dataOrden.analisis = [];
        dataOrden.subtotal = 0;
        for (let al of als) {
            let analisis = await Analisis.findById(al).populate('componentes');
            if (!analisis)
                return res.status(400).json({
                    ok: false,
                    msg: 'Análisis no válido'
                });
            let componentes = [];
            for (let componente of analisis.componentes) {
                componentes.push({
                    componente: componente.componente,
                    referencia: componente.referencia,
                });
            }
            dataOrden.analisis.push({
                analisis: analisis.analisis,
                precio: analisis.precio,
                componentes,
            });
            dataOrden.subtotal += analisis.precio;
        }
        if (descuento_pc) {
            dataOrden.descuento_pc = descuento_pc;
            dataOrden.descuento = descuento_pc * dataOrden.subtotal / 100;
        } else if (descuento) {
            dataOrden.descuento = descuento;
            dataOrden.descuento_pc = descuento * 100 / dataOrden.subtotal;
        }
        if (iva_pc)
            dataOrden.iva_pc = iva_pc;
        else
            dataOrden.iva_pc = process.env.IVA;
        dataOrden.iva = dataOrden.subtotal * dataOrden.iva_pc / 100;
        dataOrden.otros = otros;
        dataOrden.total = dataOrden.subtotal
            - (dataOrden.descuento || 0)
            - (dataOrden.otros || 0)
            + (dataOrden.iva || 0)

        //TODO: facturacion
        //TODO: analisis




        return res.status(200).json({
            ok: true,
            orden: dataOrden
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            ok: false
        });
    }
}

module.exports = {
    insertOrden
}