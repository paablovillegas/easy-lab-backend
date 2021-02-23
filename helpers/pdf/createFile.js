const pdf = require('html-pdf');
const path = require('path');
const { templateRecibo } = require("./createReceipt");
const { templateResultados } = require('./createResults');

const pdfOptions = {
    format: 'Letter',
    border: '1cm',
    orientation: 'portrait'
};

const parentPath = path.join(__dirname, '../../generated');

const crearRecibo = async (orden) => {
    //TODO: Quitar y reemplazar por laboratorio
    orden.laboratorio = {
        laboratorio: 'Laboratorio de prueba 1',
        direccion: 'Calle prueba #10-23 Col. Test',
        cp: 76_000,
        ciudad: 'Querétaro',
        estado: 'Querétaro',
        correo: 'laboratorio@laboratorio.mx',
        telefono: '4421232222',
        encargado: 'QBP. John Doe',
        logo: 'https://via.placeholder.com/150',
        titulo: 'El laboratorio les desea',
        mensaje: 'un feliz 2021',
    };
    const fileName = path.join(orden.paciente._id.toString(), 'recibos', orden._id + '.pdf');
    const filePath = path.join(parentPath, fileName);
    return new Promise((resolve, reject) => {
        pdf.create(templateRecibo(orden), pdfOptions).toFile(filePath, (err) => {
            if (err)
                reject(err);
            resolve({ type: 'recibo', file: fileName, fecha: new Date() });
        });
    });
};

const crearResultados = async (orden) => {
    //TODO: Quitar y reemplazar por laboratorio
    orden.laboratorio = {
        laboratorio: 'Laboratorio de prueba 1',
        direccion: 'Calle prueba #10-23 Col. Test',
        cp: 76_000,
        ciudad: 'Querétaro',
        estado: 'Querétaro',
        correo: 'laboratorio@laboratorio.mx',
        telefono: '4421232222',
        encargado: 'QBP. John Doe',
        logo: 'https://via.placeholder.com/150',
        titulo: 'El laboratorio les desea',
        mensaje: 'un feliz 2021',
    };
    const fileName = path.join(orden.paciente._id.toString(), 'resultados', orden._id + '.pdf');
    const filePath = path.join(parentPath, fileName);
    return new Promise((resolve, reject) => {
        pdf.create(templateResultados(orden), pdfOptions).toFile(filePath, (err) => {
            if (err)
                reject(err);
            resolve({ type: 'resultado', file: fileName, fecha: new Date() });
        });
    });
}

module.exports = {
    crearRecibo,
    crearResultados,
}