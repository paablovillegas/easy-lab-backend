const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const fileUpload = require('express-fileupload');
require('dotenv').config();

//Express server
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//JSON Parse
app.use(express.json());

//File Upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

//Routes
app.use('/lab/auth', require('./routes/auth'));
app.use('/lab/laboratorio', require('./routes/laboratorio'));
app.use('/lab/instituciones', require('./routes/catalogos/institucion'));
app.use('/lab/doctores', require('./routes/catalogos/doctor'));
app.use('/lab/pacientes', require('./routes/catalogos/paciente'));
app.use('/lab/componentes', require('./routes/catalogos/analisis/componente'));
app.use('/lab/analisis', require('./routes/catalogos/analisis/analisis'));
app.use('/lab/ordenes', require('./routes/ordenes/orden'));
app.use('/lab/archivos', require('./routes/files/files'));

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Servidor levantado ${PORT}`);
});