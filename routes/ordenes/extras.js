const { Router } = require('express');
const { getCSV } = require('../../controllers/orden/extras');
const { readCsv, readJSON } = require('../../middlewares/read-file');

const router = Router();

router.use([
    readJSON,
    readCsv,
]);

//Obtener las formas de pago o CFDI
router.get(['/formas_pago', '/uso_cfdi'], getCSV);

module.exports = router;