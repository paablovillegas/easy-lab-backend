const { request, response, json } = require("express");
const Institucion = require("../../models/catalogos/Institucion");

const getInstituciones = async (req = request, res = response) => {
    try {
        let instituciones = await Institucion.find();
        res.status(200).json({ ok: true, instituciones });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const getInstitucion = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const institucion = await Institucion.findById(uid);
        if (!institucion)
            return res.status(400).json({
                ok: false,
                msg: 'Institución no registrada',
            });
        res.status(200).json({ ok: true, institucion });

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
                msg: 'Institución ya registrada',
            });
        institucion = new Institucion(req.body);
        await institucion.save();
        res.status(201).json({ ok: true, institucion });
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
        const institucion = await Institucion.findById(uid);
        if (!institucion)
            return res.status(400).json({
                ok: false,
                msg: 'Institución no registrada',
            });
        institucion = await Institucion.findByIdAndUpdate(
            uid,
            req.body,
            { new: true }
        );
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
                        msg: 'Institución no registrada'
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
    getInstitucion,
    insertInstitucion,
    updateInstitucion,
    deleteInstitucion,
};