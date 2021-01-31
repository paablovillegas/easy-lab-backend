const express = require('express');
require('dotenv').config();

const app = express();

//JSON Parse
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Servidor levantado ${PORT}`);
})