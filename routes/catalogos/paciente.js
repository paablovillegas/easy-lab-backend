const { Router } = require("express");

const { 
    getPacientes, 
    getPaciente, 
    insertPaciente, 
    updatePaciente, 
    deletePaciente 
} = require('../../controllers/catalogos/paciente');

const router = Router();

router.get('/', getPacientes);


module.exports = router;