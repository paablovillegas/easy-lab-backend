
const currencyFormat = (currency) =>
new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
}).format(currency);

module.exports = {
    currencyFormat,
}