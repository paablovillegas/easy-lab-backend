const { request, response } = require("express");
const Paciente = require("../../models/catalogos/Paciente");

const getPacientes = async (req = request, res = response) => {
    try {
        const pacientes = await Paciente
            .find({ laboratorio: res.getHeader('lab') });
        res.status(200).json({ ok: true, pacientes });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const getPaciente = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        const paciente = await Paciente.findOne({
            _id: uid,
            laboratorio: res.getHeader('lab'),
        })
        res.status(200).json({ ok: true, paciente });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const insertPaciente = async (req = request, res = response) => {
    const { nombre, apellido_paterno, genero, fecha_nacimiento } = req.body;
    try {
        let paciente = await Paciente.findOne({
            laboratorio: res.getHeader('lab'),
            nombre, apellido_paterno, genero, fecha_nacimiento
        });
        if (paciente)
            return res.status(400).json({
                ok: false,
                msg: 'Paciente existente !'
            });
        paciente = new Paciente({
            ...req.body,
            laboratorio: res.getHeader('lab'),
            usuario: res.getHeader('user'),
            fecha_creacion: new Date(),
        });
        await paciente.save();
        res.status(200).json({ ok: true, paciente });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updatePaciente = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        let paciente = await Paciente.findOne({
            _id: uid,
            laboratorio: res.getHeader('lab'),
        })
        if (!paciente)
            return res.status(400).json({
                ok: false,
                msg: 'Paciente no existente !'
            });
        paciente = await Paciente.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.status(200).json({ ok: true, paciente });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deletePaciente = async (req = request, res = response) => {
    const { uid } = req.params;
    try {
        Paciente.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Paciente no registrado !'
                    });
                res.status(200).json({ ok: true });
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

module.exports = {
    getPacientes,
    getPaciente,
    insertPaciente,
    updatePaciente,
    deletePaciente,
}