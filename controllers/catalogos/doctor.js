const { request, response } = require("express");
const Doctor = require("../../models/catalogos/Doctor")

const getDoctores = async (req = request, res = response) => {
    try {
        let doctores = await Doctor
            .find({ laboratorio: res.getHeader('lab') });
        res.status(200).json({ ok: true, doctores });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const getDoctor = async (req = request, res = resposne) => {
    const { uid } = req.params;
    try {
        const doctor = await Doctor.findOne({
            _id: uid,
            laboratorio: res.getHeader('lab'),
        });
        if (!doctor)
            return res.status(400).json({
                ok: false,
                msg: 'Institución no registrado',
            });
        res.status(200).json({ ok: true, doctor });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const insertDoctor = async (req = request, res = response) => {
    try {
        let doctor = await Doctor.findOne({
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            correo: req.body.correo,
            laboratorio: res.getHeader('lab'),
        });
        if (doctor)
            return res.status(400).json({
                ok: false,
                msg: 'Doctor ya registrado',
            });
        doctor = new Doctor({
            ...req.body,
            laboratorio: res.getHeader('lab'),
            usuario: res.getHeader('user'),
            fecha_creacion: new Date(),
        });
        await doctor.save();
        res.status(201).json({ ok: true, doctor })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const updateDoctor = async (req = request, res = resposne) => {
    const { uid } = req.params;
    try {
        let doctor = await Doctor.findOne({
            _id: uid,
            laboratorio: res.getHeader('lab'),
        });
        if (!doctor)
            return res.status(400).json({
                ok: false,
                msg: 'Doctor no registrado',
            });
        doctor = await Doctor.findByIdAndUpdate(
            uid,
            {
                ...req.body,
                fecha_actualizacion: new Date(),
            },
            { new: true }
        );
        res.status(200).json({ ok: true, doctor });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false
        });
    }
}

const deleteDoctor = async (req = request, res = resposne) => {
    const { uid } = req.params;
    try {
        Doctor.findByIdAndDelete(
            uid,
            function (err, _) {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        msg: 'Doctor no registrado'
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
    getDoctores,
    getDoctor,
    insertDoctor,
    updateDoctor,
    deleteDoctor,
}