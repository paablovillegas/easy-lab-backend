const { v4: uuid } = require('uuid');
const path = require('path');

const imageExtensions = ['png', 'jpg', 'jpeg'];

const subirArchivo = (
    { archivo },
    extensiones = imageExtensions,
    carpeta = '',
) => {
    return new Promise((resolve, reject) => {
        const nombreArchivo = archivo.name.split('.');
        const extension = nombreArchivo[nombreArchivo.length - 1];
        if (!extensiones.includes(extension))
            return reject('Extension no válida');
        const uid = uuid() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, uid);
        archivo.mv(uploadPath, (err) => {
            if (err)
                return reject(err);
            return resolve('Uploaded to: ' + uid );
        });
    });
}

module.exports = {
    subirArchivo,
}