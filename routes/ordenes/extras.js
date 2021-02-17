const { Router } = require('express');
const { getCSV } = require('../../controllers/orden/extras');
const { readCsv, readJSON } = require('../../middlewares/read-file');

const router = Router();

router.use([
    readJSON,
    readCsv,
]);

router.get(['/formas_pago', '/uso_cfdi'], getCSV);

module.exports = router;