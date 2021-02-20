const { request, response } = require("express");
const mongoose = require('mongoose');
const { crearRecibo } = require("../../helpers/createFile");
const Orden = require("../../models/ordenes/Orden");

const insertOrden = async (req = request, res = response) => {
    try {
        const rootID = req.body.paciente._id;
        let orden = new Orden({
            ...req.body,
            fecha_pedido: new Date(),
        });
        const aux = await Orden.findOne({}, 'folio').sort({ folio: -1 });
        orden.folio = ((aux && aux.folio) || 0) + 1;
        const file = await crearRecibo(orden, rootID);
        orden.files = [...orden.files, { ...file }];
        orden = await orden.save();
        return res.json({ ok: true, orden });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const fetchDefault = async (req = request, res = response) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const ordenes = await Orden.find({
            fecha_pedido: {
                $gte: today,
            }
        });
        res.json({ ok: true, ordenes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const fetchBusquedaAvanzada = async (req = request, res = response) => {
    const { paciente, doctor, institucion, analisis, facturado, liquidado, fecha_inicio, fecha_fin } = req.body;
    try {
        let searchOptions = [];
        if (fecha_inicio)
            searchOptions.push({ fecha_pedido: { $gte: new Date(fecha_inicio) } });
        if (fecha_fin)
            searchOptions.push({ fecha_pedido: { $lte: new Date(fecha_fin) } });
        if (paciente)
            searchOptions.push({ "paciente._id": mongoose.Types.ObjectId(paciente), });
        if (doctor)
            searchOptions.push({ "doctor._id": mongoose.Types.ObjectId(doctor), })
        if (institucion)
            searchOptions.push({ "institucion._id": mongoose.Types.ObjectId(institucion), })
        if (analisis)
            searchOptions.push({ "analisis._id": mongoose.Types.ObjectId(analisis), })
        if (facturado) {
            if (facturado == 1) searchOptions.push({ "facturacion": { $exists: true }, })
            else searchOptions.push({ "facturacion": { $exists: false }, })
        }
        if (liquidado) {
            if (liquidado == 1) searchOptions.push({ liquidado: { $gte: 0 }, });
            else searchOptions.push({ liquidado: { $lt: 0 }, });
        }
        const getTotals = [
            {
                $set: {
                    total: "$totales.total",
                    pago: { $sum: "$pagos.pago", },
                },
            },
            {
                $set: {
                    liquidado: { $cmp: ["$pago", "$total"], },
                },
            },
            {
                $match: {
                    $and: searchOptions,
                },
            },
            { $unset: ["pago", "total"] },
        ];
        let ordenes;
        if (searchOptions.length) {
            ordenes = await Orden.aggregate(getTotals);
        } else {
            ordenes = await Orden.find();
        }
        return res.json({ ok: true, ordenes })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

module.exports = {
    insertOrden,
    fetchDefault,
    fetchBusquedaAvanzada,
};