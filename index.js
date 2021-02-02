const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Express server
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//JSON Parse
app.use(express.json());

//Routes
app.use('/lab/auth', require('./routes/auth'));
app.use('/lab/instituciones', require('./routes/catalogos/institucion'));
app.use('/lab/doctores', require('./routes/catalogos/doctor'));
app.use('/lab/pacientes', require('./routes/catalogos/paciente'));

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Servidor levantado ${PORT}`);
});