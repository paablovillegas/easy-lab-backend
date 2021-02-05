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
router.get('/:uid', );
router.post('/', );
router.put('/:uid', );
router.delete('/:uid', );


module.exports = router;