const { request, response } = require("express");
const Institucion = require("../../models/catalogos/Institucion");

const getInstituciones = async (req = request, res = response) => {
    try {
        let instituciones = await Institucion.find();
        console.log(instituciones);
        res.status(200).json({ ok: true, instituciones });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const insertInstitucion = async (req = request, res = response) => {
    try {
        let institucion = await Institucion.findOne({
            institucion: req.body.institucion
        });
        if (institucion)
            return res.status(400).json({
                ok: false,
                msg: 'Institución ya existente',
            });
        institucion = new Institucion(req.body);
        await institucion.save();
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updateInstitucion = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let institucion = await Institucion.findById(uid);
        if (!institucion)
            return res.status(400).json({
                ok: false,
                msg: 'Institución no existente',
            });
        institucion = await Institucion.findByIdAndUpdate(uid, req.body, { new: true });
        res.status(200).json({ ok: true, institucion });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deleteInstitucion = (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Institucion.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Institución no existente'
                    });
                res.status(200).json({ ok: true });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

module.exports = {
    getInstituciones,
    insertInstitucion,
    updateInstitucion,
    deleteInstitucion,
};