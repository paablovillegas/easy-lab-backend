const mongoose = require('mongoose');

//Prevent deprecation of `findOneAndUpdate()` and `findOneAndDelete()
mongoose.set('useFindAndModify', false);

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_DB_CONN || process.env.DB_CONN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('DB Connected');
    } catch (err) {
        console.log(err);
        throw new Error('Error al conectarse a la base de datos');
    }
};

module.exports = { dbConnection };