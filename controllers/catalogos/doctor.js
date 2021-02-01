const { request, response } = require("express");
const Doctor = require("../../models/catalogos/Doctor")

const getDoctores = async (req = request, res = response) => {
    try {
        let doctores = await Doctor.find();
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
        const doctor = await Doctor.findById(uid);
        if (!doctor)
            return res.status(400).json({
                ok: false,
                msg: 'Institución no registrado',
            });
        json.status(200).body({ ok: true, doctor });
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
        });
        if (doctor)
            return res.status(400).json({
                ok: false,
                msg: 'Doctor ya registrado',
            });
        doctor = new Doctor(req.body);
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
        const doctor = await Doctor.findById(uid);
        if (!doctor)
            return res.status(400).json({
                ok: false,
                msg: 'Doctor no registrado',
            });
        doctor = await Doctor.findByIdAndUpdate(
            uid,
            req.body,
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