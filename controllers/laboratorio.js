const { request, response } = require("express");
const bcrypt = require('bcryptjs');

const Laboratorio = require("../models/Laboratorio");

const generatePassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

const getLaboratorios = async (req = request, res = response) => {
    try {
        let laboratorios = await Laboratorio.find();
        res.status(200).json({ ok: true, laboratorios });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
};

const getLaboratorio = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const laboratorio = await Laboratorio.findById(uid);
        if (!laboratorio)
            return res.status(400).json({
                ok: false,
                msg: 'Laboratorio no registrado !',
            });
        res.status(200).json({ ok: true, laboratorio });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
};

const insertLaboratorio = async (req = request, res = response) => {
    const { laboratorio } = req.body;
    try {
        let lab = await Laboratorio.findOne({ laboratorio });
        if (lab)
            return res.status(400).json({
                ok: false,
                msg: 'Laboratorio ya existente !',
            });
        const access_key = generatePassword(laboratorio);
        lab = new Laboratorio({
            ...req.body,
            fecha_creacion: new Date(),
        });
        await lab.save();
        return res.status(200).json({ ok: true, laboratorio: lab });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
};

const updateLaboratorio = async (req = request, res = response) => {
    const { uid } = req.params;
    const { laboratorio } = req.body
    try {
        let lab = await Laboratorio.findById(uid);
        if (!lab)
            return res.status(400).json({
                ok: false,
                msg: 'Laboratorio no existente !',
            });
        const data = {
            laboratorio,
            access_key: generatePassword(laboratorio),
        }
        lab = await Laboratorio.findByIdAndUpdate(uid, data, { new: true });
        res.status(200).json({ ok: true, laboratorio: lab });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
};

module.exports = {
    getLaboratorios,
    getLaboratorio,
    insertLaboratorio,
    updateLaboratorio,
};