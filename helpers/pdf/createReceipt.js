const { currencyFormat } = require("../numberFormat");
const { formatFecha } = require("../dateFormat");

const getDeuda = (pagos = [], totales) =>
    totales.total - pagos.reduce((acc, item) => acc += item.pago, 0);

const tableAnalisis = (analisis) => analisis.reduce((acc, item) => (
    acc + `<tr class="principal">
<td>${item.analisis}</td>
<td>${currencyFormat(item.precio || 0)}</td>
</tr>`), '');

const templatePagos = (pagos) => pagos.reduce((acc, item) => (
    acc + `<tr>
<td>${formatFecha(item.fecha_pago)}: </td>
<td>${currencyFormat(item.pago)}</td>
</tr>`), '');

const templateRecibo = ({ folio, fecha_pedido, paciente, analisis, totales, pagos, laboratorio }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recibo de pago</title>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@100;200;300;400;500;600;700;800;900&display=swap');
    * { font-family: 'Commissioner', sans-serif; color: #4b5563; }
    th { font-size: 0.8rem; }
    p, td { margin: 0 0 2px 0; font-size: 0.7rem; }
    h3, h4, th { margin: 0 0 5px 0; font-weight: 500; color: #374151; }
    h4 { margin: 8px 0 0 0; }
    h2 { margin: 0; color: #fbbf24; }
    img { text-align: center; height: 100px; }
    hr { background-color: #fbbf24; margin: 10px 0; height: 2px; border: 0; border-radius: 10px; }
    table { width: 100%; }
    p.legend { color: #9ca3af; font-style: italic; }
    .right, td, th { text-align: right; }
    .left { margin-left: 50%; }
    tr.principal>th:first-child, tr.principal>td:first-child { text-align: left; }
</style>
</head>
<body>
<div id="pageHeader" style="text-align: center;">
    <img src="${laboratorio.logo}">
</div>
<h2>Orden #${folio.pad(5)}</h2>
<div class="right">
    <h3>${laboratorio.laboratorio}</h3>
    <p>${laboratorio.direccion}</p>
    <p>${laboratorio.cp} ${laboratorio.ciudad}, ${laboratorio.estado}</p>
    <p>${laboratorio.correo}</p>
    <p>${laboratorio.telefono}</p>
</div>
<div>
    <h3>${paciente.nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno || ''}</h3>
    <p>${paciente.correo || ''}</p>
    <p>${paciente.telefono}</p>
</div>
<hr>
<table>
    <thead>
        <tr class="principal">
            <th>Análisis</th>
            <th>Precio</th>
        </tr>
    </thead>
    <tbody>
    ${tableAnalisis(analisis)}
    </tbody>
</table>
<div class="left">
    <hr>
    <table>
        <tbody>
            <tr>
                <td>Subtotal: </td>
                <td>${currencyFormat(totales.subtotal || 0)}</td>
            </tr>
            <tr>
                <td>Descuento (${totales.descuento_pc || 0} %):</td>
                <td>${currencyFormat(totales.descuento || 0)}</td>
            </tr>
            <tr>
                <td>Extras:</td>
                <td>${currencyFormat(totales.extras || 0)}</td>
            </tr>
            <tr>
                <td>Otros:</td>
                <td>${currencyFormat(totales.descuento_2 || 0)}</td>
            </tr>
            <tr>
                <th>Total</th>
                <th>${currencyFormat(totales.total || 0)}</th>
            </tr>
        </tbody>
    </table>
    <hr>
    <table>
        <tbody>
            ${templatePagos(pagos)}
            <tr>
                <th>Balance:</th>
                <th>${currencyFormat(getDeuda(pagos, totales))}</th>
            </tr>
        </tbody>
    </table>
</div>
<div id="pageFooter">
    <div style="text-align: center;">
        <h4>${laboratorio.titulo || ''}</h4>
        <p class="legend">${laboratorio.mensaje || ''}</p>
    </div>
    <table>
        <tbody>
            <tr class="principal">
                <td>
                    <p>${laboratorio.laboratorio}</p>
                    <p class="legend">${formatFecha(fecha_pedido)}</p>
                </td>
                <td>{{page}}</td>
            </tr>
        </tbody>
    </table>
</div>
</body>
</html>`;

module.exports = {
    templateRecibo,
};