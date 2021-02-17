const { request, response } = require("express");
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

const readJSON = (req = request, res = response, next) => {
    const filePath = path.join(__dirname, '../configuration/json/locations.json');
    if (fs.existsSync(filePath)) {
        const dataFile = fs.readFileSync(filePath);
        const jsonData = JSON.parse(dataFile);
        res.set('x-file', jsonData[req.url]);
        next();
    } else {
        return res.status(500).json({
            ok: false,
            msg: 'No existe el archivo de configuracion',
        });
    }
}

const readCsv = (req = request, res = response, next) => {
    const fileName = res.getHeader('x-file');
    if (!fileName)
        return res.json({
            ok: false,
            msg: 'Archivo no existente'
        });
    const file = path.join(__dirname, '../configuration/data', fileName);
    if (fs.existsSync(file)) {
        const results = [];
        fs.createReadStream(file)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                res.set('x-data', JSON.stringify(results));
                next();
            })
            .on('error', () => {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al leer el archivo'
                });
            });
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'Archivo no existente'
        });
    }
};

module.exports = {
    readJSON,
    readCsv,
};