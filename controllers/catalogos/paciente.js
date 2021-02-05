const { request, response } = require("express");
const Paciente = require("../../models/catalogos/Paciente");

const getPacientes = async (req = request, res = response) => {
    try {
        const pacientes = await Paciente.find();
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
        const paciente = await Paciente.findById(uid);
        res.status(200).json({ ok: true, paciente });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const insertPaciente = async (req = request, res = response) => {
    const {
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        telefono,
        genero,
        fecha_nacimiento,
        direccion,
    } = req.body;
    try {
        let paciente = await Paciente.findOne({ nombre, apellido_paterno, genero, fecha_nacimiento });
        if (paciente)
            return res.status(400).json({
                ok: false,
                msg: 'Paciente existente !'
            });
        paciente = new Paciente({
            nombre,
            apellido_paterno,
            apellido_materno,
            correo,
            telefono,
            genero,
            fecha_nacimiento,
            direccion
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
        let paciente = await Paciente.findById(uid);
        if (!paciente)
            return res.status(400).json({
                ok: false,
                msg: 'Paciente no existente !'
            });
        paciente = await Paciente.findByIdAndUpdate(uid, req.body, { new: true });
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