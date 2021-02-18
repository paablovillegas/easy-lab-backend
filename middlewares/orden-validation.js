const { request, response } = require("express");
const { body, validationResult, check } = require("express-validator");

const validacionOrden = async (req = request, res = response, next) => {
    await check('email').exists();
    try {
        validationResult(req).throw();
    } catch (err) {
        console.log(err)
    }
    next();
}

module.exports = {
    validacionOrden,
}