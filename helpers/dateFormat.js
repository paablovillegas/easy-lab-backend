const dayjs = require('dayjs');

const inputFormat = 'DD-MM-YYYY';

const formatFecha = (fecha) => {
    if (dayjs(fecha).isValid())
        return dayjs(fecha).format(inputFormat);
    return '';
}

module.exports = {
    formatFecha,
}