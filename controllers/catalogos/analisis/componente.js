const { request, response } = require("express");
const Componente = require("../../../models/catalogos/analisis/Componente");

const getComponentes = async (req = request, res = response) => {
    try {
        const componentes = await Componente.find();
        return res.status(200).json({ ok: true, componentes });
    } catch (err) {
        console.log(err);
        console.log(err);
        return res.status(500).json({
            ok: true
        });
    }
}

const getComponente = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const componente = await Componente.findById(uid);
        if (!componente)
            return res.status(400).json({
                ok: false,
                msg: 'Componente no registrado !',
            })
        return res.status(200).json({ ok: true, componente });
    } catch (err) {
        console.log(err);
        console.log(err);
        return res.status(500).json({
            ok: true
        });
    }
}

const insertComponente = async (req = request, res = response) => {
    const { componente } = req.body;
    try {
        let comp = await Componente.findOne({ componente });
        if (comp)
            return res.json(400).json({
                ok: false,
                msg: 'Componente ya registrado !'
            });
        comp = new Componente(req.body);
        await comp.save();
        return res.status(200).json({
            ok: true,
            componente: comp
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: true
        });
    }
}

const updateComponente = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let componente = await Componente.findById(uid);
        if (!componente)
            return res.status(200).json({
                ok: false,
                msg: 'Componente no registrado !'
            });
        componente = await Componente.findByIdAndUpdate(uid, req.body, { new: true });
        return res.status(200).json({ ok: true, componente });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false
        });
    }
}

const deleteComponente = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Componente.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(200).json({
                        ok: false,
                        msg: 'Componente no registrado !'
                    });
                return res.status(200).json({ ok: true });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: true
        });
    }
}

module.exports = {
    getComponentes,
    getComponente,
    insertComponente,
    updateComponente,
    deleteComponente,
}