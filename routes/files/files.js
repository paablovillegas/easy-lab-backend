const { Router } = require("express");
const { uploadFile } = require("../../controllers/files/files");

const router = Router();

router.post('/', uploadFile);

module.exports = router