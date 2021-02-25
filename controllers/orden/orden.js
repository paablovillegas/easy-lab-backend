const { request, response } = require("express");
const mongoose = require('mongoose');
const { crearRecibo, crearResultados } = require("../../helpers/pdf/createFile");
const Orden = require("../../models/ordenes/Orden");

const insertOrden = async (req = request, res = response) => {
    try {
        let orden = new Orden({
            ...req.body,
            laboratorio: res.getHeader('lab'),
            usuario: res.getHeader('user'),
            fecha_pedido: new Date(),
        });
        const aux = await Orden.findOne({}, 'folio').sort({ folio: -1 });
        orden.folio = ((aux && aux.folio) || 0) + 1;
        orden = await orden.save();
        const orden2 = await Orden.findById(orden._id).populate('laboratorio');
        const file = await crearRecibo(orden2);
        orden.files = [...orden.files, { ...file }];
        await orden.save();
        return res.json({ ok: true, orden });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const fetchItem = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const orden = await Orden.findById(uid);
        return res.json({ ok: true, orden });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const fecthFolio = async (req = request, res = response) => {
    const { folio } = req.params;
    try {
        const orden = await Orden.findOne({ folio: +folio });
        return res.json({ ok: true, orden });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
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
    const { paciente, doctor, institucion, analisis, facturado,
        liquidado, fecha_inicio, fecha_fin, pagina = 1, elementos = 10 } = req.body;
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
            { $skip: (pagina - 1) * elementos },
        ];
        let ordenes;
        if (searchOptions.length) {
            ordenes = await Orden
                .aggregate(getTotals)
                .limit(elementos);
        } else {
            ordenes = await Orden
                .aggregate([{ $skip: (pagina - 1) * elementos }])
                .limit(elementos);
        }
        return res.json({ ok: true, ordenes })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
};

const insertPago = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let orden = await Orden.findById(uid);
        orden.pagos.push({
            ...req.body,
            fecha_pago: new Date(),
        });
        const file = await crearRecibo(orden);
        orden.files = [...orden.files, { ...file }];
        orden = await orden.save();
        res.json({ ok: true, orden });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const updateResultados = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let orden = await Orden.findById(uid);
        orden.analisis = req.body;
        orden = await orden.save();
        res.json({ ok: true, orden });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

const publicarOrden = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let orden = await Orden.findById(uid);
        orden.publicado = true;
        const file = await crearResultados(orden);
        orden.files = [...orden.files, { ...file }];
        orden = await orden.save();
        res.json({ ok: true, orden });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false });
    }
}

module.exports = {
    insertOrden,
    fetchItem,
    fecthFolio,
    fetchDefault,
    fetchBusquedaAvanzada,
    insertPago,
    updateResultados,
    publicarOrden,
};
