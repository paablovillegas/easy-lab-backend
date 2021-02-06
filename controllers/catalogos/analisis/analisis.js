const { request, response } = require("express");
const Analisis = require("../../../models/catalogos/analisis/Analisis");
const Componente = require("../../../models/catalogos/analisis/Componente");

const getAnalisis = async (req = request, res = response) => {
    try {
        const analisis = await Analisis.find().populate('componentes');
        return res.status(200).json({ ok: true, analisis });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false
        });
    }
}

const getAnalisisItem = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const analisis = await Analisis.findById(uid).populate('componentes');
        if (!analisis)
            return res.status(400).json({
                ok: false,
                msg: 'Analisis no existente !'
            });
        return res.status(200).json({ ok: true, analisis });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false
        });
    }
}

const insertAnalisis = async (req = request, res = response) => {
    const { analisis } = req.body;
    try {
        let analisisItem = await Analisis.findOne({ analisis });
        if (analisisItem)
            return res.status(400).json({
                ok: false,
                msg: 'Analisis ya existente'
            });
        analisisItem = await new Analisis(req.body);
        await analisisItem.save();
        analisisItem = await Analisis.findById(analisisItem._id).populate('componentes');
        res.status(200).json({ ok: true, analisisItem });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false
        });
    }
}

const updateAnalisis = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false
        });
    }
}

const deleteAnalisis = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Analisis.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Analisis no registrado',
                    })
                return res.status(200).json({ ok: true });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false
        });
    }
}

module.exports = {
    getAnalisis,
    getAnalisisItem,
    insertAnalisis,
    updateAnalisis,
    deleteAnalisis,
}