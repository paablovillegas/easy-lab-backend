const { formatFecha } = require("../dateFormat");

const tableAnalisis = (analisis) => analisis.reduce((acc, item) => (
    acc + `
<h4 class="analisis">${item.analisis}</h4>
<table class="resultado">
    <thead>
        <tr>
            <th>Análisis</th>
            <th>Resultado</th>
            <th>Referencia</th>
        </tr>
    </thead>
    <tbody>
    ${item.componentes.reduce((acc, item) => acc + rowComponente(item), '')}
    </tbody>
</table>
`), '');

const rowComponente = (componente) => (`
<tr>
    <td>${componente.componente}</td>
    <td>${componente.resultado}</td>
    <td>${componente.referencia || '-'}</td>
</tr>`);

const templateResultados = ({ folio, fecha_pedido, paciente, analisis, laboratorio }) => `
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
        h4.analisis { margin-top: 20px; }
        table.resultado { border-collapse: separate; border-spacing: 5px; }
        table.resultado > thead > tr > th, table.resultado > tbody > tr > td { font-size: 10px; text-align: center; vertical-align: top; }
        table.resultado > tbody > tr > td:not(:first-child) { font-size: 10px; width: 42%; }
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
<h3>Análisis</h3>
${tableAnalisis(analisis)}
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
    templateResultados,
};