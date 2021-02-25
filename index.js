const fileUpload = require('express-fileupload');
const passport = require('passport');
const express = require('express');
const dayjs = require('dayjs');
const cors = require('cors');
require('dayjs/locale/es');
require('dotenv').config();

const { getUserInfo } = require('./middlewares/passport-setter');
const { definePrototypes } = require('./helpers/prototypes');
const { dbConnection } = require('./database/config');
const jwtAuth = require('./middlewares/passport');
const logger = require('./helpers/logger');

//Dates en español
dayjs.locale('es');
//Add prototypes
definePrototypes();

//Express server
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//JSON Parse
app.use(express.json());

//Passport middleware
app.use(passport.initialize());
jwtAuth(passport);

//File Upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
}));

//Public routes
app.use('/lab/auth', require('./routes/login'));

//Change password route
//TODO: Generar comentarios de creacion y definicion de uso
app.use('/lab/auth', require('./routes/auth'));

//JWT Auth required
app.use(getUserInfo);

//Private Routes
app.use('/lab/auth', require('./routes/labUser'));
app.use('/lab/laboratorio', require('./routes/laboratorio'));
app.use('/lab/instituciones', require('./routes/catalogos/institucion'));
app.use('/lab/doctores', require('./routes/catalogos/doctor'));
app.use('/lab/pacientes', require('./routes/catalogos/paciente'));
app.use('/lab/componentes', require('./routes/catalogos/analisis/componente'));
app.use('/lab/analisis', require('./routes/catalogos/analisis/analisis'));
app.use('/lab/ordenes', require('./routes/ordenes/orden'));
app.use('/lab/ordenes/extras', require('./routes/ordenes/extras'));

app.use('/lab/archivos', require('./routes/files/files'));

const { PORT } = process.env;
app.listen(PORT, () => {
    logger.info(`Servidor levantado ${PORT}`);
});