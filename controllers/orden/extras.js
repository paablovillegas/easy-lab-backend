const { response } = require("express");

const getCSV = (_, res = response) => {
    const data = JSON.parse(res.getHeader('x-data'));
    return res.json({
        ok: true,
        data
    });
};

module.exports = {
    getCSV,
};