const { request, response } = require("express");
const Orden = require("../../models/ordenes/Orden");

const insertOrden = async (req = request, res = response) => {
    try {
        const orden = new Orden({
            ...req.body,
            fecha_pedido: new Date(),
        });
        await orden.save();
        res.status(201).json({ ok: true, orden });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

module.exports = {
    insertOrden
}